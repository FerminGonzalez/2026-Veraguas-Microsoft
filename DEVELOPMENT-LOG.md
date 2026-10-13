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
