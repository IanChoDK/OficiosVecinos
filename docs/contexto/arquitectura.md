# Arquitectura del Sistema - OficiosVecinos

Documento de referencia técnica sobre la estructura, stack y arquitectura de información de **OficiosVecinos**.

---

## 1. Stack Tecnológico Base
- **Frontend & Marcado**: HTML5 semántico (`<header>`, `<nav>`, `<main>`, `<section>`, `<button>`, `<form>`).
- **Estilos & Diseño**: Tailwind CSS v4 con arquitectura de tokens de diseño semánticos.
- **Framework & Reactividad**: Next.js 16 (App Router con Turbopack) / React 19 en modo TypeScript estricto.
- **Persistencia en Cliente**: `LocalStorage` / `IndexedDB` para tolerancia a cortes de red y soporte offline en la vía pública.

---

## 2. Router SPA & Conmutación de Vistas
- **Experiencia SPA Fluida**: Navegación reactiva en cliente sin recargas completas de pantalla.
- **Dualidad de Roles (Cliente vs. Prestador)**:
  - **Cliente (Marta)**: Orientado al descubrimiento inmediato, búsqueda por rubro/zona y contacto directo sin login obligatorio.
  - **Prestador (Carlos)**: Orientado a la gestión rápida de oficios ("Crear servicio", "Mis servicios", mensajes y suscripción).
- **Estructura de 3 Secciones por Card Sorting**:
  1. `Página Principal`: Gancho con *Servicios Populares* (Cliente) / *Crear Servicio* (Prestador).
  2. `Servicios`: *Búsqueda* y *Servicios Locales* (Cliente) / *Mis Servicios* e *Historial* (Prestador).
  3. `Mi Perfil`: *Solicitudes*, *Mensajes* y *Texto Accesible* (Cliente) / *Mensajes* y *Suscripción* (Prestador).

---

## 3. Relación con Frames de Stitch (Conexión Futura)
- **Mapeo Directo**: La interfaz frontend traduce fielmente los wireframes y pantallas definidos en la carpeta `docs/Archivos de contexto/stitch_oficios_vecinos_app`.
- **Estructura Atómica de Componentes**:
  - **Átomos**: `Button`, `Input`, `Label`, `Icono`, `Avatar`, `Badge`, `Estrellas`, `ToggleSwitch`.
  - **Moléculas**: `SearchBar`, `FormField`, `CategoryCard`, `ProfessionalCard`, `ServiceRequestCard`.
  - **Organismos**: `Header`, `CategoryGallery`, `ProfessionalList`, `ContactModal`, `RatingModal`, `ChatInterface`.
- **Acoplamiento Progresivo**: Los componentes se desarrollarán desacoplados y reutilizables, listos para conectarse a las pantallas de Stitch una vez que se analicen formalmente.
