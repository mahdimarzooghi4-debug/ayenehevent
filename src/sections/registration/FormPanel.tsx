import { useRef, useState } from 'react';
import { StepProgress } from './StepProgress';

const axes = [
  {
    title: 'امور فرهنگی',
    issues: ['آموزش تحصیلی و فرهنگی', 'الگوهای نوین تربیت اسلامی', 'تفریح و سرگرمی'],
  },
  {
    title: 'مشارکت‌های مردمی',
    issues: ['الگوهای نوین جمع سپاری مالی', 'مشارکت های خرد در صدقات', 'اکرام ایتام و نیازمندان'],
  },
  {
    title: 'حمایت از خانواده',
    issues: ['توانمندسازی زنان سرپرست خانوار', 'حمایت از سالمندان', 'الگوهای نوین حمایت از مددجویان'],
  },
  {
    title: 'اشتغال پایدار',
    issues: ['تامین مالی', 'انگیزه بخشی و هدایت شغلی', 'بازار سازی'],
  },
  {
    title: 'امور حقوقی',
    issues: [
      'آگاه سازی و آموزش در حوزه حقوق مددجویان',
      'شناسایی مددجویان دارای پرونده جاری',
      'مدیریت دعاوی سازمانی، پایش ریسک و هشداردهی راهبردی',
    ],
  },
];

const stepMeta = [
  { title: '۱. اطلاعات پایه', description: 'برای فرد، تیم یا مجموعه' },
  { title: '۲. انتخاب مسیر', description: 'مسیر مناسب ورودت به رویداد را انتخاب کن' },
  { title: '۳. محور و مسئله', description: 'محور رویداد و مسئله موردنظرت را مشخص کن' },
  { title: '۴. تجربه / راهکار', description: 'توضیحات اصلی درباره تجربه یا راهکارت را ثبت کن' },
  {
    title: '۵. فایل تکمیلی',
    description: 'فایل نمونه را دانلود کن، تکمیل کن و نسخه تکمیل‌شده را بارگذاری کن',
  },
  { title: '۶. تأیید و ارسال', description: 'اطلاعات را مرور کن و برای ارسال نهایی آماده شو' },
];

const fieldClass =
  'h-12 w-full rounded-[14px] border-[1.2px] border-[#E0C89F] bg-white px-4 text-right text-[15px] font-normal text-[#334061] outline-none transition focus:border-[#364E92]';

const TRACKING_CODE = 'AY-1405-00128';
const TRACKING_STORAGE_KEY = 'ayene-registration-demo-record';

const normalizeDigits = (value: string) =>
  value
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));

interface FieldLabelProps {
  label: string;
  children: React.ReactNode;
}

function FieldLabel({ label, children }: FieldLabelProps) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-right">
      <span className="text-[12px] font-medium text-[#334061]">{label}</span>
      {children}
    </label>
  );
}

interface ChoiceCardProps {
  selected: boolean;
  title: string;
  description: string;
  onClick: () => void;
}

