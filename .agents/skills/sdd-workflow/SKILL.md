---
name: sdd-workflow
description: >-
  Metodología Spec-Driven Development (Gentle-AI) adaptada a OficiosVecinos.
  Regula la bifurcación entre Fast-Path (1 archivo) y Ciclo SDD (>2 archivos),
  asegurando la verificación de los 4 estados UI (Loading, Empty, Error, Success),
  el cumplimiento de la Definition of Done y la actualización de la memoria Engram.
---

# Skill: Spec-Driven Development (SDD) & Flujo de Calidad (OficiosVecinos)

Esta habilidad garantiza el rigor metodológico, la justificación de producto (*Why antes del How*) y la prevención de regresiones en cada cambio de código.

---

## 1. Clasificación del Alcance

### A. Fast-Path (1 solo archivo)
- Para ajustes menores de estilos, correcciones ortográficas o pequeñas modificaciones atómicas en un componente.
- Acción directa: Inspeccionar ➔ corregir ➔ validar `npm run build` y `npm run lint`.

### B. Ciclo SDD Estructurado (> 2 archivos o nuevas funcionalidades)
1. **Explore**:
   - Cargar contexto (`mem_context`) desde `docs/contexto/`.
   - Evaluar componentes atómicos existentes y dependencias.
2. **Propose**:
   - Formular propuesta técnica justificando el valor de usuario antes de la técnica.
   - Definir diseño visual, estados interactivos y manejo de errores.
3. **Tasks**:
   - Desglosar en tareas secuenciales e independientes.
4. **Apply**:
   - Implementar código garantizando los 5 estados obligatorios (`Default`, `Hover`, `Active`, `Focus`, `Disabled`).
   - Aplicar áreas táctiles de 44-48px y marcado semántico accesible.
5. **Verify**:
   - Comprobación de tipos TypeScript, ausencia de warnings en consola y ratio de contraste WCAG AA.

---

## 2. Los 4 Estados Visuales Obligatorios de Pantalla

Todo contenedor de datos o pantalla debe verificar:
- ⏳ **Loading**: Skeletons o spinners visibles.
- 📭 **Empty**: Mensaje empático en lenguaje cotidiano con llamado a la acción.
- ❌ **Error**: Explicación amigable con botón de reintento.
- ✅ **Success**: Visualización nítida y completa de la información.

---

## 3. Protocolo de Memoria Engram
- **`mem_context`**: Leer el contexto antes de planificar.
- **`mem_save`**: Registrar nuevos ADRs o aprendizajes en `docs/contexto/decisiones.md`.
- **`mem_session_summary`**: Documentar el impacto del cambio al finalizar la sesión.
