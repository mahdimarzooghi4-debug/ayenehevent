import { getCmsToken } from './backend';
import { requireSupabase } from './supabase';

export type RegistrationHistoryItem = {
  id: number;
  previous_status: string | null;
  new_status: string;
  message: string | null;
  created_at: string;
};

export type ContactHistoryItem = {
  id: number;
  previous_status: string | null;
  new_status: string;
  internal_note: string | null;
  created_at: string;
};

export async function cmsGetRegistrationHistory(trackingCode: string): Promise<RegistrationHistoryItem[]> {
  const { data, error } = await requireSupabase().rpc('cms_registration_history', {
    p_token: getCmsToken(),
    p_tracking_code: trackingCode,
  });

  if (error) throw error;
  return (data ?? []) as RegistrationHistoryItem[];
}

export async function cmsGetContactHistory(requestCode: string): Promise<ContactHistoryItem[]> {
  const { data, error } = await requireSupabase().rpc('cms_contact_history', {
    p_token: getCmsToken(),
    p_request_code: requestCode,
  });

  if (error) throw error;
  return (data ?? []) as ContactHistoryItem[];
}
