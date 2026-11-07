# Arquitectura del Sistema - OficiosVecinos

Este documento describe la arquitectura global, patrones de diseño y flujo de datos de la aplicación **OficiosVecinos**.

---

## 1. Visión General
- **Plataforma**: Aplicación web frontend (SPA / SSR) orientada a la conexión ágil de oficios y servicios comunitarios entre vecinos.
- **Tecnologías Base**:
  - **Framework**: Next.js (App Router con Turbopack) / React 19.
  - **Lenguaje**: TypeScript en modo estricto.
  - **Estilos**: Tailwind CSS v4 para diseño responsive y diseño de estados de componentes.
  - **Almacenamiento Local**: LocalStorage / IndexedDB para persistencia en cliente y soporte offline.

---

## 2. Estructura de Directorios
```
OficiosVecinos/
├── .agents/
│   └── rules/
│       └── antigravity_rules.md      # Reglas globales de ingeniería (Gentle-AI)
├── docs/
│   └── contexto/                     # Master Context (Documentos Vivos)
│       ├── arquitectura.md
│       ├── convenciones.md
│       ├── decisiones.md
│       ├── errores-conocidos.md
│       ├── flujo-de-trabajo.md
│       └── glosario.md
├── src/
│   └── app/                          # App Router (páginas, layouts, rutas)
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
├── public/                           # Assets estáticos
├── package.json
└── tsconfig.json
```

---

## 3. Patrones de Diseño & Componentes
- **Componentes modulares y reutilizables**: Cada componente interactivo debe implementar los 5 estados obligatorios (`Default`, `Hover`, `Active`, `Focus`, `Disabled`).
- **Accesibilidad**: Cumplimiento WCAG AA (ratio mínimo 4.5:1 de contraste) y HTML5 semántico.
