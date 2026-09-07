import { Instagram, Send, MessageCircle } from 'lucide-react';

const linkClass = 'text-[16px] leading-8 text-white/95 transition-colors hover:text-[#FB8C74]';

export function FooterSection() {
  return (
    <footer id="footer" dir="rtl" className="w-full bg-[#1E3F7F] text-white">
      <div className="mx-auto w-full max-w-[1800px] px-6 py-10 lg:px-[110px]">
        <div className="mb-10 h-px w-full bg-[#E0C89F]" />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-[1.3fr_0.9fr_0.9fr_1fr_1.35fr] xl:gap-14">
          <div className="flex flex-col items-start xl:order-1">
            <div className="flex min-h-[145px] w-full max-w-[420px] items-center justify-center rounded-[14px] border border-[#E0C89F] bg-[#FAF9F7] px-6">
              <img src="/images/ayene-event-logo.webp" alt="رویداد ملی خلاقیت و نوآوری آینه" className="max-h-[105px] max-w-full object-contain" />
            </div>
            <p className="mt-3 w-full max-w-[420px] text-center text-[17px] font-medium text-[#E0C89F]">مسئله را ببین<span className="text-[#FB8C74]">؛</span> راهکار را بساز</p>
          </div>
          <div className="text-right xl:order-2">
            <h3 className="mb-6 text-[18px] font-bold text-[#E0C89F]">دسترسی سریع</h3>
            <nav className="flex flex-col gap-1"><a href="#about" className={linkClass}>معرفی آینه</a><a href="#journey" className={linkClass}>مسیر رویداد</a><a href="#register" className={linkClass}>ثبت‌نام</a></nav>
          </div>
          <div className="text-right xl:order-3">
            <h3 className="mb-6 text-[18px] font-bold text-[#E0C89F]">دسترسی سریع</h3>
            <nav className="flex flex-col gap-1"><a href="#axes" className={linkClass}>محورها و مسائل</a><a href="#support" className={linkClass}>حمایت‌ها</a><a href="#faq" className={linkClass}>پرسش‌های متداول</a></nav>
          </div>
          <div className="text-right xl:order-4">
            <h3 className="mb-6 text-[18px] font-bold text-[#E0C89F]">ارتباط با ما</h3>
            <div className="flex flex-col gap-1"><a href="#register" className={linkClass}>پیگیری ثبت‌نام</a><a href="#footer" className={linkClass}>تماس با دبیرخانه</a></div>
            <div className="mt-7 flex items-center gap-4 text-[#E0C89F]">
              <a href="#" aria-label="بله" className="transition-transform hover:scale-110"><MessageCircle size={27} strokeWidth={2} /></a>
              <a href="#" aria-label="اینستاگرام" className="transition-transform hover:scale-110"><Instagram size={27} strokeWidth={2} /></a>
              <a href="#" aria-label="تلگرام" className="transition-transform hover:scale-110"><Send size={27} strokeWidth={2} /></a>
            </div>
          </div>
          <div className="xl:order-5">
            <h3 className="mb-6 text-right text-[18px] font-bold text-[#E0C89F]">برگزارکنندگان</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex h-[155px] w-[210px] items-center justify-center rounded-[16px] border border-[#E0C89F] bg-[#FAF9F7] p-4"><img src="/images/committee-logo.webp" alt="کمیته امداد امام خمینی" className="max-h-[125px] max-w-full object-contain" /></div>
              <div className="flex h-[155px] w-[210px] items-center justify-center rounded-[16px] border border-[#E0C89F] bg-[#FAF9F7] p-4"><img src="/images/creative-house-logo.webp" alt="خانه خلاق و نوآوری آینه" className="max-h-[120px] max-w-full object-contain" /></div>
            </div>
          </div>
        </div>
        <div className="mb-6 mt-16 h-px w-full bg-[#E0C89F]/60" />
        <p className="text-center text-[15px] font-normal text-white/75">خانه خلاق و نوآوری آینه، کمیته امداد امام خمینی(ره)</p>
      </div>
    </footer>
  );
}
