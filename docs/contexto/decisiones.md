# Registro de Decisiones de Arquitectura (ADR) - OficiosVecinos

Este documento registra formalmente las decisiones técnicas, estructurales y de diseño que guían el proyecto **OficiosVecinos**.

---

## ADR-001: Adopción del Sistema Operativo de Ingeniería Gentle-AI
- **Fecha**: 2026-11-07
- **Estado**: Aceptado
- **Contexto**: Se requiere un marco estructurado que garantice velocidad de entrega, accesibilidad y consistencia técnica sin sobreingeniería.
- **Decisión**: Integrar las 6 reglas de Gentle-AI en `.agents/rules/antigravity_rules.md` y centralizar el Master Context en `docs/contexto/`.
- **Consecuencias**: Toda tarea mayor a 2 archivos sigue el ciclo SDD (Explore ➔ Propose ➔ Tasks ➔ Apply ➔ Verify).

---

## ADR-002: Stack Tecnológico: Next.js 16 (Turbopack), React 19 y Tailwind CSS v4
- **Fecha**: 2026-11-07
- **Estado**: Aceptado
- **Contexto**: La aplicación debe ser ultrarrápida, liviana para celulares de gama baja en redes móviles 3G/4G, y de mantenimiento sencillo.
- **Decisión**: Utilizar Next.js 16 con App Router, compilación acelerada por Turbopack, React 19, TypeScript estricto y Tailwind CSS v4 con arquitectura de tokens.
- **Consecuencias**: Cero overhead de librerías CSS pesadas; rendimiento y renderizado óptimo en clientes móviles.

---

## ADR-003: Tokens Semánticos de Color & Accesibilidad WCAG AA
- **Fecha**: 2026-11-07
- **Estado**: Aceptado
- **Contexto**: El público objetivo incluye adultos mayores (ej. Marta, 62 años) y trabajadores en exteriores bajo la luz solar (ej. Carlos, 45 años). Los colores originales de success (`#00C8FF`) y danger (`#FF0025`) no cumplen con el ratio de contraste mínimo 4.5:1 sobre fondos claros.
- **Decisión**:
  - Definir tokens estrictos de Tailwind (`primary`, `primary-dark`, `secondary`, `success`, `danger`, `warning`).
  - Prohibir colores hexadecimales sueltos en el código.
  - Utilizar variantes oscuras de alto contraste para textos de error y éxito sobre fondos claros, reservando los tonos brillantes únicamente para bordes e iconos.

---

## ADR-004: Dualidad de Interfaz (Cliente y Prestador) basada en Card Sorting
- **Fecha**: 2026-11-07
- **Estado**: Aceptado
- **Contexto**: Clientes y prestadores tienen modelos mentales y necesidades operativas marcadamente distintas.
- **Decisión**: Estructurar la aplicación en dos vistas principales con tres secciones idénticas en nomenclatura pero especializadas en contenido:
  - **Página Principal**: Gancho con "Servicios Populares" para clientes; "Crear Servicio" para prestadores.
  - **Servicios**: "Búsqueda" y "Servicios Locales" para clientes; "Mis Servicios" e "Historial" para prestadores.
  - **Mi Perfil**: Solicitudes, Mensajes y Ajuste de texto accesible para clientes; Suscripción y Mensajes para prestadores.

---

## ADR-005: Contratación Directa sin Carrito de Compras
- **Fecha**: 2026-11-07
- **Estado**: Aceptado
- **Contexto**: Marta no utiliza tarjetas de crédito ni entiende flujos de checkout tipo e-commerce; Carlos necesita llamadas o mensajes directos para coordinar y cobrar en efectivo.
- **Decisión**: Eliminar el concepto de carrito de compras. El botón principal es "Contactar" o "Llamar al plomero", facilitando la coordinación barrial directa.

---

## ADR-006: Affordance Físico sobre Flat Design
- **Fecha**: 2026-11-07
- **Estado**: Aceptado
- **Contexto**: El diseño plano confunde a usuarios poco digitalizados, haciendo que botones parezcan texto estático.
- **Decisión**: Todos los controles interactivos deben poseer bordes notorios, sombras (`box-shadow`), cambios de color en hover y efecto de hundimiento en active (`scale-95`). Además, todo ícono debe ir acompañado obligatoriamente de su etiqueta de texto.

---

## ADR-007: Calificación Inmediata de 1 Solo Toque (5 Estrellas)
- **Fecha**: 2026-11-07
- **Estado**: Aceptado
- **Contexto**: Exigir redactar reseñas largas reduce drásticamente la tasa de retroalimentación de los vecinos.
- **Decisión**: La pantalla de calificación permite evaluar con un solo toque sobre 5 estrellas grandes, dejando el campo de texto como totalmente opcional.
