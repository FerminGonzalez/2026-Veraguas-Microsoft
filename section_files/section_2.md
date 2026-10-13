> ***Ir a***: [Menú principal](../README.md) ***||*** [Anterior: Introducción](section_1.md) ***||*** [Siguiente sección: Infraestructura como Código](section_3.md)

# Contenido

- [02 Arquitectura de la Solución y Stack Tecnológico](#02-arquitectura-de-la-solución-y-stack-tecnológico)
	- [Arquitectura general](#arquitectura-general)
	- [Componentes por equipo](#componentes-por-equipo)
	- [Componentes compartidos](#componentes-compartidos)
	- [Stack tecnológico](#stack-tecnológico)
		- [Frontend](#frontend)
		- [Backend](#backend)
		- [Infraestructura como Código](#infraestructura-como-código)
		- [Observabilidad](#observabilidad)
		- [Plataforma de evaluación](#plataforma-de-evaluación)
	- [Identidad y seguridad (resumen)](#identidad-y-seguridad-resumen)

# 02 Arquitectura de la Solución y Stack Tecnológico

## Arquitectura general

La arquitectura del reto se sustenta en un modelo de aislamiento por equipo dentro de un **tenant Azure compartido**. Cada equipo operará sobre su propio **Resource Group** (`rg-team-{id}`) con permisos **Contributor** limitados exclusivamente a su espacio, sin visibilidad ni acceso a los recursos de otros equipos.

Los repositorios de código son públicos en GitHub (IaC, frontend, backend) y contienen la infraestructura como código (Terraform), así como las aplicaciones frontend y backend. El reto contiene 6 errores intencionales los cuales deben ser identificados y corregidos.

La plataforma de evaluación **CTFd** opera como una instancia independiente dentro del mismo tenant, con un scoreboard global único para todos los equipos.

## Componentes por equipo

| Componente | Tecnología | Función |
|---|---|---|
| Resource Group | `rg-team-{id}` | Aislamiento completo del equipo |
| App Service Frontend | Azure App Service (Linux, B1) | Hosting de la aplicación React Native LTS 24|
| App Service Backend | Azure App Service (Linux, B2) | Hosting de la API REST .NET 10 |
| Application Insights | Azure Application Insights | Observabilidad: trazas, excepciones, métricas |


## Componentes compartidos

| Componente | Cantidad | Función |
|---|---|---|
| CTFd | 1 instancia | Plataforma de evaluación y scoreboard |
| Repositorios GitHub | 3 (públicos) | Código fuente: IaC, frontend y backend |

## Stack tecnológico

### Frontend

| Aspecto | Detalle |
|---|---|
| Framework | React Native (para Web) |
| Función | Interfaz web que consume la API REST del backend |

### Backend

| Aspecto | Detalle |
|---|---|
| Framework | .NET 10 (C#) |
| Arquitectura | Clean Architecture — capas `Domain`, `Application`, `Infrastructure`, `API/Presentation`, principios SOLID |
| Persistencia | In-Memory Database (Entity Framework Core InMemory Provider) — sin base de datos persistente |
| Tipo | API REST |
| Endpoints clave | `/health/deep`, `/api/flights/list`, `/api/flights/create`, `/api/service`, `/api/status` |
| Logging | Estructurado, integrado con Azure Application Insights |
| CORS | `AllowedOrigins` configurado apuntando al origen real del frontend |

### Infraestructura como Código

| Aspecto | Detalle |
|---|---|
| Herramienta | Terraform |
| Provider | `azurerm` |
| Parametrización | Variable `team_id` para generar nombres únicos de recursos |
| Despliegue de apps | Integrado en el propio Terraform (deploy automático al crear los App Services) |

### Observabilidad

| Herramienta | Uso |
|---|---|
| Azure Application Insights | Trazas, excepciones, métricas de rendimiento, logs estructurados |
| Azure Dashboard | Visualización preconfigurada por equipo: errores, latencia, disponibilidad |
| Azure Monitor | Alertas y métricas de infraestructura |

### Plataforma de evaluación

| Aspecto | Detalle |
|---|---|
| Herramienta | CTFd |
| Instancias | 1 única |
| Scoreboard | 1 global unificado |
| Modo | Teams |
| Scoring | Estático (all-or-nothing por pregunta) |
| Desempate | Por timestamp de resolución |

## Identidad y seguridad (resumen)

**Azure Entra ID B2B Guest Users**: Cada estudiante se autenticará con su propio proveedor de identidad (correo personal), sin necesidad de cuentas internas en el tenant. Dos políticas de **Conditional Access** controlan el acceso: **CA-01** permite el ingreso sin MFA desde las IPs de la sede del evento y **CA-02** bloquea cualquier acceso fuera de esas ubicaciones. El aislamiento entre equipos se garantiza mediante RBAC, otorgando el rol Contributor exclusivamente dentro del Resource Group de cada equipo.

---

## Ingreso al Tenant

Todos los integrantes de cada equipo recibirán una invitación a sus correos registrados para ingresar al tenant de Azure. Revisen la bandeja de entrada y/o la carpeta de correo no deseado.

> **IMPORTANTE: DE CADA EQUIPO, DEBE INGRESAR AL TENANT SOLO 1 PERSONA O, COMO MÁXIMO, 2 PERSONAS.** Así evitarán configuraciones simultáneas y confusiones durante los pasos del reto. El resto del equipo no debe realizar acciones de configuración en el tenant.

Identifiquen la invitación por estos datos:

- **Remitente:** Microsoft Invitacion
- **Asunto:** `esteban-meza85 invited you to collaborate with Directorio predeterminado`

Una vez que acepten la invitacion ingresarán de manera automatica al portal de Azure. 


> ***Ir a***: [Menú principal](../README.md) ***||*** [Anterior: Introducción](section_1.md) ***||*** [Siguiente sección: Infraestructura como Código](section_3.md)
