const PHOTO_URL = 'https://cdn.codia.ai/figma/QAnV3aT20HZ7Y2PPnvuBCJ/img-5a1171a7dc1a87fc.png';
const LOCAL_LOGO_URL = './images/ayene-event-logo.webp';

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-12 pb-14 pt-8 lg:flex-row lg:gap-16 lg:pb-16">
      <div className="flex flex-1 flex-col items-start text-right">
        <h1 className="w-full text-right text-[42px] font-extrabold leading-[1.45] text-[#182B5E] sm:text-[50px] lg:text-[58px] lg:leading-[82px]">
          مسئله را ببین<span className="text-[#FB8C74]">؛</span>
          <br />
          راهکار را بساز
        </h1>

        <div className="mb-6 mt-3 h-[5px] w-36 rounded-[3px] bg-[#FB8C74]" />

        <p className="mb-8 w-full text-right text-[17px] font-medium leading-[31px] text-[#182B5E] lg:text-[18px]">
          مسیر تبدیل مسئله‌های واقعی کمیته امداد امام خمینی(ره)
          <br className="hidden sm:block" />
          {' '}به راهکارهای قابل اجرا
        </p>

        <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a href="#register" className="flex h-[58px] items-center justify-center whitespace-nowrap rounded-full bg-[#FB8C74] px-8 text-[17px] font-medium text-white transition-colors hover:bg-[#f97d62] sm:w-[240px]">
            ثبت‌نام در رویداد
          </a>
          <a href="#axes" className="flex h-[58px] items-center justify-center whitespace-nowrap rounded-full border border-[#364E92] bg-white px-8 text-[17px] font-medium text-[#364E92] transition-colors hover:bg-[#f0f3ff] sm:w-[238px]">
            مشاهده نظام مسائل
          </a>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col items-center lg:w-[544px]">
        <div className="relative aspect-[544/317] w-full max-w-[544px] overflow-hidden rounded-[26px] border-[7px] border-[#E0C89F] bg-white shadow-sm">
          {/* Local fallback remains visible if the Codia image is unavailable. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F9F7F1] px-8 text-center">
            <img
              src={LOCAL_LOGO_URL}
              alt=""
              aria-hidden="true"
              className="mb-4 w-[210px] max-w-[70%] object-contain opacity-95"
            />
            <p className="text-[16px] font-medium text-[#364E92] sm:text-[18px]">
              مسئله را ببین<span className="text-[#FB8C74]">؛</span> راهکار را بساز
            </p>
          </div>

          <img
            src={PHOTO_URL}
            alt="تیم کاری رویداد آینه"
            className="relative z-10 h-full w-full object-cover"
            loading="eager"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="mt-4 flex w-full max-w-[544px] items-center">
          <div className="h-[2px] flex-1 bg-[#E0C89F]" />
          <div className="mx-3 h-[14px] w-[14px] rotate-45 bg-[#C9A84C]" />
          <div className="h-[2px] flex-1 bg-[#E0C89F]" />
        </div>
      </div>
    </section>
  );
}
