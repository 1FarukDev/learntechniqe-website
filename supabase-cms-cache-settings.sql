-- Optional: public Sanity page cache (Next.js `revalidate`) settings for `/admin/cms`.
-- Run in Supabase SQL if you want persistence on serverless; otherwise a JSON file
-- at data/local-cms/cache-settings.json is used when the table is missing.

create table if not exists public.cms_cache_settings (
  id text primary key,
  revalidate_seconds integer not null
);

-- -1 = use app default in code (e.g. 300 s), 0 = no data cache, N = seconds
insert into public.cms_cache_settings (id, revalidate_seconds)
values ('default', -1)
on conflict (id) do nothing;

alter table public.cms_cache_settings enable row level security;

-- No public policies: only service_role in API (same pattern as `learners`).
