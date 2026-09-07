import { Instagram, MessageCircle, Send } from 'lucide-react';

const linkClass =
  'text-[16px] leading-8 text-white/95 transition-colors hover:text-[#FB8C74]';

export function FooterSection() {
  return (
    <footer id="footer" dir="rtl" className="w-full bg-[#1E3F7F] text-white">
      <div className="mx-auto w-full max-w-[1800px] px-6 py-8 lg:px-16 2xl:px-[110px]">
        <div className="mb-8 h-px w-full bg-[#E0C89F]" />

        <div className="flex flex-col gap-10 md:grid md:grid-cols-2 xl:flex xl:flex-row xl:items-start xl:justify-between xl:gap-5 2xl:gap-10">
          {/* برند رویداد - سمت راست */}
          <div className="flex flex-col items-start xl:w-[300px] 2xl:w-[420px]">
            <div className="flex h-[136px] w-full items-center justify-center rounded-[14px] border border-[#E0C89F] bg-[#FAF9F7] px-5 2xl:h-[145px] 2xl:px-6">
              <img
                src="./images/ayene-event-logo.webp"
                alt="رویداد ملی خلاقیت و نوآوری آینه"
                className="max-h-[100px] max-w-full object-contain 2xl:max-h-[105px]"
              />
            </div>

            <p className="mt-3 w-full text-center text-[16px] font-medium text-[#E0C89F] 2xl:text-[17px]">
              مسئله را ببین<span className="text-[#FB8C74]">؛</span> راهکار را بساز
            </p>
          </div>

          {/* دسترسی سریع ۱ */}
          <div className="min-w-[125px] text-right">
            <h3 className="mb-5 text-[18px] font-bold text-[#E0C89F]">دسترسی سریع</h3>
            <nav className="flex flex-col gap-1">
              <a href="#about" className={linkClass}>معرفی آینه</a>
              <a href="#journey" className={linkClass}>مسیر رویداد</a>
              <a href="#register" className={linkClass}>ثبت‌نام</a>
            </nav>
          </div>

          {/* دسترسی سریع ۲ */}
          <div className="min-w-[135px] text-right">
            <h3 className="mb-5 text-[18px] font-bold text-[#E0C89F]">دسترسی سریع</h3>
            <nav className="flex flex-col gap-1">
              <a href="#axes" className={linkClass}>محورها و مسائل</a>
              <a href="#support" className={linkClass}>حمایت‌ها</a>
              <a href="#faq" className={linkClass}>پرسش‌های متداول</a>
            </nav>
          </div>

          {/* ارتباط با ما */}
          <div className="min-w-[150px] text-right">
            <h3 className="mb-5 text-[18px] font-bold text-[#E0C89F]">ارتباط با ما</h3>
            <div className="flex flex-col gap-1">
              <a href="#register" className={linkClass}>پیگیری ثبت‌نام</a>
              <a href="#footer" className={linkClass}>تماس با دبیرخانه</a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-[#E0C89F]">
              <a href="#" aria-label="بله" className="transition-transform hover:scale-110">
                <MessageCircle size={26} strokeWidth={2} />
              </a>
              <a href="#" aria-label="اینستاگرام" className="transition-transform hover:scale-110">
                <Instagram size={26} strokeWidth={2} />
              </a>
              <a href="#" aria-label="تلگرام" className="transition-transform hover:scale-110">
                <Send size={26} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* برگزارکنندگان - سمت چپ */}
          <div className="md:col-span-2 xl:w-[350px] 2xl:w-[440px]">
            <h3 className="mb-5 text-right text-[18px] font-bold text-[#E0C89F]">برگزارکنندگان</h3>

            <div className="flex flex-nowrap gap-3">
              <div className="flex h-[145px] min-w-0 flex-1 items-center justify-center rounded-[16px] border border-[#E0C89F] bg-[#FAF9F7] p-3 2xl:h-[155px] 2xl:p-4">
                <img
                  src="./images/committee-logo.webp"
                  alt="کمیته امداد امام خمینی"
                  className="max-h-[118px] max-w-full object-contain 2xl:max-h-[125px]"
                />
              </div>

              <div className="flex h-[145px] min-w-0 flex-1 items-center justify-center rounded-[16px] border border-[#E0C89F] bg-[#FAF9F7] p-3 2xl:h-[155px] 2xl:p-4">
                <img
                  src="./images/creative-house-logo.webp"
                  alt="خانه خلاق و نوآوری آینه"
                  className="max-h-[112px] max-w-full object-contain 2xl:max-h-[120px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 mt-12 h-px w-full bg-[#E0C89F]/60" />

        <p className="text-center text-[15px] font-normal text-white/75">
          خانه خلاق و نوآوری آینه، کمیته امداد امام خمینی(ره)
        </p>
      </div>
    </footer>
  );
}
