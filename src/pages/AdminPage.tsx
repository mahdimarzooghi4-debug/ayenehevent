import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  Check,
  Copy,
  FileText,
  LogOut,
  Phone,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

const LOGO_URL = '/ayenehevent/images/ayene-logo-figma-exact.png';

const registrations = [
  {
    code: 'AY-1405-00128',
    name: 'مریم احمدی',
    phone: '۰۹۱۲ *** ۴۵۶۷',
    axis: 'امور فرهنگی',
    issue: 'مسئله منتخب',
    route: 'ایده / راهکار دارم',
    status: 'در حال بررسی',
    detailStatus: 'در حال بررسی اولیه',
    registeredAt: '۱۴۰۵/۰۶/۱۵ • ۱۴:۳۲',
    fileName: 'ayene-proposal-00128.pdf',
    fileMeta: '۲.۴ مگابایت • بارگذاری ۱۴۰۵/۰۶/۱۵',
    message: 'پرونده دریافت شده و در مرحله بررسی اولیه است.',
  },
  {
    code: 'AY-1405-00127',
    name: 'علی رضایی',
    phone: '۰۹۱۱ *** ۲۳۴۵',
    axis: 'اشتغال پایدار',
    issue: 'مسئله منتخب',
    route: 'تجربه اجرایی دارم',
    status: 'نیاز به تکمیل',
    detailStatus: 'نیازمند تکمیل اطلاعات',
    registeredAt: '۱۴۰۵/۰۶/۱۵ • ۱۳:۱۰',
    fileName: 'ayene-proposal-00127.pdf',
    fileMeta: '۱.۸ مگابایت • بارگذاری ۱۴۰۵/۰۶/۱۵',
    message: 'بخشی از اطلاعات پرونده نیازمند تکمیل است.',
  },
  {
    code: 'AY-1405-00126',
    name: 'سارا محمدی',
    phone: '۰۹۳۵ *** ۷۸۹۰',
    axis: 'حمایت از خانواده',
    issue: 'مسئله منتخب',
    route: 'ایده / راهکار دارم',
    status: 'مرحله بعد',
    detailStatus: 'مرحله بعد',
    registeredAt: '۱۴۰۵/۰۶/۱۴ • ۱۷:۲۰',
    fileName: 'ayene-proposal-00126.pdf',
    fileMeta: '۳.۱ مگابایت • بارگذاری ۱۴۰۵/۰۶/۱۴',
    message: 'پرونده برای مرحله بعد آماده شده است.',
  },
  {
    code: 'AY-1405-00125',
    name: 'محمد کریمی',
    phone: '۰۹۱۹ *** ۳۴۱۲',
    axis: 'مشارکت‌های مردمی',
    issue: 'مسئله منتخب',
    route: 'تجربه اجرایی دارم',
    status: 'بررسی اولیه',
    detailStatus: 'بررسی اولیه',
    registeredAt: '۱۴۰۵/۰۶/۱۴ • ۱۰:۴۰',
    fileName: 'ayene-proposal-00125.pdf',
    fileMeta: '۲.۰ مگابایت • بارگذاری ۱۴۰۵/۰۶/۱۴',
    message: 'پرونده در صف ارزیابی اولیه قرار گرفته است.',
  },
  {
    code: 'AY-1405-00124',
    name: 'نرگس موسوی',
    phone: '۰۹۹۰ *** ۱۱۲۲',
    axis: 'امور حقوقی',
    issue: 'مسئله منتخب',
    route: 'ایده / راهکار دارم',
    status: 'ثبت‌شده',
    detailStatus: 'ثبت‌شده',
    registeredAt: '۱۴۰۵/۰۶/۱۳ • ۱۶:۰۵',
    fileName: 'ayene-proposal-00124.pdf',
    fileMeta: '۱.۶ مگابایت • بارگذاری ۱۴۰۵/۰۶/۱۳',
    message: 'پرونده با موفقیت دریافت شده است.',
  },
];

const contactRequests = [
  {
    code: 'تماس-۰۱۲۸',
    name: 'مریم احمدی',
    phone: '۰۹۱۲۱۲۳۴۵۶۷',
    phoneMasked: '۰۹۱۲ *** ۴۵۶۷',
    subject: 'ثبت‌نام',
    city: 'تهران، تهران',
    preferredTime: '۹ تا ۱۲',
    status: 'جدید',
    note: 'برای تکمیل ثبت‌نام و شرایط ارسال فایل راهنمایی می‌خواهم.',
    createdAt: '۱۴۰۵/۰۶/۱۵ • ۱۴:۳۲',
    internalNote: 'تماس اول برقرار نشد؛ پیگیری مجدد ساعت ۱۱ انجام شود.',
  },
  {
    code: 'تماس-۰۱۲۷',
    name: 'علی رضایی',
    phone: '۰۹۱۱۲۳۴۲۳۴۵',
    phoneMasked: '۰۹۱۱ *** ۲۳۴۵',
    subject: 'نظام مسائل',
    city: 'گیلان، رشت',
    preferredTime: '۱۴ تا ۱۷',
    status: 'در حال پیگیری',
    note: 'درباره انتخاب مسئله مناسب سؤال دارم.',
    createdAt: '۱۴۰۵/۰۶/۱۵ • ۱۲:۱۵',
    internalNote: 'پیگیری توسط دبیرخانه در حال انجام است.',
  },
  {
    code: 'تماس-۰۱۲۶',
    name: 'سارا محمدی',
    phone: '۰۹۳۵۶۷۸۷۸۹۰',
    phoneMasked: '۰۹۳۵ *** ۷۸۹۰',
    subject: 'پیگیری',
    city: 'فارس، شیراز',
    preferredTime: '۱۰ تا ۱۳',
    status: 'تماس گرفته شد',
    note: 'برای پیگیری وضعیت پرونده تماس می‌خواهم.',
    createdAt: '۱۴۰۵/۰۶/۱۴ • ۱۸:۴۰',
    internalNote: 'تماس انجام و راهنمایی لازم ارائه شد.',
  },
  {
    code: 'تماس-۰۱۲۵',
    name: 'محمد کریمی',
    phone: '۰۹۱۹۳۴۱۳۴۱۲',
    phoneMasked: '۰۹۱۹ *** ۳۴۱۲',
    subject: 'سایر',
    city: 'قم، قم',
    preferredTime: '۸ تا ۱۰',
    status: 'بسته شد',
    note: 'سؤال عمومی درباره روند رویداد.',
    createdAt: '۱۴۰۵/۰۶/۱۴ • ۰۹:۲۰',
    internalNote: 'درخواست پاسخ داده شد و بسته شد.',
  },
  {
    code: 'تماس-۰۱۲۴',
    name: 'نرگس موسوی',
    phone: '۰۹۹۰۱۱۲۱۱۲۲',
    phoneMasked: '۰۹۹۰ *** ۱۱۲۲',
    subject: 'ثبت‌نام',
    city: 'خراسان رضوی، مشهد',
    preferredTime: '۱۶ تا ۱۹',
    status: 'جدید',
    note: 'در مورد مدارک موردنیاز ثبت‌نام سؤال دارم.',
    createdAt: '۱۴۰۵/۰۶/۱۳ • ۱۶:۵۵',
    internalNote: 'هنوز پیگیری نشده است.',
  },
];

