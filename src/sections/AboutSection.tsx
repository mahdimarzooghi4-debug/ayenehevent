export function AboutSection() {
  return (
    <section id="about" dir="rtl" className="bg-[#F6F8FD] py-20 lg:py-[95px]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 px-6 lg:flex-row lg:gap-[150px] lg:px-[100px]">
        <div className="flex w-full flex-col items-start lg:w-[520px] lg:shrink-0">
          <p className="text-[15px] font-medium leading-[23.44px] text-[#FB8C74]">معرفی رویداد</p>
          <h2 className="mt-1 text-right text-[36px] font-extrabold leading-[1.75] text-[#182B5E] lg:text-[42px]" style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}>
            آینه چیست؟
          </h2>
          <div className="h-[5px] w-[72px] rounded-[3px] bg-[#FB8C74]" />
          <p className="mt-4 text-right text-[18px] font-normal leading-[2] text-[#334061] lg:text-[22px] lg:leading-[42px]">
            رویداد آینه در ۵ محور برگزار می‌شود. هر محور، نظام مسائل اختصاصی خود را دارد و هدف، تبدیل مسئله‌های واقعی کمیته امداد امام خمینی(ره) به راهکارهای قابل اجراست.
          </p>
          <div className="mt-8 w-full rounded-[18px] border-[1.5px] border-[#E0C89F] bg-white px-6 py-5 lg:px-10">
            <p className="text-right text-[15px] font-medium leading-[28.13px] text-[#364E92]">
              یک هدف مشترک: حل نظام مسائل کمیته امداد امام خمینی(ره)
            </p>
          </div>
        </div>

        <div className="flex min-h-[360px] w-full flex-col items-center justify-center rounded-[28px] border-2 border-[#E0C89F] bg-white px-8 py-10 lg:h-[430px] lg:w-[570px] lg:shrink-0 lg:px-[60px]">
          <p className="text-center text-[16px] font-medium leading-[25px] text-[#FB8C74]">۵ محور رویداد</p>
          <h3 className="mt-4 whitespace-pre-line text-center text-[36px] font-extrabold leading-[1.5] text-[#182B5E] lg:text-[48px] lg:leading-[72px]" style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}>
            {'مسئله واقعی\nتا راهکار قابل اجرا'}
          </h3>
          <div className="mt-8 flex w-full items-center gap-3">
            <div className="h-[2px] flex-1 bg-[#E0C89F]" />
            <div className="h-[18px] w-[18px] rotate-45 bg-[#C9A84C]" />
            <div className="h-[2px] flex-1 bg-[#E0C89F]" />
          </div>
          <p className="mt-4 text-center text-[18px] font-medium leading-[28.13px] text-[#364E92]">
            شناخت دقیق منجر به اقدام صحیح خواهد شد
          </p>
        </div>
      </div>
    </section>
  );
}
