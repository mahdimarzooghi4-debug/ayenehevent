import { FormEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  DEFAULT_HERO_STATS,
  getCmsSitePresentationSettings,
  saveCmsSitePresentationSettings,
  type HeroStats,
} from '../lib/siteSettings';

const titleStyle = { fontFamily: 'Estedad, Vazirmatn, sans-serif' };
const cardClass = 'rounded-[18px] border border-[#E7EAF2] bg-white shadow-[0_8px_22px_rgba(24,43,94,0.06)]';
const fieldClass = 'h-[48px] w-full rounded-[12px] border-[1.2px] border-[#E0C89F] bg-white px-4 text-center text-[15px] text-[#182B5E] outline-none focus:border-[#364E92]';
const primaryButtonClass = 'inline-flex items-center justify-center rounded-[14px] bg-[#FB8C74] font-medium text-white transition hover:bg-[#f97d62]';

function isSettingsRoute() {
  return window.location.hash === '#admin/settings';
}

function faDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => '۰۱۲۳۴۵۶۷۸۹'[Number(digit)]);
}

function updateExistingSummaries(heroStats: HeroStats, maxUploadMb: number) {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
  const registrationSection = sections.find((section) => section.querySelector('h2')?.textContent?.trim() === 'تنظیمات فرم ثبت‌نام');
  const sizeValue = registrationSection
    ? Array.from(registrationSection.querySelectorAll<HTMLElement>('span')).find((item) => item.textContent?.includes('مگابایت'))
    : null;
  if (sizeValue) sizeValue.textContent = `${faDigits(maxUploadMb)} مگابایت`;

  const heroSection = sections.find((section) => section.querySelector('h2')?.textContent?.trim() === 'آمار هیرو');
  if (!heroSection) return;

  const values: Record<string, string> = {
    'ثبت‌نام‌شده': heroStats.registrations,
    'ایده و راهکار': heroStats.solutions,
    'استان': heroStats.provinces,
    'محور': heroStats.axes,
  };

  for (const label of Array.from(heroSection.querySelectorAll<HTMLParagraphElement>('p'))) {
    const key = label.textContent?.trim() ?? '';
    if (!values[key]) continue;
    const valueNode = label.previousElementSibling as HTMLElement | null;
    if (valueNode) valueNode.textContent = values[key];
  }
}

export function AdminSitePresentationSettings() {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(isSettingsRoute);
  const [heroStats, setHeroStats] = useState<HeroStats>(DEFAULT_HERO_STATS);
  const [maxUploadMb, setMaxUploadMb] = useState(10);
  const [loaded, setLoaded] = useState(false);
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

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    const load = async () => {
      setError('');
      try {
        const settings = await getCmsSitePresentationSettings();
        if (cancelled) return;
        const mb = Math.max(1, Math.round(settings.maxUploadBytes / 1024 / 1024));
        setHeroStats(settings.heroStats);
        setMaxUploadMb(mb);
        setLoaded(true);
        window.setTimeout(() => updateExistingSummaries(settings.heroStats, mb), 0);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'دریافت تنظیمات انجام نشد.');
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [visible]);

  useEffect(() => {
    if (!visible || !loaded) return;
    window.setTimeout(() => updateExistingSummaries(heroStats, maxUploadMb), 0);
  }, [visible, loaded, heroStats, maxUploadMb, target]);

  if (!visible || !target) return null;

  const setHero = (key: keyof HeroStats, value: string) => {
    setHeroStats((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const mb = Number(maxUploadMb);
    if (!Number.isFinite(mb) || mb < 1 || mb > 50) {
      setError('حداکثر حجم فایل باید بین ۱ تا ۵۰ مگابایت باشد.');
      return;
    }
    if (Object.values(heroStats).some((value) => !value.trim())) {
      setError('همه مقادیر آمار هیرو را تکمیل کن.');
      return;
    }

    setSaving(true);
    try {
      await saveCmsSitePresentationSettings({
        maxUploadBytes: Math.round(mb * 1024 * 1024),
        heroStats,
      });
      updateExistingSummaries(heroStats, mb);
      window.alert('آمار هیرو و محدودیت حجم فایل ذخیره شد.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'ذخیره تنظیمات انجام نشد.');
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    <section className={`${cardClass} mt-8 p-6`} dir="rtl">
      <h2 className="text-[22px] font-extrabold text-[#182B5E]" style={titleStyle}>ویرایش آمار هیرو و حجم فایل</h2>
      <p className="mt-1 text-[13px] text-[#6B7280]">مقادیر این بخش مستقیماً روی صفحه اصلی و محدودیت واقعی Storage اعمال می‌شوند.</p>
      <form onSubmit={submit} className="mt-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <label className="block text-right">
            <span className="mb-2 block text-[12px] text-[#6B7280]">ثبت‌نام‌شده</span>
            <input value={heroStats.registrations} onChange={(event) => setHero('registrations', event.target.value)} className={fieldClass} maxLength={30} required />
          </label>
          <label className="block text-right">
            <span className="mb-2 block text-[12px] text-[#6B7280]">ایده و راهکار</span>
            <input value={heroStats.solutions} onChange={(event) => setHero('solutions', event.target.value)} className={fieldClass} maxLength={30} required />
          </label>
          <label className="block text-right">
            <span className="mb-2 block text-[12px] text-[#6B7280]">استان</span>
            <input value={heroStats.provinces} onChange={(event) => setHero('provinces', event.target.value)} className={fieldClass} maxLength={30} required />
          </label>
          <label className="block text-right">
            <span className="mb-2 block text-[12px] text-[#6B7280]">محور</span>
            <input value={heroStats.axes} onChange={(event) => setHero('axes', event.target.value)} className={fieldClass} maxLength={30} required />
          </label>
          <label className="block text-right">
            <span className="mb-2 block text-[12px] text-[#6B7280]">حداکثر فایل (MB)</span>
            <input type="number" min={1} max={50} step={1} value={maxUploadMb} onChange={(event) => setMaxUploadMb(Number(event.target.value))} className={fieldClass} required />
          </label>
        </div>
        <div className="mt-5 flex flex-col items-end gap-3">
          {error && <p className="w-full text-right text-[13px] text-[#C95E4B]">{error}</p>}
          <button type="submit" disabled={saving || !loaded} className={`${primaryButtonClass} h-[52px] w-full text-[15px] disabled:opacity-60 sm:w-[260px]`}>
            {saving ? 'در حال ذخیره…' : 'ذخیره آمار و حجم فایل'}
          </button>
        </div>
      </form>
    </section>,
    target,
  );
}
