# Historial de Errores Conocidos y Soluciones - OficiosVecinos

Este documento compila incidentes técnicos, trampas de diseño y sus soluciones definitivas para prevenir regresiones.

---

## Incidente 001: Naming restrictions de npm al inicializar con `create-next-app`
- **Síntoma**: Fallo al ejecutar `npx create-next-app@latest .` debido a mayúsculas en el nombre del directorio (`OficiosVecinos`).
- **Causa**: Las reglas de nomenclatura de paquetes de npm prohíben caracteres en mayúscula.
- **Solución**: Inicializar el proyecto con nombre en minúsculas en `package.json` (`"name": "oficios-vecinos"`), manteniendo los archivos en la raíz del repositorio.

---

## Incidente 002: Contraste insuficiente en colores de éxito y peligro sobre fondo blanco
- **Síntoma**: Los textos en color success (`#00C8FF`) y danger (`#FF0025`) fallan el ratio de contraste mínimo de 4.5:1 exigido por WCAG AA sobre fondos blancos.
- **Causa**: Niveles altos de luminancia que dificultan la lectura en pantallas con brillo solar.
- **Solución**: Se establecieron variantes oscuras de alto contraste (ej. `#006B8A` para success y `#B30018` para danger) dedicadas exclusivamente a textos legibles, reservando los tonos vibrantes originales únicamente para bordes, fondos suaves e iconos decorativos.

---

## Incidente 003: Pérdida de foco y desorientación en modales
- **Síntoma**: Al abrir un modal de contacto o confirmación, el usuario navegando con Tab continúa recorriendo elementos ocultos de la página de fondo.
- **Causa**: Falta de trampa de foco (focus trap) y gestión deficiente del ciclo de vida del modal en React.
- **Solución**: Todo modal debe atrapar el foco en su interior al abrirse, devolver el foco al elemento disparador al cerrarse, y permitir el cierre inmediato presionando la tecla `Escape`.

---

## Incidente 004: Desorientación de adultos mayores ante iconografía abstracta y botones planos
- **Síntoma**: Usuarios como Marta no identifican botones planos (flat design) confundiéndolos con títulos, o se pierden ante íconos aislados (hamburguesas, disquetes o embudos de filtro).
- **Causa**: Brecha entre las convenciones de software contemporáneas y el modelo mental de usuarios con baja adopción tecnológica.
- **Solución**:
  1. Todos los botones deben poseer sombras visibles (`box-shadow`), bordes definidos y cambios de estado táctiles (hundimiento con `scale-95`).
  2. Todo ícono debe ir obligatoriamente acompañado de una etiqueta de texto explícita (ej. "Buscar por zona" en lugar de un ícono de filtro aislado).
