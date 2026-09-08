import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import { Check, Copy, FileText, LogOut, Phone, Search, SlidersHorizontal } from 'lucide-react';
import {
  cmsGetSettings,
  cmsListContacts,
  cmsListRegistrations,
  cmsLogin,
  cmsLogout,
  cmsSavePublicSettings,
  cmsSessionValid,
  cmsUpdateContact,
  cmsUpdateRegistration,
  getCmsDisplayName,
  type CmsContactRequest,
  type CmsRegistration,
} from '../lib/backend';

const LOGO_URL = '/ayenehevent/images/ayene-logo-figma-exact.png';

type SidebarKey = 'files' | 'search' | 'contacts' | 'settings';
type RegistrationUpdate = { code: string; status: string; message: string };
type ContactUpdate = { code: string; status: string; note: string };
type SettingsState = {
  registrationEnabled: boolean;
  trackingEnabled: boolean;
  messageEnabled: boolean;
  contactEnabled: boolean;
};

const titleStyle = { fontFamily: 'Estedad, Vazirmatn, sans-serif' };
const cardClass = 'rounded-[18px] border border-[#E7EAF2] bg-white shadow-[0_8px_22px_rgba(24,43,94,0.06)]';
const outlineButtonClass = 'inline-flex items-center justify-center rounded-[14px] border-[1.2px] border-[#364E92] bg-white font-medium text-[#364E92] transition hover:bg-[#F6F8FD]';
const primaryButtonClass = 'inline-flex items-center justify-center rounded-[14px] bg-[#FB8C74] font-medium text-white transition hover:bg-[#f97d62]';
const fieldClass = 'h-[54px] w-full rounded-[14px] border-[1.2px] border-[#E0C89F] bg-white px-5 text-right text-[15px] text-[#182B5E] outline-none focus:border-[#364E92]';

function navigateAdmin(path: string) {
  window.location.hash = `#admin/${path}`;
}

function getAdminPath() {
  const hash = window.location.hash;
  if (!hash.startsWith('#admin')) return '';
  return hash.slice('#admin'.length).replace(/^\/+/, '');
}

function faDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
    }).format(new Date(value)).replace('،', ' •');
  } catch {
    return value;
  }
}

function maskPhone(phone: string) {
  const normalized = phone.replace(/\D/g, '');
  if (normalized.length < 8) return phone;
  return `${normalized.slice(0, 4)} *** ${normalized.slice(-4)}`;
}

function statusTone(status: string) {
  if (status.includes('نیاز') || status === 'در حال پیگیری') return 'bg-[#FDEDE8] text-[#C95E4B]';
  if (status === 'در حال بررسی' || status === 'در حال بررسی اولیه' || status === 'جدید' || status === 'ثبت‌شده') return 'bg-[#FFF4E6] text-[#9A6418]';
  if (status === 'تماس گرفته شد' || status === 'مرحله بعد' || status === 'تأییدشده') return 'bg-[#EEF2FF] text-[#364E92]';
  return 'bg-[#F2F5FB] text-[#364E92]';
}

