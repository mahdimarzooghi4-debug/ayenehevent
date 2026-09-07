interface SupportCardProps {
  number: string;
  tag: string;
  title: string;
  body: string;
}

export function SupportCard({ number, tag, title, body }: SupportCardProps) {
  return (
    <div className="bg-white rounded-[20px] px-6 pt-5 pb-4" style={{ border: '1.25px solid #E0C89F' }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[16px] font-medium leading-[25px]" style={{ fontFamily: "'Vazirmatn', sans-serif", color: '#FB8C74' }}>{number}</span>
        <div className="rounded-[17px] px-3 py-1 flex items-center" style={{ background: '#FBFCFF', border: '1px solid #D6DEF0' }}>
          <span className="text-[13px] font-medium leading-[20px]" style={{ fontFamily: "'Vazirmatn', sans-serif", color: '#364E92' }}>{tag}</span>
        </div>
      </div>
      <h3 className="text-[21px] font-extrabold mb-2" style={{ fontFamily: "'Estedad', 'Vazirmatn', sans-serif", color: '#182B5E', lineHeight: '36.91px' }}>{title}</h3>
      <p className="text-[16px] font-normal" style={{ fontFamily: "'Vazirmatn', sans-serif", color: '#334061', lineHeight: '25px' }}>{body}</p>
    </div>
  );
}
