# Glosario del Dominio - OficiosVecinos

Este documento compila el lenguaje ubicuo y los conceptos clave del proyecto **OficiosVecinos** (desarrollado por Chena Martin, Ibañez Ian, Pereyra Franco y Scheurer Roy).

---

## 1. Arquetipos de Usuario (User Personas)

### Marta (El Vecino - Cliente)
- **Perfil**: 62 años, jubilada, reside en un barrio periférico.
- **Dispositivo**: Celular de gama baja, uso principal mediante WhatsApp. No opera con tarjetas de crédito.
- **Dolor**: Necesita reparaciones urgentes (ej. plomería), teme ingresar personas desconocidas a su hogar y le abruman las aplicaciones con muchos pasos o cobros por adelantado.
- **Objetivo**: Conectar con un técnico confiable y cercano en su propio barrio, coordinar el horario y pagar en efectivo.

### Carlos (El Profesional - Oficio)
- **Perfil**: 45 años, electricista y plomero independiente.
- **Dispositivo**: Trabaja en exteriores, conectividad móvil intermitente, manipula el celular con las manos sucias o apurado.
- **Dolor**: Excelente mano de obra pero le cuesta publicitarse en redes sociales o manejar software complejo.
- **Objetivo**: Que los vecinos de su zona lo ubiquen fácilmente y lo llamen con un solo toque para multiplicar sus trabajos diarios.

---

## 2. Entidades & Términos de Dominio

- **Vecino (Cliente)**: Usuario que busca y contrata servicios de oficios para su hogar o comercio barrial.
- **Prestador (Oficio / Profesional)**: Trabajador independiente o especialista técnico que publica sus servicios y radio de atención.
- **Servicio Ofrecido**: Publicación que describe la actividad laboral del prestador (rubro, disponibilidad horaria, zona de cobertura).
- **Categoría de Oficio**: Clasificación temática para organizar y filtrar los servicios (Plomería, Electricidad, Gas, Pintura, Carpintería, Jardinería, Cerrajería, etc.).
- **Zona / Barrio**: Delimitación geográfica de proximidad que prioriza los prestadores que viven o trabajan a pocas cuadras del vecino solicitante.
- **Contacto Directo**: Mecanismo de contratación sin pasarela bancaria intermedia; conecta al cliente con el prestador mediante llamada telefónica o mensajería instantánea.
- **Solicitud de Servicio**: Registro creado cuando el cliente inicia un pedido a un prestador, permitiendo seguir su estado (Pendiente, En curso, Finalizada, Cancelada).
- **Calificación por Estrellas**: Valoración rápida de 1 a 5 estrellas otorgada por el vecino al culminar el trabajo (con redacción de testimonio opcional).
- **Suscripción del Prestador**: Plan que define la visibilidad y destacados del profesional en las búsquedas barriales.
- **Modo Accesible (Accessible Scale)**: Ajuste global del tamaño tipográfico (hasta 36px en títulos y 20px en cards) para facilitar la lectura sin lentes o bajo luz solar intensa.
- **Servicios Populares**: Sección destacada en la pantalla de inicio con los rubros más requeridos, orientada a captar el interés inmediato del usuario.