function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-flex h-7 min-w-[110px] items-center justify-center rounded-full px-4 text-[12px] font-medium ${statusTone(status)}`}>{status}</span>;
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return <div className={`${cardClass} h-[110px] w-full px-6 py-4 lg:w-[300px]`}><p className="text-[14px] text-[#6B7280]">{label}</p><p className="mt-1 text-[28px] font-extrabold text-[#182B5E]" style={titleStyle}>{value}</p></div>;
}

function Sidebar({ active, onLogout }: { active: SidebarKey; onLogout: () => void }) {
  const items: Array<{ key: SidebarKey; label: string; icon: ReactNode; path: string }> = [
    { key: 'files', label: 'پرونده‌ها', icon: <FileText size={18} strokeWidth={1.8} />, path: 'files' },
    { key: 'search', label: 'جست‌وجو و پیگیری', icon: <Search size={18} strokeWidth={1.8} />, path: 'search' },
    { key: 'contacts', label: 'درخواست‌های تماس', icon: <Phone size={18} strokeWidth={1.8} />, path: 'contacts' },
    { key: 'settings', label: 'تنظیمات', icon: <SlidersHorizontal size={18} strokeWidth={1.8} />, path: 'settings' },
  ];
  return <aside className="w-full shrink-0 bg-[#FAF9F7] lg:min-h-[960px] lg:w-[260px]"><div className="mx-auto flex w-full max-w-[260px] flex-col px-6 pb-6 pt-[18px] lg:px-6"><div className="mx-auto flex h-[70px] w-[210px] items-center justify-center"><img src={LOGO_URL} alt="رویداد آینه" className="h-full w-full object-contain" /></div><p className="mt-[19px] text-center text-[13px] text-[#182B5E]">پنل مدیریت رویداد</p><nav className="mt-[19px] space-y-[14px]">{items.map((item) => <button key={item.key} type="button" onClick={() => navigateAdmin(item.path)} className={`flex h-11 w-full items-center gap-4 rounded-[12px] px-4 text-right text-[15px] font-medium transition ${active === item.key ? 'bg-[#FDF1EC] text-[#FB8C74]' : 'text-[#364E92] hover:bg-[#F6F8FD]'}`}><span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">{item.icon}</span><span>{item.label}</span></button>)}</nav><div className="mt-10 h-px w-full bg-[#E0C89F]/80" /><p className="mt-4 px-4 text-[12px] text-[#6B7280]">{getCmsDisplayName()}</p><button type="button" onClick={onLogout} className="mt-1 flex h-11 items-center gap-4 rounded-[12px] px-4 text-[14px] text-[#C95E4B] transition hover:bg-[#FDF1EC]"><LogOut size={18} strokeWidth={1.8} /><span>خروج از پنل</span></button></div></aside>;
}

function AdminShell({ active, onLogout, children }: { active: SidebarKey; onLogout: () => void; children: ReactNode }) {
  return <div dir="rtl" className="min-h-screen bg-[#F7F8FB] text-[#182B5E]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}><div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col lg:flex-row"><Sidebar active={active} onLogout={onLogout} /><main className="min-w-0 flex-1 px-5 pb-14 pt-7 sm:px-8 lg:min-h-[960px] lg:w-[1180px] lg:flex-none lg:pl-[80px] lg:pr-[90px] lg:pt-[30px]">{children}</main></div></div>;
}

function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="text-right"><h1 className="text-[30px] font-extrabold leading-[46px] text-[#182B5E]" style={titleStyle}>{title}</h1><p className="mt-1 text-[14px] leading-[30px] text-[#6B7280]">{subtitle}</p></div>;
}

function LoginPage({ onLogin }: { onLogin: (username: string, password: string) => Promise<void> }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setError('');
    try { await onLogin(username, password); } catch (err) { setError(err instanceof Error ? err.message : 'ورود انجام نشد.'); } finally { setLoading(false); }
  };
  return <div dir="ltr" className="min-h-screen bg-[#F7F8FB]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}><div className="mx-auto flex min-h-screen w-full max-w-[1440px] items-stretch lg:min-h-[960px]"><section dir="rtl" className="hidden w-[560px] shrink-0 bg-[#FAF9F7] lg:block"><div className="flex h-full flex-col items-center"><div className="mt-16 flex h-[130px] w-[390px] items-center justify-center"><img src={LOGO_URL} alt="رویداد آینه" className="h-full w-full object-contain" /></div><h1 className="mt-[239px] w-[390px] text-center text-[34px] font-extrabold text-[#182B5E]" style={titleStyle}>پنل مدیریت رویداد آینه</h1></div></section><section dir="rtl" className="flex flex-1 items-center justify-center px-5 py-10 lg:items-start lg:pt-[150px]"><form onSubmit={handleSubmit} className={`${cardClass} min-h-[560px] w-full max-w-[560px] px-7 py-12 sm:px-[60px] lg:h-[640px]`}><h2 className="text-right text-[30px] font-extrabold text-[#182B5E]" style={titleStyle}>ورود به پنل مدیریت</h2><p className="mt-1 text-right text-[15px] text-[#6B7280]">اطلاعات حساب مدیر را وارد کن.</p><label className="mt-8 block text-right"><span className="mb-2 block text-[14px] font-medium text-[#182B5E]">نام کاربری</span><input className={fieldClass} value={username} onChange={(e) => setUsername(e.target.value)} type="text" autoComplete="username" required /></label><label className="mt-6 block text-right"><span className="mb-2 block text-[14px] font-medium text-[#182B5E]">رمز عبور</span><input className={fieldClass} value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" required /></label>{error && <p className="mt-4 text-right text-[13px] text-[#C95E4B]">{error}</p>}<button disabled={loading} type="submit" className={`${primaryButtonClass} mt-10 h-14 w-full text-[15px] disabled:opacity-60`}>{loading ? 'در حال ورود…' : 'ورود به پنل'}</button><p className="mt-5 text-center text-[13px] leading-7 text-[#6B7280]">دسترسی این بخش فقط برای مدیران مجاز سامانه است.</p></form></section></div></div>;
}

function InfoPair({ label, value, ltr = false }: { label: string; value: string; ltr?: boolean }) {
  return <div><p className="text-[12px] text-[#6B7280]">{label}</p><p className="mt-1 text-[14px] font-medium text-[#182B5E]" dir={ltr ? 'ltr' : undefined} style={ltr ? { unicodeBidi: 'isolate', textAlign: 'right' } : undefined}>{value}</p></div>;
}

function RegistrationList({ items }: { items: CmsRegistration[] }) {
  const [query, setQuery] = useState(''); const [status, setStatus] = useState('همه وضعیت‌ها');
  const filtered = useMemo(() => items.filter((item) => (!query || item.full_name.includes(query) || item.tracking_code.toLowerCase().includes(query.toLowerCase()) || item.phone.includes(query)) && (status === 'همه وضعیت‌ها' || item.status === status)), [items, query, status]);
  const reviewCount = items.filter((item) => item.status.includes('بررسی') || item.status.includes('نیاز')).length;
  const today = new Date().toDateString(); const updatedToday = items.filter((item) => new Date(item.updated_at).toDateString() === today).length;
  return <><PageHeading title="پرونده‌های ثبت‌نام" subtitle="مشاهده، جست‌وجو و بررسی فایل‌های دریافت‌شده" /><div className="mt-[30px] grid gap-[30px] sm:grid-cols-3 lg:ml-auto lg:w-[960px]"><MetricCard label="کل پرونده‌ها" value={faDigits(items.length)} /><MetricCard label="نیازمند بررسی" value={faDigits(reviewCount)} /><MetricCard label="به‌روزشده امروز" value={faDigits(updatedToday)} /></div><div className="mt-[30px] flex min-h-[66px] flex-col gap-3 rounded-[16px] border border-[#E7EAF2] bg-white p-3 sm:flex-row sm:items-center"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جست‌وجو با نام یا کد پیگیری" className="h-[42px] flex-1 rounded-[12px] bg-[#F2F5FC] px-5 text-right text-[13px] text-[#334061] outline-none" /><select value={status} onChange={(e) => setStatus(e.target.value)} className="h-[42px] rounded-[12px] border border-[#E0C89F] bg-white px-4 text-[13px] font-medium text-[#182B5E] outline-none sm:w-[190px]"><option>همه وضعیت‌ها</option><option>ثبت‌شده</option><option>در حال بررسی اولیه</option><option>نیازمند تکمیل اطلاعات</option><option>مرحله بعد</option><option>تأییدشده</option></select><button type="button" className={`${outlineButtonClass} h-[42px] text-[15px] sm:w-[150px]`}>جست‌وجو</button></div><div className={`${cardClass} mt-7 overflow-x-auto p-4 sm:p-6`}><div className="min-w-[760px]"><div className="grid grid-cols-[1.25fr_1.15fr_1fr_.8fr_.9fr] border-b border-[#E7EAF2] pb-3 text-[13px] font-medium text-[#6B7280]"><span>نام و نام خانوادگی</span><span>کد پیگیری</span><span>محور</span><span>فایل</span><span className="text-center">وضعیت</span></div>{filtered.map((item, index) => <button type="button" key={item.id} onClick={() => navigateAdmin(`file/${encodeURIComponent(item.tracking_code)}`)} className={`grid min-h-[78px] w-full grid-cols-[1.25fr_1.15fr_1fr_.8fr_.9fr] items-center border-b border-[#E7EAF2] text-right text-[14px] transition hover:bg-[#F8F9FD] ${index % 2 ? 'bg-[#FAFBFD]' : 'bg-white'}`}><span className="font-medium text-[#334061]">{item.full_name}</span><span className="font-medium text-[#182B5E]" dir="ltr">{item.tracking_code}</span><span>{item.axis}</span><span className="font-medium text-[#364E92]">{item.file_path ? 'مشاهده فایل' : 'بدون فایل'}</span><span className="text-center"><StatusBadge status={item.status} /></span></button>)}<p className="pt-3 text-[12px] text-[#6B7280]">برای مشاهده جزئیات، یک پرونده را انتخاب کن.</p></div></div></>;
}

