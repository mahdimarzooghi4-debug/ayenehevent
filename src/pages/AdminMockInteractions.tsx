import { useEffect } from 'react';

const DRAFT_PREFIX = 'ayene-admin-draft:';
const SETTINGS_KEY = 'ayene-admin-settings';

function currentAdminKey() {
  return `${DRAFT_PREFIX}${window.location.hash}`;
}

function normalizeLabel(value: string | null | undefined) {
  return (value ?? '').replace(/\s+/g, ' ').trim();
}

function showToast(message: string) {
  document.getElementById('ayene-admin-toast')?.remove();

  const toast = document.createElement('div');
  toast.id = 'ayene-admin-toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    left: '50%',
    bottom: '28px',
    transform: 'translateX(-50%)',
    zIndex: '10001',
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

function getStatusSection(button?: HTMLButtonElement) {
  const directSection = button?.closest('section');
  const directHeading = directSection?.querySelector('h2')?.textContent?.trim();
  if (directSection && (directHeading === 'وضعیت پرونده' || directHeading === 'وضعیت پیگیری')) {
    return directSection;
  }

  const main = document.querySelector('main');
  if (!main) return null;
  return Array.from(main.querySelectorAll('section')).find((section) => {
    const heading = section.querySelector('h2')?.textContent?.trim();
    return heading === 'وضعیت پرونده' || heading === 'وضعیت پیگیری';
  }) ?? null;
}

function saveDraft(button: HTMLButtonElement) {
  const section = getStatusSection(button);
  if (!section) {
    showToast('بخش پیش‌نویس پیدا نشد؛ صفحه را یک‌بار رفرش کن');
    return;
  }

  const textarea = section.querySelector<HTMLTextAreaElement>('textarea');
  const select = section.querySelector<HTMLSelectElement>('select');
  const payload = {
    note: textarea?.value ?? '',
    status: select?.value ?? '',
    savedAt: Date.now(),
  };

  try {
    localStorage.setItem(currentAdminKey(), JSON.stringify(payload));
    showToast('پیش‌نویس ذخیره شد');
  } catch {
    showToast('ذخیره پیش‌نویس در این مرورگر ممکن نشد');
  }
}

function restoreDraft() {
  if (!window.location.hash.includes('#admin/file/') && !window.location.hash.includes('#admin/contact/')) return;

  const raw = localStorage.getItem(currentAdminKey());
  if (!raw) return;

  try {
    const payload = JSON.parse(raw) as { note?: string; status?: string };
    const section = getStatusSection();
    if (!section) return;

    const textarea = section.querySelector<HTMLTextAreaElement>('textarea');
    const select = section.querySelector<HTMLSelectElement>('select');
    if (textarea && typeof payload.note === 'string') setReactFieldValue(textarea, payload.note);
    if (select && typeof payload.status === 'string' && payload.status) setReactFieldValue(select, payload.status);
  } catch {
    localStorage.removeItem(currentAdminKey());
  }
}

function readSettings() {
  const main = document.querySelector('main');
  const settings: Record<string, boolean> = {};
  if (!main) return settings;

  const labels = ['وضعیت فرم', 'صفحه پیگیری', 'نمایش پیام مدیر', 'وضعیت فرم تماس'];
  for (const label of labels) {
    const labelNode = Array.from(main.querySelectorAll('span')).find((node) => normalizeLabel(node.textContent) === label);
    const button = labelNode?.parentElement?.querySelector('button');
    if (!button) continue;
    const text = normalizeLabel(button.textContent);
    settings[label] = text === 'فعال' || text === 'روشن';
  }
  return settings;
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(readSettings()));
    showToast('تغییرات ذخیره شد');
  } catch {
    showToast('ذخیره تنظیمات در این مرورگر ممکن نشد');
  }
}

function restoreSettings() {
  if (!window.location.hash.includes('#admin/settings')) return;
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return;

  try {
    const settings = JSON.parse(raw) as Record<string, boolean>;
    const main = document.querySelector('main');
    if (!main) return;

    for (const [label, enabled] of Object.entries(settings)) {
      const labelNode = Array.from(main.querySelectorAll('span')).find((node) => normalizeLabel(node.textContent) === label);
      const button = labelNode?.parentElement?.querySelector<HTMLButtonElement>('button');
      if (!button) continue;
      const text = normalizeLabel(button.textContent);
      const current = text === 'فعال' || text === 'روشن';
      if (current !== enabled) button.click();
    }
  } catch {
    localStorage.removeItem(SETTINGS_KEY);
  }
}

