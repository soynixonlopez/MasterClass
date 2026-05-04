-- Meta de cobro: precio lista vs pago único con descuento (ver src/lib/pricing.ts).

alter table public.registrations
  add column if not exists collection_target text default 'list';

update public.registrations
set collection_target = 'list'
where collection_target is null;

alter table public.registrations
  alter column collection_target set default 'list',
  alter column collection_target set not null;

alter table public.registrations
  drop constraint if exists registrations_collection_target_check;

alter table public.registrations
  add constraint registrations_collection_target_check
  check (collection_target in ('list', 'discounted_full'));

comment on column public.registrations.collection_target is
  'list = hasta precio lista; discounted_full = hasta monto con descuento por pago completo.';