type SidebarKey = 'files' | 'search' | 'contacts' | 'settings';

type RegistrationUpdate = {
  code: string;
  status: string;
  message: string;
};

type ContactUpdate = {
  code: string;
  status: string;
  note: string;
};

const titleStyle = { fontFamily: 'Estedad, Vazirmatn, sans-serif' };
const cardClass =
  'rounded-[18px] border border-[#E7EAF2] bg-white shadow-[0_8px_22px_rgba(24,43,94,0.06)]';
const outlineButtonClass =
  'inline-flex items-center justify-center rounded-[14px] border-[1.2px] border-[#364E92] bg-white font-medium text-[#364E92] transition hover:bg-[#F6F8FD]';
const primaryButtonClass =
  'inline-flex items-center justify-center rounded-[14px] bg-[#FB8C74] font-medium text-white transition hover:bg-[#f97d62]';
const fieldClass =
  'h-[54px] w-full rounded-[14px] border-[1.2px] border-[#E0C89F] bg-white px-5 text-right text-[15px] text-[#182B5E] outline-none focus:border-[#364E92]';

function navigateAdmin(path: string) {
  window.location.hash = `#admin/${path}`;
}

function getAdminPath() {
  const hash = window.location.hash;
  if (!hash.startsWith('#admin')) return '';
  return hash.slice('#admin'.length).replace(/^\/+/, '');
}