function showFormInfo(data: Record<string, unknown>) {
  const text = Object.entries(data).map(([key, value]) => `${key}: ${String(value ?? '')}`).join('\n');
  window.alert(text || 'اطلاعات تکمیلی ثبت نشده است.');
}

function RegistrationDetail({ item, onSubmit }: { item: CmsRegistration; onSubmit: (update: RegistrationUpdate) => Promise<void> }) {
  const draftKey = `ayene-admin-draft:file:${item.tracking_code}`;
  const saved = (() => { try { return JSON.parse(localStorage.getItem(draftKey) || '{}') as { status?: string; message?: string }; } catch { return {}; } })();
  const [nextStatus, setNextStatus] = useState(saved.status || item.status || 'در حال بررسی اولیه');
  const [message, setMessage] = useState(saved.message ?? item.admin_message ?? '');
  const [saving, setSaving] = useState(false);
  const saveDraft = () => { localStorage.setItem(draftKey, JSON.stringify({ status: nextStatus, message })); window.alert('پیش‌نویس ذخیره شد'); };
  const submit = async () => { setSaving(true); try { await onSubmit({ code: item.tracking_code, status: nextStatus, message }); localStorage.removeItem(draftKey); } finally { setSaving(false); } };
  const fileName = item.file_path?.split('/').pop() || 'فایلی ارسال نشده';
  return <><div className="flex items-start justify-between gap-5"><PageHeading title="جزئیات پرونده" subtitle="اطلاعات متقاضی، فایل ارسالی و وضعیت قابل نمایش" /><button type="button" onClick={() => navigateAdmin('files')} className={`${outlineButtonClass} mt-2 h-[42px] w-[150px] text-[15px]`}>بازگشت</button></div><section className={`${cardClass} mt-[28px] p-6`}><h2 className="text-[20px] font-extrabold" style={titleStyle}>اطلاعات پرونده</h2><div className="mt-5 grid gap-x-12 gap-y-5 sm:grid-cols-3"><InfoPair label="نام متقاضی" value={item.full_name} /><InfoPair label="کد پیگیری" value={item.tracking_code} ltr /><InfoPair label="شماره تماس" value={item.phone} ltr /><InfoPair label="مسیر ورود" value={item.route} /><InfoPair label="محور / مسئله" value={`${item.axis} • ${item.issue}`} /><InfoPair label="زمان ثبت" value={formatDate(item.created_at)} /></div></section><div className="mt-7 grid gap-[30px] lg:grid-cols-2"><div className="space-y-7"><section className={`${cardClass} min-h-[220px] p-6`}><h2 className="text-[20px] font-extrabold" style={titleStyle}>فایل دریافتی</h2><div className="mt-5 rounded-[14px] bg-[#F2F5FC] px-5 py-4"><p className="text-[14px] font-medium" dir="ltr">{fileName}</p><p className="mt-1 text-[12px] text-[#6B7280]">بارگذاری {formatDate(item.created_at)}</p></div><div className="mt-3 grid grid-cols-2 gap-3"><button type="button" onClick={() => window.alert(item.file_path ? 'دانلود امن فایل در مرحله اتصال Storage ادمین فعال می‌شود.' : 'فایلی برای این پرونده وجود ندارد.')} className={`${outlineButtonClass} h-[42px] text-[14px]`}>دانلود فایل</button><button type="button" onClick={() => showFormInfo(item.form_data || {})} className={`${outlineButtonClass} h-[42px] text-[14px]`}>مشاهده اطلاعات فرم</button></div></section><section className={`${cardClass} min-h-[168px] p-6`}><h2 className="text-[18px] font-extrabold" style={titleStyle}>آخرین تغییرات</h2><p className="mt-4 text-[13px] text-[#334061]">{formatDate(item.updated_at)} &nbsp; • &nbsp; {item.status}</p><p className="mt-3 text-[13px] leading-7 text-[#6B7280]">{item.admin_message}</p></section></div><section className={`${cardClass} min-h-[416px] p-6`}><h2 className="text-[20px] font-extrabold" style={titleStyle}>وضعیت پرونده</h2><label className="mt-5 block"><span className="mb-2 block text-[13px] text-[#6B7280]">وضعیت فعلی</span><div className={`${fieldClass} flex items-center`}>{item.status}</div></label><label className="mt-4 block"><span className="mb-2 block text-[13px] text-[#6B7280]">وضعیت جدید</span><select value={nextStatus} onChange={(e) => setNextStatus(e.target.value)} className={fieldClass}><option>ثبت‌شده</option><option>در حال بررسی اولیه</option><option>نیازمند تکمیل اطلاعات</option><option>مرحله بعد</option><option>تأییدشده</option></select></label><label className="mt-4 block"><span className="mb-2 block text-[13px] text-[#6B7280]">پیام برای متقاضی</span><textarea value={message} onChange={(e) => setMessage(e.target.value)} className="h-[70px] w-full resize-none rounded-[14px] border-[1.2px] border-[#E0C89F] bg-white px-4 py-3 text-[13px] leading-6 text-[#334061] outline-none focus:border-[#364E92]" /></label><div className="mt-4 grid grid-cols-2 gap-4"><button type="button" onClick={saveDraft} className={`${outlineButtonClass} h-[50px] text-[15px]`}>ذخیره پیش‌نویس</button><button disabled={saving} type="button" onClick={submit} className={`${primaryButtonClass} h-[50px] text-[15px] disabled:opacity-60`}>{saving ? 'در حال ثبت…' : 'ثبت و اطلاع‌رسانی'}</button></div></section></div></>;
}

