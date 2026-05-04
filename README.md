# Master Class Colorimetría — Landing + Admin

Landing de alta conversión para la Master Class presencial **Colorimetría Desde Cero**, con registro a **Supabase** y panel **/admin** protegido.

## Requisitos

- Node.js 20+
- Cuenta en [Supabase](https://supabase.com)

## Configuración

### 1. Variables de entorno

Copia `.env.local.example` a `.env.local` y completa:

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto (Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | clave `anon` **pública** |
| `SUPABASE_SERVICE_ROLE_KEY` | Opcional: solo para scripts; el panel usa sesión + RLS |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp principal (sin `+`) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER_2` | Opcional: segundo número para comprobantes |
| `NEXT_PUBLIC_WHATSAPP_GROUP_URL` | Enlace de invitación al grupo (post-registro) |
| `NEXT_PUBLIC_YAPPY_NUMBER` | Dato mostrado en la landing y página post-registro |
| `NEXT_PUBLIC_BANK_ACCOUNT` | Cuenta / alias mostrado en la landing (placeholder) |
| `NEXT_PUBLIC_YOUTUBE_VIDEO_ID` | ID del video o URL de YouTube para el embed en el hero |

Opcional para SEO:

- `NEXT_PUBLIC_SITE_URL` — URL canónica del sitio (ej. `https://tudominio.com`). Si no está definida, en `layout` se usa `http://localhost:3000`.

### 2. Base de datos y seguridad (Supabase)

1. En el SQL Editor de Supabase, ejecuta el script:

   `supabase/migrations/001_registrations.sql`

2. Comprueba que la tabla `registrations` exista y que **RLS** esté activo.

3. **Autenticación (panel admin)**  
   - Authentication → Providers: activa **Email**.  
   - Crea uno o más usuarios (solo personal autorizado).  
   - Authentication → URL configuration:  
     - **Site URL**: `http://localhost:3000` en desarrollo (o tu dominio en producción).  
     - **Redirect URLs**: incluye `http://localhost:3000/**` y tu dominio en producción.

Las políticas RLS del script permiten:

- **anon**: solo `INSERT` (formulario público).
- **authenticated**: `SELECT`, `UPDATE`, `DELETE` (panel tras login).

> Importante: no compartas la **service role** en el cliente. El sitio solo debe exponer la `anon` key.

### 3. Instalar y ejecutar

```bash
npm install
npm run dev
```

- Landing: [http://localhost:3000](http://localhost:3000)  
- Login admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)  
- Dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

### 4. Build de producción

```bash
npm run build
npm start
```

Asegúrate de tener `.env.local` (o variables en tu hosting) antes del build.

## Contenido editable

- Textos del evento, precios e imágenes placeholder: `src/lib/constants.ts`  
- Constancia / certificado: constante `CERTIFICATE_COPY` en el mismo archivo  
- Datos de pago visibles: `.env.local` (`NEXT_PUBLIC_YAPPY_NUMBER`, `NEXT_PUBLIC_BANK_ACCOUNT`)

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui (Base UI), Supabase (Auth + DB), React Hook Form, Zod, Framer Motion, Lucide, Sonner.

## Nota sobre el trigger SQL

Si al aplicar la migración aparece un error de sintaxis en el trigger, en Postgres suele resolverse usando `EXECUTE PROCEDURE` en lugar de `EXECUTE FUNCTION` según la versión. Ajusta la última línea del trigger según la documentación de tu instancia.
