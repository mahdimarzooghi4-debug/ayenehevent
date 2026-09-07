"use client";

import { useState } from "react";

const items = [
  { question: "برای ثبت‌نام باید از قبل ایده یا راهکار داشته باشم؟", answer: "نه. برای ثبت‌نام فردی داشتن راهکار آماده الزامی نیست؛ می‌توانی با تجربه، مهارت یا ظرفیت مشارکت وارد شوی و پس از ارزیابی به هسته‌های مسئله‌محور متصل شوی." },
  { question: "به‌صورت فردی هم می‌توانم ثبت‌نام کنم؟", answer: "بله. ثبت‌نام برای فرد، تیم یا مجموعه در یک فرم واحد انجام می‌شود و در ادامه، مسیر متناسب با وضعیت شما مشخص خواهد شد." },
  { question: "ثبت‌نام یا عبور از مراحل میانی یعنی حمایت مالی قطعی؟", answer: "خیر. ثبت‌نام یا راه‌یابی به مراحل میانی به‌معنای دریافت حمایت مالی نیست. حمایت اجرای پایلوت صرفاً برای پروژه‌های منتخب و در قالب خرید خدمت و بر اساس قرارداد و پیشرفت تأییدشده انجام می‌شود." },
  { question: "ورود به شبکه آینه به معنی استخدام است؟", answer: "خیر. شبکه آینه بستری برای شناسایی افراد واجد صلاحیت و استفاده از ظرفیت آن‌ها در همکاری و به‌کارگیری پروژه‌ای متناسب با نیاز پروژه‌هاست." },
  { question: "فرم ثبت‌نام برای همه یکسان است؟", answer: "بله. فرم ثبت‌نام واحد است، اما بعد از انتخاب مسیر، فیلدهای تکمیلی متناسب با داشتن راهکار یا داشتن تجربه و تخصص نمایش داده می‌شود." },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="bg-[#faf9f7] py-20 lg:h-[812px] lg:overflow-hidden lg:py-0">
      <div className="landing-shell lg:pt-[60px]">
        <p className="text-[15px] font-medium text-[var(--ayene-blue)]">پرسش‌های متداول</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--ayene-blue-dark)] lg:text-[38px] lg:leading-[60px]">قبل از ثبت‌نام، این‌ها را بدان</h2>
        <div className="mt-1 h-[5px] w-[72px] rounded-full bg-[var(--ayene-coral)]" />
        <p className="mt-7 max-w-[690px] text-base leading-8 text-[#4a4f5c] lg:text-[18px]">پاسخ کوتاه به سؤال‌هایی که معمولاً قبل از ورود به مسیر آینه پیش می‌آید.</p>

        <div className="mt-[34px] space-y-[14px]">
          {items.map((item, index) => {
            const open = openIndex === index;
            return (
              <article key={item.question} className={`overflow-hidden rounded-[18px] border bg-white ${open ? "border-[var(--ayene-gold)] lg:h-[142px]" : "border-[#e0ded6] lg:h-[72px]"}`}>
                <button type="button" onClick={() => setOpenIndex(open ? -1 : index)} className="flex h-[72px] w-full items-center gap-4 px-5 text-right lg:px-[38px]" aria-expanded={open}>
                  <span className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full text-xs font-medium ${open ? "bg-[var(--ayene-coral)] text-white" : "border border-[#d6def0] bg-[#f9fafd] text-[var(--ayene-blue)]"}`}>۰{index + 1}</span>
                  <span className="flex-1 text-base font-medium text-[var(--ayene-blue-dark)] lg:text-[19px]">{item.question}</span>
                  <span className="flex h-11 w-11 items-center justify-center text-[26px] text-[var(--ayene-blue)]" aria-hidden>{open ? "−" : "+"}</span>
                </button>
                {open ? <p className="px-5 pb-5 pr-[4.75rem] text-sm leading-7 text-[#4a4f5c] lg:px-[82px] lg:pb-4 lg:text-[16px] lg:leading-7">{item.answer}</p> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
