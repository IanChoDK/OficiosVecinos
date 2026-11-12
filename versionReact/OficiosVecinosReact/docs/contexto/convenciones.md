# Convenciones de Diseño, UI/UX y Código - OficiosVecinos

> **Lectura rápida**: ~2 min. Tokens, escala modular, 5 estados, Gestalt y WCAG AA.

---

## 1. Sistema de Colores Semánticos (Tokens Tailwind)

| Token | Hex | Uso Semántico | Regla WCAG AA |
| :--- | :--- | :--- | :--- |
| `primary` | `#1764AE` | Botón principal, enlaces clave, foco. Transmite confianza. | Contraste > 4.5:1 con blanco. |
| `primary-dark` | `#00112B` | Hover de botones primarios y textos principales. | Contraste máximo bajo luz solar. |
| `secondary` / `neutral`| `#E2E2E3` | Fondos de cards, bordes, botones secundarios y disabled. | Fondo neutro descansado. |
| `success` | `#00C8FF` | Acentos, bordes e iconos de confirmación. | **Solo bordes/iconos**. |
| `success-text` | `#006B8A` | Textos de confirmación ("Solicitud enviada"). | Ratio > 4.5:1 sobre blanco. |
| `danger` | `#FF0025` | Acentos, bordes e iconos de error y alertas destructivas. | **Solo bordes/iconos**. |
| `danger-text` | `#990014` | Textos de error ("Falta el número de teléfono"). | Ratio > 4.5:1 sobre blanco. |
| `warning` | `#D97706` | Estados intermedios ("Solicitud pendiente"). | Ratio > 4.5:1 sobre blanco. |

> [!IMPORTANT]
> **Prohibido usar colores hex sueltos**. Todo estilo debe usar los tokens declarados.

---

## 2. Escala Tipográfica Modular (Normal vs Accesible)
- **Fuentes**: **Roboto** (cuerpo, `leading-relaxed` / 150%) y **Roboto Mono** (títulos).
- **Conmutador**: Toggle en perfil activa la *Escala Accesible* para adultos mayores.

| Jerarquía | Escala Normal | Escala Accesible (Toggle ON) |
| :--- | :--- | :--- |
| **H1 (Título de Página)** | 24px (`text-2xl font-bold font-mono`) | 36px (`text-4xl font-bold font-mono`) |
| **H2 (Subtítulo/Sección)**| 18px (`text-lg font-semibold font-mono`) | 24px (`text-2xl font-semibold font-mono`) |
| **Cuerpo / Cards** | 16px (`text-base font-normal font-sans`) | 20px (`text-xl font-normal font-sans`) |
| **Metadatos y Detalles** | 12px (`text-xs font-medium font-sans`) | 16px (`text-base font-medium font-sans`) |

---

## 3. Los 5 Estados de Componentes & Affordance Física
Cero *Flat Design*: todo elemento interactivo debe sentirse físico mediante relieve y sombras:

1. **Default**: Sombra visible (`shadow-md`), bordes definidos.
2. **Hover**: Oscurecimiento claro (`#00112B`) o leve elevación (`-translate-y-0.5`).
3. **Active (Clic)**: Efecto físico de compresión con `scale-95` y sombra reducida (`shadow-inner`).
4. **Focus / Focus-visible**: Borde/ring resaltado de **2px en `#1764AE`** con offset de 2px.
5. **Disabled**: Fondo `#E2E2E3`, texto apagado, cursor `not-allowed`, eventos bloqueados.

---

## 4. Espaciado y Leyes de Gestalt
- **Proximidad**: Etiquetas pegadas a sus inputs. El botón de contacto de una tarjeta está notablemente más cerca de los datos de su prestador que de la tarjeta siguiente.
- **Semejanza (3 roles de botón)**: Primario (1 por vista, azul), Secundario (gris neutro), Destructivo (rojo oscuro).
- **Continuidad y Cierre**: En carruseles o listas horizontales, **la última tarjeta queda cortada a la mitad** en el borde de pantalla para inducir el deslizamiento natural.
- **Patrones de Lectura**: Patrón F para listas y búsquedas; Patrón Z para pantallas principales de acción.

---

## 5. Reglas WCAG AA
- **Contraste mínimo**: 4.5:1 para texto normal, 3:1 para gráficos y texto grande.
- **Operabilidad 100% Teclado**: Todo accesible con `Tab` y `Enter`. Modales atrapan el foco y se cierran con `Esc`.
- **Target Táctil Mínimo**: Botones y áreas de clic de al menos **48x48px** (mínimo absoluto 44x44px).
- **Cero Íconos Huérfanos**: **Todo ícono debe ir obligatoriamente acompañado de texto visible**.
- **Formularios Comprensibles**: Labels siempre visibles encima del input, autocompletado nativo y validación `onBlur`.