function statusTone(status: string) {
  if (status.includes('نیاز') || status === 'در حال پیگیری') {
    return 'bg-[#FDEDE8] text-[#C95E4B]';
  }
  if (status === 'در حال بررسی' || status === 'جدید') {
    return 'bg-[#FFF4E6] text-[#9A6418]';
  }
  if (status === 'تماس گرفته شد' || status === 'مرحله بعد') {
    return 'bg-[#EEF2FF] text-[#364E92]';
  }
  return 'bg-[#F2F5FB] text-[#364E92]';
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex h-7 min-w-[110px] items-center justify-center rounded-full px-4 text-[12px] font-medium ${statusTone(
        status,
      )}`}
    >
      {status}
    </span>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className={`${cardClass} h-[110px] w-full px-6 py-4 lg:w-[300px]`}>
      <p className="text-[14px] text-[#6B7280]">{label}</p>
      <p className="mt-1 text-[28px] font-extrabold text-[#182B5E]" style={titleStyle}>
        {value}
      </p>
    </div>
  );
}

function Sidebar({ active, onLogout }: { active: SidebarKey; onLogout: () => void }) {
  const items: Array<{
    key: SidebarKey;
    label: string;
    icon: ReactNode;
    path: string;
  }> = [
    { key: 'files', label: 'پرونده‌ها', icon: <FileText size={18} strokeWidth={1.8} />, path: 'files' },
    { key: 'search', label: 'جست‌وجو و پیگیری', icon: <Search size={18} strokeWidth={1.8} />, path: 'search' },
    { key: 'contacts', label: 'درخواست‌های تماس', icon: <Phone size={18} strokeWidth={1.8} />, path: 'contacts' },
    { key: 'settings', label: 'تنظیمات', icon: <SlidersHorizontal size={18} strokeWidth={1.8} />, path: 'settings' },
  ];

  return (
    <aside className="w-full shrink-0 bg-[#FAF9F7] lg:min-h-[960px] lg:w-[260px]">
      <div className="mx-auto flex w-full max-w-[260px] flex-col px-6 pb-6 pt-[18px] lg:px-6">
        <div className="mx-auto flex h-[70px] w-[210px] items-center justify-center">
          <img src={LOGO_URL} alt="رویداد آینه" className="h-full w-full object-contain" />
        </div>
        <p className="mt-[19px] text-center text-[13px] text-[#182B5E]">پنل مدیریت رویداد</p>

        <nav className="mt-[19px] space-y-[14px]">
          {items.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => navigateAdmin(item.path)}
                className={`flex h-11 w-full items-center gap-4 rounded-[12px] px-4 text-right text-[15px] font-medium transition ${
                  isActive ? 'bg-[#FDF1EC] text-[#FB8C74]' : 'text-[#364E92] hover:bg-[#F6F8FD]'
                }`}
              >
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-10 h-px w-full bg-[#E0C89F]/80" />
        <button
          type="button"
          onClick={onLogout}
          className="mt-3 flex h-11 items-center gap-4 rounded-[12px] px-4 text-[14px] text-[#C95E4B] transition hover:bg-[#FDF1EC]"
        >
          <LogOut size={18} strokeWidth={1.8} />
          <span>خروج از پنل</span>
        </button>
      </div>
    </aside>
  );
}

function AdminShell({
  active,
  onLogout,
  children,
}: {
  active: SidebarKey;
  onLogout: () => void;
  children: ReactNode;
}) {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F7F8FB] text-[#182B5E]"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col lg:flex-row">
        <Sidebar active={active} onLogout={onLogout} />
        <main className="min-w-0 flex-1 px-5 pb-14 pt-7 sm:px-8 lg:min-h-[960px] lg:w-[1180px] lg:flex-none lg:pl-[80px] lg:pr-[90px] lg:pt-[30px]">
          {children}
        </main>
      </div>
    </div>
  );
}

function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-right">
      <h1 className="text-[30px] font-extrabold leading-[46px] text-[#182B5E]" style={titleStyle}>
        {title}
      </h1>
      <p className="mt-1 text-[14px] leading-[30px] text-[#6B7280]">{subtitle}</p>
    </div>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <div
      dir="ltr"
      className="min-h-screen bg-[#F7F8FB]"
      style={{ fontFamily: "'Vazirmatn', sans-serif" }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] items-stretch lg:min-h-[960px]">
        <section dir="rtl" className="hidden w-[560px] shrink-0 bg-[#FAF9F7] lg:block">
          <div className="flex h-full flex-col items-center">
            <div className="mt-16 flex h-[130px] w-[390px] items-center justify-center">
              <img src={LOGO_URL} alt="رویداد آینه" className="h-full w-full object-contain" />
            </div>
            <h1 className="mt-[239px] w-[390px] text-center text-[34px] font-extrabold text-[#182B5E]" style={titleStyle}>
              پنل مدیریت رویداد آینه
            </h1>
          </div>
        </section>

        <section dir="rtl" className="flex flex-1 items-center justify-center px-5 py-10 lg:items-start lg:pt-[150px]">
          <form onSubmit={handleSubmit} className={`${cardClass} min-h-[560px] w-full max-w-[560px] px-7 py-12 sm:px-[60px] lg:h-[640px]`}>
            <h2 className="text-right text-[30px] font-extrabold text-[#182B5E]" style={titleStyle}>
              ورود به پنل مدیریت
            </h2>
            <p className="mt-1 text-right text-[15px] text-[#6B7280]">اطلاعات حساب مدیر را وارد کن.</p>

            <label className="mt-8 block text-right">
              <span className="mb-2 block text-[14px] font-medium text-[#182B5E]">نام کاربری</span>
              <input className={fieldClass} type="text" autoComplete="username" required />
            </label>
            <label className="mt-6 block text-right">
              <span className="mb-2 block text-[14px] font-medium text-[#182B5E]">رمز عبور</span>
              <input className={fieldClass} type="password" autoComplete="current-password" required />
            </label>

            <button type="submit" className={`${primaryButtonClass} mt-10 h-14 w-full text-[15px]`}>
              ورود به پنل
            </button>
            <p className="mt-5 text-center text-[13px] leading-7 text-[#6B7280]">
              دسترسی این بخش فقط برای مدیران مجاز سامانه است.
            </p>
          </form>
        </section>
      </div>
    </div>
  );
}

function RegistrationList() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('همه وضعیت‌ها');

  const filtered = useMemo(() => {
    return registrations.filter((item) => {
      const matchesQuery = !query || item.name.includes(query) || item.code.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === 'همه وضعیت‌ها' || item.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  return (
    <>
      <PageHeading title="پرونده‌های ثبت‌نام" subtitle="مشاهده، جست‌وجو و بررسی فایل‌های دریافت‌شده" />

      <div className="mt-[30px] grid gap-[30px] sm:grid-cols-3 lg:ml-auto lg:w-[960px]">
        <MetricCard label="کل پرونده‌ها" value="۱۲۸" />
        <MetricCard label="نیازمند بررسی" value="۲۴" />
        <MetricCard label="به‌روزشده امروز" value="۷" />
      </div>

      <div className="mt-[30px] flex min-h-[66px] flex-col gap-3 rounded-[16px] border border-[#E7EAF2] bg-white p-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جست‌وجو با نام یا کد پیگیری"
          className="h-[42px] flex-1 rounded-[12px] bg-[#F2F5FC] px-5 text-right text-[13px] text-[#334061] outline-none"
        />
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="h-[42px] rounded-[12px] border border-[#E0C89F] bg-white px-4 text-[13px] font-medium text-[#182B5E] outline-none sm:w-[190px]"
        >
          <option>همه وضعیت‌ها</option>
          <option>در حال بررسی</option>
          <option>نیاز به تکمیل</option>
          <option>مرحله بعد</option>
          <option>بررسی اولیه</option>
          <option>ثبت‌شده</option>
        </select>
        <button type="button" className={`${outlineButtonClass} h-[42px] text-[15px] sm:w-[150px]`}>
          جست‌وجو
        </button>
      </div>

      <div className={`${cardClass} mt-7 overflow-x-auto p-4 sm:p-6`}>
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[1.25fr_1.15fr_1fr_.8fr_.9fr] border-b border-[#E7EAF2] pb-3 text-[13px] font-medium text-[#6B7280]">
            <span>نام و نام خانوادگی</span>
            <span>کد پیگیری</span>
            <span>محور</span>
            <span>فایل</span>
            <span className="text-center">وضعیت</span>
          </div>
          {filtered.map((item, index) => (
            <button
              type="button"
              key={item.code}
              onClick={() => navigateAdmin(`file/${encodeURIComponent(item.code)}`)}
              className={`grid min-h-[78px] w-full grid-cols-[1.25fr_1.15fr_1fr_.8fr_.9fr] items-center border-b border-[#E7EAF2] text-right text-[14px] transition hover:bg-[#F8F9FD] ${
                index % 2 ? 'bg-[#FAFBFD]' : 'bg-white'
              }`}
            >
              <span className="font-medium text-[#334061]">{item.name}</span>
              <span className="font-medium text-[#182B5E]" dir="ltr">{item.code}</span>
              <span className="text-[#334061]">{item.axis}</span>
              <span className="font-medium text-[#364E92]">مشاهده فایل</span>
              <span className="text-center"><StatusBadge status={item.status} /></span>
            </button>
          ))}
          <p className="pt-3 text-[12px] text-[#6B7280]">برای مشاهده جزئیات، یک پرونده را انتخاب کن.</p>
        </div>
      </div>
    </>
  );
}

function InfoPair({ label, value, ltr = false }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div>
      <p className="text-[12px] text-[#6B7280]">{label}</p>
      <p className="mt-1 text-[14px] font-medium text-[#182B5E]" dir={ltr ? 'ltr' : undefined}>
        {value}
      </p>
    </div>
  );
}

function RegistrationDetail({
  item,
  onSubmit,
}: {
  item: (typeof registrations)[number];
  onSubmit: (update: RegistrationUpdate) => void;
}) {
  const [nextStatus, setNextStatus] = useState('نیازمند تکمیل اطلاعات');
  const [message, setMessage] = useState(
    'لطفاً بخش شواهد میدانی و سوابق تیم را تکمیل و فایل اصلاح‌شده را بارگذاری کنید.',
  );

  return (
    <>
      <div className="flex items-start justify-between gap-5">
        <PageHeading title="جزئیات پرونده" subtitle="اطلاعات متقاضی، فایل ارسالی و وضعیت قابل نمایش" />
        <button type="button" onClick={() => navigateAdmin('files')} className={`${outlineButtonClass} mt-2 h-[42px] w-[150px] text-[15px]`}>
          بازگشت
        </button>
      </div>

      <section className={`${cardClass} mt-[28px] p-6`}>
        <h2 className="text-[20px] font-extrabold text-[#182B5E]" style={titleStyle}>اطلاعات پرونده</h2>
        <div className="mt-5 grid gap-x-12 gap-y-5 sm:grid-cols-3">
          <InfoPair label="نام متقاضی" value={item.name} />
          <InfoPair label="کد پیگیری" value={item.code} ltr />
          <InfoPair label="شماره تماس" value={item.phone} />
          <InfoPair label="مسیر ورود" value={item.route} />
          <InfoPair label="محور / مسئله" value={`${item.axis} • ${item.issue}`} />
          <InfoPair label="زمان ثبت" value={item.registeredAt} />
        </div>
      </section>

      <div className="mt-7 grid gap-[30px] lg:grid-cols-2">
        <div className="space-y-7">
          <section className={`${cardClass} min-h-[220px] p-6`}>
            <h2 className="text-[20px] font-extrabold" style={titleStyle}>فایل دریافتی</h2>
            <div className="mt-5 rounded-[14px] bg-[#F2F5FC] px-5 py-4">
              <p className="text-[14px] font-medium text-[#182B5E]" dir="ltr">{item.fileName}</p>
              <p className="mt-1 text-[12px] text-[#6B7280]">{item.fileMeta}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button type="button" className={`${outlineButtonClass} h-[42px] text-[14px]`}>دانلود فایل</button>
              <button type="button" className={`${outlineButtonClass} h-[42px] text-[14px]`}>مشاهده اطلاعات فرم</button>
            </div>
          </section>

          <section className={`${cardClass} min-h-[168px] p-6`}>
            <h2 className="text-[18px] font-extrabold" style={titleStyle}>آخرین تغییرات</h2>
            <p className="mt-4 text-[13px] text-[#334061]">۱۴۰۵/۰۶/۱۶ • ۱۰:۲۰ &nbsp; • &nbsp; ثبت‌شده</p>
            <p className="mt-3 text-[13px] leading-7 text-[#6B7280]">{item.message}</p>
          </section>
        </div>

        <section className={`${cardClass} min-h-[416px] p-6`}>
          <h2 className="text-[20px] font-extrabold" style={titleStyle}>وضعیت پرونده</h2>
          <label className="mt-5 block">
            <span className="mb-2 block text-[13px] text-[#6B7280]">وضعیت فعلی</span>
            <div className={`${fieldClass} flex items-center`}>{item.detailStatus}</div>
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-[13px] text-[#6B7280]">وضعیت جدید</span>
            <select value={nextStatus} onChange={(event) => setNextStatus(event.target.value)} className={fieldClass}>
              <option>نیازمند تکمیل اطلاعات</option>
              <option>در حال بررسی اولیه</option>
              <option>مرحله بعد</option>
              <option>تأییدشده</option>
            </select>
          </label>
          <label className="mt-4 block">
            <span className="mb-2 block text-[13px] text-[#6B7280]">پیام برای متقاضی</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="h-[70px] w-full resize-none rounded-[14px] border-[1.2px] border-[#E0C89F] bg-white px-4 py-3 text-[13px] leading-6 text-[#334061] outline-none focus:border-[#364E92]"
            />
          </label>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <button type="button" className={`${outlineButtonClass} h-[50px] text-[15px]`}>ذخیره پیش‌نویس</button>
            <button type="button" onClick={() => onSubmit({ code: item.code, status: nextStatus, message })} className={`${primaryButtonClass} h-[50px] text-[15px]`}>
              ثبت و اطلاع‌رسانی
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

function SuccessPanel({
  title,
  body,
  codeLabel,
  code,
  statusLabel,
  status,
  message,
  primaryText,
  primaryPath,
  secondaryText,
  secondaryPath,
}: {
  title: string;
  body: string;
  codeLabel: string;
  code: string;
  statusLabel: string;
  status: string;
  message: string;
  primaryText: string;
  primaryPath: string;
  secondaryText: string;
  secondaryPath: string;
}) {
  return (
    <div className={`${cardClass} mx-auto mt-14 flex min-h-[650px] w-full max-w-[820px] flex-col items-center px-7 py-14 text-center`}>
      <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-[#EAF7EF] text-[#2E7D4A]">
        <Check size={54} strokeWidth={2.2} />
      </div>
      <h2 className="mt-6 text-[28px] font-extrabold text-[#182B5E]" style={titleStyle}>{title}</h2>
      <p className="mt-3 max-w-[580px] text-[15px] leading-7 text-[#6B7280]">{body}</p>
      <div className="mt-7 w-full max-w-[540px] rounded-[16px] border border-[#E0C89F] bg-[#F2F5FC] px-6 py-3">
        <p className="text-[12px] text-[#6B7280]">{codeLabel}</p>
        <p className="mt-1 text-[16px] font-medium text-[#182B5E]" dir="ltr">{code}</p>
      </div>
      <div className="mt-5 w-full max-w-[540px] rounded-[16px] border-[1.2px] border-[#364E92] bg-white px-6 py-3">
        <p className="text-[12px] text-[#6B7280]">{statusLabel}</p>
        <p className="mt-1 text-[16px] font-medium text-[#182B5E]">{status}</p>
        <p className="mt-2 text-[13px] leading-6 text-[#6B7280]">{message}</p>
      </div>
      <div className="mt-8 flex w-full max-w-[540px] flex-col-reverse gap-4 sm:flex-row">
        <button type="button" onClick={() => navigateAdmin(secondaryPath)} className={`${outlineButtonClass} h-[50px] flex-1 text-[15px]`}>{secondaryText}</button>
        <button type="button" onClick={() => navigateAdmin(primaryPath)} className={`${primaryButtonClass} h-[50px] flex-1 text-[15px]`}>{primaryText}</button>
      </div>
    </div>
  );
}

function SearchPage() {
  const [query, setQuery] = useState('AY-1405-00128');
  const [submittedQuery, setSubmittedQuery] = useState('AY-1405-00128');
  const result = useMemo(() => {
    const normalized = submittedQuery.trim().toLowerCase();
    if (!normalized) return undefined;
    return registrations.find(
      (item) =>
        item.code.toLowerCase().includes(normalized) ||
        item.name.includes(submittedQuery.trim()) ||
        item.phone.includes(submittedQuery.trim()),
    );
  }, [submittedQuery]);

  return (
    <>
      <PageHeading title="جست‌وجو و پیگیری" subtitle="پیدا کردن پرونده با نام، شماره تماس یا کد پیگیری" />
      <section className={`${cardClass} mt-[28px] min-h-[132px] p-5`}>
        <p className="text-[15px] font-medium">جست‌وجوی پرونده</p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input value={query} onChange={(event) => setQuery(event.target.value)} className="h-12 flex-1 rounded-[12px] bg-[#F2F5FC] px-5 text-[14px] text-[#334061] outline-none" />
          <button type="button" onClick={() => setSubmittedQuery(query)} className="h-12 rounded-[14px] bg-[#364E92] px-8 text-[15px] font-medium text-white sm:w-[220px]">جست‌وجو</button>
        </div>
      </section>

      <section className={`${cardClass} mt-7 min-h-[526px] p-6`}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[24px] font-extrabold" style={titleStyle}>نتیجه جست‌وجو</h2>
          <span className="text-[13px] text-[#6B7280]">{result ? '۱ پرونده پیدا شد' : 'پرونده‌ای پیدا نشد'}</span>
        </div>
        {result ? (
          <>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div className="rounded-[14px] bg-[#F2F5FC] p-4"><InfoPair label="نام و نام خانوادگی" value={result.name} /></div>
              <div className="rounded-[14px] bg-[#F2F5FC] p-4"><InfoPair label="کد پیگیری" value={result.code} ltr /></div>
              <div className="rounded-[14px] bg-[#FFF4E6] p-4"><InfoPair label="وضعیت پرونده" value={result.status} /></div>
            </div>
            <div className="mt-7 grid gap-x-12 gap-y-6 sm:grid-cols-2">
              <InfoPair label="شماره تماس" value={result.phone} />
              <InfoPair label="محور و مسئله" value={`${result.axis} • ${result.issue}`} />
              <InfoPair label="آخرین به‌روزرسانی" value="۱۴۰۵/۰۶/۱۷ • ۱۶:۲۰" />
              <InfoPair label="پیام وضعیت" value={result.message} />
            </div>
            <button type="button" onClick={() => navigateAdmin(`file/${encodeURIComponent(result.code)}`)} className={`${primaryButtonClass} mt-10 h-[50px] px-10 text-[15px]`}>
              مشاهده جزئیات پرونده
            </button>
          </>
        ) : (
          <div className="flex min-h-[390px] items-center justify-center text-[14px] text-[#6B7280]">نتیجه‌ای برای این جست‌وجو وجود ندارد.</div>
        )}
      </section>
    </>
  );
}

function ContactList() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('همه وضعیت‌ها');
  const filtered = useMemo(() => contactRequests.filter((item) => {
    const matchesQuery = !query || item.name.includes(query) || item.code.includes(query);
    return matchesQuery && (status === 'همه وضعیت‌ها' || item.status === status);
  }), [query, status]);

  return (
    <>
      <PageHeading title="درخواست‌های تماس" subtitle="مشاهده، جست‌وجو و پیگیری درخواست‌های تماس دبیرخانه" />
      <div className="mt-[30px] grid gap-[30px] sm:grid-cols-3 lg:ml-auto lg:w-[960px]">
        <MetricCard label="کل درخواست‌ها" value="۴۶" />
        <MetricCard label="نیازمند پیگیری" value="۹" />
        <MetricCard label="به‌روزشده امروز" value="۵" />
      </div>
      <div className="mt-[30px] flex min-h-[66px] flex-col gap-3 rounded-[16px] border border-[#E7EAF2] bg-white p-3 sm:flex-row sm:items-center">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجو با نام یا کد درخواست" className="h-[42px] flex-1 rounded-[12px] bg-[#F2F5FC] px-5 text-[13px] outline-none" />
        <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-[42px] rounded-[12px] border border-[#E0C89F] bg-white px-4 text-[13px] font-medium outline-none sm:w-[190px]">
          <option>همه وضعیت‌ها</option><option>جدید</option><option>در حال پیگیری</option><option>تماس گرفته شد</option><option>بسته شد</option>
        </select>
        <button type="button" className={`${outlineButtonClass} h-[42px] text-[15px] sm:w-[150px]`}>جست‌وجو</button>
      </div>
      <div className={`${cardClass} mt-7 overflow-x-auto p-4 sm:p-6`}>
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[1.2fr_1.1fr_.9fr_1fr_.9fr] border-b border-[#E7EAF2] pb-3 text-[13px] font-medium text-[#6B7280]">
            <span>نام و نام خانوادگی</span><span>کد درخواست</span><span>موضوع</span><span>شماره تماس</span><span className="text-center">وضعیت</span>
          </div>
          {filtered.map((item, index) => (
            <button key={item.code} type="button" onClick={() => navigateAdmin(`contact/${encodeURIComponent(item.code)}`)} className={`grid min-h-[78px] w-full grid-cols-[1.2fr_1.1fr_.9fr_1fr_.9fr] items-center border-b border-[#E7EAF2] text-right text-[14px] transition hover:bg-[#F8F9FD] ${index % 2 ? 'bg-[#FAFBFD]' : 'bg-white'}`}>
              <span className="font-medium text-[#334061]">{item.name}</span><span className="font-medium text-[#182B5E]">{item.code}</span><span>{item.subject}</span><span className="text-[#364E92]">{item.phoneMasked}</span><span className="text-center"><StatusBadge status={item.status} /></span>
            </button>
          ))}
          <p className="pt-3 text-[12px] text-[#6B7280]">برای مشاهده جزئیات، یک درخواست را انتخاب کن.</p>
        </div>
      </div>
    </>
  );
}

