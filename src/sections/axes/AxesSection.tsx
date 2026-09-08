import { useState } from 'react';

interface Axis {
  id: string;
  label: string;
  title: string;
  issues: string[];
}

const axes: Axis[] = [
  {
    id: 'cultural',
    label: 'امور فرهنگی',
    title: 'نظام مسائل امور فرهنگی',
    issues: ['آموزش تحصیلی و فرهنگی', 'الگوهای نوین تربیت اسلامی', 'تفریح و سرگرمی'],
  },
  {
    id: 'participation',
    label: 'مشارکت‌های مردمی',
    title: 'نظام مسائل مشارکت‌های مردمی',
    issues: ['الگوهای نوین جمع سپاری مالی', 'مشارکت های خرد در صدقات', 'اکرام ایتام و نیازمندان'],
  },
  {
    id: 'family',
    label: 'حمایت از خانواده',
    title: 'نظام مسائل حمایت از خانواده',
    issues: ['توانمندسازی زنان سرپرست خانوار', 'حمایت از سالمندان', 'الگوهای نوین حمایت از مددجویان'],
  },
  {
    id: 'employment',
    label: 'اشتغال پایدار',
    title: 'نظام مسائل اشتغال پایدار',
    issues: ['تامین مالی', 'انگیزه بخشی و هدایت شغلی', 'بازار سازی'],
  },
  {
    id: 'legal',
    label: 'امور حقوقی',
    title: 'نظام مسائل امور حقوقی',
    issues: [
      'آگاه سازی و آموزش در حوزه حقوق مددجویان',
      'شناسایی مددجویان دارای پرونده جاری',
      'مدیریت دعاوی سازمانی، پایش ریسک و هشداردهی راهبردی',
    ],
  },
];

const issueNumbers = ['۰۱', '۰۲', '۰۳'];

export default function AxesSection() {
  const [activeId, setActiveId] = useState('cultural');
  const activeAxis = axes.find((axis) => axis.id === activeId) ?? axes[0];

  return (
    <section id="axes" dir="rtl" className="bg-[#FBFAF7] py-20">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-[100px]">
        <div className="mb-12 text-right">
          <p className="mb-2 text-[15px] font-medium leading-[1.56] text-[#FB8C74]">محورها و نظام مسائل</p>
          <h2 className="mb-3 text-[36px] font-extrabold leading-none text-[#182B5E] lg:text-[42px]">۵ محور رویداد</h2>
          <div className="mb-4 h-[5px] w-[100px] rounded-[3px] bg-[#FB8C74]" />
          <p className="max-w-[700px] text-[18px] font-normal leading-[1.7] text-[#334061] lg:text-[20px]">
            هر محور، ۳ مسئله مشخص دارد. محور موردنظر را انتخاب کن تا سه مسئله همان حوزه را ببینی.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {axes.map((axis) => (
            <button
              key={axis.id}
              onClick={() => setActiveId(axis.id)}
              className={`min-h-[58px] rounded-[18px] border px-3 text-[15px] font-medium transition-colors lg:h-[66px] lg:text-[17px] ${
                activeId === axis.id
                  ? 'border-[#FB8C74] bg-[#FB8C74] text-white'
                  : 'border-[#E0C89F] bg-white text-[#364E92] hover:border-[#FB8C74]'
              }`}
            >
              {axis.label}
            </button>
          ))}
        </div>

        <div className="flex min-h-[300px] flex-col gap-8 rounded-[28px] border-[1.5px] border-[#E0C89F] bg-white p-6 lg:flex-row lg:p-8">
          <div className="flex flex-1 flex-col text-right">
            <p className="mb-2 text-[14px] font-medium leading-[1.56] text-[#FB8C74]">محور انتخاب‌شده • ۳ مسئله</p>
            <h3 className="mb-3 text-[26px] font-extrabold leading-[1.45] text-[#182B5E] lg:text-[30px]">{activeAxis.title}</h3>
            <p className="text-[17px] font-normal leading-[1.7] text-[#334061] lg:text-[18px]">
              با انتخاب هر محور، سه مسئله همان حوزه در این بخش نمایش داده می‌شود.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <div className="h-[1.5px] w-14 bg-[#C9A84C]" />
              <div className="mx-1 h-[10px] w-[10px] rotate-45 bg-[#C9A84C]" />
              <div className="h-[1.5px] w-14 bg-[#C9A84C]" />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-3">
            {activeAxis.issues.map((issue, index) => (
              <div key={issue} className="flex min-h-[52px] items-center gap-3 rounded-[16px] border border-[#D6DEF0] bg-[#F9FAFD] px-4 py-3">
                <span className="min-w-[32px] shrink-0 text-right text-[16px] font-medium text-[#FB8C74]">{issueNumbers[index]}</span>
                <span className="flex-1 text-right text-[16px] font-medium leading-[1.6] text-[#364E92] lg:text-[17px]">{issue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
