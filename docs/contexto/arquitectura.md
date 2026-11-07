# Arquitectura del Sistema - OficiosVecinos

Este documento define la arquitectura general, estructura de componentes, flujo de datos y arquitectura de información del proyecto **OficiosVecinos**.

---

## 1. Visión General & Propósito
- **Objetivo**: Conectar a los vecinos de cada barrio con profesionales y trabajadores de oficios (plomería, electricidad, carpintería, albañilería, etc.) que operan en su misma zona.
- **Enfoque de Producto**: Aplicación web **Mobile-First**, diseñada para usuarios con baja alfabetización digital (adultos mayores como Marta) y trabajadores independientes con conectividad intermitente (como Carlos).
- **Stack Tecnológico**:
  - **Framework**: Next.js 16 (App Router con Turbopack).
  - **Librería UI**: React 19.
  - **Lenguaje**: TypeScript en modo estricto.
  - **Estilos**: Tailwind CSS v4 con arquitectura de tokens de diseño.
  - **Persistencia en Cliente**: LocalStorage / IndexedDB para soporte offline y tolerancia a pérdidas de señal móvil.

---

## 2. Arquitectura de Información & Sitemap (Resultado Card Sorting)

La plataforma cuenta con dos interfaces adaptadas según el rol del usuario: **Cliente** y **Prestador**. Tras sesiones de Card Sorting abierto y cerrado con usuarios, se establecieron tres secciones principales:

```
[Página Principal]  |  [Servicios]  |  [Mi Perfil]
```

### A. Interfaz Cliente (El Vecino)
1. **Página Principal (Home)**:
   - Gancho inicial con **Servicios Populares** (los oficios más demandados).
   - Acceso rápido y directo al buscador sin requerir registro/login previo.
   - Carrusel de sugerencias de prestadores locales.
2. **Servicios**:
   - **Búsqueda de Servicios**: Filtro por categoría de oficio (plomería, electricidad, gas, pintura, etc.).
   - **Servicios Locales**: Filtro geográfico por barrio y zona de cercanía.
3. **Mi Perfil**:
   - **Solicitudes Pendientes**: Estado de trabajos pedidos en curso.
   - **Mensajes**: Canal de comunicación directo (chat/llamada) con el profesional.
   - **Historial de Servicios**: Registro histórico de trabajos completados.
   - **Ajustes de Accesibilidad**: Switch para conmutar la escala tipográfica a tamaño accesible.

### B. Interfaz Prestador (El Profesional / Oficio)
1. **Página Principal**:
   - Acceso directo a **Crear Servicio** y publicar nuevo oficio.
   - Resumen de solicitudes entrantes y estado de actividad.
2. **Servicios**:
   - **Mis Servicios**: Lista y edición de oficios publicados y zonas cubiertas.
   - **Historial de Servicios**: Trabajos realizados y valoraciones acumuladas.
3. **Mi Perfil**:
   - **Mensajes**: Bandeja de conversaciones con clientes.
   - **Suscripción**: Gestión de plan y visibilidad del perfil profesional.
   - **Datos de Contacto y Zona**: Configuración del radio barrial de atención.

---

## 3. Sistema de Diseño Atómico (Atomic Design)

La interfaz se descompone siguiendo la metodología de Diseño Atómico para asegurar máxima reutilización y consistencia:

- **Átomos**:
  - `Button` (con variantes Primary, Secondary, Danger y los 5 estados interactivos).
  - `Input` (con soporte para estados de error, focus y validación en tiempo real).
  - `Label` (asociado siempre al input con texto explícito).
  - `Icono` (siempre acompañado de su etiqueta de texto).
  - `Avatar` (foto de perfil o iniciales con texto alternativo accesible).
  - `Badge` (indicador de estado: pendiente, en curso, finalizado).
  - `Estrellas` (selector interactivo de calificación 1 a 5 de un solo toque).
  - `ToggleSwitch` (conmutador accesible de tamaño de fuente).
- **Moléculas**:
  - `SearchBar`: Input de texto + Icono de lupa + Etiqueta accesible "Buscar por oficio o barrio".
  - `FormField`: Label + Input + Icono + Mensaje de error/ayuda en lenguaje cotidiano.
  - `CategoryCard`: Icono representativo + Nombre de oficio + Contador de profesionales.
  - `ProfessionalCard`: Avatar + Nombre del prestador + Categoría + Zona/Barrio + Estrellas de reseña + Botón "Contactar".
  - `ServiceRequestCard`: Datos de la solicitud + Estado actual + Fecha + Acciones directas.
- **Organismos**:
  - `Header`: Logotipo + Botón de búsqueda + Acceso a Mi Perfil / Iniciar sesión.
  - `CategoryGallery`: Grilla/carrusel horizontal continuo con corte en el borde para inducir swipe.
  - `ProfessionalList`: Lista vertical de tarjetas de prestadores ordenada por cercanía.
  - `ContactModal` / `RatingModal`: Modales accesibles con trampa de foco y confirmaciones claras.
  - `ChatInterface`: Mensajería directa sin intermediación de carritos de compras complejos.

---

## 4. Flujo de Datos & Persistencia Offline
1. **Acceso sin fricciones**: El cliente puede explorar oficios, categorías y prestadores sin obligatoriedad de autenticación previa.
2. **Persistencia Local**: Preferencias de zona, borradores de solicitudes, mensajes de chat y estado de sesión se almacenan en `LocalStorage` / `IndexedDB`, garantizando que usuarios con conexión intermitente en la vía pública no pierdan datos.
3. **Contratación Directa**: Se descarta el paradigma de "carrito de compras"; la contratación es directa (llamada / mensaje acordado en efectivo), adecuándose al modelo mental de personas no bancarizadas.
