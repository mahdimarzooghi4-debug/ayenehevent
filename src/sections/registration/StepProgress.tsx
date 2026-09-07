interface Step { number: string; label: string; imageUrl: string; active: boolean; }

const steps: Step[] = [
  { number: "۰۱", label: "اطلاعات پایه", imageUrl: "https://cdn.codia.ai/figma/QAnV3aT20HZ7Y2PPnvuBCJ/img-790b1b85ea6e1745.png", active: true },
  { number: "۰۲", label: "انتخاب مسیر", imageUrl: "https://cdn.codia.ai/figma/QAnV3aT20HZ7Y2PPnvuBCJ/img-e7fa38ce4a99e2e0.png", active: false },
  { number: "۰۳", label: "محور و مسئله", imageUrl: "https://cdn.codia.ai/figma/QAnV3aT20HZ7Y2PPnvuBCJ/img-70e2557a751e21a7.png", active: false },
  { number: "۰۴", label: "تجربه / راهکار", imageUrl: "https://cdn.codia.ai/figma/QAnV3aT20HZ7Y2PPnvuBCJ/img-bf25eb588ddde618.png", active: false },
  { number: "۰۵", label: "فایل تکمیلی", imageUrl: "https://cdn.codia.ai/figma/QAnV3aT20HZ7Y2PPnvuBCJ/img-08ba353cbb2dd03e.png", active: false },
  { number: "۰۶", label: "تأیید و ارسال", imageUrl: "https://cdn.codia.ai/figma/QAnV3aT20HZ7Y2PPnvuBCJ/img-9b6755582716c393.png", active: false },
];

export function StepProgress() {
  return (
    <div className="flex flex-row items-start justify-between w-full px-2 pt-2 pb-4" dir="rtl">
      {steps.map((step, index) => (
        <div key={step.number} className="flex flex-row items-center flex-1">
          <div className="flex flex-col items-center" style={{ minWidth: 44 }}>
            <div className="relative w-11 h-11 rounded-full overflow-hidden" style={{ border: step.active ? "1.5px solid #FB8C74" : "1.5px solid #E0C89F" }}>
              <img src={step.imageUrl} alt={step.label} className="w-full h-full object-cover" />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium" style={{ fontFamily: "Vazirmatn, sans-serif", color: step.active ? "#FFFFFF" : "#364E92", fontSize: 14 }}>{step.number}</span>
            </div>
            <span className="mt-2 text-center leading-tight" style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 500, fontSize: 13, color: step.active ? "#182B5E" : "#616B80", whiteSpace: "nowrap" }}>{step.label}</span>
          </div>
          {index < steps.length - 1 && <div className="flex-1 mx-1" style={{ height: 2, background: "#E0C89F", marginBottom: 22 }} />}
        </div>
      ))}
    </div>
  );
}
