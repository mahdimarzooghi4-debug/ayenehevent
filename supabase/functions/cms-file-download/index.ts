import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { token, path } = await req.json();
    if (typeof token !== 'string' || !token || typeof path !== 'string' || !path) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error('Supabase environment is not configured.');
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: sessionValid, error: sessionError } = await admin.rpc('cms_admin_session_valid', {
      p_token: token,
    });
    if (sessionError) throw sessionError;
    if (sessionValid !== true) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: registration, error: registrationError } = await admin
      .from('registrations')
      .select('id, file_path')
      .eq('file_path', path)
      .maybeSingle();
    if (registrationError) throw registrationError;
    if (!registration?.file_path) {
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const fileName = path.split('/').pop() || 'registration-file';
    const { data: signed, error: signedError } = await admin.storage
      .from('registration-files')
      .createSignedUrl(path, 300, { download: fileName });
    if (signedError) throw signedError;

    // Storage signs against its internal Docker URL (http://kong:8000).
    // Preserve the signed path/query while returning a browser-reachable HTTPS URL.
    const signedUrl = new URL(signed.signedUrl);
    const publicUrl = new URL(`${signedUrl.pathname}${signedUrl.search}`, 'https://api.event.ayenehouse.ir').toString();
    return new Response(JSON.stringify({ url: publicUrl, expiresIn: 300 }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Could not create download link' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
});