function openInfoDialog() {
  document.getElementById('ayene-admin-info-dialog')?.remove();

  const main = document.querySelector('main');
  if (!main) return;

  const infoSection = Array.from(main.querySelectorAll('section')).find((section) => {
    const heading = normalizeLabel(section.querySelector('h2')?.textContent);
    return heading === 'اطلاعات پرونده' || heading === 'اطلاعات درخواست';
  });

  if (!infoSection) {
    showToast('اطلاعات فرم در این صفحه پیدا نشد');
    return;
  }

  const overlay = document.createElement('div');
  overlay.id = 'ayene-admin-info-dialog';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '10000',
    background: 'rgba(24,43,94,.28)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  });

  const dialog = document.createElement('div');
  Object.assign(dialog.style, {
    width: 'min(620px, 100%)',
    maxHeight: '80vh',
    overflow: 'auto',
    borderRadius: '18px',
    background: '#fff',
    border: '1px solid #E7EAF2',
    padding: '28px',
    direction: 'rtl',
    fontFamily: 'Vazirmatn, sans-serif',
    color: '#182B5E',
    boxShadow: '0 12px 36px rgba(24,43,94,.16)',
  });

  const title = document.createElement('h3');
  title.textContent = 'اطلاعات فرم';
  Object.assign(title.style, { fontSize: '20px', fontWeight: '700', margin: '0 0 18px' });

  const body = document.createElement('div');
  const rows = Array.from(infoSection.querySelectorAll('div > div')).filter((node) => node.querySelectorAll(':scope > p').length >= 2);
  if (rows.length) {
    body.innerHTML = rows
      .map((node) => {
        const paragraphs = node.querySelectorAll(':scope > p');
        const label = paragraphs[0]?.textContent?.trim() ?? '';
        const value = paragraphs[1]?.textContent?.trim() ?? '';
        return `<div style="padding:10px 0;border-bottom:1px solid #E7EAF2"><div style="font-size:12px;color:#6B7280">${label}</div><div style="margin-top:4px;font-size:14px;color:#182B5E;font-weight:500">${value}</div></div>`;
      })
      .join('');
  } else {
    body.textContent = infoSection.innerText;
    body.style.whiteSpace = 'pre-line';
  }
  Object.assign(body.style, { fontSize: '14px', lineHeight: '2', color: '#334061' });

  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'بستن';
  Object.assign(close.style, {
    marginTop: '22px',
    height: '44px',
    minWidth: '120px',
    borderRadius: '12px',
    border: '1.2px solid #364E92',
    background: '#fff',
    color: '#364E92',
    fontFamily: 'Vazirmatn, sans-serif',
    cursor: 'pointer',
  });

  close.addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) overlay.remove();
  });

  dialog.append(title, body, close);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
}

function bindButtons() {
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('main button'));

  for (const button of buttons) {
    const label = normalizeLabel(button.textContent);
    const bindingKey = `ayeneBound${label}`;
    if (button.dataset[bindingKey]) continue;

    if (label === 'ذخیره پیش‌نویس') {
      button.addEventListener('click', () => saveDraft(button));
    } else if (label === 'ذخیره تغییرات') {
      button.addEventListener('click', saveSettings);
    } else if (label === 'مشاهده اطلاعات فرم') {
      button.addEventListener('click', openInfoDialog);
    } else if (label === 'دانلود فایل') {
      button.addEventListener('click', () => showToast('دانلود فایل پس از اتصال فضای ذخیره‌سازی واقعی فعال می‌شود'));
    } else {
      continue;
    }

    button.dataset[bindingKey] = '1';
  }
}

function refreshBindingsAndState() {
  bindButtons();
  restoreDraft();
  restoreSettings();
}

export function AdminMockInteractions() {
  useEffect(() => {
    let timer = 0;
    const scheduleRefresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(refreshBindingsAndState, 30);
    };

    const observer = new MutationObserver(scheduleRefresh);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('hashchange', scheduleRefresh);

    scheduleRefresh();

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('hashchange', scheduleRefresh);
    };
  }, []);

  return null;
}
