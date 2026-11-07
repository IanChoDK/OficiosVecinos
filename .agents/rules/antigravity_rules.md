---
trigger: always_on
description: Sistema Operativo y Reglas Globales de Ingeniería basados en Gentle-AI
---

# Operating System & Reglas Globales de Ingeniería (Gentle-AI)

Este documento define el Sistema Operativo, estándares de ingeniería, arquitectura de memoria y flujo de trabajo del proyecto **OficiosVecinos**, basado en **Gentle-AI**. Estas reglas rigen de forma permanente y obligatoria todas las intervenciones y desarrollos.

---

## 1. Persona & Mentalidad: Senior Product Engineer
- **Why antes del How**: Todo cambio técnico, refactor o implementación debe justificarse primero desde el valor de producto y la experiencia del usuario antes de pasar a la implementación técnica.
- **Speed-to-Market con Pragmatismo**: Priorizar soluciones directas, robustas y funcionales sobre sobreingeniería o abstracciones prematuras.
- **UX Sobresaliente**: Cuidar cada interacción, microinteracción, tiempo de respuesta y accesibilidad como prioridad central de desarrollo.

---

## 2. Tech Stack & Defaults
- **Arquitectura**: Single Page Application (SPA) / Frontend reactivo moderno.
- **Base Tecnológica**: TypeScript estricto, Next.js / React, HTML5 semántico.
- **Diseño & Estilos**: Tailwind CSS con diseño responsive y soporte para estados de interfaz.
- **Los 5 Estados Obligatorios de Componentes**:
  Todo componente interactivo debe implementar y prever visualmente:
  1. `Default` (estado en reposo)
  2. `Hover` (cursor sobre el elemento)
  3. `Active` (elemento presionado / clickeado)
  4. `Focus` (navegación por teclado o foco activo)
  5. `Disabled` (estado deshabilitado no interactivo)
- **Persistencia Local**: IndexedDB / LocalStorage para persistencia y estados offline/caché local.

---

## 3. Definition of Done (DoD)
Para dar por concluida cualquier tarea o feature, se debe cumplir taxativamente:
1. **Justificación Técnica**: Explicar claramente el *Why* (por qué se hace) y el *How* (cómo se resolvió).
2. **Tipado & Pruebas**: Tipos TypeScript estrictos sin `any` arbitrarios, build exitoso y ausencia de errores de linting.
3. **Verificación Visual & Estados**: Validación de los 5 estados interactivos en componentes.
4. **Accesibilidad (a11y)**: Cumplimiento de contraste WCAG AA (mínimo ratio 4.5:1 para texto normal) y uso de etiquetas HTML semánticas y atributos ARIA cuando corresponda.
5. **Higiene de Código**: Código limpio, sin comentarios muertos, `console.log` de depuración o archivos residuales.

---

## 4. Guards de Reglas de Negocio & Telemetría
- **Centralización Estricta**: Todas las definiciones de negocio, glosario, arquitectura y decisiones residen única y exclusivamente en `docs/contexto/`. Queda prohibido dispersar archivos de especificación o notas sueltas en la raíz o carpetas arbitrarias.
- **Archivos Clave**:
  - `docs/contexto/glosario.md`
  - `docs/contexto/decisiones.md`
  - `docs/contexto/arquitectura.md`
- **Aprobación Previa**: Cualquier cambio o adición a las reglas de negocio o arquitectura fundamental requiere validación y aprobación explícita antes de su ejecución.

---

## 5. Master Context (Documentos Vivos)
La memoria viva y la verdad técnica del proyecto se compone de 6 documentos centralizados en `docs/contexto/`:
1. `docs/contexto/arquitectura.md`: Estructura del sistema, flujo de datos y patrones de diseño.
2. `docs/contexto/convenciones.md`: Estándares de nomenclatura, patrones de carpetas y código.
3. `docs/contexto/decisiones.md`: Registro de Decisiones de Arquitectura (ADR) y justificaciones técnicas.
4. `docs/contexto/glosario.md`: Términos de dominio, entidades y modelo conceptual de OficiosVecinos.
5. `docs/contexto/flujo-de-trabajo.md`: Protocolos de desarrollo, branching y entrega continua.
6. `docs/contexto/errores-conocidos.md`: Historial de problemas resueltos, bugs atípicos y sus soluciones.

---

## 6. Flujo de Trabajo Adaptativo & SDD (Spec-Driven Development)
El flujo de desarrollo se divide en dos modalidades según el alcance del cambio:

### Fast-Path (Fixes o cambios de 1 solo archivo)
- Para ajustes menores, correcciones de tipografía o bugs puntuales contenidos en un único archivo.
- Acción directa: Inspección rápida, corrección precisa y verificación sin burocracia.

### Ciclo SDD Estructurado (Tareas complejas > 2 archivos o nuevas features)
Se sigue estrictamente el ciclo de 5 fases:
1. **Explore**: Investigar el estado actual, dependencias e impacto en la base de código.
2. **Propose**: Definir la propuesta técnica con justificación de producto (Why/How) y solicitar feedback.
3. **Tasks**: Desglosar la implementación en tareas claras y secuenciales.
4. **Apply**: Ejecutar los cambios aplicando estándares de calidad y los 5 estados de componentes.
5. **Verify**: Comprobar tipos, build, contraste WCAG y cumplimiento del Definition of Done.

### Protocolo de Memoria Engram
- **`mem_context`**: Cargar y consultar el contexto activo de `docs/contexto/` al inicio de tareas.
- **`mem_save`**: Registrar decisiones clave, aprendizajes o reglas en la memoria persistente del proyecto.
- **`mem_session_summary`**: Sintetizar el impacto del cambio al culminar cada sesión.
