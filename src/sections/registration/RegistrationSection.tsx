import { PageHeader } from './PageHeader';
import { FormPanel } from './FormPanel';

export function RegistrationSection() {
  return (
    <section id="register" dir="rtl" className="bg-[#FBFAF7] px-6 py-16">
      <div className="mx-auto max-w-[1240px]">
        <PageHeader />
        <FormPanel />
      </div>
    </section>
  );
}