function ContactDetail({ item, onSubmit }: { item: (typeof contactRequests)[number]; onSubmit: (update: ContactUpdate) => void }) {
  const [nextStatus, setNextStatus] = useState('در حال پیگیری');
  const [note, setNote] = useState(item.internalNote);
  const copyPhone = () => navigator.clipboard?.writeText(item.phone);

  return (
    <>
      <div className="flex items-start justify-between gap-5">
        <PageHeading title="جزئیات درخواست تماس" subtitle="اطلاعات درخواست‌دهنده، موضوع تماس و وضعیت پیگیری" />
        <button type="button" onClick={() => navigateAdmin('contacts')} className={`${outlineButtonClass} mt-2 h-[42px] w-[150px] text-[15px]`}>بازگشت</button>
      </div>
      <section className={`${cardClass} mt-[28px] p-6`}>
        <h2 className="text-[20px] font-extrabold" style={titleStyle}>اطلاعات درخواست</h2>
        <div className="mt-5 grid gap-x-12 gap-y-5 sm:grid-cols-3">
          <InfoPair label="نام درخواست‌دهنده" value={item.name} /><InfoPair label="کد درخواست" value={item.code} /><InfoPair label="شماره تماس" value={item.phone} />
          <InfoPair label="استان و شهر" value={item.city} /><InfoPair label="موضوع تماس" value={item.subject} /><InfoPair label="زمان مناسب تماس" value={item.preferredTime} />
        </div>
      </section>
      <div className="mt-7 grid gap-[30px] lg:grid-cols-2">
        <div className="space-y-7">
          <section className={`${cardClass} min-h-[220px] p-6`}>
            <h2 className="text-[20px] font-extrabold" style={titleStyle}>توضیح درخواست</h2>
            <div className="mt-5 rounded-[14px] bg-[#F2F5FC] px-5 py-4">
              <p className="text-[14px] font-medium leading-7">{item.note}</p><p className="mt-1 text-[12px] text-[#6B7280]">ثبت‌شده در {item.createdAt}</p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button type="button" onClick={copyPhone} className={`${outlineButtonClass} h-[42px] gap-2 text-[14px]`}><Copy size={15} />کپی شماره تماس</button>
              <button type="button" className={`${outlineButtonClass} h-[42px] text-[14px]`}>مشاهده اطلاعات فرم</button>
            </div>
          </section>
          <section className={`${cardClass} min-h-[168px] p-6`}>
            <h2 className="text-[18px] font-extrabold" style={titleStyle}>یادداشت داخلی</h2><p className="mt-4 text-[13px] text-[#334061]">۱۴۰۵/۰۶/۱۶ • ۱۰:۲۰ &nbsp; • &nbsp; ثبت‌شده</p><p className="mt-3 text-[13px] leading-7 text-[#6B7280]">{item.internalNote}</p>
          </section>
        </div>
        <section className={`${cardClass} min-h-[416px] p-6`}>
          <h2 className="text-[20px] font-extrabold" style={titleStyle}>وضعیت پیگیری</h2>
          <label className="mt-5 block"><span className="mb-2 block text-[13px] text-[#6B7280]">وضعیت فعلی</span><div className={`${fieldClass} flex items-center`}>{item.status}</div></label>
          <label className="mt-4 block"><span className="mb-2 block text-[13px] text-[#6B7280]">وضعیت جدید</span><select value={nextStatus} onChange={(event) => setNextStatus(event.target.value)} className={fieldClass}><option>در حال پیگیری</option><option>تماس گرفته شد</option><option>بسته شد</option><option>جدید</option></select></label>
          <label className="mt-4 block"><span className="mb-2 block text-[13px] text-[#6B7280]">یادداشت داخلی</span><textarea value={note} onChange={(event) => setNote(event.target.value)} className="h-[70px] w-full resize-none rounded-[14px] border-[1.2px] border-[#E0C89F] px-4 py-3 text-[13px] leading-6 text-[#334061] outline-none focus:border-[#364E92]" /></label>
          <div className="mt-4 grid grid-cols-2 gap-4"><button type="button" className={`${outlineButtonClass} h-[50px] text-[15px]`}>ذخیره پیش‌نویس</button><button type="button" onClick={() => onSubmit({ code: item.code, status: nextStatus, note })} className={`${primaryButtonClass} h-[50px] text-[15px]`}>ثبت نتیجه پیگیری</button></div>
        </section>
      </div>
    </>
  );
}

