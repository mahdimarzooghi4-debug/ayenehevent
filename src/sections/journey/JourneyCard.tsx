interface JourneyCardProps {
  number: string;
  title: string;
  description: string;
}

export function JourneyCard({ number, title, description }: JourneyCardProps) {
  return (
    <div
      className="bg-white border-[1.5px] border-[#E0C89F] rounded-[20px] px-7 py-[18px] h-[142px] flex flex-col justify-start"
      style={{ fontFamily: 'Vazirmatn, sans-serif' }}
    >
      <div className="flex justify-start mb-3">
        <span className="bg-[#FB8C74] text-white text-[15px] font-medium rounded-full flex items-center justify-center"
          style={{ minWidth: '58px', height: '34px', padding: '0 12px' }}>
          {number}
        </span>
      </div>
      <h3 className="text-[#182B5E] font-medium text-[18px] leading-[28px] text-right mb-1">
        {title}
      </h3>
      <p className="text-[#334061] text-[14px] leading-[22px] text-right">
        {description}
      </p>
    </div>
  );
}
