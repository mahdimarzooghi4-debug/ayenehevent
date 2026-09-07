"use client";

import { useState } from "react";

const items = [
  {
    question: "برای ثبت‌نام باید از قبل ایده یا راهکار داشته باشم؟",
    answer:
      "نه. برای ثبت‌نام فردی داشتن راهکار آماده الزامی نیست؛ می‌توانی با تجربه، مهارت یا ظرفیت مشارکت وارد شوی و پس از ارزیابی به هسته‌های مسئله‌محور متصل شوی.",
  },
  {
    question: "به‌صورت فردی هم می‌توانم ثبت‌نام کنم؟",
    answer:
      "بله. ثبت‌نام برای فرد، تیم یا مجموعه در یک فرم واحد انجام می‌شود و در ادامه، مسیر متناسب با وضعیت شما مشخص خواهد شد.",
  },
  {
    question: "ثبت‌نام یا عبور از مراحل میانی یعنی حمایت مالی قطعی؟",
    answer:
      "خیر. ثبت‌نام یا راه‌یابی به مراحل میانی به‌معنای دریافت حمایت مالی نیست. حمایت اجرای پایلوت صرفاً برای پروژه‌های منتخب و در قالب خرید خدمت و بر اساس قرارداد و پیشرفت تأییدشده انجام می‌شود.",
  },
  {
    question: "ورود به شبکه آینه به معنی استخدام است؟",
    answer:
      "خیر. شبکه آینه بستری برای شناسایی افراد واجد صلاحیت و استفاده از ظرفیت آن‌ها در همکاری و به‌کارگیری پروژه‌ای متناسب با نیاز پروژه‌هاست.",
  },
  {
    question: "فرم ثبت‌نام برای همه یکسان است؟",
    answer:
      "بله. فرم ثبت‌نام واحد است، اما بعد از انتخاب مسیر، فیلدهای تکمیلی متناسب با داشتن راهکار یا داشتن تجربه و تخصص نمایش داده می‌شود.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-[#faf9f7] py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <p className="text-sm font-medium text-[var(--ayene-blue)]">پرسش‌های متداول</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--ayene-blue-dark)] md:text-5xl">
          قبل از ثبت‌نام، این‌ها را بدان
        </h2>
        <div className="mt-5 h-1.5 w-16 rounded-full bg-[var(--ayene-coral)]" />
        <p className="mt-8 max-w-2xl text-base leading-8 text-[#4a4f5c] md:text-lg">
          پاسخ کوتاه به سؤال‌هایی که معمولاً قبل از ورود به مسیر آینه پیش می‌آید.
        </p>

        <div className="mt-10 space-y-3">
          {items.map((item, index) => {
            const open = openIndex === index;
            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-2xl border border-[var(--ayene-gold)] bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-right md:px-8"
                  aria-expanded={open}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                      open
                        ? "bg-[var(--ayene-coral)] text-white"
                        : "border border-[#d6def0] bg-[#f9fafd] text-[var(--ayene-blue)]"
                    }`}
                  >
                    ۰{index + 1}
                  </span>
                  <span className="flex-1 text-base font-medium text-[var(--ayene-blue-dark)] md:text-lg">
                    {item.question}
                  </span>
                  <span className="text-2xl text-[var(--ayene-blue)]" aria-hidden>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open ? (
                  <p className="px-5 pb-6 pr-[4.75rem] text-sm leading-8 text-[#4a4f5c] md:px-8 md:pr-[5.5rem] md:text-base">
                    {item.answer}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
