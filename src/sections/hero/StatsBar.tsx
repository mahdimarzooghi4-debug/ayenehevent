interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: '۵+', label: 'محور رویداد' },
  { value: '۱۵+', label: 'مسئله مشخص' },
  { value: '۹+', label: 'مرحله در مسیر رویداد' },
  { value: '۲+', label: 'مسیر ورود' },
];

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-[#E0C89F] bg-white shadow-[0_10px_24px_rgba(24,43,94,0.07)] lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex flex-col items-center justify-center gap-2 px-4 py-7
            ${index % 2 === 0 ? 'border-l border-[#E7EAF2] lg:border-l-0' : ''}
            ${index > 1 ? 'border-t border-[#E7EAF2] lg:border-t-0' : ''}
            ${index > 0 ? 'lg:border-r lg:border-[#E7EAF2]' : ''}`}
        >
          <span className="text-[30px] font-extrabold leading-[1.2] text-[#182B5E] lg:text-[32px]">
            {stat.value}
          </span>
          <span className="text-center text-[14px] font-medium text-[#414C66]">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
