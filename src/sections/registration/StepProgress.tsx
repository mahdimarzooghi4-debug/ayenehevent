interface Step {
  number: string;
  label: string;
  active: boolean;
}

const steps: Step[] = [
  { number: '۰۱', label: 'اطلاعات پایه', active: true },
  { number: '۰۲', label: 'انتخاب مسیر', active: false },
  { number: '۰۳', label: 'محور و مسئله', active: false },
  { number: '۰۴', label: 'تجربه / راهکار', active: false },
  { number: '۰۵', label: 'فایل تکمیلی', active: false },
  { number: '۰۶', label: 'تأیید و ارسال', active: false },
];

export function StepProgress() {
  return (
    <div dir="rtl" className="w-full px-1 pb-5 pt-2 sm:px-2">
      {/* Mobile: 3 × 2 grid so every step stays visible without clipping */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-5 md:hidden">
        {steps.map((step) => (
          <div key={step.number} className="flex min-w-0 flex-col items-center text-center">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] text-[13px] font-medium ${
                step.active
                  ? 'border-[#FB8C74] bg-[#FB8C74] text-white'
                  : 'border-[#E0C89F] bg-white text-[#364E92]'
              }`}
              style={{ fontFamily: 'Vazirmatn, sans-serif' }}
            >
              {step.number}
            </div>
            <span
              className={`mt-2 text-[12px] leading-5 ${
                step.active ? 'font-medium text-[#182B5E]' : 'font-normal text-[#616B80]'
              }`}
              style={{ fontFamily: 'Vazirmatn, sans-serif' }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Tablet / Desktop: original single-line journey */}
      <div className="hidden w-full flex-row items-start justify-between md:flex">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-1 flex-row items-center">
            <div className="flex min-w-[58px] flex-col items-center">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] text-[14px] font-medium ${
                  step.active
                    ? 'border-[#FB8C74] bg-[#FB8C74] text-white'
                    : 'border-[#E0C89F] bg-white text-[#364E92]'
                }`}
                style={{ fontFamily: 'Vazirmatn, sans-serif' }}
              >
                {step.number}
              </div>
              <span
                className={`mt-2 whitespace-nowrap text-center text-[13px] leading-tight ${
                  step.active ? 'font-medium text-[#182B5E]' : 'font-normal text-[#616B80]'
                }`}
                style={{ fontFamily: 'Vazirmatn, sans-serif' }}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="mx-2 mb-[22px] h-[2px] flex-1 bg-[#E0C89F]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
