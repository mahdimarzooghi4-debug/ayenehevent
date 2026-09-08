import { PageHeader } from './PageHeader';
import { FormPanel } from './FormPanel';

export function RegistrationSection() {
  return (
    <section id="register" dir="rtl" className="bg-[#FBFAF7] py-16">
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-[100px]">
        <PageHeader />
        <FormPanel />
      </div>
    </section>
  );
}
