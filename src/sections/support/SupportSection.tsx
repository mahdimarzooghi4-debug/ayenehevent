import { SupportCard } from './SupportCard';
import { HighlightBar } from './HighlightBar';

const cards = [
  { number: '۰۱', tag: 'اجرای واقعی', title: 'پایلوت در قالب خرید خدمت', body: 'حمایت اجرای پایلوت بر اساس قرارداد، نقاط عطف و تأیید پیشرفت پروژه انجام می‌شود.' },
  { number: '۰۲', tag: 'همراهی تخصصی', title: 'منتور و مشاور اجرایی', body: 'پروژه‌های منتخب متناسب با نیاز از منتور تخصصی و مشاور اجرایی بهره‌مند می‌شوند.' },
  { number: '۰۳', tag: 'توسعه مسیر', title: 'بازارسازی و پشتیبانی ارتباطی', body: 'برای توسعه مسیر اجرا، بازارسازی و پشتیبانی ارتباطی متناسب با نیاز پروژه فراهم می‌شود.' },
  { number: '۰۴', tag: 'فرصت همکاری', title: 'شبکه آینه', body: 'اعضای واجد صلاحیت می‌توانند بر اساس عملکرد واقعی در بانک تخصصی و شبکه همکاری آینه ثبت شوند.' },
];

export function SupportSection() {
  return (
    <section id="support" dir="rtl" className="bg-[#F6F8FD] py-16">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[100px]">
        <div className="mb-10 max-w-[720px] text-right">
          <p className="mb-4 text-[15px] font-medium leading-[23.44px] text-[#FB8C74]">حمایت‌ها و فرصت‌ها</p>
          <h2 className="mb-1 text-[34px] font-extrabold leading-[1.65] text-[#182B5E] lg:text-[38px]" style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}>
            بعد از دمو دی چه حمایتی دریافت می‌کنی؟
          </h2>
          <div className="mb-4 h-[5px] w-14 rounded-[3px] bg-[#FB8C74]" />
          <p className="text-[18px] font-normal leading-[1.7] text-[#334061] lg:text-[20px]">
            پروژه‌های منتخب وارد مرحله پایلوت می‌شوند و متناسب با ارزیابی و نیاز پروژه، از حمایت اجرایی و تخصصی آینه بهره می‌گیرند.
          </p>
        </div>
        <div className="mb-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-10">
          {cards.map((card) => <SupportCard key={card.number} {...card} />)}
        </div>
        <HighlightBar />
      </div>
    </section>
  );
}
