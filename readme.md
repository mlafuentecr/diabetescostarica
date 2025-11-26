# Diabetescostarica – Monorepo

Monorepo para el proyecto Diabetescostarica. Incluye un backend headless en WordPress (para administrar contenidos y exponerlos vía REST/GraphQL) y un frontend en Next.js que consume la API y renderiza la web pública.

## Estructura del repositorio
- `backend-wordpress/`: instalación de WordPress con el tema headless `headless-wp-master` dentro de `wp-content/themes/`. Úsalo como raíz de tu servidor web local o copia el tema a otro proyecto WordPress si ya tienes uno configurado.
- `frontend-next/`: aplicación Next.js (TypeScript) que actúa como frontend headless.
- `readme.md`: este documento.

## Requisitos previos
Backend (WordPress)
- PHP 8+
- MySQL/MariaDB
- Servidor web (Apache/Nginx, XAMPP, MAMP, LocalWP, etc.)

Frontend (Next.js)
- Node.js 18+
- npm (o pnpm/yarn/bun) para la gestión de dependencias

## Puesta en marcha rápida
### 1) Backend WordPress
1. Crea una base de datos vacía en tu entorno local.
2. Copia `backend-wordpress/wp-config-sample.php` a `backend-wordpress/wp-config.php` y ajusta los datos de conexión y las claves/"salts" de WordPress.
3. Coloca la carpeta `backend-wordpress` en el directorio público de tu servidor web (o apunta tu stack local a ella) y completa el instalador en `/wp-admin`.
4. Activa el tema `headless-wp-master` desde Apariencia → Temas para mantener WordPress en modo headless.
5. Si usas endpoints externos (REST o WPGraphQL), habilita los permalinks y revisa CORS según tu dominio/frontend.

### 2) Frontend Next.js
1. Instala dependencias:
   ```bash
   cd frontend-next
   npm install
   ```
2. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Visita [http://localhost:3000](http://localhost:3000).
3. Ajusta las URLs de la API en los hooks/servicios del frontend cuando conectes con tu instancia de WordPress (por ejemplo, `https://tu-dominio/wp-json`).

## Scripts útiles (frontend)
- `npm run dev`: servidor de desarrollo.
- `npm run build`: build de producción.
- `npm run start`: inicia el servidor con el build generado.
- `npm run lint`: ejecuta ESLint.

## Notas adicionales
- El tema `headless-wp-master` incluye archivos fuente en `backend-wordpress/wp-content/themes/headless-wp-master/src/` si necesitas modificar el comportamiento headless.
- Si despliegas el frontend, recuerda configurar la URL del backend y cualquier plugin de autenticación (JWT/GraphQL) que utilices en WordPress.
