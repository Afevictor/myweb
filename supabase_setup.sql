-- Enable UUID extension if not enabled
create extension if not exists "uuid-ossp";

-- 1. NEWS TABLE
create table public.news (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  title text not null,
  content text not null,
  image_url text,
  published_at timestamp with time zone default timezone ('utc'::text, now()),
  is_published boolean default true,
  constraint news_pkey primary key (id)
) tablespace pg_default;

-- 2. PORTFOLIO TABLE
create table public.portfolio (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  title text not null,
  description text not null,
  category text not null,
  result text, 
  image_url text,
  tags text[], -- Array of strings
  featured boolean default false,
  constraint portfolio_pkey primary key (id)
) tablespace pg_default;

-- 3. VIDEOS TABLE
create table public.videos (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  title text not null,
  description text,
  thumbnail_url text,
  video_url text not null, -- YouTube link or file URL
  duration text,
  featured boolean default false,
  constraint videos_pkey primary key (id)
) tablespace pg_default;

-- 4. TESTIMONIALS TABLE
create table public.testimonials (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default timezone ('utc'::text, now()),
  name text not null,
  role text,
  content text not null,
  avatar_url text,
  constraint testimonials_pkey primary key (id)
) tablespace pg_default;

-- ENABLE ROW LEVEL SECURITY (RLS)
-- This ensures that by default, no one can Access data unless we say so.
alter table public.news enable row level security;
alter table public.portfolio enable row level security;
alter table public.videos enable row level security;
alter table public.testimonials enable row level security;
alter table public.leads enable row level security;

-- CREATE POLICIES (Allow Public Read, Private Write)

-- News
create policy "Enable read access for all users" on public.news
  for select using (true);
create policy "Enable insert for authenticated users only" on public.news
  for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on public.news
  for update using (auth.role() = 'authenticated');

-- Portfolio
create policy "Enable read access for all users" on public.portfolio
  for select using (true);
create policy "Enable insert for authenticated users only" on public.portfolio
  for insert with check (auth.role() = 'authenticated');
create policy "Enable update for authenticated users only" on public.portfolio
  for update using (auth.role() = 'authenticated');

-- Videos
create policy "Enable read access for all users" on public.videos
  for select using (true);
create policy "Enable insert for authenticated users only" on public.videos
  for insert with check (auth.role() = 'authenticated');

-- Testimonials
create policy "Enable read access for all users" on public.testimonials
  for select using (true);
create policy "Enable insert for authenticated users only" on public.testimonials
  for insert with check (auth.role() = 'authenticated');

-- Leads (Only Admin can read, Public can Insert)
create policy "Enable insert for all users" on public.leads
  for insert with check (true);
create policy "Enable read access for authenticated users only" on public.leads
  for select using (auth.role() = 'authenticated');
