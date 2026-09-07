import { StepProgress } from "./StepProgress";

interface FormFieldProps {
  label: string;
  value: string;
}

function FormField({ label, value }: FormFieldProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label
        style={{
          fontFamily: "Vazirmatn, sans-serif",
          fontWeight: 500,
          fontSize: 12,
          color: "#334061",
          textAlign: "right",
        }}
      >
        {label}
      </label>
      <div
        className="flex min-w-0 items-center px-4"
        style={{
          height: 48,
          background: "#FFFFFF",
          border: "1.2px solid #E0C89F",
          borderRadius: 14,
        }}
      >
        <span
          className="w-full min-w-0 truncate text-right"
          style={{
            fontFamily: "Vazirmatn, sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: "#616B80",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

interface FormFieldWideProps {
  label: string;
  value: string;
}

function FormFieldWide({ label, value }: FormFieldWideProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label
        style={{
          fontFamily: "Vazirmatn, sans-serif",
          fontWeight: 500,
          fontSize: 12,
          color: "#334061",
          textAlign: "right",
        }}
      >
        {label}
      </label>
      <div
        className="flex min-w-0 items-center px-4"
        style={{
          minHeight: 54,
          background: "#FFFFFF",
          border: "1.2px solid #E0C89F",
          borderRadius: 14,
        }}
      >
        <span
          className="w-full min-w-0 text-right"
          style={{
            fontFamily: "Vazirmatn, sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: "#616B80",
            lineHeight: "1.7",
          }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

export function FormPanel() {
  return (
    <div
      className="relative w-full overflow-hidden px-5 py-8 md:px-10 lg:px-[70px] lg:py-10"
      style={{
        background: "#FFFFFF",
        border: "1.5px solid #E0C89F",
        borderRadius: 28,
        boxShadow: "0px 10px 30px 0px rgba(23, 41, 92, 0.06)",
      }}
      dir="rtl"
    >
      <div className="mb-4 flex justify-start">
        <div
          className="flex items-center justify-center px-5"
          style={{ height: 36, background: "#FDF1EC", borderRadius: 18 }}
        >
          <span
            style={{
              fontFamily: "Vazirmatn, sans-serif",
              fontWeight: 500,
              fontSize: 13,
              color: "#FB8C74",
            }}
          >
            فرم ثبت‌نام واحد
          </span>
        </div>
      </div>

      <h2
        className="mb-2 text-[24px] sm:text-[26px]"
        style={{
          fontFamily: "Estedad, Vazirmatn, sans-serif",
          fontWeight: 800,
          color: "#182B5E",
          textAlign: "right",
        }}
      >
        ثبت‌نام مرحله‌به‌مرحله
      </h2>

      <p
        className="mb-7 text-[15px] sm:mb-8 sm:text-[16px]"
        style={{
          fontFamily: "Vazirmatn, sans-serif",
          fontWeight: 400,
          color: "#334061",
          textAlign: "right",
          lineHeight: "1.7",
        }}
      >
        اطلاعات مشترک همه متقاضیان در این مرحله دریافت می‌شود.
      </p>

      {/* Fully responsive: no fixed min-width and no horizontal scrolling on mobile */}
      <div className="mb-8 w-full">
        <StepProgress />
      </div>

      <h3
        className="mb-1 text-[20px] sm:text-[22px]"
        style={{
          fontFamily: "Vazirmatn, sans-serif",
          fontWeight: 500,
          color: "#182B5E",
          textAlign: "right",
        }}
      >
        ۱. اطلاعات پایه
      </h3>

      <p
        className="mb-6"
        style={{
          fontFamily: "Vazirmatn, sans-serif",
          fontWeight: 400,
          fontSize: 14,
          color: "#616B80",
          textAlign: "right",
        }}
      >
        برای فرد، تیم یا مجموعه
      </p>

      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="نام و نام خانوادگی" value="مریم احمدی" />
        <FormField label="استان و شهر" value="تهران، تهران" />
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="شماره تماس / راه ارتباطی" value="۰۹۱۲۱۲۳۴۵۶۷" />
        <FormField label="نحوه حضور" value="فرد" />
      </div>

      <div className="mb-8">
        <FormFieldWide
          label="اطلاعات اعضا (در صورت تیم یا مجموعه)"
          value="ثبت‌نام فردی — عضو دیگری ندارد"
        />
      </div>

      <div className="flex justify-start">
        <button
          className="flex h-[46px] w-full cursor-pointer items-center justify-center rounded-[16px] border-0 bg-[#FB8C74] transition-colors hover:bg-[#f97d62] sm:w-[220px]"
          type="button"
        >
          <span
            style={{
              fontFamily: "Vazirmatn, sans-serif",
              fontWeight: 500,
              fontSize: 16,
              color: "#FFFFFF",
            }}
          >
            ادامه
          </span>
        </button>
      </div>
    </div>
  );
}
