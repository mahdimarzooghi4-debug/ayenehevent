const LOGO_URL = 'https://cdn.codia.ai/figma/QAnV3aT20HZ7Y2PPnvuBCJ/img-302deab12e0deb95.png';

const navLinks = [
  { label: 'معرفی آینه', href: '#about' },
  { label: 'محورها و مسائل', href: '#axes' },
  { label: 'مسیر رویداد', href: '#journey' },
  { label: 'حمایت‌ها', href: '#support' },
];

export function Header() {
  return (
    <header className="flex min-h-[88px] items-center justify-between gap-4 py-4 lg:py-6">
      <a href="#home" className="shrink-0" aria-label="آینه">
        <img src={LOGO_URL} alt="آینه" className="h-[58px] w-auto object-contain lg:h-[70px]" />
      </a>

      <nav className="hidden items-center gap-2 lg:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="whitespace-nowrap px-4 py-2 text-[15px] font-medium text-[#182B5E] transition-colors hover:text-[#FB8C74]">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2 lg:gap-3">
        <a href="#register" className="flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#FB8C74] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#f97d62] lg:h-12 lg:px-6 lg:text-[15px]">
          ثبت‌نام در رویداد
        </a>
        <a href="#register" className="hidden h-12 items-center justify-center whitespace-nowrap rounded-full border border-[#364E92] bg-white px-6 text-[15px] font-medium text-[#364E92] transition-colors hover:bg-[#f0f3ff] sm:flex">
          پیگیری ثبت‌نام
        </a>
      </div>
    </header>
  );
}
