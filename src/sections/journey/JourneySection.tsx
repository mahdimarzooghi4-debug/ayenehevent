import { JourneyGrid } from './JourneyGrid';

export function JourneySection() {
  return (
    <section id="journey" dir="rtl" className="bg-[#F6F8FD] py-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-[100px]">
        <header className="mb-12 text-right">
          <p className="mb-2 text-[15px] font-medium text-[#FB8C74]">مسیر رویداد</p>
          <h2 className="mb-2 text-[36px] font-extrabold leading-[1.75] text-[#182B5E] lg:text-[42px]" style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}>
            از ثبت‌نام تا اجرای پایلوت
          </h2>
          <div className="mb-6 h-[5px] w-20 rounded-full bg-[#FB8C74]" />
          <p className="max-w-[700px] text-[18px] leading-relaxed text-[#334061] lg:text-[19px]">
            مسیر آینه در ۹ مرحله پیش می‌رود؛ از انتخاب مسئله و ثبت‌نام تا اجرای پایلوت، خرید خدمت و ورود به شبکه آینه.
          </p>
        </header>
        <JourneyGrid />
        <p className="mt-14 text-center text-base font-medium text-[#364E92]">
          خروجی مسیر: راهکارهای آماده‌تر برای اجرا و شبکه‌ای از افراد واجدصلاحیت برای همکاری‌های بعدی
        </p>
      </div>
    </section>
  );
}
