> ***Ir a***: [Menú principal](../README.md) ***||*** [Siguiente sección: Arquitectura y Stack Tecnológico](section_2.md)

# Contenido

- [01 Propósito del Reto: Centro de Monitoreo de Operaciones de Vuelo sobre Azure](#01-propósito-del-reto-centro-de-monitoreo-de-operaciones-de-vuelo-sobre-azure)
	- [Descripción general del producto: Centro de Monitoreo de Operaciones de Vuelo](#descripción-general-del-producto-centro-de-monitoreo-de-operaciones-de-vuelo)
	- [Objetivos del reto](#objetivos-del-reto)
	- [Alcance y fuera de alcance](#alcance-y-fuera-de-alcance)
	- [Recomendaciones del reto](#recomendaciones-del-reto)

# 01 Propósito del Reto: Centro de Monitoreo de Operaciones de Vuelo sobre Azure

El #hackathonCopa desafía a los participantes a desplegar, diagnosticar y corregir una plataforma real de observabilidad para el **Centro de Control de Operaciones** de una aerolínea, aplicando un ciclo **DevOps** completo sobre **Microsoft Azure**: deploy, diagnóstico, fix, redeploy y validación.

El reto simula un escenario real de operaciones: los equipos desplegarán su propia infraestructura cloud aislada mediante **Infrastructure as Code** (IaC), identificarán fallos en un sistema productivo degradado intencionalmente, diagnosticarán las causas raíz mediante **Azure Application Insights** y corregirán los problemas siguiendo prácticas reales de DevOps.

La temática central del reto es: **Diseño Operativo Escalable sobre Azure — DevOps + APIs + Observabilidad.**

# Descripción general del producto: Centro de Monitoreo de Operaciones de Vuelo

La plataforma que los participantes recibirán (ya desplegada, con algunos errores) es un **Centro de Monitoreo de Operaciones de Vuelo**: una aplicación web para que los equipos en tierra,  visualicen el estado operativo de los vuelos, monitoreen eventos críticos y validen la disponibilidad de los servicios que apoyan la operación diaria de una aerolínea.

Funcionalidades clave de la plataforma:

1. **Monitoreo en tiempo real del estado operativo de vuelos**: dashboard centralizado con el estado de cada vuelo (programado, en tránsito, retrasado, cancelado, aterrizado), filtros por ruta, fecha y estado y alertas visuales ante eventos críticos.
2. **Validación de disponibilidad de servicios operativos**: panel de salud (EnableFinalValidation) que reporta en tiempo real el estado de los servicios que soportan la operación (disponible, degradado, no disponible).

# Objetivos del reto

**Objetivo general**: desarrollar en los participantes capacidades prácticas reales en despliegue Cloud, diagnóstico de incidencias y resolución de problemas en entornos productivos utilizando Microsoft Azure, aplicando un ciclo DevOps completo.

**Objetivos específicos**:

* Desplegar infraestructura Cloud completa utilizando Infrastructure as Code (Terraform).
* Implementar y operar aplicaciones modernas full-stack: frontend React Native (Web) + backend .NET 10 (C#), sobre Azure App Service.
* Utilizar Azure Application Insights y Azure Dashboard como herramientas de observabilidad para el diagnóstico estructurado de fallos en tiempo real.
* Identificar, analizar y resolver 6 errores de configuración deliberados en un entorno productivo simulado.
* Ejecutar proceso DevOps: modificar configuración en código de configuración, reconstruir la aplicación, redesplegar y validar.
* Fomentar el trabajo colaborativo en equipo bajo presión de tiempo, simulando condiciones reales de respuesta a incidentes.

# Alcance y fuera de alcance

**Dentro del alcance**: 
* Despliegue de infraestructura aislada por equipo .
* Despliegue de frontend y backend del código ya proporcionado en las carpetas de templates.
* Diagnóstico y corrección de 6 errores.
* Contestar las preguntas en CTFd de cada paso que vayan realizando a lo largo del reto.

**Fuera de alcance**: 
* Desarrollo de la aplicación desde cero.
* Modificar/cambiar funcionalidades (lógica de negocio) de la aplicacion del reto.
* Cambiar configuraciones de su grupo de recursos en Azure.
* Desarrollo de scripts de IaC.

# Recomendaciones del reto

* Exploren sistemáticamente Azure Portal y Application Insights antes de responder cada pregunta.
* Presten atención al orden de resolución: los errores E1, E2 y E3 son independientes y pueden atacarse en paralelo en equipo, mientras que E4 requiere haber resuelto los tres primeros y E5 requiere haber resuelto E4.
* Lean con atención el enunciado de cada pregunta: el formato exacto de la respuesta es importante.
* Las pistas (hints) en CTFd tienen un costo en puntos — úsenlas solo cuando sea necesario.

---

> ***Ir a***: [Menú principal](../README.md) ***||*** [Siguiente sección: Arquitectura y Stack Tecnológico](section_2.md)
