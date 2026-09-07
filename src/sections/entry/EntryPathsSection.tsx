import { EntryCard } from './EntryCard';

export function EntryPathsSection() {
  return (
    <section id="entry" dir="rtl" className="bg-[#F6F8FD] py-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-[100px]">
        <div className="mb-10 text-right">
          <p className="mb-1 text-[15px] font-medium leading-[23.44px] text-[#FB8C74]">دو مسیر ورود</p>
          <h2 className="mb-2 text-[36px] font-extrabold leading-[1.75] text-[#182B5E] lg:text-[42px]" style={{ fontFamily: 'Estedad, Vazirmatn, sans-serif' }}>
            چطور وارد آینه می‌شوی؟
          </h2>
          <div className="mb-4 h-[5px] w-[172px] rounded-[3px] bg-[#FB8C74]" />
          <p className="max-w-[833px] text-[18px] leading-[1.7] text-[#334061] lg:text-[19px]">
            چه ایده داشته باشی، چه تجربه؛ برای مشارکت در حل مسائل واقعی امداد یک مسیر مشخص داری.
          </p>
        </div>

        <div className="flex flex-col gap-[30px] lg:flex-row">
          <EntryCard
            badge="ایده یا راهکار دارم"
            badgeColor="#FB8C74"
            title="برای یک مسئله، راهکار داری؟"
            body="اگر صاحب ایده، تیم یا مجموعه هستی، مسئله مرتبط را انتخاب کن و راهکارت را برای توسعه، اعتبارسنجی و ورود به مسیر پایلوت ارائه بده."
            outcome="خروجی مسیر: توسعه راهکار و امکان اجرای پایلوت"
            bodyFontSize="17px"
          />
          <EntryCard
            badge="تجربه و تخصص دارم"
            badgeColor="#364E92"
            title="ایده مشخص نداری، اما تجربه داری؟"
            body="سوابق، مهارت و تجربه‌ات را ثبت کن. افراد واجد شرایط وارد باشگاه کنشگران اجتماعی می‌شوند و متناسب با نیاز پروژه‌ها، برای همکاری و به‌کارگیری پروژه‌ای با کمیته امداد در نظر گرفته می‌شوند."
            outcome="خروجی مسیر: ورود به باشگاه کنشگران اجتماعی"
            bodyFontSize="16px"
          />
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-[2px] w-[250px] max-w-[35%] rounded-[1px] bg-[#E0C89F]" />
          <div className="h-[16px] w-[16px] rotate-45 bg-[#C9A84C]" />
          <div className="h-[2px] w-[250px] max-w-[35%] rounded-[1px] bg-[#E0C89F]" />
        </div>
      </div>
    </section>
  );
}