function SettingsPage() {
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [messageEnabled, setMessageEnabled] = useState(true);
  const [contactEnabled, setContactEnabled] = useState(true);

  const Toggle = ({ enabled, onClick }: { enabled: boolean; onClick: () => void }) => (
    <button type="button" onClick={onClick} className={`inline-flex h-9 min-w-[130px] items-center justify-center rounded-full px-5 text-[14px] font-medium ${enabled ? 'bg-[#EAF6F0] text-[#2F7D5C]' : 'bg-[#F2F5FB] text-[#616B80]'}`}>
      {enabled ? 'فعال' : 'غیرفعال'}
    </button>
  );

  return (
    <>
      <PageHeading title="تنظیمات" subtitle="تنظیمات فرم ثبت‌نام، پیگیری و آمار نمایش‌داده‌شده در سایت" />
      <div className="mt-7 grid gap-10 lg:grid-cols-[520px_450px]">
        <section className={`${cardClass} min-h-[304px] p-6`}>
          <h2 className="text-[22px] font-extrabold" style={titleStyle}>تنظیمات فرم ثبت‌نام</h2><p className="mt-1 text-[13px] text-[#6B7280]">کنترل وضعیت فرم و محدودیت فایل تکمیلی</p>
          <div className="mt-6 grid grid-cols-[1fr_auto] items-center gap-y-4 text-[13px] text-[#6B7280]"><span>وضعیت فرم</span><Toggle enabled={registrationEnabled} onClick={() => setRegistrationEnabled((v) => !v)} /><span>حداکثر حجم فایل</span><span className="rounded-[12px] bg-[#F2F5FC] px-5 py-3 font-medium text-[#334061]">۱۰ مگابایت</span><span>فرمت فایل تکمیلی</span><span className="rounded-[12px] bg-[#F2F5FC] px-5 py-3 font-medium text-[#334061]">PDF</span></div>
        </section>
        <section className={`${cardClass} min-h-[304px] p-6`}><h2 className="text-[22px] font-extrabold" style={titleStyle}>آمار هیرو</h2><p className="mt-1 text-[13px] text-[#6B7280]">اعداد نمونه فعلی صفحه اصلی</p><div className="mt-6 grid grid-cols-2 gap-4">{[['۱۲۰۰+','ثبت‌نام‌شده'],['۳۵۰+','ایده و راهکار'],['۳۱','استان'],['۵','محور']].map(([value,label]) => <div key={label} className="rounded-[12px] bg-[#F2F5FC] p-3 text-center"><p className="text-[20px] font-medium">{value}</p><p className="text-[12px] text-[#6B7280]">{label}</p></div>)}</div></section>
      </div>
      <section className={`${cardClass} mt-8 min-h-[250px] p-6`}><h2 className="text-[22px] font-extrabold" style={titleStyle}>تنظیمات پیگیری پرونده</h2><p className="mt-1 text-[13px] text-[#6B7280]">کنترل تجربه کاربر در صفحه پیگیری وضعیت</p><div className="mt-6 grid gap-x-12 gap-y-4 sm:grid-cols-2"><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">صفحه پیگیری</span><Toggle enabled={trackingEnabled} onClick={() => setTrackingEnabled((v) => !v)} /></div><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">ورودی اصلی</span><span className="rounded-[12px] bg-[#F2F5FC] px-5 py-3 text-[14px] font-medium">کد پیگیری</span></div><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">نمایش پیام مدیر</span><Toggle enabled={messageEnabled} onClick={() => setMessageEnabled((v) => !v)} /></div><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">به‌روزرسانی آمار هیرو</span><span className="rounded-[12px] bg-[#F2F5FC] px-5 py-3 text-[14px] font-medium">دستی / API</span></div></div></section>
      <section className={`${cardClass} mt-4 min-h-[116px] p-6`}><h2 className="text-[22px] font-extrabold" style={titleStyle}>فرم تماس با دبیرخانه</h2><p className="mt-1 text-[13px] text-[#6B7280]">مدیریت فعال بودن فرم و تولید کد درخواست</p><div className="mt-4 grid gap-5 sm:grid-cols-2"><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">وضعیت فرم تماس</span><Toggle enabled={contactEnabled} onClick={() => setContactEnabled((v) => !v)} /></div><div className="flex items-center justify-between"><span className="text-[13px] text-[#6B7280]">کد درخواست</span><span className="rounded-[12px] bg-[#F2F5FC] px-5 py-3 text-[14px] font-medium">خودکار • تماس-####</span></div></div></section>
      <div className="mt-4 flex justify-end"><button type="button" className={`${primaryButtonClass} h-[52px] w-[260px] text-[15px]`}>ذخیره تغییرات</button></div>
    </>
  );
}

export function AdminPage() {
  const [path, setPath] = useState(getAdminPath);
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('ayene-admin-demo') === '1');
  const [registrationUpdate, setRegistrationUpdate] = useState<RegistrationUpdate>({ code: 'AY-1405-00128', status: 'نیازمند تکمیل اطلاعات', message: 'لطفاً بخش شواهد میدانی و سوابق تیم را تکمیل و فایل اصلاح‌شده را بارگذاری کنید.' });
  const [contactUpdate, setContactUpdate] = useState<ContactUpdate>({ code: 'تماس-۰۱۲۸', status: 'در حال پیگیری', note: 'تماس اول برقرار نشد؛ پیگیری مجدد ساعت ۱۱ انجام شود.' });

  useEffect(() => {
    const handleHash = () => {
      setPath(getAdminPath());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const login = () => {
    sessionStorage.setItem('ayene-admin-demo', '1');
    setAuthenticated(true);
    navigateAdmin('files');
  };

  const logout = () => {
    sessionStorage.removeItem('ayene-admin-demo');
    setAuthenticated(false);
    window.location.hash = '#admin';
  };

  if (!authenticated || !path) {
    return <LoginPage onLogin={login} />;
  }

  if (path === 'files') {
    return <AdminShell active="files" onLogout={logout}><RegistrationList /></AdminShell>;
  }

  if (path.startsWith('file/')) {
    const code = decodeURIComponent(path.slice('file/'.length));
    const item = registrations.find((entry) => entry.code === code) ?? registrations[0];
    return <AdminShell active="files" onLogout={logout}><RegistrationDetail key={item.code} item={item} onSubmit={(update) => { setRegistrationUpdate(update); navigateAdmin('file-success'); }} /></AdminShell>;
  }

  if (path === 'file-success') {
    return <AdminShell active="files" onLogout={logout}><PageHeading title="وضعیت پرونده به‌روزرسانی شد" subtitle="پیام جدید در صفحه پیگیری متقاضی قابل مشاهده است" /><SuccessPanel title="وضعیت با موفقیت ثبت شد" body="متقاضی با کد پیگیری زیر، آخرین وضعیت و پیام ثبت‌شده را در بخش پیگیری مشاهده می‌کند." codeLabel="کد پیگیری" code={registrationUpdate.code} statusLabel="وضعیت نمایش‌داده‌شده" status={registrationUpdate.status} message={registrationUpdate.message} primaryText="بازگشت به پرونده" primaryPath={`file/${encodeURIComponent(registrationUpdate.code)}`} secondaryText="فهرست پرونده‌ها" secondaryPath="files" /></AdminShell>;
  }

  if (path === 'search') {
    return <AdminShell active="search" onLogout={logout}><SearchPage /></AdminShell>;
  }

  if (path === 'contacts') {
    return <AdminShell active="contacts" onLogout={logout}><ContactList /></AdminShell>;
  }

  if (path.startsWith('contact/')) {
    const code = decodeURIComponent(path.slice('contact/'.length));
    const item = contactRequests.find((entry) => entry.code === code) ?? contactRequests[0];
    return <AdminShell active="contacts" onLogout={logout}><ContactDetail key={item.code} item={item} onSubmit={(update) => { setContactUpdate(update); navigateAdmin('contact-success'); }} /></AdminShell>;
  }

  if (path === 'contact-success') {
    return <AdminShell active="contacts" onLogout={logout}><PageHeading title="نتیجه پیگیری تماس ثبت شد" subtitle="آخرین وضعیت درخواست تماس در پنل ذخیره شد" /><SuccessPanel title="نتیجه پیگیری با موفقیت ثبت شد" body="درخواست تماس با کد زیر اکنون با آخرین وضعیت پیگیری در پنل قابل مشاهده است." codeLabel="کد درخواست" code={contactUpdate.code} statusLabel="وضعیت ثبت‌شده" status={contactUpdate.status} message={contactUpdate.note} primaryText="بازگشت به درخواست" primaryPath={`contact/${encodeURIComponent(contactUpdate.code)}`} secondaryText="فهرست درخواست‌ها" secondaryPath="contacts" /></AdminShell>;
  }

  if (path === 'settings') {
    return <AdminShell active="settings" onLogout={logout}><SettingsPage /></AdminShell>;
  }

  return <AdminShell active="files" onLogout={logout}><RegistrationList /></AdminShell>;
}
