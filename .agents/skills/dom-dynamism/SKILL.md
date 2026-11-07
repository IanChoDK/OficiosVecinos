---
name: dom-dynamism
description: >-
  Lógica de dinamismo del DOM, gestión de estado reactivo e interacciones para OficiosVecinos.
  Gobierna la conmutación entre las interfaces de Cliente y Prestador, el filtrado dinámico
  por barrio y categoría de oficio, la validación no destructiva de formularios, modales accesibles
  con focus trap, rating de 5 estrellas en 1 toque y persistencia en LocalStorage/IndexedDB.
---

# Skill: Dinamismo DOM & Estado Reactivo (OficiosVecinos)

Esta habilidad rige el comportamiento reactivo de la interfaz, el manejo de eventos y la experiencia fluida de usuario en la aplicación web mobile-first.

---

## 1. Conmutador de Rol (Cliente vs. Prestador)
- Gestiona la transición reactiva entre la vista de **Cliente** (Marta: búsqueda, populares, solicitudes, contacto directo) y la vista de **Prestador** (Carlos: crear servicio, mis oficios, mensajes, suscripción) sin recargas completas de página.

---

## 2. Búsqueda y Filtrado en Tiempo Real
- Filtrado dinámico por **categoría de oficio** (Plomería, Electricidad, Carpintería, etc.).
- Filtrado por **zona/barrio** con actualización inmediata del listado de prestadores.
- Estados visuales obligatorios durante las consultas:
  - Skeleton loaders mientras se cargan los resultados.
  - Estado vacío empático (`EmptyState`) cuando no hay prestadores en la zona seleccionada.

---

## 3. Validación de Formularios No Destructiva
- Validación en tiempo real al perder el foco (`onBlur`).
- **Prohibido resetear campos válidos**: Si un campo falla la validación, se preserva íntegramente la información previamente ingresada por el usuario.
- Retroalimentación inmediata: borde rojo accesible con mensaje explicativo si es erróneo; borde verde con tilde accesible si es válido.
- Precarga automática de datos conocidos (ej. dirección del vecino en confirmación de servicio).

---

## 4. Modales Accesibles y Gestión de Foco
- Al abrir un modal (ej. contacto directo, confirmación o calificación):
  - Atrapamiento obligatorio del foco (`focus trap`) dentro del modal.
  - Al pulsar la tecla `Escape`, el modal se cierra fluidamente.
  - Al cerrarse, el foco regresa al botón o elemento que lo invocó.

---

## 5. Microinteracciones y Calificación
- **Selector de Calificación**: 5 estrellas interactivas de un toque. El guardado se activa con un simple clic, dejando el campo de comentario como opcional.
- **Microinteracciones fluidas**: Animaciones suaves (200-400 ms, `ease-in-out`) en transiciones de modales (`dissolve`), paneles deslizantes (`slide in/out`) y mensajes.
- Respeto estricto a la media query `prefers-reduced-motion`.

---

## 6. Persistencia Ligera y Soporte Offline
- Persistencia del rol seleccionado, preferencias de barrio, estado de solicitudes y borradores en `LocalStorage` o `IndexedDB` para resistir cortes de señal o cierres involuntarios del navegador.