function SuccessPanel({ title, body, codeLabel, code, statusLabel, status, message, primaryText, primaryPath, secondaryText, secondaryPath }: { title: string; body: string; codeLabel: string; code: string; statusLabel: string; status: string; message: string; primaryText: string; primaryPath: string; secondaryText: string; secondaryPath: string }) {
  return <div className={`${cardClass} mx-auto mt-14 flex min-h-[650px] w-full max-w-[820px] flex-col items-center px-7 py-14 text-center`}><div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EAF7EF] text-[#2E7D4A]"><Check size={54} strokeWidth={2.2} /></div><h2 className="mt-6 text-[28px] font-extrabold" style={titleStyle}>{title}</h2><p className="mt-3 max-w-[580px] text-[15px] leading-7 text-[#6B7280]">{body}</p><div className="mt-7 w-full max-w-[540px] rounded-[16px] border border-[#E0C89F] bg-[#F2F5FC] px-6 py-3"><p className="text-[12px] text-[#6B7280]">{codeLabel}</p><p className="mt-1 text-[16px] font-medium" dir="ltr">{code}</p></div><div className="mt-5 w-full max-w-[540px] rounded-[16px] border-[1.2px] border-[#364E92] bg-white px-6 py-3"><p className="text-[12px] text-[#6B7280]">{statusLabel}</p><p className="mt-1 text-[16px] font-medium">{status}</p><p className="mt-2 text-[13px] leading-6 text-[#6B7280]">{message}</p></div><div className="mt-8 flex w-full max-w-[540px] flex-col-reverse gap-4 sm:flex-row"><button type="button" onClick={() => navigateAdmin(secondaryPath)} className={`${outlineButtonClass} h-[50px] flex-1 text-[15px]`}>{secondaryText}</button><button type="button" onClick={() => navigateAdmin(primaryPath)} className={`${primaryButtonClass} h-[50px] flex-1 text-[15px]`}>{primaryText}</button></div></div>;
}

