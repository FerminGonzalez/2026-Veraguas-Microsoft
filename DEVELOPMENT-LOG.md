# 2026-Veraguas-Microsoft — Development Log

Historial de trabajo del reto principal **#hackathonCopa 2026 Veraguas**:
DevOps + APIs + Observabilidad (bloques 1000–1600, CTFd).

---

## 2026-10-12 — Auditoría y versionado de la solución

### Hallazgo principal: código fuente sin pushear
El código fuente de la **solución** existía en disco local pero **nunca se había
versionado en GitHub**; solo estaban commiteadas las secciones (`section_files/`),
assets y hackathon files. Se procedió a commitear todo el código fuente.

### Arquitectura de la solución (mapeada)

**Backend — `solution/backend/` (.NET 10, `Copa.OCC.Api`)**

Clean Architecture en carpetas:
```
Application/   Commands, DTOs, Queries (MediatR)
Domain/        Entities, Enums, Interfaces
Infrastructure/ DataSources, Mappers, Persistence (EF Core InMemory), Repositories
Presentation/  Controllers, Middleware, Swagger
Program.cs     Composición (Serilog, App Insights, CORS, health checks)
```

Stack: MediatR, AutoMapper, FluentValidation, EF Core (InMemory), Serilog,
Application Insights, Swashbuckle (Swagger).

**Endpoints API:**
| Método | Ruta | Notas |
|--------|------|-------|
| GET  | `/api/flights/list`      | Lista de vuelos |
| POST | `/api/flights/create`    | **El más difícil (bloque 1600/E6)** |
| GET  | `/api/information`       | Monitoreo de información |
| GET  | `/api/services`          | Estado de servicios |
| GET  | `/api/status`            | Health/status general |

**Middlewares (renombre del reto):**
- `CorrelationIdMiddleware` — correlación de solicitudes.
- `FrontendHandshakeMiddleware` + `FrontendHandshakeState` — valida el origin
  contra `AllowedOrigins` (renombre del CORS mal configurado del bloque 1300/E1-E3).
- `DeepHealthCheck` — health check profundo (bloque 1400/E4).

**Frontend — `solution/frontend/` (React + Vite + TypeScript)**
- Dashboards: `service-health/` (HealthDashboard, OverallStatusBanner, ServiceStatusCard)
  e `information-monitoring/` (InformationDashboard, Filter, List, StatusBadge).
- Telemetry: `core/telemetry/app-insights.ts` (Application Insights).

**Despliegue — `solution/deploy-apps.ps1`**
- `az webapp deploy --type zip` de `backend-source.zip` y `frontend-source.zip`
  a las Web Apps del equipo. Uso: `az login` + `./deploy-apps.ps1 -TeamId 13`.

**Observabilidad — `hackathon_files/notebooks/` (KQL sobre App Insights)**
- `AppInsights_CORS_Preflight_E2.kql` — preflight CORS (bloque 1300/E2).
- `AppInsights_Excepciones_E3.kql` — excepciones (bloque 1300/E3).
- `AppInsights_HealthCheck_E4_E5.kql` — health checks y feature flag (1400/1500).

### Verificaciones realizadas
| Verificación | Resultado |
|--------------|-----------|
| `appsettings*.json` y `package.json` JSON válido | ✅ Válidos (4 archivos) |
| `.gitignore` excluye `node_modules`/`dist`/`bin`/`obj` | ✅ Verificado (78 archivos staged, 0 de node_modules) |
| Compilación backend (`dotnet build`) | ⬜ No ejecutada (`dotnet` no disponible en WSL) |
| Build frontend (`npm run build`) | ⬜ No ejecutada (requiere `npm install` completo) |

### Mejoras aplicadas
1. **Versionado del código fuente** — todo `solution/` (backend + frontend + deploy)
   y los notebooks `.kql` pasaron a estar en GitHub.
2. **`.gitignore`** — creado: excluye `node_modules/`, `dist/`, `bin/`, `obj/`,
   `*.tsbuildinfo`; documenta que la solución SÍ se versiona.
3. **`DEVELOPMENT-LOG.md`** — este archivo.

