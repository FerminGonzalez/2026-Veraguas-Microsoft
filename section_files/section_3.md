> ***Ir a***: [Menú principal](../README.md) ***||*** [Anterior: Arquitectura y Stack Tecnológico](section_2.md) ***||*** [Siguiente sección: Diagnóstico — Bloque Paralelo (E1, E2, E3)](section_4.md)

# Contenido

- [03 Infraestructura como Código y Flujo Técnico del Reto](#03-infraestructura-como-código-y-flujo-técnico-del-reto)
	- [Objetivo: dominar el ciclo DevOps completo (despliegue → diagnóstico → corrección → evaluación)](#objetivo-dominar-el-ciclo-devops-completo-despliegue--diagnóstico--corrección--evaluación)
	- [Acceso al entorno](#acceso-al-entorno)
	- [Desplegar recursos en Azure](#desplegar-recursos-en-azure)
	- [Descargar los repositorios de backend y frontend](#descargar-los-repositorios-de-backend-y-frontend)

# 03 Infraestructura como Código y Flujo Técnico del Reto

## Objetivo: dominar el ciclo DevOps completo (despliegue → diagnóstico → corrección → evaluación)

Esta sección evalúa la capacidad de los equipos para desplegar su propia infraestructura Azure desde código y ejecutar el ciclo iterativo de diagnóstico y corrección.


### Acceso al entorno

> **Importante:** Revisen los siguientes puntos antes de avanzar con el despliegue de la IaC.

1. Solo ingresar al portal de Azure **una persona del equipo asignado**. 
2. Validar que estas conectado a la suscripción **Azure subscription 1**.
3. Verificar que estén usando el directorio o tenant **marcoayalalitumaoutlook.onmicrosoft.com** (este es el nombre donde se va a utilizar el reto).
4. Verificar el nombre de grupo de recursos de Azure asignado, sera similar a `rg-team-{id}`, si pueden notar el id será su número asignado y lo utilizarán en el transcurso del reto.

### Desplegar recursos en Azure

**Paso 1 — Despliegue de la infraestructura (primeros 15–30 minutos)**

Aquí aplicarán infraestructura como código (IaC). **El usuario asignado** de su equipo  aprovisionará automáticamente los recursos de Azure mediante Terraform y un script ya definido. El script creará los App Services, Application Insights y Log Analytics Workspace.

La infraestructura se desplegará con los siguientes comandos:

Una vez que hayan ingresado a Azure:

- Deberán ingresar a Cloud Shell, y seleccionar la opción de tipo Bash.

- Clonen el repositorio:

```bash
git clone {AQUI COLOCAR LA RUTA DEL REPOSITORIO IaC PROPORCIONADO EN LA DOCUMENTACIÓN}
```

- Ingresen a la carpeta de los scripts:

```bash
cd develop-veraguas-iac/hackathon-team/
```

- Ejecuten el siguiente comando para otorgar permisos de ejecución al usuario propietario del script:

```bash
chmod u+x deploy.ps1
```

- Ejecuten el script de creación de recursos. Reemplacen `{Id}` por el ID de equipo asignado. El proceso como tal, toma  unos minutos hasta finalizar:

```bash
./deploy.ps1 -TeamId {Id}
```

> **Importante:** Revisen el resultado de la ejecución y confirmen que aparezca el mensaje **Infraestructura del equipo desplegada correctamente**. Los recursos creados en este paso se utilizarán durante todo el reto.

Después del despliegue, validen que todos los recursos esperados se hayan creado en el portal de Azure y que pertenezcan al equipo correcto antes de continuar con la publicación de las aplicaciones.

### Descargar los repositorios de backend y frontend

* Cada equipo clonará los dos repositorios públicos de GitHub (frontend y backend) en sus máquinas locales:
[`narrative/hackathon_files/templates/frontend/frontend.zip`](../hackathon_files/templates/frontend/frontend.zip)

[`narrative/hackathon_files/templates/backend/backend.zip`](../hackathon_files/templates/backend/backend.zip)

* Cada equipo ingresará a su entorno de Azure asignado con los artefactos correspondientes.


**Paso 2 — Despliegue del backend y el frontend (15–30 minutos)**

En los repositorios descargados encontrarán archivos ZIP, que deberán desplegar en los App Services correspondientes:

- Backend: `hackathon-copa-2026-team-{número de equipo}-api`.
- Frontend: `hackathon-copa-2026-team-{número de equipo}-frontend`.

> **Importante:** cada equipo podra utilizar la manera que más le convenga desplegar el código (CI/CD): Mediante Zip, Azure Devops, Github, local o el mecanismo que le convenga.

**Paso 3 — Diagnóstico (10–20 minutos)**

Los participantes utilizarán Azure Portal, Application Insights preconfigurado para identificar excepciones, analizar trazas y correlacionar los errores con las configuraciones del repositorio. La pregunta central es: *¿por qué falla el backend o el frontend y cómo se pueden identificar los errores?*

Una vez identifiquen los errores, tanto en el backend como en el frontend, deberán regresar al código fuente para validar por que no funciona.


**Paso 4 — Corrección (ciclo iterativo)**

Como equipo, revisarán los errores deben de resolver (backend, frontend y Azure), reconstruirán las aplicaciones (`dotnet build` / `npm run build`), volverán a desplegarlos en sus respectivos App Services. Los pasos 3 y 4 se repetirán para cada uno de los seis errores.

**Paso 5 — Evaluación (durante todo el reto)**

Como equipo, responderán las preguntas técnicas en CTFd a medida que avancen. El ranking se determinará según el puntaje acumulado y la velocidad de resolución.

---

> ***Ir a***: [Menú principal](../README.md) ***||*** [Anterior: Arquitectura y Stack Tecnológico](section_2.md) ***||*** [Siguiente sección: Diagnóstico — Bloque Paralelo (E1, E2, E3)](section_4.md)
