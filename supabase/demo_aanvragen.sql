-- DealerMeter – tabel voor demo-aanvragen vanaf de website.
-- Eenmalig uitvoeren in de SQL-editor van het Supabase-project voor DealerMeter.

create table public.demo_aanvragen (
  id          uuid primary key default gen_random_uuid(),
  aangemaakt  timestamptz not null default now(),
  naam        text not null check (length(trim(naam)) between 1 and 100),
  bedrijf     text not null check (length(trim(bedrijf)) between 1 and 150),
  email       text not null check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$' and length(email) <= 200),
  telefoon    text check (length(telefoon) <= 30),
  aantal      text not null check (aantal in ('Minder dan 10', '10 – 25', '25 – 50', 'Meer dan 50')),
  werkwijze   text not null check (werkwijze in ('Excel of Google Sheets', 'Op papier', 'In ons dealer- of boekhoudpakket', 'Anders')),
  opmerking   text check (length(opmerking) <= 1000)
);

-- Bezoekers van de website mogen alleen een aanvraag toevoegen, niets lezen,
-- wijzigen of verwijderen. Aanvragen bekijk je in het Supabase-dashboard (Table Editor).
alter table public.demo_aanvragen enable row level security;

create policy "Website: aanvraag toevoegen" on public.demo_aanvragen
  for insert to anon with check (true);

revoke all on public.demo_aanvragen from anon, authenticated;
grant insert on public.demo_aanvragen to anon;
