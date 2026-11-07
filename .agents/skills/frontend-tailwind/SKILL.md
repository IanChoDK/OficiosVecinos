---
name: frontend-tailwind
description: >-
  Estándares de estilizado con Tailwind CSS v4 para OficiosVecinos. Aplica la paleta
  semántica oficial (Primary #1764AE, Primary-Dark #00112B, Secondary #E2E2E3, Success #00C8FF,
  Danger #FF0025, Warning ámbar), tipografías Roboto y Roboto Mono, escala accesible,
  diseño mobile-first y los 5 estados obligatorios de componentes interactivos.
---

# Skill: Frontend & Tailwind CSS (OficiosVecinos)

Esta habilidad rige el diseño visual, estilización y responsividad mediante **Tailwind CSS v4**, garantizando alta velocidad de renderizado, accesibilidad y fidelidad al diseño atómico.

---

## 1. Tokens de Color Oficiales
- **`primary` (`#1764AE`)**: Acciones principales ("Solicitar servicio", "Continuar", "Guardar mi oficio"). Transmite seguridad y confianza.
- **`primary-dark` (`#00112B`)**: Hover de botones primarios y textos de alto contraste.
- **`secondary` / `neutral` (`#E2E2E3`)**: Fondos de tarjetas, acciones secundarias ("Volver", "Cancelar") y estado deshabilitado.
- **`success` (`#00C8FF`)**: Bordes e iconos de confirmación.
  - **`success-text` (`#006B8A`)**: Variante oscura con contraste >= 4.5:1 para textos legibles sobre fondos claros.
- **`danger` (`#FF0025`)**: Bordes e iconos de error y eliminación.
  - **`danger-text` (`#B30018`)**: Variante oscura con contraste >= 4.5:1 para textos de error legibles sobre fondos claros.
- **`warning` (`#D97706`)**: Ámbar con contraste para estados pendientes o alertas transitorias.

> **Restricción**: Queda prohibido el uso de colores hexadecimales sueltos en las clases utilitarias.

---

## 2. Tipografía & Escala Accesible
- **Fuentes**: `font-sans` (`Roboto`) para lectura general; `font-mono` (`Roboto Mono`) para títulos y diferenciación técnica.
- **Tamaño Base Mobile**: Mínimo `16px` (`text-base`) con interlineado holgado (`leading-relaxed`).
- **Conmutador de Escala Accesible**: Soporte para duplicar tamaño de texto en perfil (hasta `text-4xl` en títulos y `text-xl` en tarjetas para facilitar la lectura a usuarios como Marta).

---

## 3. Los 5 Estados Obligatorios en Todo Componente
Todo control interactivo debe implementar:
1. `Default`: Sombra (`shadow-md`) y bordes definidos (affordance físico visible).
2. `Hover`: `hover:bg-primary-dark hover:shadow-lg transition-all duration-200`.
3. `Active`: Efecto táctil de hundimiento `active:scale-95 active:shadow-inner`.
4. `Focus`: Anillo nítido para navegación por teclado `focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2 focus:outline-none`.
5. `Disabled`: `disabled:bg-[#E2E2E3] disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none`.

---

## 4. Leyes de Gestalt & Mobile-First
- **Proximidad**: Tarjetas con espaciado interno estrecho (`p-3` o `p-4`) y márgenes generosos entre bloques (`mb-6`). Etiquetas inmediatamente pegadas a sus inputs.
- **Semejanza**: Tres únicos roles de botón consistentes: Primario (solo 1 por pantalla), Secundario y Destructivo.
- **Continuidad y Cierre**: En carruseles o grillas horizontales, la última tarjeta queda visible al 50% en el margen derecho para inducir el deslizamiento táctil.
- **Ergonomía Táctil**: Altura y áreas de toque mínimas de `h-11` a `h-12` (44px a 48px).
