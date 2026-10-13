> ***Ir a***: [Menú principal](../README.md) ***||*** [Anterior: Corrección Avanzada (E4, E5, E6)](section_5.md)

# Contenido

- [06 Estrategia de Evaluación (CTFd)](#06-estrategia-de-evaluación-ctfd)
   - [Modelo general](#modelo-general)
   - [Estructura de categorías](#estructura-de-categorías)
   - [Reglas de competencia](#reglas-de-competencia)
   - [Recomendaciones](#recomendaciones)
   
# 06 Estrategia de Evaluación (CTFd)

## Modelo general

La evaluación se ejecuta mediante una **instancia única de CTFd** operando en modo **Teams**, con un scoreboard global unificado para todos los equipos. La calificación es **100% automática**, sin intervención manual de jueces. El desempate entre equipos con el mismo puntaje, se resuelve por timestamp: gana el equipo que completó primero.

## Estructura de categorías

| Categoría | Contenido | Visibilidad | Puntos |
|---|---|---|---|
| Cat 1 — Acceso e Inicio | Verificación de acceso al portal, Resource Group, identificación de componentes | Visible desde el inicio | 30 |
| Cat 2 — Despliegue IaC | Ejecución de Terraform, verificación de recursos creados, comprensión de la plantilla | Visible desde el inicio | 90 |
| Cat 3 — Diagnóstico Paralelo (E1, E2, E3) | Síntomas, causas y áreas de configuración involucradas en los 3 errores independientes | Visible al completar Cat 2 | 180 |
| Cat 4 — Corrección Avanzada (E4) | Diagnóstico y corrección del health check profundo | Visible al completar Cat 3 | 125 |
| Cat 5 — Validación Operativa (E5) | Feature flag, validación del estado operativo, confirmación de `/health` y `/api/status` | Visible al completar Cat 4 | 120 |
| Cat 6 — Validación Final (E6) | Implementación del endpoint `POST /api/flights/create` de creación de vuelos y validación cruzada contra `GET /api/flights/list` — el error más difícil, cierre del reto | Visible al completar Cat 5 | 175 |
| Cat 7 — Teoría DevOps/Azure | Conceptos de DevOps, Azure, observabilidad e IaC | Visible desde el inicio | 150 |
| **Total** | | | **880** |

## Reglas de competencia

* Intentos limitados: 1, 2 o 3 intentos máximos por pregunta (según complejidad de la misma).
* Scoring estático: todo o nada por pregunta.
* Categorías con prerequisitos: 
   * Cat 3 requiere Cat 2.
   * Cat 4 requiere Cat 3.
   * Cat 5 requiere Cat 4.
   * Cat 6 requiere Cat 5.

## Recomendaciones

- **Distribuyan las tareas:** no es necesario que todo el equipo haga lo mismo. Elijan a 1 o, como máximo, 2 integrantes para realizar los cambios técnicos y despliegues; los demás pueden revisar Application Insights, documentar hallazgos y apoyar con las respuestas.
- **Coordinen cada respuesta:** al resolver cada error, revisen y contesten en CTFd la pregunta correspondiente de inmediato. Confirmen entre todos la respuesta antes de enviarla.
- **Verifiquen el acceso con anticipación:** asegúrense de que al menos 2 integrantes hayan aceptado la invitación y puedan ingresar al portal de Azure, por si se requiere apoyo o relevo.
- **Tengan presente su número de equipo:** corresponde al identificador de su grupo de recursos (`rg-team-{id}`). Verifíquenlo antes de ejecutar comandos o modificar recursos.
- **Eviten cambios simultáneos:** antes de modificar o desplegar, avisen al equipo qué recurso están atendiendo y esperen a que termine la operación para evitar conflictos.

---

> ***Ir a***: [Menú principal](../README.md) ***||*** [Anterior: Corrección Avanzada (E4, E5, E6)](section_5.md)
