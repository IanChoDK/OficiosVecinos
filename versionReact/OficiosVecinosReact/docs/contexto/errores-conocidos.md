# Errores Conocidos, Gotchas y Soluciones - OficiosVecinos

> **Lectura rápida**: ~1.5 min. Gotchas de usabilidad, contraste, foco y responsive móvil.

---

## 1. Soluciones de Contraste en Modo Claro (WCAG AA)
- **Problema**: Los colores `#00C8FF` (success) y `#FF0025` (danger) no alcanzan el ratio 4.5:1 para texto sobre fondo blanco o neutral `#E2E2E3`.
- **Solución Obligatoria**:
  - Reservar `#00C8FF` y `#FF0025` únicamente para bordes decorativos e iconografía.
  - Usar para textos las variables de alto contraste:
    - **Éxito**: `success-text: #006B8A` (ratio > 4.5:1).
    - **Error**: `danger-text: #990014` (ratio > 4.5:1).
  - Nunca comunicar un error solo con color: acompañar siempre de ícono + texto.

---

## 2. Gotchas de Usabilidad con Adultos Mayores
- **Íconos abstractos solitarios**: Usuarios mayores (arquetipo Marta) no reconocen hamburguesas, filtros o engranajes sin texto.
  - **Solución**: Regla de cero íconos huérfanos. Todo ícono debe llevar etiqueta visible (*"Buscar por barrio"*, *"Menú"*).
- **Abandono por pasarelas digitales**: Los vecinos desconfían de cargar tarjetas de crédito o registrarse antes de ver oficios.
  - **Solución**: Exploración libre sin login forzado y pago acordado en efectivo.

---

## 3. Problemas de Foco en Teclado
- **Foco invisible o perdido**: Enlaces o botones sin outline accesible impiden la navegación por teclado.
  - **Solución**: Ring de foco obligatorio y visible: **2px en `#1764AE`** con offset de 2px.
- **Escape de foco en modales**: Al abrir un modal, el foco no debe perderse en el fondo de la página.
  - **Solución**: Implementar **Focus Trap** nativo y cierre inmediato al presionar la tecla `Esc`.

---

## 4. Ajustes de Responsive Móvil
- **Pulsaciones accidentales (Fat Finger)**: Botones pequeños o tarjetas muy juntas provocan toques involuntarios.
  - **Solución**: Targets táctiles mínimos de **48x48px** (mínimo absoluto 44x44px) y espaciado generoso entre tarjetas.
- **Corte de continuidad intencional**: No ajustar grillas para que entren exactas si hay más contenido.
  - **Solución**: Dejar la última tarjeta cortada al 50% en el lateral derecho para inducir el deslizamiento horizontal natural sin necesidad de textos "ver más".

---

## 5. Entorno Windows y Scripts PowerShell
- **Problema**: Bloqueo de scripts de npm/vite por política `Restricted`.
- **Solución**: Habilitar `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`.
