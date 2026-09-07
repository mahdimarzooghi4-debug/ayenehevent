interface EntryCardProps {
  badge: string;
  badgeColor: string;
  title: string;
  body: string;
  outcome: string;
  bodyFontSize?: string;
}

export function EntryCard({
  badge,
  badgeColor,
  title,
  body,
  outcome,
  bodyFontSize = '16px',
}: EntryCardProps) {
  return (
    <div
      className="bg-white flex-1 flex flex-col pt-6 px-8 pb-8"
      style={{
        border: '1.5px solid #E0C89F',
        borderRadius: '26px',
      }}
    >
      <div className="flex justify-start mb-5">
        <span
          className="text-white font-medium px-5 py-2 rounded-full inline-block"
          style={{
            backgroundColor: badgeColor,
            fontFamily: 'Vazirmatn, sans-serif',
            fontSize: '15px',
            lineHeight: '23.44px',
          }}
        >
          {badge}
        </span>
      </div>

      <h3
        className="text-[#182B5E] font-extrabold mb-3"
        style={{
          fontFamily: 'Estedad, Vazirmatn, sans-serif',
          fontSize: '28px',
          lineHeight: '1.76',
        }}
      >
        {title}
      </h3>

      <p
        className="text-[#334061] flex-1 mb-5"
        style={{
          fontFamily: 'Vazirmatn, sans-serif',
          fontSize: bodyFontSize,
          lineHeight: '1.66',
        }}
      >
        {body}
      </p>

      <p
        className="font-medium"
        style={{
          color: '#364E92',
          fontFamily: 'Vazirmatn, sans-serif',
          fontSize: '16px',
          lineHeight: '25px',
        }}
      >
        {outcome}
      </p>
    </div>
  );
}