### Mapa de bloques del reto → código
| Bloque | Tema | Componente relevante |
|--------|------|----------------------|
| 1200 | Despliegue IaC | `2026-Veraguas-Microsoft-IaC` (repo hermano, Terraform) |
| 1300 | Diagnóstico/Corrección E1–E3 | CORS origin, env vars, `AppInsights_CORS_Preflight_E2.kql`, `AppInsights_Excepciones_E3.kql` |
| 1400 | E4 — Health check profundo | `DeepHealthCheck.cs`, `AppInsights_HealthCheck_E4_E5.kql` |
| 1500 | E5 — Feature flag | `FrontendHandshake*`, `AppInsights_HealthCheck_E4_E5.kql` |
| 1600 | E6 — API de vuelos (POST) | `FlightsController.cs` (`POST /api/flights/create`), `CreateFlightCommand.cs` |

### Pendiente / futuro
- ⬜ Ejecutar `dotnet build` (requiere SDK .NET 10) para validar compilación.
- ⬜ Ejecutar `npm run build` en `solution/frontend` para validar el bundle.
- ⬜ Desplegar a Azure con `deploy-apps.ps1` (requiere suscripción + `az login`).

---

## 2026-10-12 — Compilación y prueba del backend (.NET 10)

- SDK .NET **10.0.401** instalado localmente (`~/.dotnet`, sin sudo).
- `dotnet build -c Release` → **Build succeeded, 0 errores, 2 warnings**.
- **Fix**: warnings CS8620 (nullability) en `Program.cs` / DeepHealthCheck
  resueltos con cast `var data = (IReadOnlyDictionary<string, object?>)entry.Data;`
  → de 4 a 2 warnings (sin cambio de comportamiento).
- **Pendiente conocido**: 1 warning **NU1903** — AutoMapper 13.0.1 (GHSA-rvv3-g6hj-g44x).
  No se fuerza upgrade (AutoMapper 14+ cambia a licencia comercial) → decisión del equipo.
- **API probada en local** (`http://127.0.0.1:5099`, EF Core InMemory):
  `GET /health` 200 · `GET /health/deep` 503 (E4, esperado) · `GET /api/status` 503 (E5) ·
  `GET /api/services` 200 · `GET /api/flights/list` 200 ·
  **`POST /api/flights/create` 201 (E6)** · payload inválido **400** (validación) ·
  header `X-Correlation-Id` ecoado.
- Hallazgo (no bug): `FrontendHandshake` no rechaza GET con Origin no permitido en frío;
  coherente con el diseño E5 (requiere handshake previo del frontend).

