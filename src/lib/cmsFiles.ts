import { getCmsToken } from './backend';
import { requireSupabase } from './supabase';

export async function getCmsRegistrationFileDownloadUrl(path: string) {
  const token = getCmsToken();
  if (!token) throw new Error('نشست مدیریت معتبر نیست. دوباره وارد پنل شو.');

  const { data, error } = await requireSupabase().functions.invoke('cms-file-download', {
    body: { token, path },
  });

  if (error) throw error;
  if (!data?.url) throw new Error('لینک دانلود فایل ساخته نشد.');

  return String(data.url);
}
