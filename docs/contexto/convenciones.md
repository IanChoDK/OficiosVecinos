# Convenciones de Diseño, UI y Accesibilidad - OficiosVecinos

Guía normativa de tokens, tipografía, estados y diseño visual para **OficiosVecinos**.

---

## 1. Sistema de Colores Semánticos (Tailwind CSS)

> **Prohibido el uso de colores hexadecimales sueltos en componentes.**

| Token | Valor Hex | Uso Semántico |
| :--- | :--- | :--- |
| `primary` | `#1764AE` | Acciones principales ("Solicitar servicio", "Continuar"). Azul de confianza. |
| `primary-dark` | `#00112B` | Hover de primarios, títulos y textos de máxima legibilidad. |
| `secondary` | `#E2E2E3` | Fondos de tarjetas, acciones secundarias ("Volver") y deshabilitados. |
| `success` | `#00C8FF` | Bordes e iconos de confirmación y éxito. |
| `success-text`| `#006B8A` | **Texto de éxito sobre blanco** (cumple contraste WCAG >= 4.5:1). |
| `danger` | `#FF0025` | Bordes e iconos de error o acciones destructivas. |
| `danger-text` | `#B30018` | **Texto de error sobre blanco** (cumple contraste WCAG >= 4.5:1). |
| `warning` | `#D97706` | Ámbar con alto contraste para estados pendientes o advertencias. |

---

## 2. Escala Tipográfica Modular & Accesible
- **Fuentes**: `font-sans` (`Roboto`) en cuerpo de texto; `font-mono` (`Roboto Mono`) en encabezados.
- **Escala Normal**:
  - Títulos: `24px` (`text-2xl font-bold font-mono`)
  - Subtítulos: `18px` (`text-lg font-semibold`)
  - Texto base / tarjetas: `16px` (`text-base leading-relaxed`)
  - Metadatos: `12px` (`text-xs text-gray-600`)
- **Escala Accesible (Toggle en Perfil)**:
  - Títulos: `36px` (`text-4xl`) | Subtítulos: `24px` (`text-2xl`) | Cards: `20px` (`text-xl`) | Metadatos: `16px` (`text-base`).

---

## 3. Los 5 Estados Obligatorios de Componentes
Todo componente interactivo debe implementar explícitamente:
1. **Default**: `shadow-md border border-transparent` (affordance físico visible; nunca plano).
2. **Hover**: `hover:bg-primary-dark hover:shadow-lg transition-colors duration-200`.
3. **Active**: `active:scale-95 active:shadow-inner` (sensación táctil de hundimiento).
4. **Focus**: `focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2`.
5. **Disabled**: `disabled:bg-[#E2E2E3] disabled:text-gray-500 disabled:cursor-not-allowed`.

---

## 4. Espaciado Gestalt & Principios Visuales
- **Proximidad**: Elementos de una misma card muy cercanos (`gap-1.5`); separación amplia entre tarjetas distintas (`gap-4` o `mb-6`). Labels pegadas inmediatamente sobre su input.
- **Semejanza**: Solo 3 roles de botón en toda la app: Primario (1 solo por vista), Secundario y Destructivo.
- **Continuidad y Cierre**: En carruseles horizontales, la última tarjeta queda cortada al 50% en el margen derecho para inducir el scroll táctil sin necesidad de poner "ver más".
- **Patrones de Lectura**: Patrón en F para listados (búsqueda); Patrón en Z para pantallas de acción (Home).

---

## 5. Reglas de Accesibilidad WCAG AA
- **Contraste Mínimo**: 4.5:1 para texto regular (emplear variantes oscuras de texto para success y danger).
- **Áreas Táctiles (Touch Targets)**: Altura mínima de `h-11` a `h-12` (44px a 48px).
- **Etiquetado Obligatorio**: Todo ícono debe ir acompañado por texto explícito (prohibidos íconos solos).
- **Teclado**: Operable al 100% con `Tab` y `Enter`. Modales con trampa de foco y escape (`Esc`).
