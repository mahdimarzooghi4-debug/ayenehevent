import { useEffect, useMemo, useState } from 'react';
import {
  cmsGetContactHistory,
  cmsGetRegistrationHistory,
  type ContactHistoryItem,
  type RegistrationHistoryItem,
} from '../lib/cmsHistory';

type AuditItem = {
  id: number;
  previousStatus: string | null;
  newStatus: string;
  note: string;
  createdAt: string;
};

function getTarget() {
  const hash = window.location.hash;
  if (hash.startsWith('#admin/file/')) {
    return { type: 'registration' as const, code: decodeURIComponent(hash.slice('#admin/file/'.length)) };
  }
  if (hash.startsWith('#admin/contact/')) {
    return { type: 'contact' as const, code: decodeURIComponent(hash.slice('#admin/contact/'.length)) };
  }
  return null;
}

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function normalizeRegistration(items: RegistrationHistoryItem[]): AuditItem[] {
  return items.map((item) => ({
    id: item.id,
    previousStatus: item.previous_status,
    newStatus: item.new_status,
    note: item.message ?? '',
    createdAt: item.created_at,
  }));
}

function normalizeContact(items: ContactHistoryItem[]): AuditItem[] {
  return items.map((item) => ({
    id: item.id,
    previousStatus: item.previous_status,
    newStatus: item.new_status,
    note: item.internal_note ?? '',
    createdAt: item.created_at,
  }));
}

export function AdminAuditTrail() {
  const [routeVersion, setRouteVersion] = useState(0);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const target = useMemo(() => getTarget(), [routeVersion]);

  useEffect(() => {
    const handleHash = () => {
      setRouteVersion((value) => value + 1);
      setOpen(false);
      setItems([]);
      setError('');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  if (!target) return null;

  const load = async () => {
    setOpen(true);
    setLoading(true);
    setError('');
    try {
      const rows = target.type === 'registration'
        ? normalizeRegistration(await cmsGetRegistrationHistory(target.code))
        : normalizeContact(await cmsGetContactHistory(target.code));
      setItems(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'دریافت تاریخچه انجام نشد.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
      <button
        type="button"
        onClick={() => void load()}
        className="fixed bottom-6 left-6 z-[80] flex h-11 items-center justify-center rounded-[14px] border border-[#364E92] bg-white px-5 text-[13px] font-medium text-[#364E92] shadow-[0_8px_22px_rgba(24,43,94,0.12)] transition hover:bg-[#F6F8FD]"
      >
        تاریخچه تغییرات
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#182B5E]/35 px-5 py-8" onMouseDown={() => setOpen(false)}>
          <section
            className="max-h-[78vh] w-full max-w-[720px] overflow-y-auto rounded-[22px] border border-[#E7EAF2] bg-white p-6 shadow-[0_20px_60px_rgba(24,43,94,0.22)] sm:p-8"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-5">
              <div className="text-right">
                <h2 className="text-[22px] font-extrabold text-[#182B5E]" style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}>
                  تاریخچه تغییرات
                </h2>
                <p className="mt-1 text-[13px] text-[#6B7280]" dir="ltr">{target.code}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2F5FC] text-[20px] text-[#364E92]"
                aria-label="بستن"
              >
                ×
              </button>
            </div>

            {loading ? (
              <p className="py-14 text-center text-[14px] text-[#6B7280]">در حال دریافت تاریخچه…</p>
            ) : error ? (
              <p className="py-14 text-center text-[14px] text-[#C95E4B]">{error}</p>
            ) : items.length === 0 ? (
              <p className="py-14 text-center text-[14px] text-[#6B7280]">تغییری ثبت نشده است.</p>
            ) : (
              <div className="mt-6 space-y-3">
                {items.map((item) => (
                  <article key={item.id} className="rounded-[16px] border border-[#E7EAF2] bg-[#FAFBFD] px-5 py-4 text-right">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-[14px] font-medium text-[#182B5E]">
                        {item.previousStatus ? `${item.previousStatus} ← ${item.newStatus}` : `ثبت اولیه: ${item.newStatus}`}
                      </div>
                      <time className="text-[12px] text-[#6B7280]">{formatDate(item.createdAt)}</time>
                    </div>
                    {item.note && <p className="mt-2 text-[13px] leading-7 text-[#6B7280]">{item.note}</p>}
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
