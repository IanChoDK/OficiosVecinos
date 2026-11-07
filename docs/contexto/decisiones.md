# Registro de Decisiones de Arquitectura (ADR) - OficiosVecinos

Este documento registra las decisiones arquitectónicas clave del proyecto, su contexto y justificación técnica.

---

## ADR-001: Adopción del Sistema Operativo de Ingeniería Gentle-AI
- **Fecha**: 2026-11-07
- **Estado**: Aceptado
- **Contexto**: Se requiere un marco estructurado de trabajo para garantizar velocidad de entrega, accesibilidad y consistencia técnica sin sobreingeniería.
- **Decisión**: Adoptar las 6 reglas de ingeniería de Gentle-AI centralizadas en `.agents/rules/antigravity_rules.md` y el Master Context en `docs/contexto/`.
- **Consecuencias**:
  - Toda tarea mayor a 2 archivos sigue el ciclo SDD (Explore, Propose, Tasks, Apply, Verify).
  - Los componentes interactivos deben cubrir los 5 estados obligatorios.

---

## ADR-002: Elección de Next.js con App Router y Tailwind CSS
- **Fecha**: 2026-11-07
- **Estado**: Aceptado
- **Contexto**: Se necesita una base frontend moderna, rápida y escalable para OficiosVecinos.
- **Decisión**: Utilizar Next.js 16 con React 19, TypeScript y Tailwind CSS v4 con Turbopack.
- **Consecuencias**:
  - Compilación rápida mediante Turbopack.
  - Soporte integrado de optimizaciones de imagen, fuentes y renderizado híbrido.
