import { AxesSection } from "@/components/landing/AxesSection";
import { FaqSection } from "@/components/landing/FaqSection";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/aec65e9c-ce8e-48ae-a5e2-d023ee4174b5.png",
  hero: "/hero.jpg",
  partnerKhaneh: "https://www.figma.com/api/mcp/asset/74f01954-a25e-4690-8ab7-037895634dd2.png",
  partnerEmdad: "/emdad-white.png",
};

const journey = [
  ["۰۱", "انتخاب مسئله و ثبت‌نام واحد", "پرونده فردی، تیمی یا مجموعه‌ای"],
  ["۰۲", "ارزیابی اولیه", "انتخاب ظرفیت‌های مناسب و هسته‌های اولیه"],
  ["۰۳", "تکمیل هسته‌های مسئله‌محور", "اتصال افراد مکمل و مشخص شدن نقش‌ها"],
  ["۰۴", "بوت‌کمپ مشترک", "آموزش، تمرین و آماده‌سازی بسته اولیه پایلوت"],
  ["۰۵", "مأموریت عملی و اعتبارسنجی", "آزمون میدانی راهکار و ارزیابی عملکرد اعضا"],
  ["۰۶", "ارزیابی مرحله دوم", "انتخاب پروژه‌های آماده‌تر برای ارائه نهایی"],
  ["۰۷", "دمو دی", "انتخاب حداکثر ۵ پروژه برای حمایت"],
  ["۰۸", "اجرای پایلوت و خرید خدمت", "قرارداد مرحله‌ای، سنجش اثر و تصمیم توسعه"],
  ["۰۹", "شبکه آینه", "ثبت پروفایل اعضای واجد صلاحیت بر اساس عملکرد واقعی"],
] as const;

const supports = [
  ["۰۱", "اجرای واقعی", "پایلوت در قالب خرید خدمت", "حمایت اجرای پایلوت بر اساس قرارداد، نقاط عطف و تأیید پیشرفت پروژه انجام می‌شود."],
  ["۰۲", "همراهی تخصصی", "منتور و مشاور اجرایی", "پروژه‌های منتخب متناسب با نیاز از منتور تخصصی و مشاور اجرایی بهره‌مند می‌شوند."],
  ["۰۳", "توسعه مسیر", "بازارسازی و پشتیبانی ارتباطی", "برای توسعه مسیر اجرا، بازارسازی و پشتیبانی ارتباطی متناسب با نیاز پروژه فراهم می‌شود."],
  ["۰۴", "فرصت همکاری", "شبکه آینه", "اعضای واجد صلاحیت می‌توانند بر اساس عملکرد واقعی در بانک تخصصی و شبکه همکاری آینه ثبت شوند."],
] as const;

function Accent() {
  return <div className="mt-2 h-[5px] w-[72px] rounded-full bg-[var(--ayene-coral)]" />;
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-[15px] font-medium text-[var(--ayene-coral)]">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--ayene-blue-dark)] lg:text-[42px] lg:leading-[68px]">{title}</h2>
      <Accent />
      <p className="mt-7 max-w-[700px] text-base leading-8 text-[#334061] lg:text-[19px]">{description}</p>
    </div>
  );
}

