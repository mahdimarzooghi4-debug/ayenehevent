export function PageHeader() {
  return (
    <div className="text-right mb-10" dir="rtl">
      <p className="mb-3" style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 500, fontSize: 15, color: "#FB8C74" }}>ثبت‌نام در آینه</p>
      <h1 className="mb-3 leading-tight" style={{ fontFamily: "Estedad, Vazirmatn, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 3vw, 40px)", color: "#182B5E" }}>آماده‌ای وارد مسیر آینه شوی؟</h1>
      <div className="mb-5 mr-0" style={{ width: 172, height: 5, background: "#FB8C74", borderRadius: 3, marginRight: 0 }} />
      <p className="max-w-xl mr-0 leading-relaxed" style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 400, fontSize: 19, color: "#334061", lineHeight: "1.7" }}>
        ثبت‌نام برای فرد، تیم یا مجموعه در یک فرم انجام می‌شود؛ داشتن راهکار آماده برای ورود به مسیر الزامی نیست.
      </p>
    </div>
  );
}
