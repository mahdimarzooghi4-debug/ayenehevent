import { useEffect } from 'react';

const DRAFT_PREFIX = 'ayene-admin-draft:';
const SETTINGS_KEY = 'ayene-admin-settings';

function currentAdminKey() {
  return `${DRAFT_PREFIX}${window.location.hash}`;
}

function showToast(message: string) {
  const oldToast = document.getElementById('ayene-admin-toast');
  oldToast?.remove();

  const toast = document.createElement('div');
  toast.id = 'ayene-admin-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    left: '50%',
    bottom: '28px',
    transform: 'translateX(-50%)',
    zIndex: '9999',
    maxWidth: 'calc(100vw - 32px)',
    padding: '12px 20px',
    borderRadius: '12px',
    background: '#182B5E',
    color: '#fff',
    fontFamily: 'Vazirmatn, sans-serif',
    fontSize: '13px',
    textAlign: 'center',
    boxShadow: '0 8px 22px rgba(24,43,94,.18)',
  });
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2200);
}

function setReactFieldValue(element: HTMLTextAreaElement | HTMLSelectElement, value: string) {
  const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLSelectElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
  descriptor?.set?.call(element, value);
  element.dispatchEvent(new Event(element instanceof HTMLSelectElement ? 'change' : 'input', { bubbles: true }));
}

function saveDraft(button: HTMLButtonElement) {
  const section = button.closest('section');
  if (!section) return;

  const textarea = section.querySelector('textarea');
  const select = section.querySelector('select');
  const payload = {
    note: textarea?.value ?? '',
    status: select?.value ?? '',
    savedAt: Date.now(),
  };
  localStorage.setItem(currentAdminKey(), JSON.stringify(payload));
  showToast('پیش‌نویس روی این مرورگر ذخیره شد');
}

function restoreDraft() {
  if (!window.location.hash.includes('/file/') && !window.location.hash.includes('/contact/')) return;

  const raw = localStorage.getItem(currentAdminKey());
  if (!raw) return;

  try {
    const payload = JSON.parse(raw) as { note?: string; status?: string };
    const main = document.querySelector('main');
    if (!main) return;

    const sections = Array.from(main.querySelectorAll('section'));
    const statusSection = sections.find((section) => {
      const heading = section.querySelector('h2')?.textContent?.trim();
      return heading === 'وضعیت پرونده' || heading === 'وضعیت پیگیری';
    });
    if (!statusSection) return;

    const textarea = statusSection.querySelector('textarea');
    const select = statusSection.querySelector('select');
    if (textarea && typeof payload.note === 'string') setReactFieldValue(textarea, payload.note);
    if (select && payload.status) setReactFieldValue(select, payload.status);
  } catch {
    localStorage.removeItem(currentAdminKey());
  }
}

function saveSettings() {
  const main = document.querySelector('main');
  if (!main) return;

  const settings: Record<string, boolean> = {};
  const labels = ['وضعیت فرم', 'صفحه پیگیری', 'نمایش پیام مدیر', 'وضعیت فرم تماس'];

  for (const label of labels) {
    const labelNode = Array.from(main.querySelectorAll('span')).find((node) => node.textContent?.trim() === label);
    const row = labelNode?.parentElement;
    const button = row?.querySelector('button');
    if (button) settings[label] = button.textContent?.trim() === 'فعال' || button.textContent?.trim() === 'روشن';
  }

  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  showToast('تنظیمات روی این مرورگر ذخیره شد');
}

function restoreSettings() {
  if (!window.location.hash.includes('/settings')) return;
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return;

  try {
    const settings = JSON.parse(raw) as Record<string, boolean>;
    const main = document.querySelector('main');
    if (!main) return;

    for (const [label, enabled] of Object.entries(settings)) {
      const labelNode = Array.from(main.querySelectorAll('span')).find((node) => node.textContent?.trim() === label);
      const row = labelNode?.parentElement;
      const button = row?.querySelector('button');
      if (!button) continue;
      const currentlyEnabled = button.textContent?.trim() === 'فعال' || button.textContent?.trim() === 'روشن';
      if (currentlyEnabled !== enabled) button.click();
    }
  } catch {
    localStorage.removeItem(SETTINGS_KEY);
  }
}

function openInfoDialog() {
  const main = document.querySelector('main');
  if (!main) return;

  const sections = Array.from(main.querySelectorAll('section'));
  const infoSection = sections.find((section) => {
    const heading = section.querySelector('h2')?.textContent?.trim();
    return heading === 'اطلاعات پرونده' || heading === 'اطلاعات درخواست';
  });
  if (!infoSection) return;

  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', zIndex: '9998', background: 'rgba(24,43,94,.28)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
  });

  const dialog = document.createElement('div');
  Object.assign(dialog.style, {
    width: 'min(620px,100%)', maxHeight: '80vh', overflow: 'auto', borderRadius: '18px',
    background: '#fff', border: '1px solid #E7EAF2', padding: '28px', direction: 'rtl',
    fontFamily: 'Vazirmatn, sans-serif', color: '#182B5E', boxShadow: '0 12px 36px rgba(24,43,94,.16)',
  });

  const title = document.createElement('div');
  title.textContent = 'اطلاعات فرم';
  Object.assign(title.style, { fontSize: '20px', fontWeight: '700', marginBottom: '18px' });

  const body = document.createElement('div');
  body.textContent = infoSection.innerText;
  Object.assign(body.style, { whiteSpace: 'pre-line', fontSize: '14px', lineHeight: '2.1', color: '#334061' });

  const close = document.createElement('button');
  close.textContent = 'بستن';
  Object.assign(close.style, {
    marginTop: '22px', height: '44px', minWidth: '120px', borderRadius: '12px', border: '1.2px solid #364E92',
    background: '#fff', color: '#364E92', fontFamily: 'Vazirmatn, sans-serif', cursor: 'pointer',
  });
  close.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (event) => { if (event.target === overlay) overlay.remove(); });

  dialog.append(title, body, close);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
}

export function AdminMockInteractions() {
  useEffect(() => {
    const restore = () => window.setTimeout(() => {
      restoreDraft();
      restoreSettings();
    }, 80);

    const handleClick = (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest('button');
      if (!(button instanceof HTMLButtonElement)) return;
      const label = button.textContent?.trim() ?? '';

      if (label === 'ذخیره پیش‌نویس') {
        saveDraft(button);
      } else if (label === 'ذخیره تغییرات') {
        saveSettings();
      } else if (label === 'مشاهده اطلاعات فرم') {
        openInfoDialog();
      } else if (label === 'دانلود فایل') {
        showToast('دانلود فایل پس از اتصال CMS به فضای ذخیره‌سازی واقعی فعال می‌شود');
      } else if (label === 'جست‌وجو' && !button.onclick) {
        showToast('نتایج بر اساس فیلترهای فعلی به‌روزرسانی شدند');
      }
    };

    document.addEventListener('click', handleClick, true);
    window.addEventListener('hashchange', restore);
    restore();

    return () => {
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('hashchange', restore);
    };
  }, []);

  return null;
}
