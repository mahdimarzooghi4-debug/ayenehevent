export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--ayene-bg)] px-6 py-16 text-[var(--ayene-text)]">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm font-medium text-[var(--ayene-coral)]">رویداد ملی آینه</p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          مسئله را ببین؛ راهکار را بساز
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          مسیر تبدیل مسئله‌های واقعی کمیته امداد امام خمینی(ره) به راهکارهای قابل اجرا
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button className="rounded-xl bg-[var(--ayene-coral)] px-6 py-3 font-medium text-white">
            ثبت‌نام در رویداد
          </button>
          <button className="rounded-xl border border-[var(--ayene-blue)] px-6 py-3 font-medium text-[var(--ayene-blue)]">
            مشاهده نظام مسائل
          </button>
        </div>
      </div>
    </main>
  );
}
