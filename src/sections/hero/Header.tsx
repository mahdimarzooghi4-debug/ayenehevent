import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const LOGO_SPRITE_URL = './images/ayene-event-logo.png';

const navLinks = [
  { label: 'معرفی آینه', href: '#about' },
  { label: 'محورها و مسائل', href: '#axes' },
  { label: 'مسیر رویداد', href: '#journey' },
  { label: 'حمایت‌ها', href: '#support' },
];

function EventBrand() {
  return (
    <span
      dir="ltr"
      className="flex w-[132px] shrink-0 items-center justify-end gap-1 sm:w-[174px] sm:gap-1.5 lg:w-[210px]"
      aria-label="رویداد ملی خلاقیت و نوآوری آینه"
    >
      <span
        dir="rtl"
        className="min-w-0 whitespace-nowrap text-[8px] font-medium leading-none text-[#FB8C74] sm:text-[10px] lg:text-[11px]"
      >
        رویداد ملی خلاقیت و نوآوری <span className="font-bold text-[#364E92]">آینه</span>
      </span>

      <span className="relative h-[44px] w-[50px] shrink-0 overflow-hidden sm:h-[56px] sm:w-[63px] lg:h-[70px] lg:w-[79px]">
        <img
          src={LOGO_SPRITE_URL}
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-0 h-full w-auto max-w-none object-contain mix-blend-multiply"
        />
      </span>
    </span>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="relative z-30 border-b border-[#E0C89F]/45 bg-[#FAF9F7]">
      <div className="flex min-h-[78px] items-center justify-between gap-2 py-3 sm:min-h-[88px] sm:gap-4 lg:py-5">
        <a
          href="#home"
          className="flex shrink-0 items-center"
          aria-label="صفحه اصلی آینه"
          onClick={closeMobileMenu}
        >
          <EventBrand />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-full px-4 py-2 text-[15px] font-medium text-[#182B5E] transition-colors hover:bg-[#F3F5FA] hover:text-[#FB8C74]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex min-w-0 items-center gap-2 lg:gap-3">
          <a
            href="#register"
            className="flex h-10 items-center justify-center whitespace-nowrap rounded-full bg-[#FB8C74] px-3.5 text-[12px] font-medium text-white transition-colors hover:bg-[#f97d62] sm:h-11 sm:px-5 sm:text-[14px] lg:h-12 lg:px-6 lg:text-[15px]"
          >
            ثبت‌نام در رویداد
          </a>

          <a
            href="#register"
            className="hidden h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#364E92] bg-white px-6 text-[15px] font-medium text-[#364E92] transition-colors hover:bg-[#f0f3ff] lg:flex"
          >
            پیگیری ثبت‌نام
          </a>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8DEEC] bg-white text-[#364E92] transition-colors hover:border-[#FB8C74] hover:text-[#FB8C74] lg:hidden"
            aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full border-t border-[#E0C89F]/40 bg-[#FAF9F7] px-4 pb-5 pt-3 shadow-[0_14px_30px_rgba(24,43,94,0.10)] lg:hidden">
          <nav className="mx-auto grid max-w-[520px] grid-cols-2 gap-2" aria-label="ناوبری موبایل">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-[14px] border border-[#E2E6EF] bg-white px-4 py-3 text-center text-[14px] font-medium text-[#182B5E] transition-colors hover:border-[#FB8C74] hover:text-[#FB8C74]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#faq"
              onClick={closeMobileMenu}
              className="rounded-[14px] border border-[#E2E6EF] bg-white px-4 py-3 text-center text-[14px] font-medium text-[#182B5E]"
            >
              پرسش‌های متداول
            </a>
            <a
              href="#register"
              onClick={closeMobileMenu}
              className="rounded-[14px] border border-[#364E92] bg-white px-4 py-3 text-center text-[14px] font-medium text-[#364E92]"
            >
              پیگیری ثبت‌نام
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
