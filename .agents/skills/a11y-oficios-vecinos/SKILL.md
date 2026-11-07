---
name: a11y-oficios-vecinos
description: >-
  Estándares de accesibilidad universal e inclusión digital para OficiosVecinos.
  Garantiza que usuarios adultos mayores (como Marta) o trabajadores con luz solar directa
  (como Carlos) operen sin barreras técnicas: WCAG AA (4.5:1), zonas táctiles >=44-48px,
  navegación 100% por teclado (Tab/Enter), foco visible en #1764AE, modales con focus trap,
  etiquetas en todos los iconos y textos de error en lenguaje cotidiano.
---

# Skill: Accesibilidad e Inclusión Digital (OficiosVecinos)

Esta habilidad asegura el cumplimiento taxativo de los estándares de accesibilidad **WCAG 2.1 AA** y la eliminación de barreras para personas con baja adopción tecnológica.

---

## 1. Pautas WCAG Fundamentales

1. **Perceptible**:
   - Todo avatar, imagen e icono debe contar con texto alternativo (`alt` o `aria-label`).
   - Contraste mínimo de **4.5:1** para texto normal sobre cualquier fondo.
   - Variantes oscuras para textos de éxito y error sobre fondo blanco; los tonos vibrantes `#00C8FF` y `#FF0025` se reservan para bordes e iconos.
   - El color nunca debe ser el único vehículo de información: combinar siempre con texto e icono explicativo.

2. **Operable**:
   - Navegación completa posible únicamente con teclado (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`).
   - Anillo de foco nítido y siempre visible: `ring-2 ring-[#1764AE] ring-offset-2`.
   - Modales accesibles: atrapan el foco en su interior al abrirse y se cierran con la tecla `Escape`.
   - Áreas de interacción táctil mínimas de **44x44px** a **48x48px** con separación adecuada (`gap-3`).

3. **Comprensible**:
   - Formularios de mínimo esfuerzo con autocompletado nativo (`autocomplete="name"`, `"email"`, `"street-address"`).
   - Validación en tiempo real campo a campo al hacer `blur`, sin esperar al envío del formulario.
   - Toda entrada de formulario posee una etiqueta `<label>` visible y vinculada semánticamente mediante `htmlFor`/`id`.
   - Mensajes de error en lenguaje cotidiano explicando qué sucedió y cómo solucionarlo.

4. **Robusto**:
   - Marcado HTML5 estrictamente semántico: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<button>`, `<form>`. Jamás emplear `<div>` con `onClick` para elementos interactivos.
   - Atributos ARIA aplicados donde corresponde: `aria-invalid`, `aria-describedby` para asociar textos de error, y `aria-live="polite"` para alertas y confirmaciones.

---

## 2. Iconos y Metáforas Visuales
- **Regla estricta**: Queda prohibido el uso de íconos aislados sin texto de acompañamiento.
- Cada ícono funcional debe incluir su etiqueta literal legible ("Buscar por zona", "Mis servicios", "Llamar al plomero").
