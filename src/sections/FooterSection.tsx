import { Instagram, MessageCircle, Send } from 'lucide-react';

const linkClass =
  'text-[15px] leading-8 text-white/95 transition-colors hover:text-[#FB8C74] sm:text-[16px]';

export function FooterSection() {
  return (
    <footer id="footer" dir="rtl" className="w-full bg-[#1E3F7F] text-white">
      <div className="mx-auto w-full max-w-[1800px] px-6 py-8 sm:px-8 lg:px-16 2xl:px-[110px]">
        <div className="mb-8 h-px w-full bg-[#E0C89F]" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4 xl:grid-cols-[1.25fr_.7fr_.75fr_.85fr_1.25fr] xl:items-start xl:gap-6 2xl:gap-10">
          {/* برند رویداد */}
          <div className="col-span-2 flex flex-col items-start md:col-span-4 xl:col-span-1">
            <div className="flex h-[118px] w-full items-center justify-center rounded-[14px] border border-[#E0C89F] bg-[#FAF9F7] px-5 sm:h-[128px] xl:h-[136px] 2xl:h-[145px]">
              <img
                src="./images/ayene-event-logo.webp"
                alt="رویداد ملی خلاقیت و نوآوری آینه"
                className="max-h-[84px] max-w-full object-contain sm:max-h-[92px] 2xl:max-h-[105px]"
              />
            </div>

            <p className="mt-3 w-full text-center text-[15px] font-medium text-[#E0C89F] sm:text-[16px] 2xl:text-[17px]">
              مسئله را ببین<span className="text-[#FB8C74]">؛</span> راهکار را بساز
            </p>
          </div>

          {/* دسترسی سریع ۱ */}
          <div className="text-right">
            <h3 className="mb-4 text-[17px] font-bold text-[#E0C89F] sm:text-[18px]">دسترسی سریع</h3>
            <nav className="flex flex-col gap-1">
              <a href="#about" className={linkClass}>معرفی آینه</a>
              <a href="#journey" className={linkClass}>مسیر رویداد</a>
              <a href="#register" className={linkClass}>ثبت‌نام</a>
            </nav>
          </div>

          {/* دسترسی سریع ۲ */}
          <div className="text-right">
            <h3 className="mb-4 text-[17px] font-bold text-[#E0C89F] sm:text-[18px]">دسترسی سریع</h3>
            <nav className="flex flex-col gap-1">
              <a href="#axes" className={linkClass}>محورها و مسائل</a>
              <a href="#support" className={linkClass}>حمایت‌ها</a>
              <a href="#faq" className={linkClass}>پرسش‌های متداول</a>
            </nav>
          </div>

          {/* ارتباط با ما */}
          <div className="col-span-2 text-right md:col-span-1 xl:col-span-1">
            <h3 className="mb-4 text-[17px] font-bold text-[#E0C89F] sm:text-[18px]">ارتباط با ما</h3>
            <div className="flex flex-col gap-1">
              <a href="#register" className={linkClass}>پیگیری ثبت‌نام</a>
              <a href="#footer" className={linkClass}>تماس با دبیرخانه</a>
            </div>

            <div className="mt-5 flex items-center gap-4 text-[#E0C89F]">
              <a href="#" aria-label="بله" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0C89F]/30 transition-all hover:border-[#FB8C74] hover:text-[#FB8C74]">
                <MessageCircle size={21} strokeWidth={2} />
              </a>
              <a href="#" aria-label="اینستاگرام" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0C89F]/30 transition-all hover:border-[#FB8C74] hover:text-[#FB8C74]">
                <Instagram size={21} strokeWidth={2} />
              </a>
              <a href="#" aria-label="تلگرام" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E0C89F]/30 transition-all hover:border-[#FB8C74] hover:text-[#FB8C74]">
                <Send size={21} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* برگزارکنندگان */}
          <div className="col-span-2 md:col-span-3 xl:col-span-1">
            <h3 className="mb-4 text-right text-[17px] font-bold text-[#E0C89F] sm:text-[18px]">برگزارکنندگان</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex min-h-[116px] min-w-0 items-center justify-center rounded-[16px] border border-[#E0C89F] bg-[#FAF9F7] p-3 sm:min-h-[130px] xl:h-[145px] 2xl:h-[155px]">
                <img
                  src="./images/committee-logo.webp"
                  alt="کمیته امداد امام خمینی"
                  className="max-h-[94px] max-w-full object-contain sm:max-h-[106px] xl:max-h-[118px] 2xl:max-h-[125px]"
                />
              </div>

              <div className="flex min-h-[116px] min-w-0 items-center justify-center rounded-[16px] border border-[#E0C89F] bg-[#FAF9F7] p-3 sm:min-h-[130px] xl:h-[145px] 2xl:h-[155px]">
                <img
                  src="./images/creative-house-logo.webp"
                  alt="خانه خلاق و نوآوری آینه"
                  className="max-h-[88px] max-w-full object-contain sm:max-h-[100px] xl:max-h-[112px] 2xl:max-h-[120px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5 mt-10 h-px w-full bg-[#E0C89F]/60 sm:mt-12" />

        <p className="text-center text-[13px] font-normal leading-7 text-white/75 sm:text-[15px]">
          خانه خلاق و نوآوری آینه، کمیته امداد امام خمینی(ره)
        </p>
      </div>
    </footer>
  );
}
