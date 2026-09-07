interface StatItem {
  value: string;
  label: string;
  emphasis?: boolean;
}

const stats: StatItem[] = [
  { value: '۵', label: 'محور رویداد', emphasis: true },
  { value: '۳۱', label: 'استان مشارکت‌کننده' },
  { value: '۳۵۰+', label: 'ایده و راهکار ثبت‌شده' },
  { value: '۱۲۰۰+', label: 'نفر ثبت‌نام‌شده' },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-[#E0C89F] bg-white shadow-[0_10px_24px_rgba(24,43,94,0.07)] lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex min-h-[116px] flex-col items-center justify-center gap-2 px-4 py-6 lg:min-h-[142px]
            ${index % 2 === 0 ? 'border-l border-[#E7EAF2] lg:border-l-0' : ''}
            ${index > 1 ? 'border-t border-[#E7EAF2] lg:border-t-0' : ''}
            ${index > 0 ? 'lg:border-r lg:border-[#E7EAF2]' : ''}`}
        >
          <span
            dir="ltr"
            className={`font-extrabold leading-[1.2] text-[#182B5E] ${
              stat.emphasis ? 'text-[30px] lg:text-[34px]' : 'text-[22px] lg:text-[22px]'
            }`}
            style={{
              fontFamily: 'Estedad, Vazirmatn, sans-serif',
              unicodeBidi: 'isolate',
            }}
          >
            {stat.value}
          </span>
          <span className="text-center text-[13px] font-medium text-[#414C66] lg:text-[14px]">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