function SocialIcon({ name }: { name: "rubika" | "bale" | "instagram" | "telegram" }) {
  if (name === "rubika") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-label="روبیکا">
        <path fill="#9ca3af" d="M12 2 20 6.6v9L12 20.2 4 15.6v-9L12 2Z" />
        <path fill="#d1d5db" d="m12 2 4 2.3-4 2.3-4-2.3L12 2Z" />
        <path fill="#6b7280" d="m4 6.6 4-2.3 4 2.3-4 2.3-4-2.3Z" />
        <path fill="#4b5563" d="m12 6.6 4-2.3 4 2.3-4 2.3-4-2.3Z" />
        <path fill="#374151" d="m4 6.6 4 2.3v4.6L4 15.6v-9Z" />
        <path fill="#6b7280" d="m20 6.6-4 2.3v4.6l4 2.1v-9Z" />
        <path fill="#e5e7eb" d="m8 8.9 4-2.3 4 2.3v4.6l-4 2.3-4-2.3V8.9Z" />
      </svg>
    );
  }
  if (name === "bale") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-label="بله">
        <path d="M5.2 3.2v12.2A5.4 5.4 0 0 0 10.6 21h2.9a7.3 7.3 0 0 0 0-14.6H9.2L5.2 3.2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="m8.4 12 2.2 2.2 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-label="اینستاگرام">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.7" r="1.1" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-label="تلگرام">
      <path d="M21 4 3.8 10.6c-1.2.5-1.2 1.2-.2 1.5l4.4 1.4 1.7 5.2c.2.6.1.8.8.8.5 0 .8-.2 1-.4l2.5-2.4 5.1 3.8c.9.5 1.6.2 1.8-.9L24 5.5c.3-1.3-.5-1.9-1.5-1.5H21Zm-2.1 3.1-8.4 7.6-.3 3.2-1.2-4 9.9-6.8Z" fill="currentColor" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden bg-[var(--ayene-bg)] text-[var(--ayene-text)]">
      <section className="bg-[#faf9f7] py-6 lg:h-[900px] lg:overflow-hidden lg:py-0">
        <header className="landing-shell flex items-center justify-between gap-6 lg:h-[112px] lg:pt-[24px]">
          <img src={assets.logo} alt="رویداد ملی آینه" className="h-[70px] w-[210px] object-contain" />
          <nav className="hidden flex-1 items-center justify-center gap-[46px] text-[15px] font-medium text-[var(--ayene-blue-dark)] lg:flex">
            <a href="#about">معرفی آینه</a><a href="#axes">محورها و مسائل</a><a href="#journey">مسیر رویداد</a><a href="#support">حمایت‌ها</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="/tracking" className="flex h-[48px] w-[200px] items-center justify-center rounded-[24px] border border-[var(--ayene-blue)] bg-white text-[15px] font-medium text-[var(--ayene-blue)]">پیگیری ثبت‌نام</a>
            <a href="/register" className="flex h-[48px] w-[164px] items-center justify-center rounded-[24px] bg-[var(--ayene-coral)] text-[15px] font-medium text-white">ثبت‌نام در رویداد</a>
          </div>
        </header>

        <div className="landing-shell mt-[38px] grid gap-10 lg:grid-cols-[560px_630px] lg:gap-[50px] lg:[direction:ltr]">
          <div dir="rtl" className="h-[421px]">
            <div className="mx-auto mt-[12px] h-[317px] w-[544px] rounded-[26px] border-[7px] border-[var(--ayene-gold)] p-[5px]">
              <img src={assets.hero} alt="گفت‌وگوی تیمی در رویداد آینه" className="h-full w-full rounded-[18px] object-cover" />
            </div>
            <div className="mx-auto mt-[28px] flex w-[524px] items-center gap-6" aria-hidden>
              <span className="h-[2px] flex-1 bg-[var(--ayene-gold)]" /><span className="h-[14px] w-[14px] rotate-45 bg-[var(--ayene-gold)]" /><span className="h-[2px] flex-1 bg-[var(--ayene-gold)]" />
            </div>
          </div>
          <div dir="rtl" className="pt-[52px] text-right">
            <h1 className="font-display text-5xl font-extrabold leading-[1.42] text-[var(--ayene-blue-dark)] lg:text-[58px] lg:leading-[82px]">مسئله را ببین<span className="text-[var(--ayene-coral)]">؛</span><br />راهکار را بساز</h1>
            <div className="mt-2 h-[5px] w-[92px] rounded-full bg-[var(--ayene-coral)]" />
            <p className="mt-5 max-w-[530px] text-[18px] font-medium leading-[31px] text-[var(--ayene-blue-dark)]">مسیر تبدیل مسئله‌های واقعی کمیته امداد امام خمینی(ره) به راهکارهای قابل اجرا</p>
            <div className="mt-[27px] flex gap-[22px]">
              <a href="/register" className="flex h-[58px] w-[240px] items-center justify-center rounded-[29px] bg-[var(--ayene-coral)] text-[17px] font-medium text-white">ثبت‌نام در رویداد</a>
              <a href="#axes" className="flex h-[58px] w-[238px] items-center justify-center rounded-[29px] border border-[var(--ayene-blue)] bg-white text-[17px] font-medium text-[var(--ayene-blue)]">مشاهده نظام مسائل</a>
            </div>
          </div>
        </div>

        <div className="landing-shell mt-[79px] grid h-[142px] grid-cols-2 overflow-hidden rounded-[24px] border border-[var(--ayene-gold)] bg-white shadow-[0_10px_12px_rgba(24,43,94,.07)] lg:grid-cols-4 lg:[direction:ltr]">
          {[["۱۲۰۰+", "نفر ثبت‌نام‌شده"], ["۳۵۰+", "ایده و راهکار ثبت‌شده"], ["۳۱", "استان مشارکت‌کننده"], ["۵", "محور رویداد"]].map(([n, label], i) => (
            <div key={label} dir="rtl" className={`flex flex-col items-center justify-center text-center ${i < 3 ? "border-r border-[#e7eaf2]" : ""}`}>
              <strong className={`font-display font-extrabold text-[var(--ayene-blue-dark)] ${i === 3 ? "text-[34px]" : "text-[22px]"}`}>{n}</strong>
              <span className="mt-2 text-[14px] font-medium text-[#414c66]">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="bg-[var(--ayene-surface-blue)] py-20 lg:h-[620px] lg:overflow-hidden lg:py-0">
        <div className="landing-shell grid gap-12 lg:grid-cols-[570px_520px] lg:gap-[150px] lg:pt-[95px] lg:[direction:ltr]">
          <div dir="rtl" className="flex h-[430px] flex-col items-center justify-center rounded-[28px] border-2 border-[var(--ayene-gold)] bg-white text-center">
            <p className="text-[16px] font-medium text-[var(--ayene-coral)]">۵ محور رویداد</p>
            <div className="mt-5 font-display text-[48px] font-extrabold leading-[72px] text-[var(--ayene-blue-dark)]">مسئله واقعی<br />تا راهکار قابل اجرا</div>
            <div className="mt-7 flex w-[260px] items-center"><span className="h-[2px] flex-1 bg-[var(--ayene-gold)]" /><span className="h-[18px] w-[18px] rotate-45 bg-[var(--ayene-gold)]" /><span className="h-[2px] flex-1 bg-[var(--ayene-gold)]" /></div>
            <p className="mt-7 text-[18px] font-medium text-[var(--ayene-blue)]">شناخت دقیق منجر به اقدام صحیح خواهد شد</p>
          </div>
          <div dir="rtl" className="text-right">
            <p className="text-[15px] font-medium text-[var(--ayene-coral)]">معرفی رویداد</p>
            <h2 className="mt-2 font-display text-[42px] font-extrabold leading-[70px] text-[var(--ayene-blue-dark)]">آینه چیست؟</h2><Accent />
            <p className="mt-6 text-[22px] leading-[42px] text-[#334061]">رویداد آینه در ۵ محور برگزار می‌شود. هر محور، نظام مسائل اختصاصی خود را دارد و هدف، تبدیل مسئله‌های واقعی کمیته امداد امام خمینی(ره) به راهکارهای قابل اجراست.</p>
            <div className="mt-5 flex h-[76px] items-center rounded-[18px] border border-[var(--ayene-gold)] bg-white px-5 text-[18px] font-medium text-[var(--ayene-blue)]">یک هدف مشترک: حل نظام مسائل کمیته امداد امام خمینی(ره)</div>
          </div>
        </div>
      </section>

      <AxesSection />

      <section className="bg-[var(--ayene-surface-blue)] py-20 lg:h-[700px] lg:overflow-hidden lg:py-0">
        <div className="landing-shell lg:pt-[62px]">
          <SectionHeading eyebrow="دو مسیر ورود" title="چطور وارد آینه می‌شوی؟" description="چه ایده داشته باشی، چه تجربه؛ برای مشارکت در حل مسائل واقعی امداد یک مسیر مشخص داری." />
          <div className="mt-[42px] grid gap-[30px] lg:grid-cols-2">
            <article className="h-[300px] rounded-[26px] border border-[var(--ayene-gold)] bg-white p-[25px_40px]">
              <div className="mr-auto flex h-[42px] w-[190px] items-center justify-center rounded-[21px] bg-[var(--ayene-coral)] text-[15px] font-medium text-white">ایده یا راهکار دارم</div>
              <h3 className="mt-6 font-display text-[28px] font-extrabold text-[var(--ayene-blue-dark)]">برای یک مسئله، راهکار داری؟</h3>
              <p className="mt-4 text-[17px] leading-8 text-[#334061]">اگر صاحب ایده یا تیم هستی، مسئله مرتبط را انتخاب کن و راهکارت را برای توسعه، اعتبارسنجی و ورود به مسیر پایلوت ارائه بده.</p>
              <p className="mt-3 text-[16px] font-medium text-[var(--ayene-blue)]">خروجی مسیر: توسعه راهکار و امکان اجرای پایلوت</p>
            </article>
            <article className="h-[300px] rounded-[26px] border border-[var(--ayene-gold)] bg-white p-[25px_40px]">
              <div className="mr-auto flex h-[42px] w-[200px] items-center justify-center rounded-[21px] bg-[var(--ayene-blue)] text-[15px] font-medium text-white">تجربه و تخصص دارم</div>
              <h3 className="mt-6 font-display text-[28px] font-extrabold text-[var(--ayene-blue-dark)]">ایده مشخص نداری، اما تجربه داری؟</h3>
              <p className="mt-4 text-[16px] leading-8 text-[#334061]">سوابق، مهارت و تجربه‌ات را ثبت کن. افراد واجد شرایط وارد باشگاه کنشگران اجتماعی می‌شوند و متناسب با نیاز پروژه‌ها برای همکاری و به‌کارگیری پروژه‌ای در نظر گرفته می‌شوند.</p>
              <p className="mt-3 text-[16px] font-medium text-[var(--ayene-blue)]">خروجی مسیر: ورود به باشگاه کنشگران اجتماعی</p>
            </article>
          </div>
          <div className="mx-auto mt-[16px] flex w-[620px] items-center gap-12" aria-hidden><span className="h-[2px] flex-1 bg-[var(--ayene-gold)]" /><span className="h-[18px] w-[18px] rotate-45 bg-[var(--ayene-gold)]" /><span className="h-[2px] flex-1 bg-[var(--ayene-gold)]" /></div>
        </div>
      </section>

      <section id="journey" className="bg-[var(--ayene-surface-blue)] py-20 lg:h-[930px] lg:overflow-hidden lg:py-0">
        <div className="landing-shell lg:pt-[68px]">
          <SectionHeading eyebrow="مسیر رویداد" title="از ثبت‌نام تا نمونه اولیه" description="مسیر آینه در ۹ مرحله پیش می‌رود؛ از انتخاب مسئله و ثبت‌نام تا اجرای نمونه اولیه، خرید خدمت و ورود به شبکه آینه." />
          <div className="mt-[42px] grid gap-5 lg:grid-cols-3 lg:gap-x-[50px] lg:gap-y-[28px]">
            {journey.map(([num, title, desc]) => (
              <article key={num} className="relative h-[142px] rounded-[20px] border border-[var(--ayene-gold)] bg-white p-[58px_28px_16px]">
                <span className="absolute right-[28px] top-[18px] flex h-[34px] w-[58px] items-center justify-center rounded-[17px] bg-[var(--ayene-coral)] text-[15px] font-medium text-white">{num}</span>
                <h3 className="text-[18px] font-medium text-[var(--ayene-blue-dark)]">{title}</h3><p className="mt-2 text-[14px] text-[#334061]">{desc}</p>
              </article>
            ))}
          </div>
          <p className="mt-[38px] text-center text-[16px] font-medium text-[var(--ayene-blue)]">خروجی مسیر: راهکارهای آماده‌تر برای اجرا و شبکه‌ای از افراد واجدصلاحیت برای همکاری‌های بعدی</p>
        </div>
      </section>

      <section id="support" className="bg-[var(--ayene-surface-blue)] py-20 lg:h-[840px] lg:overflow-hidden lg:py-0">
        <div className="landing-shell lg:pt-[38px]">
          <SectionHeading eyebrow="حمایت‌ها و فرصت‌ها" title="بعد از دمو دی چه حمایتی دریافت می‌کنی؟" description="پروژه‌های برتر وارد مرحله پایلوت می‌شوند و از حمایت اجرایی و تخصصی آینه بهره می‌گیرند." />
          <div className="mt-[34px] grid gap-5 lg:grid-cols-2 lg:gap-x-[40px] lg:gap-y-[20px]">
            {supports.map(([num, tag, title, desc]) => (
              <article key={num} className="relative h-[170px] rounded-[20px] border border-[var(--ayene-gold)] bg-white p-[66px_24px_18px]">
                <span className="absolute right-[24px] top-[20px] text-[16px] font-medium text-[var(--ayene-coral)]">{num}</span>
                <span className="absolute left-[24px] top-[20px] flex h-[34px] min-w-[124px] items-center justify-center rounded-[17px] border border-[#d6def0] bg-[#fbfcff] px-4 text-[13px] font-medium text-[var(--ayene-blue)]">{tag}</span>
                <h3 className="font-display text-[21px] font-extrabold text-[var(--ayene-blue-dark)]">{title}</h3><p className="mt-2 text-[16px] leading-7 text-[#334061]">{desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-[36px] grid h-[92px] grid-cols-[1fr_420px] items-center rounded-[20px] bg-[var(--ayene-blue-dark)] px-10 text-white">
            <div><p className="text-[14px] text-[#f0ccb1]">ظرفیت حمایت</p><p className="mt-1 text-[22px] font-medium">حداکثر ۵ پروژه در هر دوره وارد مرحله حمایت می‌شوند.</p></div>
            <p className="text-[15px] leading-7 text-[#dfe6f6]">ثبت‌نام یا راه‌یابی به مراحل میانی، به‌معنای دریافت حمایت مالی نیست.</p>
          </div>
        </div>
      </section>

      <section id="registration" className="bg-[#fbfaf7] py-20 lg:h-[960px] lg:overflow-hidden lg:py-0">
        <div className="landing-shell lg:pt-[58px]">
          <p className="text-[15px] font-medium text-[var(--ayene-coral)]">ثبت‌نام در آینه</p>
          <h2 className="mt-2 font-display text-[40px] font-extrabold leading-[72px] text-[var(--ayene-blue-dark)]">آماده‌ای وارد مسیر آینه شوی؟</h2><Accent />
          <p className="mt-6 max-w-[730px] text-[19px] leading-8 text-[#334061]">ثبت‌نام برای فرد، تیم یا مجموعه در یک فرم انجام می‌شود؛ داشتن راهکار آماده برای ورود به مسیر الزامی نیست.</p>
          <div className="relative mt-[40px] h-[648px] rounded-[28px] border border-[var(--ayene-gold)] bg-white p-[50px_40px_20px] shadow-[0_10px_30px_rgba(23,41,92,.06)]">
            <span className="absolute right-[40px] top-[14px] flex h-[36px] w-[190px] items-center justify-center rounded-[18px] bg-[#fdf1ec] text-[13px] font-medium text-[var(--ayene-coral)]">فرم ثبت‌نام واحد</span>
            <h3 className="font-display text-[26px] font-extrabold text-[var(--ayene-blue-dark)]">ثبت‌نام مرحله‌به‌مرحله</h3>
            <p className="mt-2 text-[16px] text-[#334061]">اطلاعات مشترک همه متقاضیان در این مرحله دریافت می‌شود.</p>
            <div className="mt-[30px] flex items-start justify-between">
              {["اطلاعات پایه", "انتخاب مسیر", "محور و مسئله", "تجربه / راهکار", "فایل تکمیلی", "تأیید و ارسال"].map((step, i) => (
                <div key={step} className="relative flex w-[164px] flex-col items-center text-center">
                  {i < 5 ? <span className="absolute -left-[80px] top-[21px] h-[2px] w-[152px] bg-[var(--ayene-gold)]" aria-hidden /> : null}
                  <span className={`relative z-10 flex h-[44px] w-[44px] items-center justify-center rounded-full border border-[var(--ayene-gold)] text-[14px] ${i === 0 ? "bg-[var(--ayene-coral)] text-white" : "bg-white text-[var(--ayene-blue)]"}`}>۰{i + 1}</span>
                  <span className={`mt-1 text-[13px] font-medium ${i === 0 ? "text-[var(--ayene-blue-dark)]" : "text-[#616b80]"}`}>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-[28px]"><h4 className="text-[22px] font-medium text-[var(--ayene-blue-dark)]">۱. اطلاعات پایه</h4><p className="mt-1 text-[14px] text-[#616b80]">برای فرد، تیم یا مجموعه</p></div>
            <div className="mt-[22px] grid grid-cols-2 gap-x-[30px] gap-y-[22px]">
              {[["نام و نام خانوادگی", "مریم احمدی"], ["استان و شهر", "تهران، تهران"], ["شماره تماس / راه ارتباطی", "۰۹۱۲۱۲۳۴۵۶۷"], ["نحوه حضور", "فرد"]].map(([label, value]) => (
                <label key={label} className="block text-[12px] font-medium text-[#334061]">{label}<span className="mt-1 flex h-[48px] items-center rounded-[14px] border border-[var(--ayene-gold)] bg-white px-4 text-[15px] font-normal text-[#616b80]">{value}</span></label>
              ))}
            </div>
            <label className="mt-[20px] block text-[12px] font-medium text-[#334061]">اطلاعات اعضا (در صورت تیم یا مجموعه)<span className="mt-1 flex h-[54px] items-center rounded-[14px] border border-[var(--ayene-gold)] bg-white px-4 text-[15px] font-normal text-[#616b80]">ثبت‌نام فردی — عضو دیگری ندارد</span></label>
            <a href="/register" className="mr-auto mt-[12px] flex h-[46px] w-[220px] items-center justify-center rounded-[16px] bg-[var(--ayene-coral)] text-[16px] font-medium text-white">ادامه</a>
          </div>
        </div>
      </section>

      <FaqSection />

      <footer className="bg-[var(--ayene-bg-inverse)] text-white lg:h-[326px] lg:overflow-hidden">
        <div className="landing-shell relative h-full pt-[34px]">
          <div className="grid grid-cols-[290px_1fr_1fr_320px] gap-[36px]">
            <div>
              <div className="flex h-[100px] items-center justify-center rounded-lg border border-[#5067a4] bg-[#294786] p-3"><img src={assets.logo} alt="آینه" className="h-full w-full object-contain" /></div>
              <p className="mt-3 text-[15px] font-medium text-[var(--ayene-gold)]">مسئله را ببین؛ راهکار را بساز</p>
            </div>
            <div><h3 className="text-[15px] font-medium text-[var(--ayene-gold)]">دسترسی سریع</h3><div className="mt-4 space-y-2 text-[15px]"><a className="block" href="#about">معرفی آینه</a><a className="block" href="#journey">مسیر رویداد</a><a className="block" href="/register">ثبت‌نام</a></div></div>
            <div><h3 className="text-[15px] font-medium text-[var(--ayene-gold)]">دسترسی سریع</h3><div className="mt-4 space-y-2 text-[15px]"><a className="block" href="#axes">محورها و مسائل</a><a className="block" href="#support">حمایت‌ها</a><a className="block" href="#faq">پرسش‌های متداول</a></div></div>
            <div className="grid grid-cols-[1fr_1fr] gap-4">
              <div><h3 className="text-center text-[15px] font-medium text-[var(--ayene-gold)]">برگزارکنندگان</h3><div className="mt-3 flex gap-2"><div className="flex h-[96px] w-[128px] items-center justify-center rounded-[14px] border border-[var(--ayene-gold)] bg-[#f6f1e8] p-2"><img src={assets.partnerKhaneh} alt="خانه خلاق" className="h-full w-full object-contain" /></div><div className="flex h-[96px] w-[128px] items-center justify-center rounded-[14px] border border-[#5067a4] bg-[var(--ayene-blue)] p-2"><img src={assets.partnerEmdad} alt="کمیته امداد امام خمینی" className="h-full w-full object-contain" /></div></div></div>
              <div><h3 className="text-[15px] font-medium text-[var(--ayene-gold)]">ارتباط با ما</h3><div className="mt-4 space-y-2 text-[15px]"><a className="block" href="/tracking">پیگیری ثبت‌نام</a><a className="block" href="/contact">تماس با دبیرخانه</a></div><div className="mt-5 flex gap-3 text-[var(--ayene-gold)]"><SocialIcon name="rubika" /><SocialIcon name="bale" /><SocialIcon name="instagram" /><SocialIcon name="telegram" /></div></div>
            </div>
          </div>
          <div className="absolute bottom-[55px] left-0 right-0 h-px bg-[#475c8f]" />
          <p className="absolute bottom-[18px] right-0 text-[13px] text-[#c9d1e3]">خانه خلاق و نوآوری آینه. کمیته امداد امام خمینی(ره)</p>
        </div>
      </footer>
    </main>
  );
}
