-- Ejecutar en Supabase SQL Editor o con CLI.

create extension if not exists "pgcrypto";

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  whatsapp text not null,
  email text,
  experience_level text,
  payment_method text,
  amount_paid numeric default 0,
  payment_status text default 'pendiente'
    check (payment_status in ('pendiente', 'abonado', 'pagado')),
  payment_proof text,
  notes text,
  accepted_contact boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function public.set_registrations_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists registrations_set_updated_at on public.registrations;
create trigger registrations_set_updated_at
before update on public.registrations
for each row execute function public.set_registrations_updated_at();

alter table public.registrations enable row level security;

-- Formulario público: solo insertar
create policy "registrations_insert_anon"
  on public.registrations
  for insert
  to anon
  with check (true);

-- Panel admin: usuarios autenticados (crea cuentas solo para tu equipo)
create policy "registrations_select_auth"
  on public.registrations
  for select
  to authenticated
  using (true);

create policy "registrations_update_auth"
  on public.registrations
  for update
  to authenticated
  using (true)
  with check (true);

create policy "registrations_delete_auth"
  on public.registrations
  for delete
  to authenticated
  using (true);
