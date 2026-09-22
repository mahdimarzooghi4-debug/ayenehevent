# آماده‌سازی انتقال آینه به سرور ایران (بدون دست زدن به سایت زنده)

## وضعیت و محدودیت مهم
- فرانت‌اند React/Vite هم‌اکنون GitHub Pages است؛ بک‌اند Supabase managed در Singapore (Postgres 17).
- کد دیتابیس واقعی را فقط از چند SQL فایل مخزن بازسازی نکنید: migrationهای سرور و مخزن یکسان نیستند.
- این پوشه یک **بسته آماده‌سازی و اجرای کنترل‌شده** است، نه ادعای استقرار موفق روی VPS خریداری‌نشده.
- هیچ فایل دادهٔ واقعی، رمز، توکن مدیریتی، dump دیتابیس یا S3 secret را به این مخزن عمومی commit نکنید.
- نسخه فعلی را تا تأیید تست‌ها خاموش نکنید.

## پیش‌نیاز سرور
VPS ایران، Ubuntu 24.04 LTS، 4 vCPU، 8 GB RAM، 80 GB+ SSD، IPv4، SSH؛ فضای بکاپ مستقل در ایران؛ قابلیت دسترسی به Docker image registry و GitHub **هنگام نصب** (در صورت اختلال، imageها/سورس را از قبل منتقل کنید).
فقط پورت‌های 22 (محدود به IP مدیریت)، 80 و 443 از بیرون باز باشند؛ 8000، 8443، 5432، 6543 و 8080 روی localhost بمانند.
DNS داخلی و عمومی برای `event.ayenehouse.ir` و `api.event.ayenehouse.ir` به IP ایران تنظیم شود **فقط پس از تست و آماده‌شدن**. گواهی HTTPS معتبر و تمدیدش باید زیر شرایط شبکهٔ مورد نظر آزمایش شود؛ صدور/تمدید Let's Encrypt به ارتباط خارجی وابسته است.

## پیش از خرید: خروجی بگیرید (فقط از مسیر امن)
1. از یک سیستم امن با Docker + Supabase CLI و دسترسی به Supabase فعلی، مقدار `SOURCE_DB_URL` را از Dashboard > Connect بگیرید (به چت یا GitHub نفرستید).
2. `SOURCE_DB_URL='...' bash deploy/export-cloud.sh /secure/backup-dir` (roles.sql، schema.sql، data.sql).
3. از Storage > S3 Configuration در پروژه managed یک access key بسازید. با rclone از bucket خصوصی `registration-files` خروجی بگیرید؛ فایل‌ها در SQL dump نیستند.
4. آمار جدول‌های registrations/contact_requests و شمار فایل‌ها را جداگانه ثبت کنید؛ پس از Cutover مقایسه کنید.
5. انتقال را ترجیحاً در بازه توقف پذیرش ثبت‌نام انجام دهید تا داده‌ای بین دو سرور جا نماند.

## نصب و راه‌اندازی در سرور خالی
1. Docker Engine + Compose plugin، git، python3، curl، Caddy و ابزارهای pg client/rclone نصب و تست شوند. قبل از اجرا اسکریپت‌ها را بخوانید.
2. مخزن آینه را در `/opt/ayene/app` روی شاخهٔ آماده‌سازی checkout کنید.
3. `sudo INSTALL_DIR=/opt/ayene/supabase-project bash deploy/bootstrap-supabase.sh`
   این دستور نسخه مشخص Supabase self-hosted را می‌گیرد، کلیدهای **جدید** می‌سازد، URLها و پورت‌های محلی را تنظیم می‌کند. سایت موجود را تغییر نمی‌دهد.
4. سورس تابع `supabase/functions/cms-file-download/index.ts` را به
   `/opt/ayene/supabase-project/volumes/functions/cms-file-download/index.ts` کپی کنید.
