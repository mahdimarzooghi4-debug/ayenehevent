export function HighlightBar() {
  return (
    <div
      className="flex flex-col items-start gap-4 rounded-[20px] px-6 py-5 md:flex-row md:items-center md:gap-6 md:px-10"
      style={{ background: '#182B5E' }}
    >
      <div className="flex-1 text-right">
        <p
          className="mb-1 text-[14px] font-medium"
          style={{
            fontFamily: "'Vazirmatn', sans-serif",
            color: '#F0CCB1',
            lineHeight: '21.88px',
          }}
        >
          ظرفیت حمایت
        </p>
        <h3
          className="text-[22px] font-medium"
          style={{
            fontFamily: "'Vazirmatn', sans-serif",
            color: '#FFFFFF',
            lineHeight: '34.38px',
          }}
        >
          پروژه‌های منتخب پس از ارزیابی می‌توانند وارد مرحله حمایت و اجرای پایلوت شوند.
        </h3>
      </div>
    </div>
  );
}