### Build del frontend (React + Vite + TypeScript) — EXIT 0 ✅
- Comando: `npm run build` → `tsc -b && vite build` (typecheck + bundle).
- **Problema inicial**: `Cannot find module @rollup/rollup-linux-x64-gnu` — bug conocido
  de npm (#4828). El `node_modules/` se instaló en **Windows** (`/mnt/c/`), por lo que
  solo contenía el binario rollup `win32-x64`; WSL/Linux necesita `linux-x64-gnu`.
  - **Fix**: `npm install @rollup/rollup-linux-x64-gnu --no-save --os=linux --cpu=x64`
    (no toca `package.json` ni `package-lock.json`).
- **Resultado**: `tsc -b` sin errores de tipos + `vite build` → **built in 12.30s**.
- **Bundle generado** (`dist/`, 440K, ignorado por git):
  | Archivo | Tamaño | gzip |
  |---|---|---|
  | `index.html` | 0.73 kB | 0.41 kB |
  | `assets/index-*.css` | 6.06 kB | 2.06 kB |
  | `assets/api-client-*.js` | 1.50 kB | 0.89 kB |
  | `assets/HealthDashboard-*.js` | 6.26 kB | 1.99 kB |
  | `assets/InformationDashboard-*.js` | 8.35 kB | 2.79 kB |
  | `assets/index-*.js` (bundle principal) | 409.54 kB | 149.05 kB |
  | `dist/server.js` + `dist/package.json` | (modo servidor, `npm start`) | — |
- Warnings inofensivos: comentarios `/*#__PURE__*/` de `@microsoft/applicationinsights-*`
  que Rollup no puede interpretar por su posición → los remueve. No afectan el bundle.
- Verificado: `dist/` en `.gitignore` ✅ · `package.json` sin cambios ✅.

> **Nota de replicación**: si se clona este repo en Linux/WSL con un `node_modules`
> proveniente de Windows, repetir el `npm install` del binario rollup de arriba.

---

## 2026-10-13 — Rediseño del frontend: consola OCC estilo Windows Terminal

### Decisiones de diseño
- **Presentación pura**: solo se cambió la capa visual. `core/services/*.ts`,
  `core/models/occ.models.ts`, el http client, la telemetría (App Insights), las
  rutas (`/information`, `/health`) y el polling de 30 s de ambos dashboards
  quedaron **intactos**.
- **Header azul Copa → barra de pestañas** tipo Windows Terminal: barra #1F1F1F,
  pestañas "Vuelos" (icono avión) y "Servicios" (icono pulso), activa con fondo
  #0C0C0C (fusión con el contenido) + línea de acento #0078D4, inactivas en #999,
  "+" decorativo a la derecha. `CopaHeader.tsx` quedó sin importaciones y se
  **eliminó**.
- **Tipografía monoespaciada global** 'Cascadia Code' → 'Cascadia Mono' →
  'Consolas' → ui-monospace: se eliminaron todas las referencias a Outfit/Inter.
- **Encabezados tipo prompt** por página (`PS C:\occ> <comando>` con cursor
  parpadeante): `Get-Flights -Status All` y `Get-ServiceHealth -Continuous`.
- **KPIs tipo output**: paneles #1F1F1F con cifra grande monoespaciada y etiqueta
  gris. Vuelos: Total / Programados / En tránsito / Retrasados / Aterrizados /
  Cancelados (colores ANSI por estado). Servicios: Total / Operativos /
  Degradados / Caídos (verde/amarillo/rojo).
- **Paleta ANSI de estados**: operativo #16C60C, degradado #C19C00, caído
  #E74856, info #3A96DD, gris #767676. ServiceStatusCard pasó a etiquetas
  `[OK]`/`[WARN]`/`[FAIL]` con pares clave:valor en tokens Dark+ (clave
  #9CDCFE, valor #CE9178). Badges de vuelo y banner global con la misma paleta.
- **Tabla de vuelos densa** (filas 13 px alternadas #0C0C0C/#1F1F1F, cabeceras
  #6A9955), inputs oscuros #0C0C0C con focus #0078D4 (clases `wt-input`,
  `wt-btn`, `wt-panel` en `styles.css`).
- **Loading**: spinner verde #16C60C + `Conectando con el OCC...`.
  **Error**: `ERROR: <mensaje>` en #E74856.
- **Barra de estado inferior** (22 px, 11 px mono): "copa-occ" a la izquierda;
  a la derecha ● En vivo (pulso verde), reloj UTC en vivo (1 s con cleanup) y
  "Actualización: 30s".
- Scrollbars oscuras (thumb #555, track #2D2D2D) y transiciones de 150 ms en
  pestañas/botones; `index.html` con título "Copa OCC Console".

### Archivos cambiados
- Nuevos: `src/shared/TerminalTabBar.tsx`, `src/shared/StatusBar.tsx`,
  `src/shared/PromptHeader.tsx`, `src/shared/KpiPanel.tsx`.
- Modificados: `index.html`, `src/App.tsx`, `src/styles.css`,
  `Information{Dashboard,Filter,List,StatusBadge}.tsx`,
  `HealthDashboard.tsx`, `OverallStatusBanner.tsx`, `ServiceStatusCard.tsx`.
- Eliminado: `src/shared/CopaHeader.tsx` (header azul, ya sin usos).
- Sin tocar: `package.json`, servicios, modelos, http client, telemetría, rutas.

### Build y push — EXIT 0 ✅
- `npm run build` (`tsc -b && vite build`) en verde, sin errores de tipos:
  **built in 11.06s** · `dist/assets/index-*.js` 411.29 kB (149.63 kB gzip),
  CSS 7.65 kB, chunks lazy `HealthDashboard` 4.83 kB e
  `InformationDashboard` 7.02 kB. Warnings inofensivos de `/*#__PURE__*/` de
  `@microsoft/applicationinsights-*` (ya conocidos).
- Commit **`58cf9bd`** — `feat(frontend): rediseño de consola OCC estilo Windows
  Terminal` (git add selectivo, `core.autocrlf false`).
- Push a `origin main`: `edb8a64..58cf9bd` ✅.
