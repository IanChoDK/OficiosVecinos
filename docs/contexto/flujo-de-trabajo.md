# Flujo de Trabajo y SDD - OficiosVecinos

Este documento detalla el protocolo operativo de desarrollo y branching para el equipo y los agentes de IA.

---

## 1. Modos de Ejecución

### Fast-Path
- **Criterio**: Cambios puntuales de 1 solo archivo (typos, fixes de estilos menores, ajustes de textos).
- **Proceso**:
  1. Identificación del punto exacto.
  2. Aplicación directa del cambio.
  3. Verificación de build / linting.

### Ciclo SDD (Spec-Driven Development)
- **Criterio**: Tareas complejas, cambios de >2 archivos o features nuevas.
- **Fases**:
  1. **Explore**: Lectura de `docs/contexto/` y análisis de archivos afectados.
  2. **Propose**: Redacción del plan técnico explicando el *Why* y el *How*.
  3. **Tasks**: División en pasos atómicos de ejecución.
  4. **Apply**: Implementación respetando los 5 estados de componentes y accesibilidad WCAG AA.
  5. **Verify**: Comprobación exhaustiva de tipos, compilación y cumplimiento del Definition of Done (DoD).

---

## 2. Memoria Engram
- **`mem_context`**: Leer el contexto antes de iniciar tareas.
- **`mem_save`**: Registrar actualizaciones arquitectónicas o nuevas decisiones.
- **`mem_session_summary`**: Emitir un resumen del trabajo realizado al finalizar.
