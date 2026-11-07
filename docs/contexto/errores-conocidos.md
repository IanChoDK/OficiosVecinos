# Errores Conocidos y Gotchas de Usabilidad - OficiosVecinos

Bitácora técnica de resolución de problemas, soluciones de accesibilidad y ajustes de responsive móvil.

---

## 1. Gotchas de Usabilidad
- **Desorientación por Íconos Aislados**:
  - *Problema*: Usuarios como Marta se desorientan frente a íconos abstractos (hamburguesas, embudos de filtro o disquetes).
  - *Solución*: Todo ícono debe acompañarse obligatoriamente de texto explícito ("Buscar por zona", "Mis oficios").
- **Falta de Affordance en Botones Planos (Flat Design)**:
  - *Problema*: Controles planos que se confunden con etiquetas estáticas.
  - *Solución*: Uso de sombras (`shadow-md`), bordes nítidos y efecto de hundimiento táctil (`active:scale-95`).

---

## 2. Soluciones de Contraste en Modo Claro (WCAG AA)
- **Fallo de Luminancia en Éxito y Peligro**:
  - *Problema*: Los colores `#00C8FF` (success) y `#FF0025` (danger) no alcanzan el ratio 4.5:1 exigido sobre fondos blancos/claros bajo la luz solar.
  - *Solución*: Se reservan `#00C8FF` y `#FF0025` para bordes e iconos. Para los textos legibles sobre fondos claros se emplean variantes oscuras: `success-text` (`#006B8A`) y `danger-text` (`#B30018`).

---

## 3. Problemas de Foco en Teclado
- **Pérdida de Foco en Modales**:
  - *Problema*: Al abrir un modal de contacto, la navegación con `Tab` continúa recorriendo elementos ocultos del fondo.
  - *Solución*: Implementar trampa de foco (`focus trap`) que confine la navegación al modal, cierre con `Escape` y devuelva el foco al botón disparador al cerrarse.
- **Indicador de Foco Invisible**:
  - *Problema*: Perfilado por defecto del navegador anulado sin reemplazo.
  - *Solución*: Anillo de enfoque obligatorio de alto contraste: `focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2`.

---

## 4. Ajustes de Responsive Móvil
- **Áreas Táctiles Pequeñas (< 44px)**:
  - *Problema*: Pulsaciones erróneas en pantallas pequeñas o manipulación apurada en la calle (Carlos).
  - *Solución*: Altura mínima de botón de `h-11` a `h-12` (44px a 48px) con separación de al menos `gap-3`.
- **Sensación de Lista Incompleta sin Scroll**:
  - *Problema*: Grillas que encajan al milímetro en pantalla transmiten la idea de que "no hay más contenido".
  - *Solución*: La última tarjeta de carruseles o listas horizontales debe quedar **cortada al 50%** en el margen para inducir el deslizamiento táctil intuitivo.
- **Reseteo Accidental de Formularios en Errores**:
  - *Problema*: Formularios que borran los datos válidos cuando un campo falla.
  - *Solución*: Validación no destructiva campo a campo en el evento `onBlur`, preservando la información ya escrita.