function SearchPage({ items }: { items: CmsRegistration[] }) {
  const [query, setQuery] = useState(''); const [submittedQuery, setSubmittedQuery] = useState('');
  const result = useMemo(() => { const q = submittedQuery.trim().toLowerCase(); if (!q) return undefined; return items.find((item) => item.tracking_code.toLowerCase().includes(q) || item.full_name.includes(submittedQuery.trim()) || item.phone.includes(submittedQuery.trim())); }, [items, submittedQuery]);
  return <><PageHeading title="جست‌وجو و پیگیری" subtitle="پیدا کردن پرونده با نام، شماره تماس یا کد پیگیری" /><section className={`${cardClass} mt-[28px] min-h-[132px] p-5`}><p className="text-[15px] font-medium">جست‌وجوی پرونده</p><div className="mt-4 flex flex-col gap-3 sm:flex-row"><input value={query} onChange={(e) => setQuery(e.target.value)} className="h-12 flex-1 rounded-[12px] bg-[#F2F5FC] px-5 text-[14px] outline-none" /><button type="button" onClick={() => setSubmittedQuery(query)} className="h-12 rounded-[14px] bg-[#364E92] px-8 text-[15px] font-medium text-white sm:w-[220px]">جست‌وجو</button></div></section><section className={`${cardClass} mt-7 min-h-[526px] p-6`}><div className="flex items-center justify-between gap-4"><h2 className="text-[24px] font-extrabold" style={titleStyle}>نتیجه جست‌وجو</h2><span className="text-[13px] text-[#6B7280]">{result ? '۱ پرونده پیدا شد' : 'پرونده‌ای پیدا نشد'}</span></div>{result ? <><div className="mt-6 grid gap-5 sm:grid-cols-3"><div className="rounded-[14px] bg-[#F2F5FC] p-4"><InfoPair label="نام و نام خانوادگی" value={result.full_name} /></div><div className="rounded-[14px] bg-[#F2F5FC] p-4"><InfoPair label="کد پیگیری" value={result.tracking_code} ltr /></div><div className="rounded-[14px] bg-[#FFF4E6] p-4"><InfoPair label="وضعیت پرونده" value={result.status} /></div></div><div className="mt-7 grid gap-x-12 gap-y-6 sm:grid-cols-2"><InfoPair label="شماره تماس" value={result.phone} ltr /><InfoPair label="محور و مسئله" value={`${result.axis} • ${result.issue}`} /><InfoPair label="آخرین به‌روزرسانی" value={formatDate(result.updated_at)} /><InfoPair label="پیام وضعیت" value={result.admin_message} /></div><button type="button" onClick={() => navigateAdmin(`file/${encodeURIComponent(result.tracking_code)}`)} className={`${primaryButtonClass} mt-10 h-[50px] px-10 text-[15px]`}>مشاهده جزئیات پرونده</button></> : <div className="flex min-h-[390px] items-center justify-center text-[14px] text-[#6B7280]">برای جست‌وجو نام، شماره تماس یا کد پیگیری را وارد کن.</div>}</section></>;
}

function ContactList({ items }: { items: CmsContactRequest[] }) {
  const [query, setQuery] = useState(''); const [status, setStatus] = useState('همه وضعیت‌ها');
  const filtered = useMemo(() => items.filter((item) => (!query || item.full_name.includes(query) || item.request_code.includes(query) || item.phone.includes(query)) && (status === 'همه وضعیت‌ها' || item.status === status)), [items, query, status]);
  const pending = items.filter((item) => item.status === 'جدید' || item.status === 'در حال پیگیری').length;
  const today = new Date().toDateString(); const todayCount = items.filter((item) => new Date(item.updated_at).toDateString() === today).length;
  return <><PageHeading title="درخواست‌های تماس" subtitle="مشاهده، جست‌وجو و پیگیری درخواست‌های تماس دبیرخانه" /><div className="mt-[30px] grid gap-[30px] sm:grid-cols-3 lg:ml-auto lg:w-[960px]"><MetricCard label="کل درخواست‌ها" value={faDigits(items.length)} /><MetricCard label="نیازمند پیگیری" value={faDigits(pending)} /><MetricCard label="به‌روزشده امروز" value={faDigits(todayCount)} /></div><div className="mt-[30px] flex min-h-[66px] flex-col gap-3 rounded-[16px] border border-[#E7EAF2] bg-white p-3 sm:flex-row sm:items-center"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="جست‌وجو با نام یا کد درخواست" className="h-[42px] flex-1 rounded-[12px] bg-[#F2F5FC] px-5 text-[13px] outline-none" /><select value={status} onChange={(e) => setStatus(e.target.value)} className="h-[42px] rounded-[12px] border border-[#E0C89F] bg-white px-4 text-[13px] font-medium outline-none sm:w-[190px]"><option>همه وضعیت‌ها</option><option>جدید</option><option>در حال پیگیری</option><option>تماس گرفته شد</option><option>بسته شد</option></select><button type="button" className={`${outlineButtonClass} h-[42px] text-[15px] sm:w-[150px]`}>جست‌وجو</button></div><div className={`${cardClass} mt-7 overflow-x-auto p-4 sm:p-6`}><div className="min-w-[760px]"><div className="grid grid-cols-[1.2fr_1.1fr_.9fr_1fr_.9fr] border-b border-[#E7EAF2] pb-3 text-[13px] font-medium text-[#6B7280]"><span>نام و نام خانوادگی</span><span>کد درخواست</span><span>موضوع</span><span>شماره تماس</span><span className="text-center">وضعیت</span></div>{filtered.map((item, index) => <button key={item.id} type="button" onClick={() => navigateAdmin(`contact/${encodeURIComponent(item.request_code)}`)} className={`grid min-h-[78px] w-full grid-cols-[1.2fr_1.1fr_.9fr_1fr_.9fr] items-center border-b border-[#E7EAF2] text-right text-[14px] transition hover:bg-[#F8F9FD] ${index % 2 ? 'bg-[#FAFBFD]' : 'bg-white'}`}><span className="font-medium text-[#334061]">{item.full_name}</span><span>{item.request_code}</span><span>{item.subject}</span><span dir="ltr" className="text-right text-[#364E92]" style={{ unicodeBidi: 'isolate' }}>{maskPhone(item.phone)}</span><span className="text-center"><StatusBadge status={item.status} /></span></button>)}</div></div></>;
}

