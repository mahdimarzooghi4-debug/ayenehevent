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

  // Self-hosted Storage may sign URLs using the internal Docker hostname
  // (e.g. http://kong:8000), which is not resolvable in the administrator's browser.
  // Keep the signed path and query intact, but serve them from the public API origin.
  const configuredApiUrl = import.meta.env.VITE_SUPABASE_URL;
  if (!configuredApiUrl) throw new Error('آدرس API سامانه تنظیم نشده است.');
  const publicApiUrl = new URL(configuredApiUrl);
  const signedUrl = new URL(String(data.url), publicApiUrl);
  return new URL(`${signedUrl.pathname}${signedUrl.search}`, publicApiUrl).toString();
}
