> ***Ir a***: [Menú principal](../README.md) ***||*** [Anterior: Diagnóstico — Bloque Paralelo (E1, E2, E3)](section_4.md) ***||*** [Siguiente sección: Evaluación (CTFd)](section_6.md)

# Contenido

- [05 Corrección Avanzada — Bloque Dependiente (E4, E5, E6)](#05-corrección-avanzada--bloque-dependiente-e4-e5-e6)
	- [Objetivo: Cerrar el ciclo de validación operativa](#objetivo-cerrar-el-ciclo-de-validación-operativa)
	- [Error E4 — Health check profundo (depende de E1 + E2 + E3)](#error-e4--health-check-profundo-depende-de-e1--e2--e3)
	- [Error E5 — Feature flag (depende de E4)](#error-e5--feature-flag-depende-de-e4)
	- [Error E6 — API de creación de vuelos no implementada (depende de E5 · el más difícil, cierre del reto)](#error-e6--api-de-creación-de-vuelos-no-implementada-depende-de-e5--el-más-difícil-cierre-del-reto)

# 05 Corrección Avanzada — Bloque Dependiente (E4, E5, E6)

## Objetivo: Cerrar el ciclo de validación operativa

Esta sección cubre el **bloque dependiente** del reto: el error **E4 sólo se puede resolver una vez se hayan corregido E1, E2 y E3**; el error **E5 se desbloquea únicamente tras resolver E4**; y el error **E6 se desbloquea únicamente tras resolver E5**, siendo el **más difícil y el cierre del reto**.

---

### Error E4 — Health check profundo (depende de E1 + E2 + E3)

**Tipo**: Configuración de validación operativa.

**Categoría CTFd**: Cat 4 — Corrección avanzada · Visible al completar Cat 3 · 125 pts.

**Síntoma visible**: la aplicación ya funciona parcialmente (el frontend conecta con el backend y los endpoints principales responden), sin embargo, `/health/deep` sigue devolviendo un estado degradado o fallido.

**Área a investigar**: configuración de health checks.

---

### Error E5 — Feature flag (depende de E4)

**Tipo**: Configuración de *feature management*.

**Categoría CTFd**: Cat 5 — Validación operativa · Visible al completar Cat 4 · 120 pts.

**Síntoma visible**: la aplicación funciona correctamente en todos los endpoints operativos, sin embargo, `/api/status` devuelve `{"ready": false}` o no está disponible.

**Evidencia en Application Insights**: logs indican que no se puede consumir el endpoint.

**Área a investigar**: configuración de feature flags.

---

### Error E6 — API de creación de vuelos no implementada (depende de E5 · el más difícil, cierre del reto)

**Tipo**: Implementación de funcionalidad — API REST (`POST`).

**Categoría CTFd**: Cat 6 — Validación final · Visible al completar Cat 5 · 175 pts.

**Síntoma visible**: el catálogo de vuelos (`GET /api/flights/list`) funciona y devuelve el listado en memoria, sin embargo, no existe forma de registrar un nuevo vuelo: el endpoint `POST /api/flights/create` no está implementado (o responde con HTTP `404`/`405`) y deben crearlo este nuevo endpoint, por lo que revisen los parametros de entrada y salida para que funcione y retorne en la creación HTTP `200`.

**Área a resolver**: implementación de un endpoint REST de tipo `POST`, validación del payload de entrada (campos ya definidos) y persistencia en memoria, una vez implementada deberán revisar que en el endpoint de (`GET /api/flights/list`) se carguen los vuelos creados mediante Swagger.


> ***Ir a***: [Menú principal](../README.md) ***||*** [Anterior: Diagnóstico — Bloque Paralelo (E1, E2, E3)](section_4.md) ***||*** [Siguiente sección: Evaluación (CTFd)](section_6.md)
