import { FormEvent, useMemo, useState } from 'react';

type TrackingView = 'form' | 'result' | 'not-found' | 'system-error';

interface TrackingRecord {
  trackingCode: string;
  phoneLast4: string;
  status: string;
  message: string;
}

const STORAGE_KEY = 'ayene-registration-demo-record';

const SAMPLE_RECORD: TrackingRecord = {
  trackingCode: 'AY-1405-00128',
  phoneLast4: '4567',
  status: 'در حال بررسی',
  message: 'پرونده دریافت شده و در مرحله بررسی اولیه است. نتیجه بعدی از همین بخش اعلام می‌شود.',
};

const normalizeDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));

const getHashCode = () => {
  const [, query = ''] = window.location.hash.split('?');
  return new URLSearchParams(query).get('code') ?? '';
};

const readStoredRecord = (): TrackingRecord | null => {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const parsed = JSON.parse(raw) as Partial<TrackingRecord>;
  if (!parsed.trackingCode || typeof parsed.phoneLast4 !== 'string') return null;

  return {
    trackingCode: parsed.trackingCode,
    phoneLast4: parsed.phoneLast4,
    status: parsed.status || SAMPLE_RECORD.status,
    message: parsed.message || SAMPLE_RECORD.message,
  };
};

export function TrackingPage() {
  const hashCode = useMemo(() => getHashCode(), []);
  const initialStoredRecord = useMemo(() => {
    try {
      return readStoredRecord();
    } catch {
      return null;
    }
  }, []);

  const [trackingCode, setTrackingCode] = useState(hashCode);
  const [phoneLast4, setPhoneLast4] = useState(
    hashCode && initialStoredRecord?.trackingCode === hashCode ? initialStoredRecord.phoneLast4 : '',
  );
  const [view, setView] = useState<TrackingView>('form');
  const [activeRecord, setActiveRecord] = useState<TrackingRecord | null>(null);

  const isResult = view === 'result';
  const isNotFound = view === 'not-found';
  const isSystemError = view === 'system-error';

  const intro = isResult
    ? 'کد پیگیری ثبت‌نام را وارد کن تا آخرین وضعیت پرونده نمایش داده شود.'
    : 'کد پیگیری و ۴ رقم آخر شماره موبایل ثبت‌شده را وارد کن تا آخرین وضعیت پرونده نمایش داده شود.';

  const handleLookup = (event?: FormEvent) => {
    event?.preventDefault();

    try {
      const normalizedCode = trackingCode.trim().toUpperCase();
      const normalizedPhone = normalizeDigits(phoneLast4).replace(/\D/g, '').slice(-4);
      const storedRecord = readStoredRecord();
      const candidates = storedRecord ? [storedRecord, SAMPLE_RECORD] : [SAMPLE_RECORD];
      const match = candidates.find(
        (record) => record.trackingCode.toUpperCase() === normalizedCode && record.phoneLast4 === normalizedPhone,
      );

      if (match) {
        setActiveRecord(match);
        setView('result');
        return;
      }

      setActiveRecord(null);
      setView('not-found');
    } catch {
      setActiveRecord(null);
      setView('system-error');
    }
  };

  const handleAnotherCode = () => {
    setTrackingCode('');
    setPhoneLast4('');
    setActiveRecord(null);
    setView('form');
  };

  const panelTitle = isResult
    ? 'وضعیت پرونده'
    : isNotFound
      ? 'کد پیگیری پیدا نشد'
      : isSystemError
        ? 'دریافت وضعیت ممکن نشد'
        : 'کد پیگیری را وارد کن';

  const panelHelp = isResult
    ? 'آخرین وضعیت ثبت‌شده برای این کد پیگیری'
    : isNotFound
      ? 'پرونده‌ای با این اطلاعات پیدا نشد. کد و شماره موبایل را بررسی کن و دوباره تلاش کن.'
      : isSystemError
        ? 'در دریافت اطلاعات پرونده مشکلی پیش آمد. چند لحظه بعد دوباره تلاش کن.'
        : 'برای مشاهده پرونده، کد پیگیری و ۴ رقم آخر شماره موبایل ثبت‌شده را وارد کن.';

  return (
    <main
      dir="rtl"
      className="min-h-[960px] bg-[#FBFAF7] text-[#182B5E]"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-[120px] pt-[58px] lg:px-[100px]">
        <div className="ml-auto w-full max-w-[730px] text-right">
          <p className="text-[15px] font-medium text-[#FB8C74]">پیگیری ثبت‌نام</p>
          <h1
            className="mt-4 text-[32px] font-extrabold leading-[1.8] text-[#182B5E] sm:text-[40px]"
            style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}
          >
            وضعیت پرونده‌ات را ببین
          </h1>
          <div className="mr-0 mt-1 h-[5px] w-[72px] rounded-[3px] bg-[#FB8C74]" />
          <p className="mt-5 text-[16px] leading-8 text-[#182B5E] sm:text-[19px]">{intro}</p>
        </div>

        <section className="mx-auto mt-[36px] min-h-[520px] w-full max-w-[1100px] rounded-[28px] border-[1.4px] border-[#E0C89F] bg-white px-5 py-10 shadow-[0px_10px_30px_rgba(23,41,92,0.06)] sm:px-10 lg:px-[40px] lg:py-[44px]">
          <div className="ml-auto w-full max-w-[540px] text-right">
            <h2
              className="text-[24px] font-extrabold leading-[1.7] text-[#182B5E] sm:text-[28px]"
              style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}
            >
              {panelTitle}
            </h2>
            <p className="mt-1 text-[14px] leading-7 text-[#616B80] sm:text-[16px]">{panelHelp}</p>
          </div>

          {isResult ? (
            <div className="mx-auto mt-5 w-full max-w-[600px]">
              <div className="rounded-[16px] border-[1.1px] border-[#E0C89F] bg-[#F6F8FD] px-6 py-[10px] text-right">
                <p className="text-[13px] font-medium text-[#616B80]">کد پیگیری</p>
                <p dir="ltr" className="mt-1 text-right text-[18px] font-medium text-[#182B5E]" style={{ unicodeBidi: 'isolate' }}>
                  {activeRecord?.trackingCode ?? trackingCode}
                </p>
              </div>

              <div className="mt-7 rounded-[20px] border-[1.3px] border-[#364E92] bg-white px-6 py-3 text-right">
                <p className="text-[14px] font-medium text-[#616B80]">وضعیت پرونده</p>
                <p className="mt-1 text-[22px] font-medium text-[#182B5E]">{activeRecord?.status ?? SAMPLE_RECORD.status}</p>
                <p className="mt-2 text-[14px] leading-7 text-[#616B80]">
                  {activeRecord?.message ?? SAMPLE_RECORD.message}
                </p>
              </div>

              <div className="mt-[30px] flex justify-end">
                <button
                  type="button"
                  onClick={handleAnotherCode}
                  className="flex h-[52px] w-full max-w-[300px] items-center justify-center rounded-[16px] border-[1.4px] border-[#364E92] bg-white text-[15px] font-medium text-[#364E92] transition-colors hover:bg-[#F6F8FD]"
                >
                  پیگیری کد دیگر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLookup} className="mx-auto mt-2 w-full max-w-[600px]">
              <label className="block text-right text-[13px] font-medium text-[#334061]">کد پیگیری</label>
              <input
                dir="ltr"
                value={trackingCode}
                onChange={(event) => setTrackingCode(event.target.value)}
                placeholder="AY-1405-00128"
                className={`mt-1 h-[62px] w-full rounded-[16px] border-[1.4px] bg-white px-6 text-right text-[16px] text-[#616B80] outline-none transition ${
                  isNotFound ? 'border-[#FB5749]' : 'border-[#E0C89F] focus:border-[#364E92]'
                }`}
              />

              {isNotFound && (
                <p className="mt-1 text-right text-[12px] leading-5 text-[#C95E4B]">
                  ترکیب کد پیگیری و شماره موبایل با هیچ پرونده‌ای مطابقت ندارد.
                </p>
              )}

              <label className={`${isNotFound ? 'mt-2' : 'mt-2'} block text-right text-[13px] font-medium text-[#334061]`}>
                ۴ رقم آخر شماره موبایل
              </label>
              <input
                dir="ltr"
                inputMode="numeric"
                maxLength={4}
                value={phoneLast4}
                onChange={(event) => setPhoneLast4(event.target.value)}
                placeholder="۴۵۶۷"
                className={`mt-1 h-[58px] w-full rounded-[16px] border-[1.4px] bg-white px-6 text-right text-[16px] text-[#616B80] outline-none transition ${
                  isNotFound ? 'border-[#FB8C74]' : 'border-[#E0C89F] focus:border-[#364E92]'
                }`}
              />

              <button
                type="submit"
                className={`mx-auto flex h-[54px] w-full max-w-[400px] items-center justify-center rounded-[17px] border-0 bg-[#FB8C74] text-[16px] font-medium text-white transition-colors hover:bg-[#f97d62] ${
                  isNotFound ? 'mt-6' : 'mt-6'
                }`}
              >
                {isNotFound ? 'تلاش مجدد' : isSystemError ? 'تلاش دوباره' : 'مشاهده وضعیت'}
              </button>

              <p className="mx-auto mt-3 max-w-[600px] text-center text-[14px] leading-7 text-[#616B80]">
                {isNotFound
                  ? 'کد پیگیری و ۴ رقم آخر شماره موبایل را دقیقاً مطابق ثبت‌نام وارد کن.'
                  : isSystemError
                    ? 'اگر خطا ادامه داشت، کمی بعد دوباره با همین اطلاعات تلاش کن.'
                    : 'این اطلاعات فقط برای تطبیق پرونده استفاده می‌شود و باید با اطلاعات ثبت‌نام یکسان باشد.'}
              </p>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
