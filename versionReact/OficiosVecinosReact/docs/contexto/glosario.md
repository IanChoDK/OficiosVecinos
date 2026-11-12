# Glosario y Vocabulario de Dominio - OficiosVecinos

> **Lectura rápida**: ~1.5 min. Términos clave, reglas de negocio nucleares y tabla de rotulado natural.

---

## 1. Términos del Dominio

- **Vecino (Cliente)**: Usuario que requiere solucionar un problema barrial en su hogar (arquetipo: **Marta**, 62 años).
- **Prestador / Oficio**: Profesional o técnico independiente de servicios barriales (arquetipo: **Carlos**, 45 años, electricista/plomero).
- **Oficio / Categoría**: Especialidad técnica o manual (Plomería, Electricidad, Gas, Pintura, Albañilería).
- **Servicio Ofrecido**: Ficha barrial publicada por un prestador con su zona, oficio y teléfono.
- **Solicitud de Servicio**: Pedido puntual emitido por un vecino hacia un oficio.
- **Calificación de 1 Toque**: Sistema de reputación barrial mediante 5 estrellas táctiles grandes (texto opcional).
- **Zona / Barrio**: Delimitación comunitaria local para búsqueda por cercanía.

---

## 2. Reglas de Negocio Nucleares

1. **Exploración Libre**: Se puede buscar y ver profesionales sin iniciar sesión obligatoriamente.
2. **Pago Directo en Efectivo**: Sin intermediación bancaria, comisiones ni pasarelas obligatorias.
3. **Contacto Inmediato**: Botón gigante para llamar o enviar mensaje directo.
4. **Cero Íconos Huérfanos**: Todo ícono debe acompañarse obligatoriamente de texto visible.
5. **No Forzar Texto en Calificaciones**: Calificar solo requiere tocar una de las 5 estrellas.

---

## 3. Tabla de Rotulado: Lenguaje Natural vs Dev Jargon

| Dev Jargon (A Evitar) | Labeling en Lenguaje Natural (Para el Vecino) | Contexto de Aplicación |
| :--- | :--- | :--- |
| `Auth / Sign In` | **"Entrar a mi cuenta"** | Cabecera / Acceso |
| `Sign Up / Register` | **"Crear mi cuenta"** | Registro de vecinos y oficios |
| `Submit / Post / Save` | **"Guardar mi oficio"** / **"Solicitar servicio"** | Botones de formulario |
| `Filter / Query by Geolocation` | **"Buscar por barrio"** | Búsqueda y selector de zona |
| `Call to Action / CTA Contact` | **"Llamar al plomero"** / **"Mandar mensaje"** | Tarjeta de prestador |
| `Empty State (null / 0 items)` | **"Todavía no hay carpinteros en esta zona. ¡Avisale a tu carpintero de confianza!"** | Listados sin resultados |
| `Error 504 / Network Exception` | **"Tu internet está un poco lento. Volvé a intentarlo en un ratito."** | Falla de conexión o datos |
| `Success 200 OK` | **"¡Listo! Tu solicitud fue enviada"** | Modales de confirmación |
| `Review Form / Textarea` | **"Toca las estrellas para calificar (Escribir es opcional)"** | Calificación de trabajo |
| `Cancel / Abort` | **"Volver atrás"** / **"Quizás más tarde"** | Acciones secundarias |
