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
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp de **Sandra** para comprobante y **soporte flotante** (`50764814356` sin espacios ni `+`) |
| `NEXT_PUBLIC_WHATSAPP_CARMEN` o `NEXT_PUBLIC_WHATSAPP_NUMBER_CARMEN` | WhatsApp de **Carmen** (segundo botón de comprobante) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER_2` | Opcional: segundo número si no usas la variable de Carmen |
| `NEXT_PUBLIC_WHATSAPP_NAME_SANDRA` | Opcional — por defecto etiqueta **Sandra González** en el botón de comprobante |
| `NEXT_PUBLIC_WHATSAPP_NAME_CARMEN` | Etiqueta opcional (ej. `Carmen González`) |
| `NEXT_PUBLIC_WHATSAPP_GROUP_URL` | Enlace de invitación al grupo (post-registro) |
| `NEXT_PUBLIC_BANK_ACCOUNT` | Número / IBAN / alias para **transferencia única** |
| `NEXT_PUBLIC_BANK_ACCOUNT_HOLDER` | Opcional: titular que se muestra en la confirmación |
| `NEXT_PUBLIC_BANK_NAME` | Opcional: nombre del banco (por defecto «Banco General») |
| `NEXT_PUBLIC_YAPPY_NUMBER` | Solo referencia en otros textos si aplica; la confirmación prioriza transferencia y deriva otros medios a WhatsApp |
| `NEXT_PUBLIC_YOUTUBE_VIDEO_ID` | ID del video o URL de YouTube para el embed en el hero |

Opcional para SEO:

- `NEXT_PUBLIC_SITE_URL` — URL canónica del sitio (ej. `https://tudominio.com`). Si no está definida, en `layout` se usa `http://localhost:3000`.

### 2. Base de datos y seguridad (Supabase)

1. En el SQL Editor de Supabase, ejecuta el script:

   `supabase/migrations/001_registrations.sql`

   Luego, en el mismo editor, ejecuta `002_registrations_collection_target.sql` y `003_registrations_insert_authenticated.sql` (esta última permite enviar el formulario también si tienes sesión de admin abierta).

2. Comprueba que la tabla `registrations` exista y que **RLS** esté activo.

3. **Autenticación (panel admin)**  
   - Authentication → Providers: activa **Email**.  
   - Crea uno o más usuarios (solo personal autorizado).  
   - Authentication → URL configuration:  
     - **Site URL**: `http://localhost:3000` en desarrollo (o tu dominio en producción).  
     - **Redirect URLs**: incluye `http://localhost:3000/**` y tu dominio en producción.

Las políticas RLS permiten:

- **anon**: `INSERT` (formulario público sin login).
- **authenticated**: `INSERT` (mismo formulario con sesión), `SELECT`, `UPDATE`, `DELETE` (panel tras login).

Sin la migración 003, un usuario que haya iniciado sesión en `/admin` y visite la landing usará el rol `authenticated`; el INSERT del formulario fallaba porque solo había política para `anon`.

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
- Datos de confirmación y cobro: `.env.local` (`NEXT_PUBLIC_BANK_*`, `NEXT_PUBLIC_WHATSAPP_*`)

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui (Base UI), Supabase (Auth + DB), React Hook Form, Zod, Framer Motion, Lucide, Sonner.

## Nota sobre el trigger SQL

Si al aplicar la migración aparece un error de sintaxis en el trigger, en Postgres suele resolverse usando `EXECUTE PROCEDURE` en lugar de `EXECUTE FUNCTION` según la versión. Ajusta la última línea del trigger según la documentación de tu instancia.
