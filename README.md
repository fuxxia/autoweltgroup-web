# AutoWelt Group — Frontend

Sitio web de AutoWelt Group: venta de vehículos 0km y planes adjudicados Volkswagen.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router, static export) |
| UI | React 19 + Tailwind CSS 4 |
| Lenguaje | TypeScript 5 |
| Deploy | Vercel (static) |

## Instalación

```bash
npm install
```

## Correr local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Genera la carpeta `out/` con el sitio estático listo para deploy.

## Lint

```bash
npm run lint
```

## Variables de entorno

Copiá `.env.example` a `.env.local` y completá los valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp (formato: `54911XXXXXXXX`) |
| `NEXT_PUBLIC_GTM_ID` | ID de Google Tag Manager |
| `NEXT_PUBLIC_GA4_ID` | ID de Google Analytics 4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID de Meta Pixel |
| `NEXT_PUBLIC_LEAD_WEBHOOK_URL` | Webhook para envío de leads |

## Deploy en Vercel

1. Importar el repositorio en [vercel.com](https://vercel.com).
2. Framework Preset: **Next.js**.
3. Build Command: `npm run build`
4. Output Directory: `out`
5. Agregar las variables de entorno en el panel de Vercel.

## Dominio

| Subdominio | Destino |
|------------|---------|
| `www.autoweltgroup.com.ar` | Vercel |
| `autoweltgroup.com.ar` | Redirect → www (configurar en Cloudflare) |
| `crm.autoweltgroup.com.ar` | Futuro CRM |
| `api.autoweltgroup.com.ar` | Futuro backend / agentes |
| `app.autoweltgroup.com.ar` | Futuro panel SUVIDON |

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home: hero, simulador, modelos VW, adjudicados |
| `/modelos/[slug]` | Ficha de modelo (polo, nivus, taos, amarok, tera) |
| `/catalogo` | Listado de planes adjudicados |
| `/catalogo/[slug]` | Detalle de plan adjudicado |
| `/simulador` | Simulador de cuota |
| `/cotizador/[slug]` | Cotizador por modelo |
| `/como-funciona` | Explicación del proceso |
| `/contacto` | Contacto |
