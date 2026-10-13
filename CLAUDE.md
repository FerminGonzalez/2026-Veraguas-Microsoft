# 2026-Veraguas-Microsoft - DevOps + APIs + Observability

## Propósito
Desafío hackathon 2026 Veraguas: Stack completo de DevOps, APIs y observabilidad para la competencia Copa 2026.

## Categorías y puntos
| Bloque | Tema | Preg. | Complejidad | Puntos c/u | Subtotal |
|--------|------|-------|-------------|------------|----------|
| 1000 | Init (freebie) | 1 | — | 10 | 10 |
| 1100 | Acceso e Inicio | 3 | C0 | 10 | 30 |
| ... | ... | ... | ... | ... | ... |

## Estructura del repositorio
```
section_1/   - Instrucciones generales, propósito y objetivos
section_2/   - Arquitectura, stack tecnológico, componentes por equipo
section_3/   - Terraform, ciclo DevOps (Deploy → Diagnóstico → Corrección → Evaluación)
section_4/   - Diagnóstico: bloque paralelo (E1, E2, E3)
section_5/   - Corrección avanzada: bloque dependiente (E4, E5, E6)
section_6/   - Evaluación: estrategia CTFd, categorías y reglas
assets/      - Recursos e imágenes del hackathon
hackathon_files/ - Archivos del hackathon
solution/    - Solución final (backend-source.zip, frontend-dist.zip)
deploy-apps.ps1 - Script de despliegue de aplicaciones
```

## Componentes principales
- **Frontend**: frontend-dist.zip (distribuido, lista para servir)
- **Backend**: backend-source.zip (código fuente, necesita compilación)
- **APIs**: endpoints de vuelos, health checks, feature flags
- **Observability**: Dynatrace, Application Insights, logs, métricas
- **CORS y configuraciones**: variables de entorno mal configuradas (reto)

## Reto diagnostico clave (según section_4/5)
1. URL de frontend mal configurada
2. CORS mal configurado
3. Variables de entorno incorrectas
4. Health checks profundos
5. Feature flags de validación operativa
6. Creación de API de vuelos (POST) - el más difícil

## Comandos habituales
```bash
# Revisar estructura
ls -la
ls section_files/
ls assets/
ls solution/

# Scripts de despliegue
cat deploy-apps.ps1

# Si hay código backend/source
# Descomprimir y revisar backend-source.zip
```

## Formato de commits (Convencionales)
```
git commit -m "modulo: bloque - descripción breve"

tipos sugeridos:
- docs: actualización de documentación del reto
- fix: corrección de CORS/URL/env vars
- terraform: cambios en infraestructura Azure
- api: nuevo endpoint o corrección de API
- observability: nueva métrica o dashboard
- deploy: ajuste de scripts de despliegue
- feat: nueva funcionalidad o reto superado
```

## Estado actual
- README con visión general del challenge
- 6 secciones numeradas (1-6) con objetivos crecientes
- `solution/` con frontend-dist.zip y backend-source.zip
- `deploy-apps.ps1` para despliegue de aplicaciones
- `hackathon_files/` y `assets/` con recursos del evento
- Pendiente: explorar sección_4 y sección_5 para retos de diagnóstico y corrección
