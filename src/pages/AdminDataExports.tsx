import { useEffect, useState } from 'react';
import { DatabaseBackup, Download, FileSpreadsheet, X } from 'lucide-react';
import {
  cmsGetSettings,
  cmsListContacts,
  cmsListRegistrations,
  cmsSessionValid,
  getCmsToken,
  type CmsContactRequest,
  type CmsRegistration,
} from '../lib/backend';
import { requireSupabase } from '../lib/supabase';

type ExportRow = Record<string, string | number | boolean | null>;

function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvCell(value: unknown) {
  let text = value == null ? '' : typeof value === 'object' ? JSON.stringify(value) : String(value);
  if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadCsv(rows: ExportRow[], fileName: string) {
  if (!rows.length) throw new Error('داده‌ای برای خروجی وجود ندارد.');
  const headers = Object.keys(rows[0]);
  const lines = [headers.map(csvCell).join(','), ...rows.map((row) => headers.map((header) => csvCell(row[header])).join(','))];
  const blob = new Blob([`\uFEFF${lines.join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
  downloadBlob(blob, fileName);
}

function registrationRows(items: CmsRegistration[]): ExportRow[] {
  return items.map((item) => ({
    'کد پیگیری': item.tracking_code,
    'نام و نام خانوادگی': item.full_name,
    'شماره تماس': item.phone,
    'استان': item.province ?? '',
    'شهر': item.city ?? '',
    'مسیر ورود': item.route,
    'محور': item.axis,
    'مسئله': item.issue,
    'تجربه / راهکار': item.experience_solution ?? '',
    'فایل': item.file_path ?? '',
    'وضعیت': item.status,
    'پیام مدیر': item.admin_message,
    'زمان ثبت': item.created_at,
    'آخرین به‌روزرسانی': item.updated_at,
    'اطلاعات تکمیلی': JSON.stringify(item.form_data ?? {}),
  }));
}

function contactRows(items: CmsContactRequest[]): ExportRow[] {
  return items.map((item) => ({
    'کد درخواست': item.request_code,
    'نام و نام خانوادگی': item.full_name,
    'شماره تماس': item.phone,
    'استان': item.province,
    'شهر': item.city,
    'زمان مناسب تماس': item.preferred_time,
    'موضوع تماس': item.subject,
    'توضیح متقاضی': item.note ?? '',
    'وضعیت': item.status,
    'یادداشت داخلی': item.internal_note,
    'زمان ثبت': item.created_at,
    'آخرین به‌روزرسانی': item.updated_at,
  }));
}

function applyWorksheetLayout(sheet: Record<string, unknown>, widths: number[]) {
  sheet['!cols'] = widths.map((wch) => ({ wch }));
  sheet['!views'] = [{ RTL: true }];
}

export function AdminDataExports() {
  const [path, setPath] = useState(() => window.location.hash);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState('');

  useEffect(() => {
    const onHashChange = () => {
      setPath(window.location.hash);
      setOpen(false);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (!path.startsWith('#admin/') || !getCmsToken()) return null;

  const run = async (key: string, action: () => Promise<void>) => {
    if (busy) return;
    setBusy(key);
    try {
      if (!(await cmsSessionValid())) throw new Error('نشست مدیریت منقضی شده است. دوباره وارد شوید.');
      await action();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'ساخت خروجی انجام نشد.');
    } finally {
      setBusy('');
    }
  };

  const exportRegistrationsCsv = () => run('reg-csv', async () => {
    const items = await cmsListRegistrations();
    downloadCsv(registrationRows(items), `ayene-registrations-${todayStamp()}.csv`);
  });

  const exportContactsCsv = () => run('contact-csv', async () => {
    const items = await cmsListContacts();
    downloadCsv(contactRows(items), `ayene-contact-requests-${todayStamp()}.csv`);
  });

  const exportExcel = () => run('xlsx', async () => {
    const [registrations, contacts, settings, XLSX] = await Promise.all([
      cmsListRegistrations(),
      cmsListContacts(),
      cmsGetSettings(),
      import('xlsx'),
    ]);

    const workbook = XLSX.utils.book_new();
    const registrationsSheet = XLSX.utils.json_to_sheet(registrationRows(registrations));
    const contactsSheet = XLSX.utils.json_to_sheet(contactRows(contacts));
    const settingsSheet = XLSX.utils.json_to_sheet(settings.map((item) => ({
      'کلید': item.key,
      'مقدار': typeof item.value === 'object' ? JSON.stringify(item.value) : String(item.value ?? ''),
    })));

    applyWorksheetLayout(registrationsSheet as unknown as Record<string, unknown>, [18, 24, 16, 16, 16, 24, 24, 38, 45, 34, 22, 45, 26, 26, 50]);
    applyWorksheetLayout(contactsSheet as unknown as Record<string, unknown>, [18, 24, 16, 16, 16, 22, 30, 45, 20, 45, 26, 26]);
    applyWorksheetLayout(settingsSheet as unknown as Record<string, unknown>, [34, 60]);

    XLSX.utils.book_append_sheet(workbook, registrationsSheet, 'پرونده‌ها');
    XLSX.utils.book_append_sheet(workbook, contactsSheet, 'درخواست تماس');
    XLSX.utils.book_append_sheet(workbook, settingsSheet, 'تنظیمات');

    const bytes = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', compression: true });
    downloadBlob(
      new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }),
      `ayene-cms-export-${todayStamp()}.xlsx`,
    );
  });

  const exportBackup = () => run('backup', async () => {
    const { data, error } = await requireSupabase().rpc('cms_export_backup', { p_token: getCmsToken() });
    if (error) throw error;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    downloadBlob(blob, `ayene-cms-backup-${todayStamp()}.json`);
  });

  return (
    <div dir="rtl" className="fixed bottom-5 left-5 z-[95]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
      {open && (
        <div className="mb-3 w-[300px] rounded-[18px] border border-[#E7EAF2] bg-white p-4 shadow-[0_14px_40px_rgba(24,43,94,0.16)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[15px] font-bold text-[#182B5E]">خروجی و پشتیبان داده‌ها</p>
              <p className="mt-1 text-[11px] leading-5 text-[#6B7280]">داده‌های واقعی CMS، بدون اطلاعات امنیتی</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B7280] hover:bg-[#F2F5FC]" aria-label="بستن">
              <X size={17} />
            </button>
          </div>

          <div className="mt-4 grid gap-2">
            <button disabled={Boolean(busy)} type="button" onClick={exportRegistrationsCsv} className="flex h-11 items-center justify-between rounded-[12px] border border-[#E0C89F] px-4 text-[13px] font-medium text-[#364E92] transition hover:bg-[#F6F8FD] disabled:opacity-50">
              <span>{busy === 'reg-csv' ? 'در حال ساخت…' : 'CSV پرونده‌ها'}</span><Download size={16} />
            </button>
            <button disabled={Boolean(busy)} type="button" onClick={exportContactsCsv} className="flex h-11 items-center justify-between rounded-[12px] border border-[#E0C89F] px-4 text-[13px] font-medium text-[#364E92] transition hover:bg-[#F6F8FD] disabled:opacity-50">
              <span>{busy === 'contact-csv' ? 'در حال ساخت…' : 'CSV درخواست‌های تماس'}</span><Download size={16} />
            </button>
            <button disabled={Boolean(busy)} type="button" onClick={exportExcel} className="flex h-11 items-center justify-between rounded-[12px] border border-[#364E92] px-4 text-[13px] font-medium text-[#364E92] transition hover:bg-[#F6F8FD] disabled:opacity-50">
              <span>{busy === 'xlsx' ? 'در حال ساخت…' : 'Excel کامل (.xlsx)'}</span><FileSpreadsheet size={17} />
            </button>
            <button disabled={Boolean(busy)} type="button" onClick={exportBackup} className="flex h-11 items-center justify-between rounded-[12px] bg-[#FB8C74] px-4 text-[13px] font-medium text-white transition hover:bg-[#f97d62] disabled:opacity-50">
              <span>{busy === 'backup' ? 'در حال ساخت…' : 'پشتیبان داده‌ها (JSON)'}</span><DatabaseBackup size={17} />
            </button>
          </div>
        </div>
      )}

      <button type="button" onClick={() => setOpen((value) => !value)} className="flex h-12 items-center gap-2 rounded-full border border-[#E0C89F] bg-white px-5 text-[13px] font-medium text-[#364E92] shadow-[0_8px_24px_rgba(24,43,94,0.12)] transition hover:bg-[#F6F8FD]">
        <DatabaseBackup size={17} />
        <span>خروجی / پشتیبان</span>
      </button>
    </div>
  );
}
