const PHOTO_URL = './images/hero-exact.webp';

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-9 pb-12 pt-7 sm:gap-11 sm:pb-14 sm:pt-10 lg:flex-row lg:gap-16 lg:pb-16 lg:pt-12">
      <div className="flex w-full flex-1 flex-col items-start text-right">
        <h1
          className="w-full text-right text-[38px] font-extrabold leading-[1.55] text-[#182B5E] sm:text-[48px] sm:leading-[1.5] lg:text-[58px] lg:leading-[82px]"
          style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}
        >
          مسئله را ببین<span className="text-[#FB8C74]">؛</span>
          <br />
          راهکار را بساز
        </h1>

        <div className="mb-5 mt-2 h-[5px] w-[92px] rounded-[3px] bg-[#FB8C74] sm:mb-6 sm:mt-3" />

        <p className="mb-7 w-full max-w-[590px] text-right text-[16px] font-medium leading-[30px] text-[#182B5E] sm:text-[17px] lg:mb-8 lg:text-[18px] lg:leading-[32px]">
          مسیر تبدیل مسئله‌های واقعی کمیته امداد امام خمینی(ره)
          <br className="hidden sm:block" />
          {' '}به راهکارهای قابل اجرا
        </p>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <a href="#register" className="flex h-[54px] items-center justify-center whitespace-nowrap rounded-full bg-[#FB8C74] px-7 text-[16px] font-medium text-white transition-colors hover:bg-[#f97d62] sm:h-[58px] sm:w-[240px] sm:px-8 sm:text-[17px]">
            ثبت‌نام در رویداد
          </a>
          <a href="#axes" className="flex h-[54px] items-center justify-center whitespace-nowrap rounded-full border border-[#364E92] bg-white px-7 text-[16px] font-medium text-[#364E92] transition-colors hover:bg-[#f0f3ff] sm:h-[58px] sm:w-[238px] sm:px-8 sm:text-[17px]">
            مشاهده نظام مسائل
          </a>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col items-center lg:w-[544px]">
        <div className="relative aspect-[544/317] w-full max-w-[544px] overflow-hidden rounded-[22px] bg-[#F9F7F1] shadow-[0_12px_28px_rgba(24,43,94,0.08)] sm:rounded-[26px]">
          <img
            src={PHOTO_URL}
            alt="تیم کاری رویداد آینه"
            className="h-full w-full object-cover object-center"
            width={1088}
            height={634}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="mt-4 flex w-full max-w-[544px] items-center">
          <div className="h-[2px] flex-1 bg-[#E0C89F]" />
          <div className="mx-3 h-[13px] w-[13px] rotate-45 bg-[#C9A84C] sm:h-[14px] sm:w-[14px]" />
          <div className="h-[2px] flex-1 bg-[#E0C89F]" />
        </div>
      </div>
    </section>
  );
}
