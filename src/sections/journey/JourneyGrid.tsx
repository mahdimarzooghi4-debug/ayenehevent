import { JourneyCard } from './JourneyCard';

const cards = [
  { number: '۰۱', title: 'انتخاب مسئله و ثبت‌نام واحد', description: 'پرونده فردی، تیمی یا مجموعه‌ای' },
  { number: '۰۲', title: 'ارزیابی اولیه', description: 'انتخاب ظرفیت‌های مناسب و هسته‌های اولیه' },
  { number: '۰۳', title: 'تکمیل هسته‌های مسئله‌محور', description: 'اتصال افراد مکمل و مشخص شدن نقش‌ها' },
  { number: '۰۴', title: 'بوت‌کمپ مشترک', description: 'آموزش، تمرین و آماده‌سازی بسته اولیه پایلوت' },
  { number: '۰۵', title: 'مأموریت عملی و اعتبارسنجی', description: 'آزمون میدانی راهکار و ارزیابی عملکرد اعضا' },
  { number: '۰۶', title: 'ارزیابی مرحله دوم', description: 'انتخاب پروژه‌های آماده‌تر برای ارائه نهایی' },
  { number: '۰۷', title: 'دمو دی', description: 'ارائه نهایی پروژه‌ها و تصمیم‌گیری برای مرحله بعد' },
  { number: '۰۸', title: 'اجرای پایلوت و خرید خدمت', description: 'قرارداد مرحله‌ای، سنجش اثر و تصمیم توسعه' },
  { number: '۰۹', title: 'شبکه آینه', description: 'ثبت پروفایل اعضای واجد صلاحیت بر اساس عملکرد واقعی' },
];

export function JourneyGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {cards.map((card) => <JourneyCard key={card.number} {...card} />)}
    </div>
  );
}