5. `cd /opt/ayene/supabase-project && sh run.sh start`. با `docker compose ps` سلامت سرویس‌ها را بررسی کنید. مسیر API داخلی: `http://127.0.0.1:8000`.
6. DNS آزمایشی / فایل hosts محلی را برای دو دامنه به IP ایران تنظیم کنید؛ Caddyfile را در `/etc/caddy/Caddyfile` قرار دهید، Caddy را پس از بررسی گواهی فعال کنید. بدون IP و DNS و گواهی، HTTPS production قابل تست نیست.
7. دیتابیس را از سه فایل خروجی به **نمونه تازه و خالی** برگردانید؛ طبق راهنمای رسمی Supabase:
   `psql --single-transaction --set ON_ERROR_STOP=1 --file roles.sql --file schema.sql --command 'SET session_replication_role = replica' --file data.sql --dbname 'postgres://postgres.<POOLER_TENANT_ID>:<PASSWORD>@127.0.0.1:5432/postgres'`
   نام tenant و رمز را از فایل private `.env` سرور بخوانید. پیش از هر restore نسخه PG و extensionها را مقایسه کنید. روی دیتابیس پر یا production دستور reset اجرا نکنید.
8. با rclone و پروتکل S3، bucket `registration-files` را منتقل کنید. **فایل دانلودشده را مستقیم در volumes/storage کپی نکنید**؛ طبق راهنمای رسمی metadata و محتوا همزمان منتقل شود. ابتدا `rclone copy`، سپس `rclone size` و تست فایل واقعی.
9. فایل `deploy/.env.web.example` را به یک مسیر امن خارج Git تبدیل کنید. `VITE_SUPABASE_ANON_KEY` را با publishable key **جدید ایران** و `VITE_SUPABASE_URL` را با URL داخلی ایران تنظیم کنید.
10. از ریشه مخزن:
   `docker compose --env-file /secure/ayene-web.env -f deploy/docker-compose.web.yml up -d --build`
   وب‌سایت فقط به `127.0.0.1:8080` publish می‌شود. reverse proxy روی 80/443 آن را عمومی می‌کند.
11. `SITE_URL=https://event.ayenehouse.ir API_URL=https://api.event.ayenehouse.ir SUPABASE_PUBLISHABLE_KEY='...' node deploy/verify-public.mjs`

## چک‌لیست دستی الزامی قبل از DNS cutover
- از اینترنت داخلی ایران، آدرس صفحه اصلی و `#admin` و `#tracking` را روی دسکتاپ و گوشی باز کنید.
- تست با پرونده و فایل ساختگی، نه داده حقیقی: آپلود Word/RTF، دریافت کد پیگیری، ورود مدیر، دیدن پرونده و پیام، دانلود امن فایل، تغییر وضعیت، پیگیری با ۴ رقم موبایل، ثبت درخواست تماس، CSV/Excel/JSON و تغییر رمز در محیط تست.
- توکن نامعتبر نباید اطلاعات مدیر را برگرداند. محدودیت اندازه فایل ۱۰ MiB، RLS و bucket خصوصی بررسی شوند.
- count رکوردها و فایل‌ها با cloud مطابقت داشته باشد. تغییر وضعیت باید در history ثبت شود.
- هیچ request شبکه‌ای به `supabase.co`, `github.io`, `fonts.googleapis.com`, `fonts.gstatic.com` در مرورگر نباشد (فونت‌های Vazirmatn و Estedad از بسته‌های Fontsource داخل bundle سایت توزیع می‌شوند و درخواست runtime به Google Fonts ندارند).
- از داخل ایران با قطع دسترسی **بین‌الملل** همه عملیات بالا تکرار شوند. سایت تا قبل از این آزمایش «مستقل» محسوب نمی‌شود.

## عملیات/بکاپ
روزانه dump PostgreSQL + نسخه پشتیبان جداگانه از Storage و فایل‌های پیکربندی رمزگذاری‌شده روی فضای مستقل *داخل ایران*؛ دوره‌ای restore را روی نمونه staging آزمایش کنید. مانیتورینگ سلامت، ظرفیت دیسک، TLS renewal و logهای خطا را برقرار کنید. بعد از انتقال، کلیدهای cloud را از build حذف و نشست‌های کاربران را تازه کنید.

## اسناد رسمی (در روز اجرا مجدد بررسی شود)
- https://supabase.com/docs/guides/self-hosting/docker
- https://supabase.com/docs/guides/self-hosting/restore-from-platform
- https://supabase.com/docs/guides/self-hosting/copy-from-platform-s3
- https://supabase.com/docs/guides/self-hosting/functions
