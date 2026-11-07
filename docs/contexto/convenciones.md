# Convenciones de Código y Estándares - OficiosVecinos

Este documento establece las pautas de estilo, nomenclatura y convenciones técnicas para el proyecto.

---

## 1. Nomenclatura
- **Componentes**: PascalCase (ej: `UserProfileCard.tsx`, `JobOfferList.tsx`).
- **Hooks**: camelCase con prefijo `use` (ej: `useLocalStorage.ts`, `useNeighborhoodServices.ts`).
- **Utilidades & Helpers**: camelCase (ej: `formatCurrency.ts`, `dateUtils.ts`).
- **Estilos / Clases Tailwind**: Agrupación lógica (layout -> espaciado -> tipografía -> colores -> estados interactivos).

---

## 2. Tipado TypeScript
- Modo estricto obligatorio.
- Prohibido el uso de `any` injustificado; usar tipos genéricos o interfaces descriptivas.
- Props de componentes tipadas explícitamente mediante `interface` o `type`.

---

## 3. Estados de Componentes (Gentle-AI)
Todo elemento interactivo debe incluir estilos para los 5 estados:
```tsx
// Ejemplo de botón siguiendo los 5 estados
<button
  className="
    bg-blue-600 text-white font-medium py-2 px-4 rounded-lg
    hover:bg-blue-700
    active:bg-blue-800
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed
  "
>
  Solicitar Oficio
</button>
```

---

## 4. Git & Commits
- Convención de Conventional Commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
