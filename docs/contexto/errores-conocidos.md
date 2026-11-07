# Historial de Errores Conocidos y Soluciones - OficiosVecinos

Este documento sirve como bitácora de resolución de problemas para evitar la repetición de errores.

---

## Incidente 001: Naming restrictions de npm al inicializar con `create-next-app`
- **Síntoma**: Fallo al ejecutar `npx create-next-app@latest .` debido a caracteres en mayúscula en el nombre del directorio (`OficiosVecinos`).
- **Causa**: Las reglas de nomenclatura de paquetes de npm prohíben nombres con letras mayúsculas.
- **Solución**: Inicializar el proyecto con nombre en minúsculas en `package.json` (`oficios-vecinos`), ubicando todos los archivos correspondientes en la raíz del repositorio.
