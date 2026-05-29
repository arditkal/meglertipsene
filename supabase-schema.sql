-- Run this in Supabase Dashboard → SQL Editor → New query → Run

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  omrade text not null default '',
  adresse text not null default '',
  boligtype text not null default '',
  stoerrelse text not null default '',
  antall_rom text not null default '',
  estimert_pris text not null default '',
  kommentar text not null default '',
  navn text not null default '',
  telefon text not null default '',
  epost text not null default '',
  megler_ids integer[] not null default '{}',
  megler_navn text[] not null default '{}',
  status text not null default 'ny' check (status in ('ny', 'sendt', 'betalt'))
);

-- All access goes via server-side API routes using the service role key (bypasses RLS).
-- RLS is enabled to block any direct client access.
alter table leads enable row level security;
