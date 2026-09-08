import { FormEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cmsChangePassword } from '../lib/cmsSecurity';

const titleStyle = { fontFamily: 'Estedad, Vazirmatn, sans-serif' };
const cardClass = 'rounded-[18px] border border-[#E7EAF2] bg-white shadow-[0_8px_22px_rgba(24,43,94,0.06)]';
const primaryButtonClass = 'inline-flex items-center justify-center rounded-[14px] bg-[#FB8C74] font-medium text-white transition hover:bg-[#f97d62]';
const fieldClass = 'h-[54px] w-full rounded-[14px] border-[1.2px] border-[#E0C89F] bg-white px-5 text-right text-[15px] text-[#182B5E] outline-none focus:border-[#364E92]';

function isSettingsRoute() {
  return window.location.hash === '#admin/settings';
}

export function AdminPasswordSettings() {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(isSettingsRoute);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const sync = () => {
      setVisible(isSettingsRoute());
      setTarget(document.querySelector<HTMLElement>('main'));
    };
    sync();
    window.addEventListener('hashchange', sync);
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener('hashchange', sync);
      observer.disconnect();
    };
  }, []);

  if (!visible || !target) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (newPassword.length < 10) {
      setError('رمز عبور جدید باید حداقل ۱۰ کاراکتر باشد.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('تکرار رمز عبور جدید با رمز واردشده یکسان نیست.');
      return;
    }

    setSaving(true);
    try {
      await cmsChangePassword(currentPassword, newPassword);
      window.alert('رمز عبور با موفقیت تغییر کرد. برای امنیت، دوباره وارد پنل شوید.');
      window.location.hash = '#admin';
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تغییر رمز عبور انجام نشد.');
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    <section className={`${cardClass} mt-8 min-h-[280px] p-6`}>
      <h2 className="text-[22px] font-extrabold text-[#182B5E]" style={titleStyle}>تغییر رمز عبور مدیر</h2>
      <p className="mt-1 text-[13px] text-[#6B7280]">برای تغییر رمز، ابتدا رمز فعلی را وارد کن. پس از تغییر رمز باید دوباره وارد پنل شوی.</p>
      <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-3">
        <label className="block text-right">
          <span className="mb-2 block text-[13px] text-[#6B7280]">رمز عبور فعلی</span>
          <input type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className={fieldClass} required />
        </label>
        <label className="block text-right">
          <span className="mb-2 block text-[13px] text-[#6B7280]">رمز عبور جدید</span>
          <input type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className={fieldClass} minLength={10} required />
        </label>
        <label className="block text-right">
          <span className="mb-2 block text-[13px] text-[#6B7280]">تکرار رمز عبور جدید</span>
          <input type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className={fieldClass} minLength={10} required />
        </label>
        <div className="sm:col-span-3 flex flex-col items-end gap-3 pt-1">
          {error && <p className="w-full text-right text-[13px] text-[#C95E4B]">{error}</p>}
          <button type="submit" disabled={saving} className={`${primaryButtonClass} h-[52px] w-full text-[15px] disabled:opacity-60 sm:w-[260px]`}>
            {saving ? 'در حال تغییر رمز…' : 'تغییر رمز عبور'}
          </button>
        </div>
      </form>
    </section>,
    target,
  );
}
