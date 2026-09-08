import { AdminPage } from './AdminPage';
import { AdminSecureDownloads } from './AdminSecureDownloads';
import { AdminPasswordSettings } from './AdminPasswordSettings';
import { AdminSitePresentationSettings } from './AdminSitePresentationSettings';
import { AdminAuditTrail } from './AdminAuditTrail';
import { AdminDataExports } from './AdminDataExports';

export default function AdminRoute() {
  return (
    <>
      <AdminPage />
      <AdminSecureDownloads />
      <AdminSitePresentationSettings />
      <AdminPasswordSettings />
      <AdminAuditTrail />
      <AdminDataExports />
    </>
  );
}
