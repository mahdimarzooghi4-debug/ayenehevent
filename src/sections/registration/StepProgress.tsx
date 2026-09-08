interface Step {
  number: string;
  label: string;
}

const steps: Step[] = [
  { number: '۰۱', label: 'اطلاعات پایه' },
  { number: '۰۲', label: 'انتخاب مسیر' },
  { number: '۰۳', label: 'محور و مسئله' },
  { number: '۰۴', label: 'تجربه / راهکار' },
  { number: '۰۵', label: 'فایل تکمیلی' },
  { number: '۰۶', label: 'تأیید و ارسال' },
];

interface StepProgressProps {
  currentStep: number;
}

export function StepProgress({ currentStep }: StepProgressProps) {
  const getCircleClass = (index: number) => {
    if (index + 1 === currentStep) {
      return 'border-[#FB8C74] bg-[#FB8C74] text-white';
    }

    if (index + 1 < currentStep) {
      return 'border-[#364E92] bg-[#364E92] text-white';
    }

    return 'border-[#E0C89F] bg-white text-[#364E92]';
  };

  const getLabelClass = (index: number) => {
    if (index + 1 === currentStep) {
      return 'font-medium text-[#182B5E]';
    }

    if (index + 1 < currentStep) {
      return 'font-medium text-[#364E92]';
    }

    return 'font-normal text-[#616B80]';
  };

  return (
    <div dir="rtl" className="w-full pb-5 pt-2">
      <div className="grid grid-cols-3 gap-x-3 gap-y-5 lg:hidden">
        {steps.map((step, index) => (
          <div key={step.number} className="flex min-w-0 flex-col items-center text-center">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] text-[13px] font-medium ${getCircleClass(index)}`}
              style={{ fontFamily: 'Vazirmatn, sans-serif' }}
            >
              {step.number}
            </div>
            <span
              className={`mt-2 text-[12px] leading-5 ${getLabelClass(index)}`}
              style={{ fontFamily: 'Vazirmatn, sans-serif' }}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <div className="relative mx-auto hidden h-[82px] w-full max-w-[1144px] lg:block">
        <div className="flex w-full items-start px-[60px]">
          {steps.map((step, index) => (
            <div key={step.number} className="contents">
              <div className="relative h-[82px] w-11 shrink-0">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] text-[14px] font-medium ${getCircleClass(index)}`}
                  style={{ fontFamily: 'Vazirmatn, sans-serif' }}
                >
                  {step.number}
                </div>
                <span
                  className={`absolute left-1/2 top-[50px] w-[164px] -translate-x-1/2 whitespace-nowrap text-center text-[13px] leading-8 ${getLabelClass(index)}`}
                  style={{ fontFamily: 'Vazirmatn, sans-serif' }}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mt-[21px] h-[2px] flex-1 ${
                    index + 1 < currentStep ? 'bg-[#364E92]' : 'bg-[#E0C89F]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
