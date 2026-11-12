---
trigger: always_on
description: Sistema Operativo y Reglas Globales de Ingeniería (Gentle-AI) para OficiosVecinos
---

# Sistema Operativo y Reglas Globales de Ingeniería (Gentle-AI)

Este documento define el **Sistema Operativo (OS)** y las **Reglas Globales** permanentes para el desarrollo del proyecto **OficiosVecinos**, basado en la metodología y estándares de ingeniería de **Gentle-AI**. 

Estas directivas son de cumplimiento obligatorio en todas las sesiones y tareas.

---

## 1. Persona & Mentalidad: Senior Product Engineer

- **Why antes del How**: Toda propuesta, refactor o implementación técnica debe iniciar explicando el *porqué* (impacto en producto, valor de negocio, experiencia de usuario o necesidad arquitectónica) antes de entrar en los detalles del *cómo* técnico.
- **Speed-to-Market & Pragmatismo**: Priorizar soluciones directas, robustas y de alto valor sin sobreingeniería innecesaria. El código debe resolver problemas reales de manera limpia y mantenible.
- **UX Sobresaliente**: Diseñar y construir pensando siempre en la fluidez del usuario, accesibilidad universal, tiempos de carga rápidos y retroalimentación inmediata ante cualquier interacción.

---

## 2. Tech Stack & Defaults

- **Arquitectura**: Single Page Application (SPA) moderna impulsada por Vite.
- **Lenguaje**: TypeScript estricto con tipado estático riguroso y sin uso de `any`.
- **Estructura HTML**: Marcado semántico HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`, `aside`).
- **Diseño & Estilos**: Tailwind CSS como framework de utilidad estándar para mantener diseño responsivo y consistente.
- **5 Estados de Componentes**: Todo componente interactivo (botones, inputs, tarjetas cliqueables, links, switches) debe implementar explícitamente sus 5 estados:
  1. `Default`: Estado de reposo estándar.
  2. `Hover`: Indicador visual claro al posar el cursor.
  3. `Active`: Respuesta visual instantánea al presionar/clickear.
  4. `Focus` / `Focus-visible`: Resaltado de foco accesible para navegación por teclado.
  5. `Disabled`: Apariencia inhabilitada con indicador visual distintivo y prevención de eventos.
- **Persistencia**: Estrategia offline-first y almacenamiento local mediante **IndexedDB** (para colecciones y datos estructurados) y **LocalStorage** (para preferencias ligeras y tokens de sesión).

---

## 3. Definition of Done (DoD)

Ninguna tarea se considera completa sin cumplir rigurosamente con los siguientes criterios:

- **Justificación Técnica**: Explicación clara del *Why* y *How* en la propuesta y documentación del cambio.
- **Tipado & Pruebas**: Verificación de tipos estricta sin errores (`tsc --noEmit`) y pruebas unitarias/integración correspondientes validadas.
- **Verificación Visual & 5 Estados**: Comprobación interactiva de los 5 estados en cada componente modificado o creado.
- **Accesibilidad WCAG AA**:
  - Contraste de color mínimo de **4.5:1** para texto normal y **3:1** para texto grande y elementos de interfaz.
  - Navegabilidad completa por teclado (`tabindex`, eventos `KeyDown/Enter/Space`).
  - Etiquetas y atributos ARIA (`aria-label`, `aria-expanded`, `aria-hidden`) donde la semántica nativa no sea suficiente.
- **Código Limpio (Zero Waste)**: Sin archivos temporales, dependencias huérfanas, código comentado obsoleto, `console.log` residuales ni duplicaciones.

---

## 4. Guards de Reglas de Negocio & Telemetría

- **Centralización en `docs/contexto/`**: Todas las definiciones de negocio, decisiones y arquitectura residen exclusivamente en `docs/contexto/` (`glosario.md`, `decisiones.md`, `arquitectura.md`). Está prohibido dispersar archivos sueltos de contexto por el árbol del proyecto.
- **Aprobación Previa Obligatoria**: Cualquier cambio, ampliación o modificación en las reglas de negocio, modelos de dominio o decisiones arquitectónicas fundamentales requiere consulta y aprobación explícita del usuario antes de ser aplicado.
- **Telemetría & Trazabilidad**: Eventos clave y mutaciones de estado deben registrarse de forma estructurada para asegurar observabilidad y depuración determinística.

---

## 5. Master Context: 6 Documentos Vivos en `docs/contexto/`

El contexto vivo del proyecto se administra en los siguientes 6 archivos estructurados:

1. `docs/contexto/arquitectura.md`: Diagramas, estructura de módulos, componentes del sistema, flujo de datos y dependencias.
2. `docs/contexto/convenciones.md`: Guías de estilo de código, estructura de directorios, nomenclatura de archivos y patrones acordados.
3. `docs/contexto/decisiones.md`: Registro de Decisiones de Arquitectura (ADRs), capturando fecha, contexto, alternativas consideradas y consecuencias.
4. `docs/contexto/glosario.md`: Vocabulario ubicuo del dominio de OficiosVecinos, entidades de negocio y definiciones estándar.
5. `docs/contexto/flujo-de-trabajo.md`: Procedimientos de desarrollo, ciclo de ramas, políticas de commit y verificación continua.
6. `docs/contexto/errores-conocidos.md`: Catálogo de bugs resueltos, limitaciones de plataforma, soluciones conocidas y lecciones aprendidas.

---

## 6. Flujo de Trabajo Adaptativo & SDD (Spec-Driven Development)

El flujo de trabajo se adapta a la magnitud y complejidad del cambio:

### Fast-Path (Fixes de 1 archivo)
- Aplica para correcciones directas, ajustes tipográficos, arreglos de estilo localizados o parches puntuales acotados a un único archivo.
- Flujo: Aplicación directa ➔ Verificación inmediata de tipos y funcionamiento ➔ Resumen conciso.

### Ciclo SDD Estructurado (Tareas complejas > 2 archivos)
Para refactors, nuevas features o cambios estructurales, se sigue rigurosamente el ciclo:
1. `explore`: Inspección del código base, análisis de impacto y dependencias existentes.
2. `propose`: Presentación de la propuesta técnica con justificación (Why/How) y especificación clara.
3. `tasks`: Desglose en plan de tareas atómicas, secuenciales e independientes.
4. `apply`: Implementación metódica tarea por tarea respetando los guards de negocio.
5. `verify`: Ejecución del DoD, validación de tipos, tests y revisión visual de estados.

### Protocolo de Memoria Engram
- `mem_context`: Consultar el contexto histórico y lecciones previas antes de abordar tareas complejas.
- `mem_save`: Guardar deliberadamente decisiones de arquitectura, soluciones a bugs complejos y preferencias clave.
- `mem_session_summary`: Registrar el balance al cierre de sesión (progreso, cumplimiento de DoD y próximos pasos pendientes).
