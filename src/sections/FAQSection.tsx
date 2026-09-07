import { useState } from 'react';

interface FAQItem {
  num: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    num: '۰۱',
    question: 'برای ثبت‌نام باید از قبل ایده یا راهکار داشته باشم؟',
    answer:
      'نه. برای ثبت‌نام فردی داشتن راهکار آماده الزامی نیست؛ می‌توانی با تجربه، مهارت یا ظرفیت مشارکت وارد شوی و پس از ارزیابی به هسته‌های مسئله‌محور متصل شوی.',
  },
  {
    num: '۰۲',
    question: 'به‌صورت فردی هم می‌توانم ثبت‌نام کنم؟',
    answer:
      'بله. امکان ثبت‌نام فردی وجود دارد و افراد واجد شرایط می‌توانند در ادامه مسیر به تیم‌ها و هسته‌های مسئله‌محور متصل شوند.',
  },
  {
    num: '۰۳',
    question: 'ثبت‌نام یا عبور از مراحل میانی یعنی حمایت مالی قطعی؟',
    answer:
      'خیر. ثبت‌نام یا عبور از مراحل ارزیابی به معنی تضمین حمایت مالی نیست. حمایت از اجرای پایلوت براساس ارزیابی، شرایط پروژه و تصمیم نهایی انجام می‌شود.',
  },
  {
    num: '۰۴',
    question: 'ورود به شبکه آینه به معنی استخدام است؟',
    answer:
      'خیر. ورود به شبکه آینه به معنی استخدام نیست و همکاری‌ها می‌تواند متناسب با نیاز پروژه‌ها به‌صورت همکاری و به‌کارگیری پروژه‌ای شکل بگیرد.',
  },
  {
    num: '۰۵',
    question: 'فرم ثبت‌نام برای همه یکسان است؟',
    answer:
      'بله. ثبت‌نام از طریق یک فرم واحد انجام می‌شود و براساس مسیر انتخابی، بخش‌های مرتبط با راهکار یا تجربه و ظرفیت مشارکت نمایش داده می‌شود.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      dir="rtl"
      className="w-full bg-[#FAF9F7] px-6 py-[58px] lg:px-[100px]"
      style={{ direction: 'rtl', fontFamily: "'Vazirmatn', sans-serif" }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 w-full text-right">
          <p className="mb-2 text-[15px] font-medium leading-[23.44px] text-[#364E92]">
            پرسش‌های متداول
          </p>
          <h2 className="text-right text-[34px] font-bold leading-[1.55] text-[#182B5E] lg:text-[38px]">
            قبل از ثبت‌نام، این‌ها را بدان
          </h2>
          <div className="mt-1 h-[5px] w-[82px] rounded-full bg-[#FB8C74]" />
          <p className="mt-6 max-w-[790px] text-right text-[17px] font-normal leading-[28.13px] text-[#4A4F5C] lg:text-[18px]">
            پاسخ کوتاه به سؤال‌هایی که معمولاً قبل از ورود به مسیر آینه پیش می‌آید.
          </p>
        </div>

        <div className="flex w-full flex-col gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.num}
                className="w-full rounded-[18px] bg-white px-5 py-5 transition-all duration-200 lg:px-6"
                style={{
                  border: isOpen ? '1.5px solid #E0C89F' : '1px solid #E0DED6',
                }}
              >
                <button
                  type="button"
                  dir="rtl"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent p-0"
                >
                  <span
                    className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-[13px] font-medium ${
                      isOpen
                        ? 'bg-[#FB8C74] text-white'
                        : 'bg-[#F2F2F0] text-[#364E92]'
                    }`}
                  >
                    {item.num}
                  </span>

                  <span className="flex-1 text-right text-[17px] font-medium leading-[29.69px] text-[#182B5E] lg:text-[19px]">
                    {item.question}
                  </span>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center text-[26px] font-medium text-[#364E92]">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3 pr-[54px] text-right">
                    <p className="text-[16px] font-normal leading-[25px] text-[#4A4F5C]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
