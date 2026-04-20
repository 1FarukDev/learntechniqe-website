-- E-learning admin: configurable free-course metadata + SCORM storage pointer
-- Run once in Supabase SQL Editor after `supabase-schema.sql`.

create table if not exists public.elearning_course_settings (
  id smallint primary key default 1 check (id = 1),
  slug text not null default 'electrical-safety-essentials',
  title text not null default 'Electrical Safety Essentials',
  tagline text not null default '',
  duration text not null default 'Approx. 30 minutes',
  entry_file text not null default 'index.html',
  storage_prefix text,
  package_updated_at timestamptz,
  updated_at timestamptz not null default now()
);

insert into public.elearning_course_settings (id, slug, title, tagline, duration)
values (
  1,
  'electrical-safety-essentials',
  'Electrical Safety Essentials',
  'A concise introduction to working safely with electricity.',
  'Approx. 30 minutes'
)
on conflict (id) do nothing;

alter table public.elearning_course_settings enable row level security;

-- Storage bucket (create in Dashboard → Storage → New bucket if insert below fails):
-- Name: elearning-scorm · Private · File size limit 100 MB recommended.
-- Alternatively (requires sufficient DB privileges):
/*
insert into storage.buckets (id, name, public, file_size_limit)
values ('elearning-scorm', 'elearning-scorm', false, 104857600)
on conflict (id) do nothing;
*/
