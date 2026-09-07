"use client";

import { useState } from "react";

const axes = [
  "امور فرهنگی",
  "مشارکت‌های مردمی",
  "حمایت از خانواده",
  "اشتغال پایدار",
  "امور حقوقی",
] as const;

export function AxesSection() {
  const [activeAxis, setActiveAxis] = useState<(typeof axes)[number]>(axes[0]);

  return (
    <section id="axes" className="bg-[#fbfaf7] py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <p className="text-sm font-medium text-[var(--ayene-coral)]">محورها و نظام مسائل</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--ayene-blue-dark)] md:text-5xl">
          ۵ محور رویداد
        </h2>
        <div className="mt-5 h-1.5 w-16 rounded-full bg-[var(--ayene-coral)]" />
        <p className="mt-8 max-w-2xl text-base leading-8 text-[#334061] md:text-xl">
          هر محور، ۳ مسئله مشخص دارد. محور موردنظر را انتخاب کن تا سه مسئله همان حوزه را ببینی.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
          {axes.map((axis) => {
            const active = axis === activeAxis;
            return (
              <button
                key={axis}
                type="button"
                onClick={() => setActiveAxis(axis)}
                className={`rounded-2xl border px-4 py-4 text-sm font-medium transition md:text-base ${
                  active
                    ? "border-[var(--ayene-coral)] bg-[var(--ayene-coral)] text-white"
                    : "border-[var(--ayene-gold)] bg-white text-[var(--ayene-blue)] hover:border-[var(--ayene-coral)]"
                }`}
              >
                {axis}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 rounded-[28px] border border-[var(--ayene-gold)] bg-white p-6 md:grid-cols-[1fr_1fr] md:p-10">
          <div>
            <p className="text-sm font-medium text-[var(--ayene-coral)]">محور انتخاب‌شده • ۳ مسئله</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-[var(--ayene-blue-dark)] md:text-3xl">
              نظام مسائل {activeAxis}
            </h3>
            <p className="mt-5 text-base leading-8 text-[#334061] md:text-lg">
              فهرست رسمی مسائل این محور پس از نهایی‌شدن، از همین بخش منتشر می‌شود.
            </p>
            <div className="mt-8 flex items-center gap-3" aria-hidden>
              <span className="h-px flex-1 bg-[var(--ayene-gold)]" />
              <span className="h-4 w-4 rotate-45 rounded-sm bg-[var(--ayene-gold)]" />
              <span className="h-px flex-1 bg-[var(--ayene-gold)]" />
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-[#d6def0] bg-[#f9fafd] px-5 py-4"
              >
                <span className="font-medium text-[var(--ayene-coral)]">۰{item}</span>
                <span className="font-medium text-[var(--ayene-blue)]">مسئله نمونه {item} (نمایشی)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
