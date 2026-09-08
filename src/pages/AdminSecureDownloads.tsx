import { useEffect } from 'react';
import { cmsListRegistrations } from '../lib/backend';
import { getCmsRegistrationFileDownloadUrl } from '../lib/cmsFiles';

function buttonLabel(button: HTMLButtonElement) {
  return (button.textContent ?? '').replace(/\s+/g, ' ').trim();
}

export function AdminSecureDownloads() {
  useEffect(() => {
    const handleClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>('button');
      if (!button || buttonLabel(button) !== 'دانلود فایل') return;
      if (!window.location.hash.startsWith('#admin/file/')) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const originalText = button.textContent ?? 'دانلود فایل';
      button.disabled = true;
      button.textContent = 'در حال آماده‌سازی…';

      try {
        const code = decodeURIComponent(window.location.hash.slice('#admin/file/'.length));
        const registrations = await cmsListRegistrations();
        const registration = registrations.find((item) => item.tracking_code === code);

        if (!registration?.file_path) {
          window.alert('فایلی برای این پرونده وجود ندارد.');
          return;
        }

        const url = await getCmsRegistrationFileDownloadUrl(registration.file_path);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        link.remove();
      } catch (error) {
        console.error(error);
        window.alert(error instanceof Error ? error.message : 'دانلود فایل انجام نشد.');
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
