# Flujo de Trabajo, Metodología DCU y SDD - OficiosVecinos

Este documento rige la metodología de desarrollo, diseño centrado en el usuario (DCU) y control de calidad bajo **Gentle-AI**.

---

## 1. Las 4 Fases del Diseño Centrado en el Usuario (DCU)

1. **Entender el Contexto de Uso (Investigación)**:
   - Reconocer la dependencia del boca a boca y carteles barriales.
   - Considerar la baja conectividad en zonas periféricas y la poca familiaridad con pagos digitales o tarjetas.
2. **Especificar Requisitos (Definición)**:
   - Formularios cortos con autocompletado nativo y validación en tiempo real al salir de cada campo (`blur`).
   - Alto contraste perceptible bajo la luz directa del sol.
   - Aplicación liviana y rápida para no agotar paquetes de datos móviles reducidos.
3. **Producir Soluciones de Diseño (Implementación)**:
   - Reemplazo de paneles complejos por botones grandes y literales.
   - Para el prestador: accesos directos a "Ofrecer nuevo servicio" y "Mis servicios".
   - Para el vecino: botones directos como "Buscar servicio" y "Servicios más populares".
4. **Evaluar (Validación Continua)**:
   - Someter cada pantalla a pruebas de usabilidad con usuarios representativos (ej. adultos mayores). Si un ícono confunde, reemplazarlo inmediatamente por texto directo (ej. cambiar ícono de filtro por "Buscar por zona").

---

## 2. Mapa del Viaje del Usuario (User Journey Map - Caso Marta)

| Etapa | 1. Descubrimiento | 2. Búsqueda / Selección | 3. Coordinación | 4. Cierre / Calificación |
| :--- | :--- | :--- | :--- | :--- |
| **Acción** | Ve rotura de caño. Abre la app. | Entra a "Plomería", ve a Carlos cerca con buenas reseñas. | Habla por chat/llamada con Carlos, acuerdan horario. | Trabajo terminado. Califica con 5 estrellas en 1 toque. |
| **Punto de Contacto** | Pantalla de inicio mobile. | Lista de oficios filtrada. | Mensajes desde la app / Llamada directa. | Pantalla de calificación rápida. |
| **Pauta Dev / UX** | Botón grande "Buscar servicios" sin login previo. | Botón grande "Contactar". Cero carritos o pedidos de tarjeta. | Botón para enviar link de calificación tras el trabajo. | Calificación en 1 solo toque; texto opcional. |

---

## 3. Protocolos de Desarrollo: Fast-Path vs. Ciclo SDD

### Fast-Path (Fixes o ajustes de 1 solo archivo)
- Aplica a: corrección de erratas, microajustes de Tailwind, cambios de color a tokens o pequeños parches de accesibilidad.
- Proceso: Identificación directa ➔ corrección ➔ verificación de compilación y linting.

### Ciclo SDD (Spec-Driven Development para > 2 archivos o nuevas features)
1. **Explore**:
   - Lectura de `docs/contexto/` (`mem_context`) para respetar reglas de diseño y decisiones tomadas.
   - Análisis de componentes atómicos existentes y archivos afectados.
2. **Propose**:
   - Justificar el *Why* (impacto en Marta o Carlos) antes del *How* (solución técnica).
   - Definir contratos de datos, estados visuales y rutas de navegación.
3. **Tasks**:
   - Plan secuencial de tareas atómicas y medibles.
4. **Apply**:
   - Desarrollo respetando el Diseño Atómico y los **5 estados interactivos** en todo componente.
   - Garantizar etiquetas de texto en cada ícono y touch targets >= 44x44px.
5. **Verify**:
   - Cumplimiento estricto de la Definition of Done (DoD).

---

## 4. Los 4 Estados UI Obligatorios de Pantalla

Toda vista o contenedor de datos debe contemplar visualmente:
- ⏳ **Loading**: Skeleton loaders claros en listas o spinners en botones para evitar pulsaciones duplicadas.
- 📭 **Empty**: Estados vacíos empáticos ("Todavía no hay carpinteros en esta zona...").
- ❌ **Error**: Mensaje en lenguaje cotidiano con sugerencia de solución y botón de reintento.
- ✅ **Success**: Despliegue nítido con retroalimentación inmediata.

---

## 5. Definition of Done (DoD) Específica
Para considerar completada cualquier tarea:
1. **Accesibilidad (a11y)**:
   - Contraste WCAG AA (>= 4.5:1 para texto regular).
   - Navegable 100% con Tab y Enter sin mouse (anillo de foco visible de 2px en `#1764AE`).
   - Modales con trampa de foco y cierre con `Esc`.
   - Touch targets de al menos 44x44px (ideal 48x48px).
   - Todo ícono acompañado de etiqueta de texto.
2. **Calidad Técnica**:
   - TypeScript estricto sin `any`.
   - `npm run build` y `npm run lint` limpios y sin advertencias.
   - Ausencia de console.log de depuración.
3. **Sincronización Engram**:
   - Actualización de decisiones en `docs/contexto/decisiones.md` (`mem_save`).
   - Resumen de sesión documentado (`mem_session_summary`).
