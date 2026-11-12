# Registro de Decisiones de Arquitectura (ADR) - OficiosVecinos

> **Lectura rápida**: ~2 min. Registro cronológico estricto `[ADR-XXX] · [YYYY-MM-DD HH:mm]`.

> [!CAUTION]
> **Regla de Gobernanza**: Cualquier cambio importante o estructural (arquitectura, paleta semántica, cambio de framework o borrado de archivos) **REQUIERE solicitar autorización explícita al usuario** antes de aplicarlo, y debe registrarse formalmente aquí con su fecha y hora tras ser aprobado.

---

### [ADR-001] · [2026-11-10 19:23] - Adopción del OS Gentle-AI y SDD Adaptativo
- **Decisión**: Adoptar el Sistema Operativo Gentle-AI con sus 6 reglas incondicionales (`always_on`), centralización en `docs/contexto/` y desarrollo guiado por especificaciones (Fast-Path vs SDD).
- **Consecuencia**: Estandarización de calidad Senior Product Engineer y cero dispersión documental.

### [ADR-002] · [2026-11-10 19:25] - Arquitectura SPA Mobile-First y Persistencia Local-First
- **Decisión**: Implementar una SPA ligera en Vite + TypeScript con almacenamiento en **IndexedDB** (datos de catálogo y solicitudes) y **LocalStorage** (preferencias de interfaz).
- **Consecuencia**: Alta velocidad en redes móviles de barrios periféricos y soporte offline ante baja conectividad.

### [ADR-003] · [2026-11-10 19:28] - Tokens Semánticos Tailwind y Ajustes de Contraste WCAG AA
- **Decisión**: Centralizar la paleta en tokens de Tailwind (`primary: #1764AE`, `primary-dark: #00112B`, `secondary: #E2E2E3`). Dado que `success: #00C8FF` y `danger: #FF0025` no alcanzan ratio de 4.5:1 en texto blanco, se crean las variantes de alto contraste `success-text: #006B8A` y `danger-text: #990014` para textos informativos.
- **Consecuencia**: Legibilidad plena bajo el sol y cumplimiento riguroso de WCAG AA. Prohibidos los colores hex sueltos.

### [ADR-004] · [2026-11-10 19:30] - Erradicación de Flat Design y Regla de Iconografía Obligatoria con Texto
- **Decisión**: Dotar a los controles de affordance física (sombras, bordes, compresión `scale-95`). Prohibir terminantemente íconos abstractos solitarios: **todo ícono debe llevar etiqueta textual**.
- **Consecuencia**: Evita confusiones en personas de la tercera edad o con baja alfabetización digital (arquetipo Marta).

### [ADR-005] · [2026-11-10 19:33] - Dualidad de Interfaces por Rol (Card Sorting)
- **Decisión**: Dividir la aplicación en 3 secciones acordadas por Card Sorting (*Página Principal*, *Servicios*, *Mi Perfil*) adaptando contenidos según el rol activo (Vecino vs Prestador).
- **Consecuencia**: Pantallas libres de opciones innecesarias; flujo enfocado para Marta (buscar y pedir) y Carlos (publicar y gestionar).

### [ADR-006] · [2026-11-10 19:36] - Escala Tipográfica Dual con Switch en Perfil
- **Decisión**: Utilizar Roboto (cuerpo) y Roboto Mono (títulos) con interlineado del 150%, sumando un toggle en el perfil para duplicar la jerarquía visual (*Escala Accesible* persistida en LocalStorage).
- **Consecuencia**: Adaptabilidad ergonómica inmediata para vecinos con visión disminuida.

### [ADR-007] · [2026-11-10 19:39] - Contacto Directo, Efectivo y Sin Login Forzado
- **Decisión**: Navegación y consulta de prestadores 100% libre sin registro previo obligatorio. Eliminación de pasarelas de pago bancarias complejas en favor del pago directo en efectivo y llamada telefónica directa.
- **Consecuencia**: Tasa mínima de abandono y máxima confianza barrial.

### [ADR-008] · [2026-11-10 19:42] - Calificación de 1 Solo Toque con 5 Estrellas Grandes
- **Decisión**: Pantalla de valoración dominada por 5 estrellas táctiles grandes (mínimo 48px). La puntuación se registra al tocar la estrella; la reseña escrita es opcional.
- **Consecuencia**: Facilidad extrema de reputación comunitaria para adultos mayores.

### [ADR-009] · [2026-11-10 19:46] - Preparación para Integración de Wireframes de Stitch
- **Decisión**: Dejar la arquitectura de componentes lista para mapear 1:1 los Frames de Stitch cuando el usuario los suministre, conectándolos a las rutas del Router SPA y a la persistencia local.
- **Consecuencia**: Cero fricción al momento de importar los diseños definitivos.

### [ADR-010] · [2026-11-10 19:58] - Auditoría y Poda Inteligente de Skills
- **Decisión**: Conservar exclusivamente 34 skills esenciales alineadas con el stack activo (TailwindCSS, HTML5/DOM, WCAG AA, Mobile-First, Diseño Atómico y SDD), podando 2.827 skills superfluas (backend pesado, DB, frameworks ajenos y mobile nativo).
- **Consecuencia**: Directorio `.agents/skills/` limpio, 100% contextualizado y con descubrimiento nativo inmediato para Antigravity sin sobrecarga.

### [ADR-011] · [2026-11-10 20:25] - Ingesta Visual de Stitch y Maquetación SPA Viva (Zero Waste)
- **Decisión**: Implementar la SPA móvil viva en `index.html`, `style.css` y `app.js` basada directamente en los 59 assets de Stitch. Integrar 8 vistas con router hash, 5 estados en cada componente interactivo, scale-95 físico, modales con focus trap, chat reactivo con presupuesto, calificación de 5 estrellas de 1 toque y conmutador dinámico de texto accesible.
- **Consecuencia**: Software vivo funcional de alta fidelidad, ejecutable al instante sin dependencias pesadas ni compilación.

### [ADR-012] · [2026-11-10 21:00] - Adaptación Territorial a Río Cuarto y Cierre de Vistas de Stitch
- **Decisión**: 
  1. Reemplazar toda mención geográfica de Buenos Aires/CABA por Río Cuarto, Córdoba (Barrios: Centro, Banda Norte, Alberdi, Castelli, Las Ferias, Bimaco; Entidades: Ecogas, EMOS, ERSeP; Calles: Sobremonte, Marcelo T. de Alvear, Av. Sabattini, La Rioja; Código telefónico: 358).
  2. Expandir el Router SPA a 13 vistas activas para cubrir el 100% de los flujos de Stitch: Gestión de Suscripción PRO (`#prestador-suscripcion`), Formulario de creación de servicio (`#prestador-crear-servicio`), Grilla de 2 columnas de servicios publicados (`#prestador-servicios`), Detalle de solicitud/servicio coordinado (`#detalle-solicitud`) y Edición de datos personales (`#mis-datos`).
- **Consecuencia**: Alineación territorial estricta con el mercado real de Río Cuarto y completitud total de las pantallas de Stitch para roles Vecino y Prestador.

