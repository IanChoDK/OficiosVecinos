# Convenciones de Diseño, Código y UX - OficiosVecinos

Este documento establece las pautas obligatorias de diseño visual, accesibilidad (a11y), tokens de Tailwind y estándares de código para **OficiosVecinos**.

---

## 1. Tokens de Color Oficiales (Tailwind CSS)

> **REGLA DE ORO**: Queda estrictamente prohibido utilizar códigos hexadecimales sueltos en los componentes. Toda la aplicación debe emplear únicamente los tokens semánticos definidos:

| Token Semántico | Valor Hex / Base | Uso y Significado |
| :--- | :--- | :--- |
| `primary` | `#1764AE` | Acciones principales ("Solicitar servicio", "Continuar", "Guardar mi oficio"). Azul que transmite confianza y seguridad. |
| `primary-dark` | `#00112B` | Hover de botones primarios, títulos principales y textos de alto contraste. |
| `secondary` / `neutral` | `#E2E2E3` | Acciones secundarias ("Volver", "Quizás más tarde"), fondos de tarjetas y estado deshabilitado. |
| `success` | `#00C8FF` | Bordes e iconos de confirmación ("Solicitud enviada", "Servicio creado"). |
| `success-text` | `#006B8A` *(o variante oscura)* | Texto de éxito con contraste **>= 4.5:1** contra fondos blancos/claros. |
| `danger` | `#FF0025` | Bordes e iconos de error y acciones destructivas ("Eliminar servicio"). |
| `danger-text` | `#B30018` *(o variante oscura)* | Texto de error con contraste **>= 4.5:1** contra fondos blancos/claros. |
| `warning` | `#D97706` *(ámbar accesible)* | Estados intermedios ("Solicitud pendiente", "Suscripción por vencer"). |

---

## 2. Escala Tipográfica & Accesibilidad

- **Fuente para Textos**: `Roboto` (sans-serif), clara, neutral y altamente legible en pantallas pequeñas.
- **Fuente para Títulos**: `Roboto Mono`, otorgando diferenciación visual y carácter técnico barrial.
- **Tamaño Mínimo en Mobile**: `16px` para texto base (interlineado mínimo de 150%).

### Escalas Tipográficas (Conmutables por Toggle de Accesibilidad)
- **Modo Normal**:
  - Título de página: `24px` (`text-2xl font-bold font-mono`)
  - Subtítulos: `18px` (`text-lg font-semibold`)
  - Texto de tarjetas: `16px` (`text-base`)
  - Metadatos y detalles: `12px` (`text-xs text-gray-600`)
- **Modo Accesible (Activado por Marta)**:
  - Título de página: `36px` (`text-4xl font-bold font-mono`)
  - Subtítulos: `24px` (`text-2xl font-semibold`)
  - Texto de tarjetas: `20px` (`text-xl`)
  - Metadatos y detalles: `16px` (`text-base`)

---

## 3. Los 5 Estados Obligatorios de Componentes Interactivos

Todo elemento interactivo (`Button`, `Input`, `Card`, `Selector de Rol`) debe implementar visualmente:

1. **Default**:
   - `bg-primary text-white shadow-md border border-transparent` (en botones primarios).
   - Sombras y bordes definidos para otorgar **Affordance físico** (que parezca botón, nunca plano o confuso).
2. **Hover**:
   - `hover:bg-primary-dark hover:shadow-lg transition-colors duration-200`.
   - Cambio sutil de color o leve elevación al pasar el cursor.
3. **Active**:
   - `active:scale-95 active:shadow-inner active:bg-[#000d20]`.
   - Sensación táctil de "hundirse" físicamente al ser pulsado.
4. **Focus**:
   - `focus:outline-none focus:ring-2 focus:ring-[#1764AE] focus:ring-offset-2`.
   - Borde resaltado nítido para permitir navegación completa por teclado con Tab y Enter.
5. **Disabled**:
   - `disabled:bg-[#E2E2E3] disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none`.
   - Claramente inerte y sin respuestas a eventos.

---

## 4. Leyes de Gestalt y Jerarquía Visual

- **Ley de Proximidad**: Los elementos de un mismo bloque (foto, nombre, oficio y botón de Carlos) deben estar agrupados con espaciado interno estrecho. El botón de acción debe estar indiscutiblemente más cerca de su contenido que de la tarjeta siguiente. Las etiquetas de formularios van pegadas inmediatamente encima de su campo.
- **Ley de Semejanza**: Todo elemento con la misma función se ve igual en toda la app. Solo existen 3 roles de botón: Primario (1 solo por vista), Secundario y Destructivo.
- **Ley de Continuidad y Cierre**: En listas o carruseles horizontales, la última tarjeta debe quedar **cortada a la mitad** en el borde de la pantalla para comunicar que se puede deslizar, eliminando textos redundantes como "ver más".
- **Jerarquía Visual (Tamaño, Color, Espacio)**:
  - Lo más importante es lo más grande y contrasta más.
  - El botón primario es el foco visual principal.
  - El color jamás es el único transmisor de estado: los errores siempre llevan texto explicativo e icono.
- **Patrones de Lectura**:
  - **Patrón en F** en listados (búsqueda, categorías): datos clave alineados a la izquierda y arriba en la tarjeta.
  - **Patrón en Z** en pantallas de acción (Home, perfil, confirmación): arriba-izq logo/título, arriba-der perfil/mensajes, centro contenido contextual, abajo el botón de acción principal.

---

## 5. Principios de UX Writing & Accesibilidad Humana

- **Tono**: Empático, cercano, directo, humilde y sin tecnicismos corporativos.
- **Verbos de Acción Concretos**: En lugar de "Enviar" o "Continuar", usar:
  - *"Llamar al plomero"*
  - *"Ver oficios cercanos"*
  - *"Guardar mi oficio"*
  - *"Contactar a Carlos"*
- **Mensajes de Error Amigables**: En lugar de códigos de error, usar explicaciones cotidianas:
  - *"Tu internet está un poco lento. Volvé a intentarlo en un ratito."*
  - *"El correo necesita un @ para ser válido."*
- **Estados Vacíos Empáticos (Empty States)**:
  - *"Todavía no hay carpinteros en esta zona. ¡Contale a tu carpintero de confianza para que se sume!"*
- **Áreas Táctiles (Touch Targets)**: Mínimo de **44x44px** a **48x48px** con padding suficiente para dedos gruesos o uso en la vía pública.
- **Etiquetado Obligatorio de Iconos**: Todo ícono debe estar acompañado obligatoriamente de texto explícito (evitar metáforas aisladas como disquetes o hamburguesas solas).
