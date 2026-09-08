import { adminUsernameToEmail, requireSupabase } from './supabase';

export type RegistrationSubmitInput = {
  fullName: string;
  phone: string;
  province?: string;
  city?: string;
  route: string;
  axis: string;
  issue: string;
  experienceSolution?: string;
  formData?: Record<string, unknown>;
  file?: File | null;
};

export type ContactSubmitInput = {
  fullName: string;
  phone: string;
  province: string;
  city: string;
  preferredTime: string;
  subject: string;
  note?: string;
};

export type RegistrationStatusUpdate = {
  status: string;
  adminMessage: string;
};

export type ContactStatusUpdate = {
  status: string;
  internalNote: string;
};

export async function signInAdmin(username: string, password: string) {
  const client = requireSupabase();
  const { data, error } = await client.auth.signInWithPassword({
    email: adminUsernameToEmail(username),
    password,
  });

  if (error) throw error;

  const { data: admin, error: adminError } = await client
    .from('admin_users')
    .select('user_id, username, display_name')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (adminError) throw adminError;
  if (!admin) {
    await client.auth.signOut();
    throw new Error('این حساب دسترسی مدیریت ندارد.');
  }

  return { session: data.session, admin };
}

export async function signOutAdmin() {
  const { error } = await requireSupabase().auth.signOut();
  if (error) throw error;
}

export async function getAdminSession() {
  const client = requireSupabase();
  const { data, error } = await client.auth.getSession();
  if (error) throw error;
  if (!data.session) return null;

  const { data: admin, error: adminError } = await client
    .from('admin_users')
    .select('user_id, username, display_name')
    .eq('user_id', data.session.user.id)
    .maybeSingle();

  if (adminError) throw adminError;
  return admin ? { session: data.session, admin } : null;
}

function inferContentType(file: File) {
  if (file.type) return file.type;
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (extension === 'rtf') return 'application/rtf';
  if (extension === 'doc') return 'application/msword';
  if (extension === 'docx') return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  if (extension === 'pdf') return 'application/pdf';
  return undefined;
}

async function uploadRegistrationFile(file: File) {
  const client = requireSupabase();
  const safeName = file.name.replace(/[^\p{L}\p{N}._-]+/gu, '-');
  const path = `${crypto.randomUUID()}/${safeName || 'attachment'}`;
  const { error } = await client.storage.from('registration-files').upload(path, file, {
    upsert: false,
    contentType: inferContentType(file),
  });

  if (error) throw error;
  return path;
}

export async function submitRegistration(input: RegistrationSubmitInput) {
  const client = requireSupabase();
  const filePath = input.file ? await uploadRegistrationFile(input.file) : null;

  const { data, error } = await client.rpc('submit_registration', {
    p_full_name: input.fullName,
    p_phone: input.phone,
    p_province: input.province ?? null,
    p_city: input.city ?? null,
    p_route: input.route,
    p_axis: input.axis,
    p_issue: input.issue,
    p_experience_solution: input.experienceSolution ?? null,
    p_file_path: filePath,
    p_form_data: input.formData ?? {},
  });

  if (error) throw error;
  return String(data);
}

export async function submitContactRequest(input: ContactSubmitInput) {
  const { data, error } = await requireSupabase().rpc('submit_contact_request', {
    p_full_name: input.fullName,
    p_phone: input.phone,
    p_province: input.province,
    p_city: input.city,
    p_preferred_time: input.preferredTime,
    p_subject: input.subject,
    p_note: input.note ?? null,
  });

  if (error) throw error;
  return String(data);
}

export async function trackRegistration(trackingCode: string, last4: string) {
  const { data, error } = await requireSupabase().rpc('track_registration', {
    p_tracking_code: trackingCode,
    p_last4: last4,
  });

  if (error) throw error;
  return Array.isArray(data) ? data[0] ?? null : data;
}

export async function listRegistrations() {
  const { data, error } = await requireSupabase()
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateRegistrationStatus(id: string, update: RegistrationStatusUpdate) {
  const { data, error } = await requireSupabase()
    .from('registrations')
    .update({ status: update.status, admin_message: update.adminMessage })
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function listContactRequests() {
  const { data, error } = await requireSupabase()
    .from('contact_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateContactRequestStatus(id: string, update: ContactStatusUpdate) {
  const { data, error } = await requireSupabase()
    .from('contact_requests')
    .update({ status: update.status, internal_note: update.internalNote })
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function getAdminSettings() {
  const { data, error } = await requireSupabase()
    .from('app_settings')
    .select('key, value')
    .order('key');

  if (error) throw error;
  return data;
}

export async function saveAdminSettings(settings: Array<{ key: string; value: unknown }>) {
  const { data, error } = await requireSupabase()
    .from('app_settings')
    .upsert(settings, { onConflict: 'key' })
    .select('key, value');

  if (error) throw error;
  return data;
}

export async function getRegistrationFileDownloadUrl(path: string, expiresInSeconds = 300) {
  const { data, error } = await requireSupabase()
    .storage
    .from('registration-files')
    .createSignedUrl(path, expiresInSeconds);

  if (error) throw error;
  return data.signedUrl;
}
