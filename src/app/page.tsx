import { AxesSection } from "@/components/landing/AxesSection";
import { FaqSection } from "@/components/landing/FaqSection";

const assets = {
  logo: "https://www.figma.com/api/mcp/asset/aec65e9c-ce8e-48ae-a5e2-d023ee4174b5.png",
  hero: "https://www.figma.com/api/mcp/asset/211b92f1-a67e-4e0c-81e9-dffc945faf63.png",
  partnerKhaneh: "https://www.figma.com/api/mcp/asset/74f01954-a25e-4690-8ab7-037895634dd2.png",
  partnerEmdad: "https://www.figma.com/api/mcp/asset/9050740f-69b8-4572-a0ab-ab24efda1c0b.png",
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

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-[var(--ayene-coral)]">{eyebrow}</p>
      <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-[var(--ayene-blue-dark)] md:text-5xl">
        {title}
      </h2>
      <div className="mt-5 h-1.5 w-16 rounded-full bg-[var(--ayene-coral)]" />
      {description ? (
        <p className="mt-8 max-w-3xl text-base leading-8 text-[#334061] md:text-xl">{description}</p>
      ) : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-white text-[var(--ayene-blue-dark)]">
      <section className="bg-[#faf9f7] pb-16 pt-5 md:min-h-[900px] md:pb-20">
        <header className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-3 md:px-8">
          <a href="#top" aria-label="رویداد ملی آینه" className="shrink-0">
            <img src={assets.logo} alt="رویداد ملی آینه" className="h-14 w-auto object-contain md:h-[70px]" />
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-[var(--ayene-blue-dark)] lg:flex">
            <a href="#about" className="transition hover:text-[var(--ayene-coral)]">معرفی آینه</a>
            <a href="#axes" className="transition hover:text-[var(--ayene-coral)]">محورها و مسائل</a>
            <a href="#journey" className="transition hover:text-[var(--ayene-coral)]">مسیر رویداد</a>
            <a href="#support" className="transition hover:text-[var(--ayene-coral)]">حمایت‌ها</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="/tracking"
              className="hidden rounded-full border border-[var(--ayene-blue)] bg-white px-5 py-3 text-sm font-medium text-[var(--ayene-blue)] sm:inline-flex"
            >
              پیگیری ثبت‌نام
            </a>
            <a
              href="#registration"
              className="rounded-full bg-[var(--ayene-coral)] px-5 py-3 text-sm font-medium text-white md:px-6"
            >
              ثبت‌نام در رویداد
            </a>
          </div>
        </header>

        <div id="top" className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 pt-12 md:grid-cols-2 md:px-8 md:pt-12">
          <div className="order-2 md:order-1">
            <div className="relative mx-auto max-w-[560px]">
              <div className="absolute -inset-3 rounded-[28px] border-[7px] border-[var(--ayene-gold)]" />
              <img
                src={assets.hero}
                alt="گروهی در حال گفت‌وگو و کار روی یک مسئله"
                className="relative aspect-[520/293] w-full rounded-[20px] object-cover"
              />
              <div className="mx-auto mt-10 flex max-w-[500px] items-center gap-5" aria-hidden>
                <span className="h-px flex-1 bg-[var(--ayene-gold)]" />
                <span className="h-4 w-4 rotate-45 bg-[var(--ayene-gold)]" />
                <span className="h-px flex-1 bg-[var(--ayene-gold)]" />
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 md:pr-6">
            <h1 className="font-display text-5xl font-extrabold leading-[1.45] text-[var(--ayene-blue-dark)] md:text-[58px]">
              مسئله را ببین<span className="text-[var(--ayene-coral)]">؛</span>
              <br />
              راهکار را بساز
            </h1>
            <div className="mt-4 h-1.5 w-24 rounded-full bg-[var(--ayene-coral)]" />
            <p className="mt-8 max-w-xl text-lg font-medium leading-9 text-[var(--ayene-blue-dark)]">
              مسیر تبدیل مسئله‌های واقعی کمیته امداد امام خمینی(ره) به راهکارهای قابل اجرا
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#registration"
                className="rounded-full bg-[var(--ayene-coral)] px-8 py-4 text-base font-medium text-white transition hover:brightness-95"
              >
                ثبت‌نام در رویداد
              </a>
              <a
                href="#axes"
                className="rounded-full border border-[var(--ayene-blue)] bg-white px-8 py-4 text-base font-medium text-[var(--ayene-blue)] transition hover:bg-[#f7f9ff]"
              >
                مشاهده نظام مسائل
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-[1240px] px-5 md:px-8">
          <div className="grid overflow-hidden rounded-3xl border border-[var(--ayene-gold)] bg-white shadow-[0_10px_30px_rgba(24,43,94,.07)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["۱۲۰۰+", "نفر ثبت‌نام‌شده"],
              ["۳۵۰+", "ایده و راهکار ثبت‌شده"],
              ["۳۱", "استان مشارکت‌کننده"],
              ["۵", "محور رویداد"],
            ].map(([value, label], index) => (
              <div key={label} className={`px-6 py-8 text-center ${index ? "border-t border-[#e7eaf2] sm:border-t-0 sm:border-r" : ""}`}>
                <div className="font-display text-3xl font-extrabold text-[var(--ayene-blue-dark)]">{value}</div>
                <div className="mt-2 text-sm font-medium text-[#414c66]">{label}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-[#6b7280]">* اعداد این بخش فعلاً نمایشی هستند و در نسخه نهایی از سامانه دریافت می‌شوند.</p>
        </div>
      </section>

      <section id="about" className="bg-[var(--ayene-surface-blue)] py-20 md:py-24">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 md:grid-cols-2 md:px-8">
          <div>
            <SectionHeading eyebrow="معرفی رویداد" title="آینه چیست؟" />
            <p className="mt-8 text-lg leading-10 text-[#334061] md:text-[22px]">
              رویداد آینه در ۵ محور برگزار می‌شود. هر محور، نظام مسائل اختصاصی خود را دارد و هدف، تبدیل مسئله‌های واقعی کمیته امداد امام خمینی(ره) به راهکارهای قابل اجراست.
            </p>
            <div className="mt-8 rounded-2xl border border-[var(--ayene-gold)] bg-white px-6 py-5 text-lg font-medium text-[var(--ayene-blue)]">
              یک هدف مشترک: حل نظام مسائل کمیته امداد امام خمینی(ره)
            </div>
          </div>

          <div className="rounded-[28px] border-2 border-[var(--ayene-gold)] bg-white px-7 py-12 text-center md:px-10">
            <p className="font-medium text-[var(--ayene-coral)]">۵ محور رویداد</p>
            <p className="mt-8 font-display text-4xl font-extrabold leading-[1.6] text-[var(--ayene-blue-dark)] md:text-5xl">
              مسئله واقعی
              <br />
              تا راهکار قابل اجرا
            </p>
            <div className="mx-auto mt-8 flex max-w-[280px] items-center gap-3" aria-hidden>
              <span className="h-px flex-1 bg-[var(--ayene-gold)]" />
              <span className="h-4 w-4 rotate-45 bg-[var(--ayene-gold)]" />
              <span className="h-px flex-1 bg-[var(--ayene-gold)]" />
            </div>
            <p className="mt-8 text-lg font-medium text-[var(--ayene-blue)]">شناخت دقیق منجر به اقدام صحیح خواهد شد</p>
          </div>
        </div>
      </section>

      <AxesSection />

      <section className="bg-[var(--ayene-surface-blue)] py-20 md:py-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <SectionHeading
            eyebrow="دو مسیر ورود"
            title="چطور وارد آینه می‌شوی؟"
            description="چه ایده داشته باشی، چه تجربه؛ برای مشارکت در حل مسائل واقعی امداد یک مسیر مشخص داری."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">
            <article className="rounded-[26px] border border-[var(--ayene-gold)] bg-white p-8">
              <span className="inline-flex rounded-full bg-[var(--ayene-coral)] px-5 py-2.5 text-sm font-medium text-white">ایده یا راهکار دارم</span>
              <h3 className="mt-8 font-display text-2xl font-extrabold text-[var(--ayene-blue-dark)]">برای یک مسئله، راهکار داری؟</h3>
              <p className="mt-5 text-base leading-8 text-[#334061]">
                اگر صاحب ایده، تیم یا راهکار هستی، مسئله مرتبط را انتخاب کن و راهکارت را برای توسعه، اعتبارسنجی و ورود به مسیر پایلوت ارائه بده.
              </p>
              <p className="mt-6 font-medium text-[var(--ayene-blue)]">خروجی مسیر: توسعه راهکار و امکان اجرای پایلوت</p>
            </article>

            <article className="rounded-[26px] border border-[var(--ayene-gold)] bg-white p-8">
              <span className="inline-flex rounded-full bg-[var(--ayene-blue)] px-5 py-2.5 text-sm font-medium text-white">تجربه و تخصص دارم</span>
              <h3 className="mt-8 font-display text-2xl font-extrabold text-[var(--ayene-blue-dark)]">ایده مشخص نداری، اما تجربه داری؟</h3>
              <p className="mt-5 text-base leading-8 text-[#334061]">
                سوابق، مهارت و تجربه‌ات را ثبت کن. افراد واجد شرایط وارد باشگاه کنشگران اجتماعی می‌شوند و متناسب با نیاز پروژه‌ها، برای همکاری و به‌کارگیری پروژه‌ای در نظر گرفته می‌شوند.
              </p>
              <p className="mt-6 font-medium text-[var(--ayene-blue)]">خروجی مسیر: ورود به باشگاه کنشگران اجتماعی</p>
            </article>
          </div>
        </div>
      </section>

      <section id="journey" className="bg-[var(--ayene-surface-blue)] py-20 md:py-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <SectionHeading
            eyebrow="مسیر رویداد"
            title="از ثبت‌نام تا نمونه اولیه"
            description="مسیر آینه در ۹ مرحله پیش می‌رود؛ از انتخاب مسئله و ثبت‌نام تا اجرای نمونه اولیه، خرید خدمت و ورود به شبکه آینه."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {journey.map(([number, title, description]) => (
              <article key={number} className="rounded-[20px] border border-[var(--ayene-gold)] bg-white p-7">
                <span className="inline-flex min-w-14 justify-center rounded-full bg-[var(--ayene-coral)] px-4 py-2 text-sm font-medium text-white">{number}</span>
                <h3 className="mt-5 text-lg font-medium text-[var(--ayene-blue-dark)]">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#334061]">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 text-center font-medium leading-8 text-[var(--ayene-blue)]">
            خروجی مسیر: راهکارهای آماده‌تر برای اجرا و شبکه‌ای از افراد واجدصلاحیت برای همکاری‌های بعدی
          </p>
        </div>
      </section>

      <section id="support" className="bg-[var(--ayene-surface-blue)] py-20 md:py-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <SectionHeading
            eyebrow="حمایت‌ها و فرصت‌ها"
            title="بعد از دمو دی چه حمایتی دریافت می‌کنی؟"
            description="پروژه‌های منتخب وارد مرحله پایلوت می‌شوند و از حمایت اجرایی و تخصصی آینه بهره می‌گیرند."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {supports.map(([number, tag, title, description]) => (
              <article key={number} className="rounded-[20px] border border-[var(--ayene-gold)] bg-white p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-[var(--ayene-coral)]">{number}</span>
                  <span className="rounded-full border border-[#d6def0] bg-[#fbfcff] px-4 py-2 text-xs font-medium text-[var(--ayene-blue)]">{tag}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-extrabold text-[var(--ayene-blue-dark)]">{title}</h3>
                <p className="mt-4 text-base leading-8 text-[#334061]">{description}</p>
              </article>
            ))}
          </div>

          <div className="mt-9 grid gap-5 rounded-[20px] bg-[var(--ayene-blue-dark)] px-7 py-7 text-white md:grid-cols-[1.4fr_1fr] md:px-10">
            <div>
              <p className="text-sm text-[#f0ccb1]">ظرفیت حمایت</p>
              <p className="mt-2 text-xl font-medium">حداکثر ۵ پروژه در هر دوره وارد مرحله حمایت می‌شوند.</p>
            </div>
            <p className="self-center text-sm leading-7 text-[#dfe6f6]">ثبت‌نام یا راه‌یابی به مراحل میانی، به‌معنای دریافت حمایت مالی نیست.</p>
          </div>
        </div>
      </section>

      <section id="registration" className="bg-[#fbfaf7] py-20 md:py-24">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <SectionHeading
            eyebrow="ثبت‌نام در آینه"
            title="آماده‌ای وارد مسیر آینه شوی؟"
            description="ثبت‌نام برای فرد، تیم یا مجموعه در یک فرم انجام می‌شود؛ داشتن راهکار آماده برای ورود به مسیر الزامی نیست."
          />

          <div className="mt-12 rounded-[28px] border border-[var(--ayene-gold)] bg-white p-6 shadow-[0_10px_30px_rgba(23,41,92,.06)] md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-extrabold text-[var(--ayene-blue-dark)]">ثبت‌نام مرحله‌به‌مرحله</h3>
                <p className="mt-2 text-sm leading-7 text-[#334061]">اطلاعات مشترک همه متقاضیان در این مرحله دریافت می‌شود.</p>
              </div>
              <span className="rounded-full bg-[#fdf1ec] px-5 py-2 text-xs font-medium text-[var(--ayene-coral)]">فرم ثبت‌نام واحد</span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-6">
              {["اطلاعات پایه", "انتخاب مسیر", "محور و مسئله", "تجربه / راهکار", "فایل تکمیلی", "تأیید و ارسال"].map((label, index) => (
                <div key={label} className="text-center">
                  <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full border text-sm font-medium ${index === 0 ? "border-[var(--ayene-coral)] bg-[var(--ayene-coral)] text-white" : "border-[var(--ayene-gold)] bg-white text-[var(--ayene-blue)]"}`}>
                    ۰{index + 1}
                  </div>
                  <div className={`mt-2 text-xs ${index === 0 ? "font-medium text-[var(--ayene-blue-dark)]" : "text-[#616b80]"}`}>{label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h4 className="text-xl font-medium text-[var(--ayene-blue-dark)]">۱. اطلاعات پایه</h4>
              <p className="mt-1 text-sm text-[#616b80]">برای فرد، تیم یا مجموعه</p>
              <div className="mt-7 grid gap-5 md:grid-cols-2">
                {[
                  ["نام و نام خانوادگی", "مریم احمدی"],
                  ["استان و شهر", "تهران، تهران"],
                  ["شماره تماس / راه ارتباطی", "۰۹۱۲۱۲۳۴۵۶۷"],
                  ["نحوه حضور", "فرد"],
                ].map(([label, value]) => (
                  <label key={label} className="block">
                    <span className="mb-2 block text-xs font-medium text-[#334061]">{label}</span>
                    <input value={value} readOnly className="h-12 w-full rounded-[14px] border border-[var(--ayene-gold)] bg-white px-4 text-sm text-[#616b80] outline-none" />
                  </label>
                ))}
              </div>
              <label className="mt-5 block">
                <span className="mb-2 block text-xs font-medium text-[#334061]">اطلاعات اعضا (در صورت تیم یا مجموعه)</span>
                <input value="ثبت‌نام فردی — عضو دیگری ندارد" readOnly className="h-14 w-full rounded-[14px] border border-[var(--ayene-gold)] bg-white px-4 text-sm text-[#616b80] outline-none" />
              </label>
              <div className="mt-7 flex justify-end">
                <a href="/register" className="inline-flex min-w-52 justify-center rounded-2xl bg-[var(--ayene-coral)] px-7 py-3.5 font-medium text-white">ادامه ثبت‌نام</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />

      <footer className="bg-[var(--ayene-bg-inverse)] text-white">
        <div className="mx-auto max-w-[1240px] px-5 py-10 md:px-8">
          <div className="grid gap-10 border-b border-[#475c8f] pb-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                <img src={assets.logo} alt="آینه" className="h-20 w-full object-contain" />
              </div>
              <p className="mt-4 text-sm text-[var(--ayene-gold)]">مسئله را ببین؛ راهکار را بساز</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--ayene-gold)]">دسترسی سریع</h3>
              <div className="mt-4 space-y-2 text-sm">
                <a className="block" href="#about">معرفی آینه</a>
                <a className="block" href="#journey">مسیر رویداد</a>
                <a className="block" href="#registration">ثبت‌نام</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--ayene-gold)]">دسترسی سریع</h3>
              <div className="mt-4 space-y-2 text-sm">
                <a className="block" href="#axes">محورها و مسائل</a>
                <a className="block" href="#support">حمایت‌ها</a>
                <a className="block" href="#faq">پرسش‌های متداول</a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--ayene-gold)]">ارتباط با ما</h3>
              <div className="mt-4 space-y-2 text-sm">
                <a className="block" href="/tracking">پیگیری ثبت‌نام</a>
                <a className="block" href="/contact">تماس با دبیرخانه</a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-[#dfe6f6]">
                {['روبیکا', 'بله', 'اینستاگرام', 'تلگرام'].map((social) => (
                  <span key={social} className="rounded-full border border-[#5067a4] px-3 py-1.5">{social}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-8">
            <div>
              <p className="text-center text-sm font-medium text-[var(--ayene-gold)] md:text-right">برگزارکنندگان</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-24 w-32 items-center justify-center rounded-[14px] border border-[var(--ayene-gold)] bg-[#f6f1e8] p-2">
                  <img src={assets.partnerKhaneh} alt="خانه خلاق" className="h-full w-full object-contain" />
                </div>
                <div className="flex h-24 w-32 items-center justify-center rounded-[14px] border border-[#5067a4] bg-[#364e92] p-2">
                  <img src={assets.partnerEmdad} alt="کمیته امداد امام خمینی" className="h-full w-full object-contain" />
                </div>
              </div>
            </div>
            <p className="self-end text-xs leading-7 text-[#c9d1e3]">خانه خلاق و نوآوری آینه · کمیته امداد امام خمینی(ره)</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
