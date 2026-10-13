> ***Ir a***: [Menú principal](../README.md) ***||*** [Anterior: Infraestructura como Código](section_3.md) ***||*** [Siguiente sección: Corrección Avanzada (E4, E5, E6)](section_5.md)

# Contenido

- [04 Diagnóstico y Corrección — Bloque Paralelo (E1, E2, E3)](#04-diagnóstico-y-corrección--bloque-paralelo-e1-e2-e3)
	- [Objetivo: Diagnosticar y corregir 3 errores independientes usando Application Insights](#objetivo-diagnosticar-y-corregir-3-errores-independientes-usando-application-insights)
	- [Resumen de dependencias](#resumen-de-dependencias)
	- [Error E1 — URL del backend incorrecta en el frontend (independiente)](#error-e1--url-del-backend-incorrecta-en-el-frontend-independiente)
	- [Error E2 — CORS mal configurado en el backend (independiente)](#error-e2--cors-mal-configurado-en-el-backend-independiente)
	- [Error E3 — Variable con nombre incorrecto (independiente)](#error-e3--variable-con-nombre-incorrecto-independiente)

Ahora el equipo continuará avanzando en resolver los errores del mal funcionamiento de la aplicación.

# 04 Diagnóstico y Corrección — Bloque Paralelo (E1, E2, E3)

## Objetivo: Diagnosticar y corregir 3 errores independientes usando Application Insights

El reto contiene 6 errores de configuración idénticos para todos los equipos, distribuidos en dos bloques. Esta sección cubre el **bloque paralelo**: los errores **E1, E2 y E3 son independientes entre sí** y como tal, pueden atenderse en cualquier orden y de forma simultánea por los miembros del equipo.


**Categoría CTFd**: Cat 3 — Diagnóstico Paralelo · Visible al completar Cat 2 (Despliegue IaC) · 180 pts.

---

## Resumen de dependencias

Secuencias de errores a resolver:

```
E1 ─┐
E2 ─┼─► (los 3 resueltos) ─► E4 ─► E5 ─► E6
E3 ─┘
```
---


---

### Error E1 — URL del backend incorrecta en el frontend (independiente)

**Tipo**: Configuración de integración frontend → backend.

**Categoría CTFd**: Cat 3 — Diagnóstico paralelo · Visible al completar Cat 2 · 180 pts.

**Síntoma visible**: el frontend carga correctamente en el navegador, sin embargo, todas las llamadas a la API fallan; el usuario ve errores de conexión o datos vacíos en el frontend.

**Evidencia en Application Insights**: requests fallidos hacia el backend de tipo *connection refused* o *DNS resolution failed*.

**Evidencia en navegador**: en la pestaña Network se observan llamadas a una URL que no corresponde al App Service del equipo.

**Área a resolver**: configuración de integración.

---

### Error E2 — CORS mal configurado en el backend (independiente)

**Tipo**: Seguridad Web — Cross-Origin Resource Sharing.

**Categoría CTFd**: Cat 3 — Diagnóstico paralelo · Visible al completar Cat 2 · 180 pts.

**Síntoma visible**: aunque E1 esté corregido, el navegador bloquea las llamadas del frontend al backend con un error de CORS; el frontend llama a la página principal o ruta `/api/flights/list`, pero el navegador rechaza la respuesta.

**Evidencia en Application Insights**: requests de tipo `OPTIONS` (preflight) rechazados o no procesados correctamente.

**Evidencia en navegador**: error de consola tipo *"has been blocked by CORS policy"*.

**Área a resolver**: configuración CORS.

---

### Error E3 — Variable con nombre incorrecto (independiente)

**Tipo**: Configuración de despliegue — variables de entorno.

**Categoría CTFd**: Cat 3 — Diagnóstico paralelo · Visible al completar Cat 2 · 180 pts.

**Síntoma visible**: el backend arranca, pero un endpoint interno en el frontend, cuando llama al backend falla; `/api/service` devuelve un *error 400* indicando que un servicio interno no está inicializado.

**Evidencia en Application Insights**: excepciones tipo `ConfigurationException` indicando que la aplicación busca una variable de entorno que no existe con ese nombre exacto.

**Área a investigar**: configuración de variables de entorno.

---


> ***Ir a***: [Menú principal](../README.md) ***||*** [Anterior: Infraestructura como Código](section_3.md) ***||*** [Siguiente sección: Corrección Avanzada (E4, E5, E6)](section_5.md)
