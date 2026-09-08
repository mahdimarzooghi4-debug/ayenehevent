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

export type CmsRegistration = {
  id: string;
  tracking_code: string;
  full_name: string;
  phone: string;
  province: string | null;
  city: string | null;
  route: string;
  axis: string;
  issue: string;
  experience_solution: string | null;
  file_path: string | null;
  form_data: Record<string, unknown>;
  status: string;
  admin_message: string;
  created_at: string;
  updated_at: string;
};

export type CmsContactRequest = {
  id: string;
  request_code: string;
  full_name: string;
  phone: string;
  province: string;
  city: string;
  preferred_time: string;
  subject: string;
  note: string | null;
  status: string;
  internal_note: string;
  created_at: string;
  updated_at: string;
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
  const extension = file.name.split('.').pop()?.toLowerCase();
  const allowedExtension = extension && ['rtf', 'doc', 'docx', 'pdf'].includes(extension) ? extension : null;
  const path = `${crypto.randomUUID()}/attachment${allowedExtension ? `.${allowedExtension}` : ''}`;
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

const CMS_TOKEN_KEY = 'ayene-cms-token';
const CMS_NAME_KEY = 'ayene-cms-name';

export function getCmsToken() {
  return sessionStorage.getItem(CMS_TOKEN_KEY) ?? '';
}

export function getCmsDisplayName() {
  return sessionStorage.getItem(CMS_NAME_KEY) ?? 'مدیر سامانه';
}

export async function cmsLogin(username: string, password: string) {
  const { data, error } = await requireSupabase().rpc('cms_admin_login', {
    p_username: username,
    p_password: password,
  });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  if (!row?.token) throw new Error('ورود به پنل انجام نشد.');
  sessionStorage.setItem(CMS_TOKEN_KEY, String(row.token));
  sessionStorage.setItem(CMS_NAME_KEY, String(row.display_name || 'مدیر سامانه'));
  return row;
}

export async function cmsSessionValid() {
  const token = getCmsToken();
  if (!token) return false;
  const { data, error } = await requireSupabase().rpc('cms_admin_session_valid', { p_token: token });
  if (error) return false;
  return data === true;
}

export async function cmsLogout() {
  const token = getCmsToken();
  if (token) await requireSupabase().rpc('cms_admin_logout', { p_token: token });
  sessionStorage.removeItem(CMS_TOKEN_KEY);
  sessionStorage.removeItem(CMS_NAME_KEY);
}

export async function cmsListRegistrations(): Promise<CmsRegistration[]> {
  const { data, error } = await requireSupabase().rpc('cms_list_registrations', { p_token: getCmsToken() });
  if (error) throw error;
  return (data ?? []) as CmsRegistration[];
}

export async function cmsListContacts(): Promise<CmsContactRequest[]> {
  const { data, error } = await requireSupabase().rpc('cms_list_contacts', { p_token: getCmsToken() });
  if (error) throw error;
  return (data ?? []) as CmsContactRequest[];
}

export async function cmsUpdateRegistration(trackingCode: string, status: string, message: string) {
  const { data, error } = await requireSupabase().rpc('cms_update_registration', {
    p_token: getCmsToken(),
    p_tracking_code: trackingCode,
    p_status: status,
    p_message: message,
  });
  if (error) throw error;
  return data;
}

export async function cmsUpdateContact(requestCode: string, status: string, internalNote: string) {
  const { data, error } = await requireSupabase().rpc('cms_update_contact', {
    p_token: getCmsToken(),
    p_request_code: requestCode,
    p_status: status,
    p_internal_note: internalNote,
  });
  if (error) throw error;
  return data;
}

export async function cmsGetSettings() {
  const { data, error } = await requireSupabase().rpc('cms_get_settings', { p_token: getCmsToken() });
  if (error) throw error;
  return (data ?? []) as Array<{ key: string; value: unknown }>;
}

export async function cmsSavePublicSettings(settings: {
  registrationEnabled: boolean;
  trackingEnabled: boolean;
  adminMessageEnabled: boolean;
  contactEnabled: boolean;
}) {
  const { error } = await requireSupabase().rpc('cms_save_public_settings', {
    p_token: getCmsToken(),
    p_registration_enabled: settings.registrationEnabled,
    p_tracking_enabled: settings.trackingEnabled,
    p_admin_message_enabled: settings.adminMessageEnabled,
    p_contact_enabled: settings.contactEnabled,
  });
  if (error) throw error;
}
