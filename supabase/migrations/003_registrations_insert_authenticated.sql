-- El formulario público usa anon; si el navegador tiene sesión Auth (ej. administrador abierto),
-- la petición entra como "authenticated" y fallaba porque solo existía policy para anon.

drop policy if exists "registrations_insert_authenticated" on public.registrations;

create policy "registrations_insert_authenticated"
  on public.registrations
  for insert
  to authenticated
  with check (true);
