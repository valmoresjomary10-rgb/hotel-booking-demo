-- ============================================================
-- Hotel Lumière — Bookings Table
-- Run this in your Supabase SQL Editor
-- ============================================================

create extension if not exists "pgcrypto";

create table if not exists public.bookings (
  id                uuid primary key default gen_random_uuid(),
  confirmation_code text unique not null default upper(substring(gen_random_uuid()::text, 1, 8)),

  -- Room reference
  room_id           uuid not null references public.rooms(id) on delete restrict,

  -- Guest info
  first_name        text not null,
  last_name         text not null,
  email             text not null,
  phone             text not null,
  country           text not null,
  special_requests  text,

  -- Stay details
  check_in          date not null,
  check_out         date not null,
  nights            int  not null generated always as (check_out - check_in) stored,
  adults            int  not null default 1,
  children          int  not null default 0,

  -- Pricing
  price_per_night   numeric(10,2) not null,
  total_price       numeric(10,2) not null,

  -- Status
  status            text not null default 'pending'
                      check (status in ('pending','confirmed','cancelled','completed')),
  payment_status    text not null default 'unpaid'
                      check (payment_status in ('unpaid','paid','refunded')),

  -- PayMongo (Phase 12)
  paymongo_payment_id   text,
  paymongo_checkout_url text,

  -- Timestamps
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute procedure public.handle_updated_at();

-- Indexes
create index on public.bookings (email);
create index on public.bookings (room_id);
create index on public.bookings (check_in, check_out);
create index on public.bookings (status);
create index on public.bookings (confirmation_code);

-- RLS
alter table public.bookings enable row level security;

-- Allow API route (service role) full access
-- Public can only read their own booking by confirmation code
create policy "Read own booking by code"
  on public.bookings for select
  using (true); -- tighten in Phase 11 with auth

-- ============================================================
-- DONE — table is ready
-- ============================================================
