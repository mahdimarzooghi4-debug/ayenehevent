"use client";

import { useState } from "react";

const axes = [
  "امور فرهنگی",
  "اشتغال پایدار",
  "حمایت از خانواده",
  "مشارکت‌های مردمی",
  "امور حقوقی",
] as const;

export function AxesSection() {
  const [activeAxis, setActiveAxis] = useState<(typeof axes)[number]>(axes[0]);

  return (
    <section id="axes" className="bg-[#fbfaf7] py-20 lg:h-[820px] lg:overflow-hidden lg:py-0">
      <div className="landing-shell lg:pt-[72px]">
        <p className="text-[15px] font-medium text-[var(--ayene-coral)]">محورها و نظام مسائل</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--ayene-blue-dark)] lg:text-[42px] lg:leading-[68px]">
          ۵ محور رویداد
        </h2>
        <div className="mt-2 h-[5px] w-[72px] rounded-full bg-[var(--ayene-coral)]" />
        <p className="mt-8 max-w-[600px] text-base leading-8 text-[#334061] lg:text-[20px]">
          هر محور، ۳ مسئله مشخص دارد. محور موردنظر را انتخاب کن تا سه مسئله همان حوزه را ببینی.
        </p>

        <div className="mt-[38px] grid grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-[18px]">
          {axes.map((axis) => {
            const active = axis === activeAxis;
            return (
              <button
                key={axis}
                type="button"
                onClick={() => setActiveAxis(axis)}
                className={`h-[66px] rounded-[18px] border px-4 text-sm font-medium transition lg:text-[17px] ${
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

        <div className="mt-10 grid gap-8 rounded-[28px] border border-[var(--ayene-gold)] bg-white p-6 lg:h-[300px] lg:grid-cols-[1fr_1fr] lg:p-[40px_50px]">
          <div className="lg:pr-[20px]">
            <p className="text-sm font-medium text-[var(--ayene-coral)]">محور انتخاب‌شده • ۳ مسئله</p>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-[var(--ayene-blue-dark)] lg:text-[30px]">
              نظام مسائل {activeAxis}
            </h3>
            <p className="mt-5 text-base leading-8 text-[#334061] lg:max-w-[530px] lg:text-[18px]">
              فهرست رسمی مسائل این محور پس از نهایی‌شدن، از همین بخش منتشر می‌شود.
            </p>
            <div className="mt-7 flex max-w-[315px] items-center gap-3" aria-hidden>
              <span className="h-[2px] flex-1 bg-[var(--ayene-gold)]" />
              <span className="h-[18px] w-[18px] rotate-45 rounded-sm bg-[var(--ayene-gold)]" />
              <span className="h-[2px] flex-1 bg-[var(--ayene-gold)]" />
            </div>
          </div>

          <div className="space-y-[28px] lg:pt-0">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex h-[48px] items-center gap-4 rounded-2xl border border-[#d6def0] bg-[#f9fafd] px-5">
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