function ChoiceCard({ selected, title, description, onClick }: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[18px] border-[1.5px] p-5 text-right transition ${
        selected
          ? 'border-[#FB8C74] bg-[#FDF1EC]'
          : 'border-[#E0C89F] bg-white hover:border-[#FB8C74]'
      }`}
    >
      <span className="block text-[17px] font-medium text-[#182B5E]">{title}</span>
      <span className="mt-2 block text-[14px] leading-7 text-[#616B80]">{description}</span>
    </button>
  );
}

export function FormPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [route, setRoute] = useState<'solution' | 'experience'>('solution');
  const [selectedAxis, setSelectedAxis] = useState(axes[0].title);
  const [selectedIssue, setSelectedIssue] = useState(axes[0].issues[0]);
  const [fileName, setFileName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [trackingCopied, setTrackingCopied] = useState(false);

  const activeAxis = axes.find((axis) => axis.title === selectedAxis) ?? axes[0];
  const currentMeta = stepMeta[currentStep - 1];
  const canContinue = currentStep !== 5 || Boolean(fileName);

  const scrollPanelToTop = () => {
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const moveToStep = (step: number) => {
    setCurrentStep(step);
    setSubmitted(false);
    setTrackingCopied(false);
    scrollPanelToTop();
  };

  const handleNext = () => {
    if (currentStep < 6 && canContinue) moveToStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) moveToStep(currentStep - 1);
  };

  const handleAxisChange = (value: string) => {
    setSelectedAxis(value);
    const nextAxis = axes.find((axis) => axis.title === value) ?? axes[0];
    setSelectedIssue(nextAxis.issues[0]);
  };

  const handleSubmit = () => {
    const normalizedPhone = normalizeDigits(phoneNumber).replace(/\D/g, '');
    const phoneLast4 = normalizedPhone.slice(-4) || '4567';

    try {
      window.localStorage.setItem(
        TRACKING_STORAGE_KEY,
        JSON.stringify({
          trackingCode: TRACKING_CODE,
          phoneLast4,
          status: 'در حال بررسی',
          message: 'پرونده دریافت شده و در مرحله بررسی اولیه است. نتیجه بعدی از همین بخش اعلام می‌شود.',
        }),
      );
    } catch {
      // The demo tracking flow still works with the Figma sample record if storage is unavailable.
    }

    setSubmitted(true);
    setTrackingCopied(false);
    scrollPanelToTop();
  };

  const handleCopyTrackingCode = async () => {
    try {
      await navigator.clipboard.writeText(TRACKING_CODE);
      setTrackingCopied(true);
      window.setTimeout(() => setTrackingCopied(false), 1800);
    } catch {
      setTrackingCopied(false);
    }
  };

  const handleOpenTracking = () => {
    window.location.hash = `tracking?code=${encodeURIComponent(TRACKING_CODE)}`;
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <>
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FieldLabel label="نام و نام خانوادگی">
              <input className={fieldClass} type="text" placeholder="نام و نام خانوادگی" />
            </FieldLabel>
            <FieldLabel label="استان و شهر">
              <input className={fieldClass} type="text" placeholder="مثلاً تهران، تهران" />
            </FieldLabel>
          </div>

          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <FieldLabel label="شماره تماس / راه ارتباطی">
              <input
                className={fieldClass}
                type="tel"
                inputMode="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="۰۹۱۲۱۲۳۴۵۶۷"
              />
            </FieldLabel>
            <FieldLabel label="نحوه حضور">
              <select className={fieldClass} defaultValue="فرد">
                <option>فرد</option>
                <option>تیم</option>
                <option>مجموعه</option>
              </select>
            </FieldLabel>
          </div>

          <FieldLabel label="اطلاعات اعضا (در صورت تیم یا مجموعه)">
            <textarea
              className="min-h-[92px] w-full resize-y rounded-[14px] border-[1.2px] border-[#E0C89F] bg-white px-4 py-3 text-right text-[15px] leading-7 text-[#334061] outline-none focus:border-[#364E92]"
              placeholder="نام و اطلاعات اعضای تیم یا مجموعه را وارد کنید"
            />
          </FieldLabel>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChoiceCard
            selected={route === 'solution'}
            onClick={() => setRoute('solution')}
            title="ایده یا راهکار دارم"
            description="برای یکی از مسئله‌های رویداد ایده، محصول، خدمت یا راهکار مشخص دارم."
          />
          <ChoiceCard
            selected={route === 'experience'}
            onClick={() => setRoute('experience')}
            title="تجربه و تخصص دارم"
            description="ایده مشخصی ندارم اما تجربه، مهارت یا ظرفیت مشارکت برای حل مسئله دارم."
          />
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FieldLabel label="محور رویداد">
            <select
              className={fieldClass}
              value={selectedAxis}
              onChange={(event) => handleAxisChange(event.target.value)}
            >
              {axes.map((axis) => (
                <option key={axis.title} value={axis.title}>
                  {axis.title}
                </option>
              ))}
            </select>
          </FieldLabel>
          <FieldLabel label="مسئله منتخب">
            <select
              className={fieldClass}
              value={selectedIssue}
              onChange={(event) => setSelectedIssue(event.target.value)}
            >
              {activeAxis.issues.map((issue) => (
                <option key={issue} value={issue}>
                  {issue}
                </option>
              ))}
            </select>
          </FieldLabel>
        </div>
      );
    }

    if (currentStep === 4) {
      return (
        <div className="space-y-5">
          <FieldLabel label={route === 'solution' ? 'عنوان راهکار' : 'عنوان تجربه یا تخصص'}>
            <input
              className={fieldClass}
              type="text"
              placeholder={route === 'solution' ? 'عنوان کوتاه راهکار' : 'حوزه تجربه یا تخصص'}
            />
          </FieldLabel>
          <FieldLabel label={route === 'solution' ? 'شرح راهکار' : 'شرح تجربه و ظرفیت مشارکت'}>
            <textarea
              className="min-h-[150px] w-full resize-y rounded-[14px] border-[1.2px] border-[#E0C89F] bg-white px-4 py-3 text-right text-[15px] leading-7 text-[#334061] outline-none focus:border-[#364E92]"
              placeholder={
                route === 'solution'
                  ? 'راهکار، نحوه اجرا، مخاطب و ارزش پیشنهادی را توضیح دهید'
                  : 'تجربه، مهارت‌ها و زمینه‌ای که می‌توانید در آن مشارکت کنید را توضیح دهید'
              }
            />
          </FieldLabel>
        </div>
      );
    }

    if (currentStep === 5) {
      return (
        <div className="space-y-5">
          <div className="rounded-[18px] border border-[#D6DEF0] bg-[#F6F8FD] p-5 text-right">
            <p className="text-[16px] font-medium text-[#182B5E]">فایل نمونه ثبت‌نام را تکمیل کن</p>
            <p className="mt-2 text-[14px] leading-7 text-[#616B80]">
              ابتدا فایل نمونه را دانلود کن، اطلاعات خواسته‌شده را در Word تکمیل کن و سپس نسخه تکمیل‌شده را در همین مرحله بارگذاری کن.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="./files/ayene-registration-template.rtf"
                download="فرم-تکمیلی-رویداد-آینه.rtf"
                className="inline-flex h-[44px] items-center justify-center rounded-[14px] bg-[#364E92] px-5 text-[14px] font-medium text-white transition-colors hover:bg-[#2f447f]"
              >
                دانلود فایل نمونه
              </a>
              <span className="text-[13px] leading-6 text-[#616B80]">فرمت قابل ویرایش در Microsoft Word</span>
            </div>
          </div>

          <FieldLabel label="فایل تکمیل‌شده">
            <div className="flex min-h-[110px] flex-col items-center justify-center gap-3 rounded-[16px] border border-dashed border-[#E0C89F] bg-[#FBFAF7] px-5 py-5 text-center">
              <input
                id="registration-file"
                type="file"
                accept=".rtf,.doc,.docx"
                className="hidden"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')}
              />
              <label
                htmlFor="registration-file"
                className="cursor-pointer rounded-[14px] border border-[#364E92] bg-white px-5 py-2 text-[14px] font-medium text-[#364E92] transition-colors hover:bg-[#F6F8FD]"
              >
                انتخاب فایل تکمیل‌شده
              </label>
              <span className={`text-[13px] ${fileName ? 'font-medium text-[#364E92]' : 'text-[#616B80]'}`}>
                {fileName || 'فایل RTF یا Word تکمیل‌شده را انتخاب کنید'}
              </span>
            </div>
          </FieldLabel>

          {!fileName && (
            <p className="text-right text-[13px] leading-6 text-[#FB8C74]">
              برای رفتن به مرحله بعد، فایل تکمیل‌شده را انتخاب کنید.
            </p>
          )}

          <FieldLabel label="توضیحات تکمیلی (اختیاری)">
            <textarea
              className="min-h-[100px] w-full resize-y rounded-[14px] border-[1.2px] border-[#E0C89F] bg-white px-4 py-3 text-right text-[15px] leading-7 text-[#334061] outline-none focus:border-[#364E92]"
              placeholder="اگر نکته دیگری لازم است اینجا بنویسید"
            />
          </FieldLabel>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="rounded-[18px] border border-[#E0C89F] bg-[#FBFAF7] p-5">
          <div className="grid grid-cols-1 gap-4 text-right md:grid-cols-2">
            <div>
              <p className="text-[12px] text-[#616B80]">مسیر انتخاب‌شده</p>
              <p className="mt-1 text-[15px] font-medium text-[#182B5E]">
                {route === 'solution' ? 'ایده یا راهکار دارم' : 'تجربه و تخصص دارم'}
              </p>
            </div>
            <div>
              <p className="text-[12px] text-[#616B80]">محور</p>
              <p className="mt-1 text-[15px] font-medium text-[#182B5E]">{selectedAxis}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-[12px] text-[#616B80]">مسئله منتخب</p>
              <p className="mt-1 text-[15px] font-medium leading-7 text-[#182B5E]">{selectedIssue}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-[12px] text-[#616B80]">فایل تکمیل‌شده</p>
              <p className="mt-1 text-[15px] font-medium text-[#182B5E]">{fileName || 'انتخاب نشده'}</p>
            </div>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-[14px] bg-[#F6F8FD] p-4 text-right">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[#364E92]" />
          <span className="text-[14px] leading-7 text-[#334061]">
            اطلاعات واردشده را بررسی کرده‌ام و آماده ارسال نهایی هستم.
          </span>
        </label>
      </div>
    );
  };

  const renderSuccess = () => (
    <div className="flex flex-col items-center px-1 pb-1 pt-5 text-center sm:pt-7">
      <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border-[1.5px] border-[#29804F] bg-[#F6F8FD] text-[38px] font-medium text-[#29804F]">
        ✓
      </div>

      <h3 className="mt-5 text-[23px] font-medium leading-[1.7] text-[#182B5E] sm:text-[26px]">
        ثبت‌نام با موفقیت ارسال شد
      </h3>

      <button
        type="button"
        onClick={handleOpenTracking}
        className="mt-1 flex h-[44px] w-full max-w-[220px] items-center justify-center rounded-[14px] border-[1.4px] border-[#364E92] bg-white text-[14px] font-medium text-[#364E92]"
      >
        پیگیری وضعیت ثبت‌نام
      </button>

      <div
        id="tracking-code-card"
        className="mt-2 flex w-full max-w-[620px] flex-col gap-3 rounded-[18px] border-[1.2px] border-[#E0C89F] bg-[#F6F8FD] px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="text-right">
          <p className="text-[14px] font-medium text-[#616B80]">کد پیگیری پرونده</p>
          <p dir="ltr" className="mt-1 text-right text-[18px] font-medium text-[#182B5E]" style={{ unicodeBidi: 'isolate' }}>
            {TRACKING_CODE}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyTrackingCode}
          className="flex h-[44px] w-full items-center justify-center rounded-[14px] border-[1.2px] border-[#364E92] bg-white px-4 text-[14px] font-medium text-[#364E92] sm:w-[156px]"
        >
          {trackingCopied ? 'کپی شد' : 'کپی کد پیگیری'}
        </button>
      </div>
    </div>
  );

  return (
    <div
      ref={panelRef}
      className="relative w-full scroll-mt-6 overflow-hidden px-5 py-8 md:px-10 lg:px-[70px] lg:py-10"
      style={{
        background: '#FFFFFF',
        border: '1.5px solid #E0C89F',
        borderRadius: 28,
        boxShadow: '0px 10px 30px 0px rgba(23, 41, 92, 0.06)',
      }}
      dir="rtl"
    >
      <div className="mb-4 flex justify-start">
        <div className="flex h-9 items-center justify-center rounded-[18px] bg-[#FDF1EC] px-5">
          <span className="text-[13px] font-medium text-[#FB8C74]">فرم ثبت‌نام واحد</span>
        </div>
      </div>

      <h2
        className="mb-2 text-right text-[24px] font-extrabold text-[#182B5E] sm:text-[26px]"
        style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}
      >
        ثبت‌نام مرحله‌به‌مرحله
      </h2>

      <p className="mb-7 text-right text-[15px] font-normal leading-[1.7] text-[#334061] sm:mb-8 sm:text-[16px]">
        {submitted ? 'پرونده ثبت‌نام با موفقیت ارسال شده است.' : 'اطلاعات ثبت‌نام در ۶ مرحله تکمیل می‌شود.'}
      </p>

      <div className="mb-8 w-full">
        <StepProgress currentStep={currentStep} />
      </div>

      {submitted ? (
        renderSuccess()
      ) : (
        <>
          <h3 className="mb-1 text-right text-[20px] font-medium text-[#182B5E] sm:text-[22px]">
            {currentMeta.title}
          </h3>
          <p className="mb-6 text-right text-[14px] font-normal text-[#616B80]">{currentMeta.description}</p>

          <div className="mb-8">{renderStep()}</div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {currentStep > 1 ? (
              <button
                className="flex h-[46px] w-full cursor-pointer items-center justify-center rounded-[16px] border border-[#364E92] bg-white text-[16px] font-medium text-[#364E92] transition-colors hover:bg-[#F6F8FD] sm:w-[180px]"
                type="button"
                onClick={handleBack}
              >
                بازگشت
              </button>
            ) : (
              <div />
            )}

            {currentStep < 6 ? (
              <button
                className={`flex h-[46px] w-full items-center justify-center rounded-[16px] border-0 text-[16px] font-medium text-white transition-colors sm:w-[220px] ${
                  canContinue
                    ? 'cursor-pointer bg-[#FB8C74] hover:bg-[#f97d62]'
                    : 'cursor-not-allowed bg-[#D9A99E] opacity-70'
                }`}
                type="button"
                onClick={handleNext}
                disabled={!canContinue}
              >
                ادامه
              </button>
            ) : (
              <button
                className="flex h-[46px] w-full cursor-pointer items-center justify-center rounded-[16px] border-0 bg-[#364E92] text-[16px] font-medium text-white transition-colors hover:bg-[#2f447f] sm:w-[220px]"
                type="button"
                onClick={handleSubmit}
              >
                ارسال نهایی
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
