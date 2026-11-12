# Flujo de Trabajo, Ciclo de Desarrollo y DoD - OficiosVecinos

> **Lectura rápida**: ~1.5 min. Integración DCU + SDD adaptativo y Checklist de Listo (DoD).

---

## 1. Integración DCU con SDD Adaptativo

El proyecto fusiona las 4 fases del **Diseño Centrado en el Usuario (DCU)** con el **Spec-Driven Development (SDD)**:

| Fase DCU | Propósito de Usuario | Traducción en SDD |
| :--- | :--- | :--- |
| **1. Entender el Contexto** | Mapear dificultades de Marta y Carlos (baja señal, celulares básicos). | Fase `explore`: análisis de requerimientos en `docs/contexto/`. |
| **2. Especificar Requisitos** | Definir alto contraste, sin flat design y formularios mínimos. | Fase `propose`: diseño de la solución (*Why* antes del *How*). |
| **3. Producir Soluciones** | Construcción con componentes atómicos y affordance física. | Fases `tasks` y `apply`: ejecución modular con tokens Tailwind. |
| **4. Evaluar (Realidad)** | Validar comprensión con adultos mayores y WCAG AA. | Fase `verify`: ejecución de tests, tipos y Checklist de Listo. |

---

## 2. Modos de Ejecución Adaptativos

### Fast-Path (Fixes de 1 archivo)
- Para ajustes de texto, cambios de color dentro de tokens o parches de CSS en un componente aislado.
- **Flujo**: Aplicación directa ➔ `tsc --noEmit` ➔ Verificación visual inmediata ➔ Resumen conciso.

### Ciclo SDD Completo (> 2 archivos)
- Para nuevas vistas del Router SPA, integración de IndexedDB o refactors estructurales.
- **Flujo**: `explore` ➔ `propose` (Why antes del How) ➔ `tasks` ➔ `apply` (con guards) ➔ `verify` (DoD).

---

## 3. Checklist de Listo / Definition of Done (DoD)

Todo incremento o tarea debe verificar rigurosamente:

- [ ] **Justificación Técnica**: Explicado el *Why* antes del *How*.
- [ ] **Tipado Estricto**: `tsc --noEmit` sin errores y sin `any`.
- [ ] **5 Estados Verificados**: `Default`, `Hover`, `Active` (`scale-95`), `Focus` (ring de 2px en `#1764AE`), `Disabled`.
- [ ] **Accesibilidad WCAG AA**:
  - Contraste > 4.5:1 (textos usan `success-text` y `danger-text`).
  - Navegable 100% por teclado (`Tab`/`Enter`), modales con `Esc` y focus trap.
  - Touch targets de al menos **48x48px** (mínimo absoluto 44x44px).
  - Cero íconos huérfanos: **todo ícono con su texto visible**.
- [ ] **Formularios Ágiles**: Labels visibles, autocompletado nativo y validación en `onBlur`.
- [ ] **Ley de Continuidad**: Última card de carruseles/listas cortada a la mitad.
- [ ] **Zero Waste**: Sin colores hex sueltos, sin `console.log` residuales ni dependencias huérfanas.
