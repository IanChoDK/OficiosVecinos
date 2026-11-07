# Flujo de Trabajo, Ciclo DCU y SDD - OficiosVecinos

Protocolo operativo para desarrollo y control de calidad bajo **Gentle-AI**.

---

## 1. Integración del Ciclo DCU (Diseño Centrado en el Usuario)
1. **Entender Contexto**: Considerar baja conectividad periférica y poca familiaridad tecnológica (Marta y Carlos).
2. **Especificar Requisitos**: Formularios con autocompletado nativo, validación en tiempo real (`blur`) y alto contraste solar.
3. **Producir Soluciones**: Reemplazo de paneles abstractos por botones físicos grandes ("Buscar servicio", "Ofrecer nuevo servicio").
4. **Evaluar**: Probar usabilidad con adultos mayores; si un ícono confunde, reemplazarlo inmediatamente por texto directo.

---

## 2. Metodología SDD Adaptativa (Spec-Driven Development)

### Fast-Path (1 solo archivo)
- Para cambios cosméticos, correcciones de copy o ajustes atómicos en un solo archivo.
- Flujo: Inspección rápida ➔ Corrección precisa ➔ Verificación de build/linting.

### Ciclo SDD Completo (> 2 archivos o nueva funcionalidad)
1. **Explore**: Cargar `docs/contexto/` (`mem_context`) y analizar impacto en la base de código.
2. **Propose**: Justificar el *Why* antes del *How* y redactar la propuesta técnica.
3. **Tasks**: Desglosar en tareas atómicas y medibles.
4. **Apply**: Implementar el código respetando los 5 estados interactivos y accesibilidad WCAG AA.
5. **Verify**: Validación exhaustiva de compilación, contraste y checklist de listo.

---

## 3. Los 4 Estados Visuales Obligatorios de Pantalla
- ⏳ **Loading**: Skeletons en listas de prestadores o spinners en botones para evitar dobles clics.
- 📭 **Empty**: Estados vacíos cálidos con llamado a la acción (sin mensajes técnicos fríos).
- ❌ **Error**: Mensajes cotidianos con botón de reintento.
- ✅ **Success**: Retroalimentación y confirmaciones inmediatas.

---

## 4. Checklist de Listo (Definition of Done - DoD)
Para dar por concluida cualquier tarea, debe verificarse taxativamente:
- [ ] **Justificación de Producto**: Explicado el *Why* antes del *How*.
- [ ] **TypeScript Estricto**: Cero uso de `any` arbitrarios; compilación limpia (`npm run build`).
- [ ] **5 Estados Interactivos**: Validados `Default`, `Hover`, `Active`, `Focus` y `Disabled` en cada control.
- [ ] **Accesibilidad WCAG AA**: Contraste >= 4.5:1 en textos, touch targets >= 44-48px y texto en todo ícono.
- [ ] **Navegación por Teclado**: 100% operable con `Tab`/`Enter` (foco visible `#1764AE`). Modales con trampa de foco y `Esc`.
- [ ] **Rotulado Natural**: Cumplimiento del glosario de lenguaje cotidiano (cero dev jargon).
- [ ] **Higiene de Código**: Cero `console.log` de depuración o archivos residuales (`npm run lint` sin advertencias).
- [ ] **Memoria Engram**: Nuevas decisiones registradas en `docs/contexto/decisiones.md` con formato `[ADR-XXX] · [YYYY-MM-DD HH:mm]`.
