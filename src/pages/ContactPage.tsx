import { FormEvent, useState } from 'react';
import { submitContactRequest } from '../lib/backend';

const LOGO_URL = '/ayenehevent/images/ayene-logo-figma-exact.png';

const fieldClass =
  'h-[54px] w-full rounded-[14px] border-[1.2px] border-[#E0C89F] bg-white px-4 text-right text-[15px] font-normal text-[#334061] outline-none transition focus:border-[#364E92]';

const subjectLabels: Record<string, string> = {
  registration: 'ثبت‌نام',
  issues: 'نظام مسائل',
  tracking: 'پیگیری',
  other: 'سایر',
};

function splitLocation(value: string) {
  const parts = value
    .split(/[،,]/)
    .map((part) => part.trim())
    .filter(Boolean);

  const province = parts[0] ?? '';
  const city = parts.slice(1).join('، ') || province;
  return { province, city };
}

function ContactStepsCard() {
  const steps = [
    { number: '۱', text: 'شماره‌ات را ثبت می‌کنی' },
    { number: '۲', text: 'درخواست برای تیم دبیرخانه ثبت می‌شود' },
    { number: '۳', text: 'تیم دبیرخانه با تو تماس می‌گیرد' },
  ];

  return (
    <aside className="w-full rounded-[24px] bg-[#182B5E] px-6 py-7 text-white lg:h-[430px] lg:w-[380px] lg:shrink-0 lg:px-11">
      <div className="mb-5 flex justify-start">
        <span className="inline-flex h-[34px] min-w-[168px] items-center justify-center rounded-[17px] bg-[#FDF1EC] px-5 text-[13px] font-medium text-[#FB8C74]">
          روند تماس
        </span>
      </div>

      <h2
        className="mb-7 text-right text-[22px] font-extrabold leading-[1.7] sm:text-[24px]"
        style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}
      >
        بعد از ثبت درخواست چه می‌شود؟
      </h2>

      <div className="space-y-5">
        {steps.map((step) => (
          <div key={step.number} className="flex items-center gap-4">
            <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full bg-[#FB8C74] text-[14px] font-medium text-white">
              {step.number}
            </div>
            <p className="text-right text-[15px] font-medium leading-6 text-white">{step.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-7 text-right text-[13px] leading-[22px] text-[#C9D1E3]">
        زمان تماس به حجم درخواست‌ها و موضوع پیگیری بستگی دارد.
      </p>
    </aside>
  );
}

function ContactForm({ onSuccess }: { onSuccess: (requestCode: string) => void }) {
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!consent || submitting) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get('fullName') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const location = String(data.get('location') ?? '').trim();
    const preferredTime = String(data.get('preferredTime') ?? '').trim();
    const subjectValue = String(data.get('subject') ?? '').trim();
    const note = String(data.get('note') ?? '').trim();
    const { province, city } = splitLocation(location);

    setSubmitting(true);
    try {
      const requestCode = await submitContactRequest({
        fullName,
        phone,
        province,
        city,
        preferredTime,
        subject: subjectLabels[subjectValue] ?? subjectValue,
        note,
      });
      onSuccess(requestCode);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'ثبت درخواست تماس ممکن نشد. دوباره تلاش کن.';
      window.alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-[26px] border-[1.4px] border-[#E0C89F] bg-white px-5 py-7 sm:px-8 lg:h-[490px] lg:w-[820px] lg:px-10"
    >
      <div className="mb-4 flex justify-start">
        <span className="inline-flex h-[34px] min-w-[148px] items-center justify-center rounded-[17px] bg-[#FDF1EC] px-5 text-[13px] font-medium text-[#FB8C74]">
          ثبت درخواست تماس
        </span>
      </div>

      <h2
        className="text-right text-[22px] font-extrabold text-[#182B5E] sm:text-[24px]"
        style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}
      >
        اطلاعات تماس
      </h2>
      <p className="mt-1 text-right text-[14px] text-[#616B80]">فقط اطلاعات لازم برای پیگیری تماس را وارد کن.</p>

      <div className="mt-7 grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
        <label className="text-right">
          <span className="mb-1 block text-[13px] font-medium text-[#334061]">نام و نام خانوادگی</span>
          <input className={fieldClass} name="fullName" type="text" placeholder="مثلاً مریم احمدی" required />
        </label>

        <label className="text-right">
          <span className="mb-1 block text-[13px] font-medium text-[#334061]">شماره تماس</span>
          <input className={fieldClass} name="phone" type="tel" inputMode="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷" required />
        </label>

        <label className="text-right">
          <span className="mb-1 block text-[13px] font-medium text-[#334061]">استان و شهر</span>
          <input className={fieldClass} name="location" type="text" placeholder="مثلاً تهران، تهران" required />
        </label>

        <label className="text-right">
          <span className="mb-1 block text-[13px] font-medium text-[#334061]">زمان مناسب تماس</span>
          <input className={fieldClass} name="preferredTime" type="text" placeholder="مثلاً ۹ تا ۱۲" required />
        </label>

        <label className="text-right">
          <span className="mb-1 block text-[13px] font-medium text-[#334061]">موضوع تماس</span>
          <select className={fieldClass} name="subject" defaultValue="" required>
            <option value="" disabled>
              ثبت‌نام / نظام مسائل / پیگیری / سایر
            </option>
            <option value="registration">ثبت‌نام</option>
            <option value="issues">نظام مسائل</option>
            <option value="tracking">پیگیری</option>
            <option value="other">سایر</option>
          </select>
        </label>

        <label className="text-right">
          <span className="mb-1 block text-[13px] font-medium text-[#334061]">توضیح کوتاه (اختیاری)</span>
          <input className={fieldClass} name="note" type="text" placeholder="موضوع یا سؤال را کوتاه بنویس" />
        </label>
      </div>

      <label className="mt-4 flex cursor-pointer items-start justify-start gap-2 text-right">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 h-[18px] w-[18px] accent-[#364E92]"
        />
        <span className="text-[12px] leading-6 text-[#616B80]">
          با ثبت درخواست، اطلاعات من فقط برای پیگیری و تماس دبیرخانه استفاده می‌شود.
        </span>
      </label>

      <div className="mt-4 flex justify-start">
        <button
          type="submit"
          disabled={!consent || submitting}
          className={`flex h-[54px] w-full items-center justify-center rounded-[16px] text-[16px] font-medium text-white transition sm:w-[240px] ${
            consent && !submitting ? 'cursor-pointer bg-[#FB8C74] hover:bg-[#f97d62]' : 'cursor-not-allowed bg-[#D9A99E]'
          }`}
        >
          {submitting ? 'در حال ثبت...' : 'ثبت درخواست تماس'}
        </button>
      </div>
    </form>
  );
}

function ContactSuccess({ requestCode }: { requestCode: string }) {
  return (
    <div className="flex min-h-[430px] w-full flex-col items-start justify-center rounded-[26px] border-[1.4px] border-[#E0C89F] bg-white px-6 py-8 text-right sm:px-10 lg:w-[820px] lg:px-10">
      <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-[#EDF7F0] text-[42px] font-medium text-[#2B7347]">
        ✓
      </div>

      <h2
        className="mt-6 text-[27px] font-extrabold text-[#182B5E] sm:text-[30px]"
        style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}
      >
        درخواست تماس ثبت شد
      </h2>

      <p className="mt-4 max-w-[600px] text-[16px] leading-7 text-[#334061]">
        اطلاعاتت برای دبیرخانه ثبت شد. تیم مربوطه بر اساس موضوع درخواست با تو تماس می‌گیرد.
      </p>

      <div className="mt-6 flex h-[58px] w-full max-w-[540px] items-center rounded-[14px] bg-[#F6F8FC] px-5 text-[14px] font-medium text-[#364E92]">
        کد درخواست: {requestCode}
      </div>

      <a
        href="#home"
        className="mt-7 flex h-[54px] w-full max-w-[240px] items-center justify-center rounded-[16px] bg-[#FB8C74] text-[15px] font-medium text-white transition hover:bg-[#f97d62]"
      >
        بازگشت به صفحه اصلی
      </a>
    </div>
  );
}

export function ContactPage() {
  const [requestCode, setRequestCode] = useState<string | null>(null);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FBFAF7] text-[#182B5E]"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      <header className="bg-white">
        <div className="mx-auto flex min-h-[104px] w-full max-w-[1440px] items-center justify-between border-b border-[#E0C89F] px-6 sm:px-8 lg:px-[100px]">
          <div className="flex h-[58px] w-[170px] items-center justify-center rounded-[8px] border-2 border-[#333] bg-white sm:h-[78px] sm:w-[230px]">
            <img
              src={LOGO_URL}
              alt="رویداد ملی خلاقیت و نوآوری آینه"
              className="h-full w-full rounded-[8px] object-contain"
            />
          </div>

          <a
            href="#home"
            className="flex h-[52px] w-[160px] items-center justify-center rounded-[16px] border-[1.2px] border-[#364E92] bg-white text-[13px] font-medium text-[#364E92] sm:w-[220px] sm:text-[15px]"
          >
            بازگشت به صفحه اصلی
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-6 pb-8 pt-11 sm:px-8 lg:px-[100px]">
        <div className="flex justify-start">
          <span className="inline-flex h-[34px] min-w-[158px] items-center justify-center rounded-[17px] bg-[#FDF1EC] px-5 text-[13px] font-medium text-[#FB8C74]">
            تماس با دبیرخانه
          </span>
        </div>

        <h1
          className="mt-4 text-right text-[32px] font-extrabold leading-[1.7] text-[#182B5E] sm:text-[38px]"
          style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}
        >
          درخواست تماس از دبیرخانه
        </h1>
        <div className="ml-auto mt-2 h-[5px] w-[72px] rounded-[3px] bg-[#FB8C74]" />
        <p className="ml-auto mt-5 max-w-[690px] text-right text-[17px] leading-[30px] text-[#334061] sm:text-[18px]">
          شماره و اطلاعات لازم را ثبت کن؛ تیم دبیرخانه بر اساس درخواستت با تو تماس می‌گیرد.
        </p>

        <div className="mt-4 flex flex-col gap-10 lg:flex-row">
          {requestCode ? <ContactSuccess requestCode={requestCode} /> : <ContactForm onSuccess={setRequestCode} />}
          <ContactStepsCard />
        </div>

        <div className="mt-14 border-t border-[#E0C89F] pt-3 text-right text-[12px] text-[#616B80]">
          رویداد ملی آینه
        </div>
      </main>
    </div>
  );
}
