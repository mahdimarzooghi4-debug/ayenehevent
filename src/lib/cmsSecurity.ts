import { requireSupabase } from './supabase';
import { getCmsToken } from './backend';

export async function cmsChangePassword(currentPassword: string, newPassword: string) {
  const token = getCmsToken();
  if (!token) throw new Error('نشست مدیریت معتبر نیست. دوباره وارد شوید.');

  const { data, error } = await requireSupabase().rpc('cms_change_password', {
    p_token: token,
    p_current_password: currentPassword,
    p_new_password: newPassword,
  });

  if (error) throw error;
  if (data !== true) throw new Error('تغییر رمز عبور انجام نشد.');

  sessionStorage.removeItem('ayene-cms-token');
  sessionStorage.removeItem('ayene-cms-name');
  return true;
}