function ContactDetail({ item, onSubmit }: { item: CmsContactRequest; onSubmit: (update: ContactUpdate) => Promise<void> }) {
  const draftKey = `ayene-admin-draft:contact:${item.request_code}`;
  const saved = (() => { try { return JSON.parse(localStorage.getItem(draftKey) || '{}') as { status?: string; note?: string }; } catch { return {}; } })();
  const [nextStatus, setNextStatus] = useState(saved.status || item.status || 'در حال پیگیری'); const [note, setNote] = useState(saved.note ?? item.internal_note ?? ''); const [saving, setSaving] = useState(false);
  const saveDraft = () => { localStorage.setItem(draftKey, JSON.stringify({ status: nextStatus, note })); window.alert('پیش‌نویس ذخیره شد'); };
  const submit = async () => { setSaving(true); try { await onSubmit({ code: item.request_code, status: nextStatus, note }); localStorage.removeItem(draftKey); } finally { setSaving(false); } };
  return <><div className="flex items-start justify-between gap-5"><PageHeading title="جزئیات درخواست تماس" subtitle="اطلاعات درخواست‌دهنده، موضوع تماس و وضعیت پیگیری" /><button type="button" onClick={() => navigateAdmin('contacts')} className={`${outlineButtonClass} mt-2 h-[42px] w-[150px] text-[15px]`}>بازگشت</button></div><section className={`${cardClass} mt-[28px] p-6`}><h2 className="text-[20px] font-extrabold" style={titleStyle}>اطلاعات درخواست</h2><div className="mt-5 grid gap-x-12 gap-y-5 sm:grid-cols-3"><InfoPair label="نام درخواست‌دهنده" value={item.full_name} /><InfoPair label="کد درخواست" value={item.request_code} /><InfoPair label="شماره تماس" value={item.phone} ltr /><InfoPair label="استان و شهر" value={`${item.province}، ${item.city}`} /><InfoPair label="موضوع تماس" value={item.subject} /><InfoPair label="زمان مناسب تماس" value={item.preferred_time} /></div></section><div className="mt-7 grid gap-[30px] lg:grid-cols-2"><div className="space-y-7"><section className={`${cardClass} min-h-[220px] p-6`}><h2 className="text-[20px] font-extrabold" style={titleStyle}>توضیح درخواست</h2><div className="mt-5 rounded-[14px] bg-[#F2F5FC] px-5 py-4"><p className="text-[14px] font-medium leading-7">{item.note || 'بدون توضیح'}</p><p className="mt-1 text-[12px] text-[#6B7280]">ثبت‌شده در {formatDate(item.created_at)}</p></div><div className="mt-3 grid grid-cols-2 gap-3"><button type="button" onClick={() => navigator.clipboard?.writeText(item.phone)} className={`${outlineButtonClass} h-[42px] gap-2 text-[14px]`}><Copy size={15} />کپی شماره تماس</button><button type="button" onClick={() => showFormInfo({ name: item.full_name, phone: item.phone, province: item.province, city: item.city, preferredTime: item.preferred_time, subject: item.subject, note: item.note })} className={`${outlineButtonClass} h-[42px] text-[14px]`}>مشاهده اطلاعات فرم</button></div></section><section className={`${cardClass} min-h-[168px] p-6`}><h2 className="text-[18px] font-extrabold" style={titleStyle}>یادداشت داخلی</h2><p className="mt-4 text-[13px] text-[#334061]">{formatDate(item.updated_at)} &nbsp; • &nbsp; {item.status}</p><p className="mt-3 text-[13px] leading-7 text-[#6B7280]">{item.internal_note || 'یادداشتی ثبت نشده است.'}</p></section></div><section className={`${cardClass} min-h-[416px] p-6`}><h2 className="text-[20px] font-extrabold" style={titleStyle}>وضعیت پیگیری</h2><label className="mt-5 block"><span className="mb-2 block text-[13px] text-[#6B7280]">وضعیت فعلی</span><div className={`${fieldClass} flex items-center`}>{item.status}</div></label><label className="mt-4 block"><span className="mb-2 block text-[13px] text-[#6B7280]">وضعیت جدید</span><select value={nextStatus} onChange={(e) => setNextStatus(e.target.value)} className={fieldClass}><option>جدید</option><option>در حال پیگیری</option><option>تماس گرفته شد</option><option>بسته شد</option></select></label><label className="mt-4 block"><span className="mb-2 block text-[13px] text-[#6B7280]">یادداشت داخلی</span><textarea value={note} onChange={(e) => setNote(e.target.value)} className="h-[70px] w-full resize-none rounded-[14px] border-[1.2px] border-[#E0C89F] px-4 py-3 text-[13px] leading-6 text-[#334061] outline-none focus:border-[#364E92]" /></label><div className="mt-4 grid grid-cols-2 gap-4"><button type="button" onClick={saveDraft} className={`${outlineButtonClass} h-[50px] text-[15px]`}>ذخیره پیش‌نویس</button><button disabled={saving} type="button" onClick={submit} className={`${primaryButtonClass} h-[50px] text-[15px] disabled:opacity-60`}>{saving ? 'در حال ثبت…' : 'ثبت نتیجه پیگیری'}</button></div></section></div></>;
}

