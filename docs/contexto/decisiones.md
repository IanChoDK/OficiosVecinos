# Registro de Decisiones de Arquitectura (ADR) - OficiosVecinos

Registro cronológico estricto de decisiones técnicas y acuerdos de diseño del proyecto.

> **REGLA DE GUARDIA Y CONTROL**:
> Si una instrucción implica un cambio importante o estructural (arquitectura fundamental, paleta semántica, cambio de framework o borrado de archivos), **el agente DEBE pedir autorización explícita antes de ejecutarlo**. Una vez aprobado y ejecutado, debe registrarse inmediatamente aquí.

---

### [ADR-001] · [2026-11-07 00:05] — Adopción de Gentle-AI y Master Context
- **Contexto**: Necesidad de un marco ágil que garantice accesibilidad y consistencia técnica.
- **Decisión**: Integrar las 6 reglas de Gentle-AI (`.agents/rules/antigravity_rules.md`) y centralizar el contexto en `docs/contexto/`.

### [ADR-002] · [2026-11-07 00:05] — Stack Tecnológico: Next.js 16, React 19 y Tailwind CSS v4
- **Contexto**: Crear una app mobile-first ultraliviana para smartphones de gama baja.
- **Decisión**: Utilizar Next.js 16 con App Router (SPA reactiva), Turbopack, TypeScript y Tailwind CSS v4.

### [ADR-003] · [2026-11-07 00:30] — Paleta Semántica y Contraste WCAG AA en Modo Claro
- **Contexto**: El éxito `#00C8FF` y el peligro `#FF0025` no alcanzan el ratio 4.5:1 sobre blanco.
- **Decisión**: Crear tokens semánticos y variantes oscuras (`success-text` `#006B8A`, `danger-text` `#B30018`) para textos legibles, reservando los tonos vibrantes para bordes e iconos. Prohibir colores hex sueltos.

### [ADR-004] · [2026-11-07 00:30] — Arquitectura de Información Dual por Card Sorting
- **Contexto**: Modelos mentales divergentes entre el vecino que busca y el técnico que ofrece.
- **Decisión**: Estructurar dos interfaces especializadas (Cliente y Prestador) sobre 3 secciones compartidas: `Página Principal`, `Servicios` y `Mi Perfil`.

### [ADR-005] · [2026-11-07 00:30] — Mapeo Atómico con Frames de Stitch
- **Contexto**: La especificación gráfica y flujos residen en los wireframes de Stitch.
- **Decisión**: Construir la UI siguiendo Diseño Atómico (Átomos, Moléculas, Organismos) desacoplados, listos para conectarse a las pantallas de Stitch.

### [ADR-006] · [2026-11-07 00:30] — Contratación Directa Barrial vs. Carrito de Compras
- **Contexto**: Usuarios adultos mayores no bancarizados (Marta) y cobro en efectivo.
- **Decisión**: Descartar checkout y carritos de e-commerce; el botón principal es "Contactar" (llamada o chat directo).

### [ADR-007] · [2026-11-07 00:30] — Calificación Inmediata en 1 Toque (5 Estrellas)
- **Contexto**: Las reseñas extensas obligatorias reducen la participación de los vecinos.
- **Decisión**: El flujo de calificación permite valorar con un solo toque sobre 5 estrellas grandes, dejando la redacción de texto como opcional.

### [ADR-008] · [2026-11-07 00:38] — Protocolo de Salvaguarda: Autorización Obligatoria Previa
- **Contexto**: Evitar regresiones no pactadas en la arquitectura o diseño del producto.
- **Decisión**: Todo cambio estructural (paleta, framework, eliminación de archivos o arquitectura) exige confirmación explícita previa del usuario antes de ser aplicado y registrado.

### [ADR-009] · [2026-11-07 00:46] — Importación de la Biblioteca Global de Skills
- **Contexto**: Disponer de un catálogo amplio de habilidades y patrones para consultar bajo demanda sin sobrecargar el contexto activo.
- **Decisión**: Importar el repositorio `sickn33/agentic-awesome-skills` dentro de `.agents/skills/agentic-awesome-skills/`, manteniendo las 8 skills curadas del proyecto en la raíz de `.agents/skills/`.

### [ADR-010] · [2026-11-07 00:52] — Auditoría y Poda Inteligente de Skills
- **Contexto**: Eliminar la sobrecarga cognitiva y técnica de 2.800+ skills incompatibles o superfluas (backends, Docker, móviles nativos, frameworks no autorizados).
- **Decisión**: Podar la biblioteca externa conservando únicamente 8 habilidades hiperespecializadas alineadas con el stack (HTML5/Tailwind), accesibilidad WCAG AA, dinamismo DOM y metodología SDD.

### [ADR-011] · [2026-11-07 01:16] — Reconfiguración a SPA Estricta y Persistencia en LocalStorage
- **Contexto**: Solicitud de operar como un frontend 100% cliente sin backend ni dependencias de servidor Node.
- **Decisión**: Configurar `output: 'export'` e `images: { unoptimized: true }` en `next.config.ts`. Centralizar la persistencia y sesiones simuladas en `LocalStorage` con datos de `mockData.json` y sincronización reactiva con `useSyncExternalStore`.