function SettingsPage({ initial, onSave }: { initial: SettingsState; onSave: (settings: SettingsState) => Promise<void> }) {
  const [registrationEnabled, setRegistrationEnabled] = useState(initial.registrationEnabled); const [trackingEnabled, setTrackingEnabled] = useState(initial.trackingEnabled); const [messageEnabled, setMessageEnabled] = useState(initial.messageEnabled); const [contactEnabled, setContactEnabled] = useState(initial.contactEnabled); const [saving, setSaving] = useState(false);
  useEffect(() => { setRegistrationEnabled(initial.registrationEnabled); setTrackingEnabled(initial.trackingEnabled); setMessageEnabled(initial.messageEnabled); setContactEnabled(initial.contactEnabled); }, [initial]);
  const Toggle = ({ enabled, onClick }: { enabled: boolean; onClick: () => void }) => <button type="button" onClick={onClick} className={`inline-flex h-9 min-w-[130px] items-center justify-center rounded-full px-5 text-[14px] font-medium ${enabled ? 'bg-[#EAF6F0] text-[#2F7D5C]' : 'bg-[#F2F5FB] text-[#616B80]'}`}>{enabled ? 'فعال' : 'غیرفعال'}</button>;
  const save = async () => { setSaving(true); try { await onSave({ registrationEnabled, trackingEnabled, messageEnabled, contactEnabled }); window.alert('تغییرات ذخیره شد'); } finally { setSaving(false); } };
  return <><PageHeading title="تنظیمات" subtitle="تنظیمات فرم ثبت‌نام، پیگیری و آمار نمایش‌داده‌شده در سایت" /><div className="mt-7 grid gap-10 lg:grid-cols-[520px_450px]"><section className={`${cardClass} min-h-[304px] p-6`}><h2 className="text-[22px] font-extrabold" style={titleStyle}>تنظیمات فرم ثبت‌نام</h2><p className="mt-1 text-[13px] text-[#6B7280]">کنترل وضعیت فرم و محدودیت فایل تکمیلی</p><div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-y-4 text-[13px] text-[#6B7280]"><span>وضعیت فرم</span><Toggle enabled={registrationEnabled} onClick={() => setRegistrationEnabled((v) => !v)} /><span>حداکثر حجم فایل</span><span className="rounded-[12px] bg-[#F2F5FC] px-5 py-3 font-medium text-[#334061]">۱۰ مگابایت</span><span>فرمت فایل تکمیلی</span><span className="rounded-[12px] bg-[#F2F5FC] px-5 py-3 font-medium text-[#334061]">RTF / DOC / DOCX / PDF</span></div></section><section className={`${cardClass} min-h-[304px] p-6`}><h2 className="text-[22px] font-extrabold" style={titleStyle}>آمار هیرو</h2><p className="mt-1 text-[13px] text-[#6B7280]">آمار فعلی صفحه اصلی</p><div className="mt-6 grid grid-cols-2 gap-4">{[['۱۲۰۰+','ثبت‌نام‌شده'],['۳۵۰+','ایده و راهکار'],['۳۱','استان'],['۵','محور']].map(([value,label]) => <div key={label} className="rounded-[12px] bg-[#F2F5FC] p-3 text-center"><p className="text-[20px] font-medium">{value}</p><p className="text-[12px] text-[#6B7280]">{label}</p></div>)}</div></section></div><section className={`${cardClass} mt-8 min-h-[250px] p-6`}><h2 className="text-[22px] font-extrabold" style={titleStyle}>تنظیمات پیگیری پرونده</h2><p className="mt-1 text-[13px] text-[#6B7280]">کنترل تجربه کاربر در صفحه پیگیری وضعیت</p><div className="mt-6 grid gap-x-12 gap-y-4 sm:grid-cols-2"><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">صفحه پیگیری</span><Toggle enabled={trackingEnabled} onClick={() => setTrackingEnabled((v) => !v)} /></div><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">ورودی اصلی</span><span className="rounded-[12px] bg-[#F2F5FC] px-5 py-3 text-[14px] font-medium">کد پیگیری</span></div><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">نمایش پیام مدیر</span><Toggle enabled={messageEnabled} onClick={() => setMessageEnabled((v) => !v)} /></div></div></section><section className={`${cardClass} mt-4 min-h-[116px] p-6`}><h2 className="text-[22px] font-extrabold" style={titleStyle}>فرم تماس با دبیرخانه</h2><p className="mt-1 text-[13px] text-[#6B7280]">مدیریت فعال بودن فرم و تولید کد درخواست</p><div className="mt-4 grid gap-5 sm:grid-cols-2"><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">وضعیت فرم تماس</span><Toggle enabled={contactEnabled} onClick={() => setContactEnabled((v) => !v)} /></div><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">کد درخواست</span><span className="rounded-[12px] bg-[#F2F5FC] px-5 py-3 text-[14px] font-medium">خودکار • تماس-####</span></div></div></section><div className="mt-4 flex justify-end"><button disabled={saving} onClick={save} type="button" className={`${primaryButtonClass} h-[52px] w-[260px] text-[15px] disabled:opacity-60`}>{saving ? 'در حال ذخیره…' : 'ذخیره تغییرات'}</button></div></>;
}

function LoadingPage() {
  return <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#F7F8FB] text-[15px] text-[#364E92]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>در حال دریافت اطلاعات پنل…</div>;
}

export function AdminPage() {
  const [path, setPath] = useState(getAdminPath); const [authenticated, setAuthenticated] = useState(false); const [checking, setChecking] = useState(true); const [loadingData, setLoadingData] = useState(false); const [registrations, setRegistrations] = useState<CmsRegistration[]>([]); const [contacts, setContacts] = useState<CmsContactRequest[]>([]); const [settings, setSettings] = useState<SettingsState>({ registrationEnabled: true, trackingEnabled: true, messageEnabled: true, contactEnabled: true }); const [registrationUpdate, setRegistrationUpdate] = useState<RegistrationUpdate>({ code: '', status: '', message: '' }); const [contactUpdate, setContactUpdate] = useState<ContactUpdate>({ code: '', status: '', note: '' });

  const loadData = async () => {
    setLoadingData(true);
    try {
      const [registrationRows, contactRows, settingRows] = await Promise.all([cmsListRegistrations(), cmsListContacts(), cmsGetSettings()]);
      setRegistrations(registrationRows); setContacts(contactRows);
      const map = new Map(settingRows.map((row) => [row.key, row.value]));
      setSettings({ registrationEnabled: map.get('public.registration_enabled') !== false, trackingEnabled: map.get('public.tracking_enabled') !== false, messageEnabled: map.get('public.admin_message_enabled') !== false, contactEnabled: map.get('public.contact_enabled') !== false });
    } finally { setLoadingData(false); }
  };

  useEffect(() => {
    const boot = async () => { const valid = await cmsSessionValid(); setAuthenticated(valid); setChecking(false); if (valid) { if (!getAdminPath()) navigateAdmin('files'); await loadData(); } };
    void boot();
  }, []);

  useEffect(() => { const handleHash = () => { setPath(getAdminPath()); window.scrollTo({ top: 0, behavior: 'auto' }); }; window.addEventListener('hashchange', handleHash); return () => window.removeEventListener('hashchange', handleHash); }, []);

  const login = async (username: string, password: string) => { await cmsLogin(username, password); setAuthenticated(true); navigateAdmin('files'); await loadData(); };
  const logout = async () => { await cmsLogout(); setAuthenticated(false); setRegistrations([]); setContacts([]); window.location.hash = '#admin'; };
  if (checking) return <LoadingPage />;
  if (!authenticated || !path) return <LoginPage onLogin={login} />;
  if (loadingData && registrations.length === 0 && contacts.length === 0) return <LoadingPage />;

  if (path === 'files') return <AdminShell active="files" onLogout={() => void logout()}><RegistrationList items={registrations} /></AdminShell>;
  if (path.startsWith('file/')) {
    const code = decodeURIComponent(path.slice('file/'.length)); const item = registrations.find((entry) => entry.tracking_code === code);
    if (!item) return <AdminShell active="files" onLogout={() => void logout()}><PageHeading title="پرونده پیدا نشد" subtitle="این کد در دیتابیس موجود نیست" /></AdminShell>;
    return <AdminShell active="files" onLogout={() => void logout()}><RegistrationDetail key={`${item.id}-${item.updated_at}`} item={item} onSubmit={async (update) => { await cmsUpdateRegistration(update.code, update.status, update.message); setRegistrationUpdate(update); await loadData(); navigateAdmin('file-success'); }} /></AdminShell>;
  }
  if (path === 'file-success') return <AdminShell active="files" onLogout={() => void logout()}><PageHeading title="وضعیت پرونده به‌روزرسانی شد" subtitle="پیام جدید در صفحه پیگیری متقاضی قابل مشاهده است" /><SuccessPanel title="وضعیت با موفقیت ثبت شد" body="متقاضی با کد پیگیری زیر، آخرین وضعیت و پیام ثبت‌شده را در بخش پیگیری مشاهده می‌کند." codeLabel="کد پیگیری" code={registrationUpdate.code} statusLabel="وضعیت نمایش‌داده‌شده" status={registrationUpdate.status} message={registrationUpdate.message} primaryText="بازگشت به پرونده" primaryPath={`file/${encodeURIComponent(registrationUpdate.code)}`} secondaryText="فهرست پرونده‌ها" secondaryPath="files" /></AdminShell>;
  if (path === 'search') return <AdminShell active="search" onLogout={() => void logout()}><SearchPage items={registrations} /></AdminShell>;
  if (path === 'contacts') return <AdminShell active="contacts" onLogout={() => void logout()}><ContactList items={contacts} /></AdminShell>;
  if (path.startsWith('contact/')) {
    const code = decodeURIComponent(path.slice('contact/'.length)); const item = contacts.find((entry) => entry.request_code === code);
    if (!item) return <AdminShell active="contacts" onLogout={() => void logout()}><PageHeading title="درخواست پیدا نشد" subtitle="این کد در دیتابیس موجود نیست" /></AdminShell>;
    return <AdminShell active="contacts" onLogout={() => void logout()}><ContactDetail key={`${item.id}-${item.updated_at}`} item={item} onSubmit={async (update) => { await cmsUpdateContact(update.code, update.status, update.note); setContactUpdate(update); await loadData(); navigateAdmin('contact-success'); }} /></AdminShell>;
  }
  if (path === 'contact-success') return <AdminShell active="contacts" onLogout={() => void logout()}><PageHeading title="نتیجه پیگیری تماس ثبت شد" subtitle="آخرین وضعیت درخواست تماس در پنل ذخیره شد" /><SuccessPanel title="نتیجه پیگیری با موفقیت ثبت شد" body="درخواست تماس با کد زیر اکنون با آخرین وضعیت پیگیری در پنل قابل مشاهده است." codeLabel="کد درخواست" code={contactUpdate.code} statusLabel="وضعیت ثبت‌شده" status={contactUpdate.status} message={contactUpdate.note} primaryText="بازگشت به درخواست" primaryPath={`contact/${encodeURIComponent(contactUpdate.code)}`} secondaryText="فهرست درخواست‌ها" secondaryPath="contacts" /></AdminShell>;
  if (path === 'settings') return <AdminShell active="settings" onLogout={() => void logout()}><SettingsPage initial={settings} onSave={async (next) => { await cmsSavePublicSettings({ registrationEnabled: next.registrationEnabled, trackingEnabled: next.trackingEnabled, adminMessageEnabled: next.messageEnabled, contactEnabled: next.contactEnabled }); setSettings(next); }} /></AdminShell>;
  return <AdminShell active="files" onLogout={() => void logout()}><RegistrationList items={registrations} /></AdminShell>;
}
