**EFI - Entrega Final**

**Integrantes:** Chena Martin, Ibañez Ian, Pereyra Franco, Scheurer Roy.

**Idea a implementar de las del doc de Opciones de Software con Impacto Local:**  
Opción 4: Economía Local y Empleo Barrial  
Proyecto: "Oficios Barriales"

**Nombre:** Oficios Vecinos

**Un resumen de cómo será su app y qué viene a solucionar**  
Permite conectar a los vecinos de cada barrio con profesionales que ofrecen un servicio y están en la misma zona. Estará orientado a gente que no sabe dominar muy bien la tecnología, y a su vez va a permitir a la gente de barrios periféricos visibilizar sus negocios.

**Listado de características:**

* Página principal con sugerencias de negocios y trabajadores que ofrecen servicios.
* Filtrado por categorías de oficio
* Filtrado por barrios/zonas
* Contratación de servicios
* Creación de servicio ofrecido

**EFI - Proyecto 'Oficios Vecinos'**

Este documento detalla la aplicación de las pautas de UX/UI vistas a lo largo de las clases para asegurar que el proyecto "Oficios Vecinos" cumpla con todos los estándares de usabilidad, accesibilidad y desarrollo de producto.

**Punto 2:**  
**Usabilidad y Accesibilidad:**  
En toda la app aplica las 4 pautas WCAG:  
-Perceptible: todas las imágenes, avatares e iconos tienen texto alternativo (alt o aria-label). Verifica que el texto contra su fondo tenga un contraste de al menos 4. 5:1. El succes #00C8FF y el danger #FF0025 no llegan a .5:1 sobre fondo blanco, así que para los textos usa una variable más oscura de cada uno y deja el color original para bordes e iconos.  
-Operable: Se tiene que poder navegar toda la app solo con Tab y Enter, sin mouse. El orden del Tab sigue el orden visual y el foco siempre se ve (outline de 2 px en #1764AE). Los modales atrapan el foco adentro y se cierran con Esc.  
-Comprensible: los mensajes de error dicen que paso y como solucionarlo (ej. \[El mail debe tener un @”. Cada input tiene su label visible asociado, no solo un placeholder.  
-Robusto: usa HTML semántico )header, nav, main, button, form, label) y atributos aria donde hagan falta (aria-invalid, aria-describedby para los errores, aria-live para los mensajes de éxito/error).  
Baja el esfuerzo del usuario en los formularios (registro, login, crear servicio, confirmar datos):  
-Activa el autocompletado nativo (autocomplete=”name”, “email”, “new-password”, “street-address”).  
-Válida en tiempo real al salir de cada campo, sin esperar a que toque “Enviar”.  
-Deja solo los campos imprescindibles.  
-da feedback inmediato en cada acción: si hace clic, algo tiene que cambiar.  
-Precarga la dirección del cliente en “Confirmar datos” si ya tenemos.

**Punto 3**:  
**Affordance (El botón tiene que parecer botón)**: No usaremos botones de diseño plano (flat design) que se confundan con simple texto. Todos los elementos interactivos, como la tarjeta de un profesional o el botón de "Contactar", deben tener sombras (box-shadow), bordes definidos y cambios de estado (como oscurecerse al hacer hover o hundirse al hacer click) para que el vecino entienda físicamente que puede tocarlos, sin necesidad de leer textos redundantes como "Click aquí".

**Modelos Mentales (Diccionario Universal)**: Entendemos que nuestro público puede no conocer los íconos abstractos del software moderno (ej. el menú hamburguesa o un disquete para guardar). Para alinear la app a sus modelos mentales, evitaremos íconos confusos. Toda iconografía (ej. una llave inglesa para plomeros, una casa para inicio) irá obligatoriamente acompañada de una etiqueta de texto clara, no asumiendo que las convenciones tecnológicas son universales.  
**Mapeo Natural**: La disposición de los controles imitará la lógica del mundo real. Por ejemplo, si el vecino usa un control deslizante para ajustar la distancia de búsqueda, el radio en el mapa del barrio debería acercarse o alejarse visualmente en tiempo real. Además, al calificar a un oficio como Carlos, las estrellas interactivas estarán pegadas directamente debajo de su servicio, relacionando directamente el control con el objeto afectado.

**Punto 4:**

Tono: empático, cercano, directo, sin tecnicismos.  
Fuente principal: Roboto. Tamaño mínimo en mobile: 16px.  
Todo ícono debe ir acompañado obligatoriamente de una etiqueta de texto.

\## Regla 1 — Ley de Proximidad

Cada bloque de información tiene que ser una unidad visual autónoma y  
reconocible de un vistazo. Los elementos que pertenecen a un mismo  
objeto (por ejemplo, la foto, el nombre, la zona y el botón de contacto  
de un prestador) deben estar visualmente pegados entre sí, con muy poco  
espacio interno. Entre bloques distintos, en cambio, tiene que haber  
respiro claro para que el ojo entienda dónde termina uno y empieza otro.

Nunca pongas el botón de acción de una tarjeta más cerca de la tarjeta  
de abajo que del contenido al que pertenece. Si eso pasa, el usuario  
va a tocar la tarjeta equivocada, especialmente en celulares de pantalla  
chica o con dedos gruesos.

Esto aplica también a los formularios: la etiqueta de un campo tiene que  
estar notoriamente más cerca de su input que del campo siguiente.

\## Regla 2 — Ley de Semejanza

Todo elemento que haga lo mismo tiene que verse igual en toda la app,  
sin importar en qué pantalla esté. El cerebro del usuario aprende una  
vez qué significa cada forma, color y tamaño: si eso cambia sin motivo,  
tiene que reaprender en cada pantalla.

Define un sistema visual consistente con exactamente tres roles de botón:  
uno primario (la acción más importante de la pantalla, solo uno por  
vista), uno secundario (acciones de menor peso) y uno destructivo  
(cancelar o eliminar). Cada rol tiene que verse diferente de los otros  
dos y exactamente igual a sí mismo en todas las pantallas donde aparece.

Lo mismo aplica a las tarjetas de prestadores, los estados de pedido,  
los íconos de categoría y cualquier componente que se repita. Si en el  
home una tarjeta de prestador tiene foto redonda, nombre en negrita y  
botón de acción, tiene que tener exactamente eso en la pantalla de  
categoría y en la de búsqueda también.

\## Regla 3 — Ley de Continuidad y Cierre

Cuando hay una lista o grilla de prestadores, nunca la cierres  
perfectamente en el borde de la pantalla. La última card tiene que  
quedar cortada a la mitad, visible pero incompleta. Eso le dice al  
cerebro del usuario que hay más contenido y que puede deslizar para  
verlo, sin necesidad de poner un texto que diga "ver más".

Este principio aplica a las grillas del home, a las listas de categorías  
y a cualquier carrusel horizontal de servicios o prestadores.

El cierre visual completo (que todo entre perfecto en pantalla) comunica  
"esto es todo lo que hay". Usalo solo cuando efectivamente sea así.

\## Regla 4 — Jerarquía Visual

No todos los elementos de una pantalla valen lo mismo. Si todo tiene el  
mismo tamaño, el mismo color y el mismo peso, el usuario no sabe qué  
mirar primero y se frustra. La jerarquía se construye con tres herramientas:

\### 4.1 — Tamaño

Lo más importante de la pantalla es lo más grande. Cada pantalla tiene  
un único título principal, grande y en negrita. El resto de la información  
baja de tamaño de forma escalonada y coherente: subtítulos, nombres de  
prestadores, texto de apoyo y metadatos (zona, horario, precio secundario)  
tienen que ser visualmente distinguibles entre sí solo por su tamaño,  
sin necesidad de leer el contenido.

El precio o el estado principal de un pedido tiene que estar en un tamaño  
notoriamente mayor que la información de detalle que lo acompaña.

\### 4.2 — Color y Contraste

El botón de acción principal de cada pantalla es el elemento de mayor  
contraste de toda la vista. Nada más compite con él en brillo o saturación.  
Los elementos secundarios usan tonos más apagados o bordes sutiles.  
Los metadatos y textos de apoyo van en gris medio.

El color nunca es la única forma de comunicar un estado. Si algo está  
en rojo porque es un error, tiene que haber también un ícono o un texto  
que lo diga. Marta puede no distinguir colores con claridad bajo el sol.

\### 4.3 — Espacio en Blanco

El espacio vacío no es espacio desperdiciado: es lo que permite que el  
usuario respire y entienda qué es importante. Las secciones distintas de  
una pantalla tienen que estar separadas por espacio generoso. Dentro de  
una misma sección, los elementos van juntos. La pantalla nunca tiene que  
sentirse apretada ni llena de ruido visual.

\## Regla 5 — Patrones de Lectura (F y Z)

El prototipo ya fue diseñado en Figma teniendo en cuenta estos patrones,  
así que al implementarlo respetá la disposición visual existente sin  
reorganizar los elementos. Lo que sigue es una guía de por qué cada  
pantalla está dispuesta como está, para que tomes decisiones coherentes  
si necesitás agregar o mover algo.

En las pantallas con mucho contenido listado (búsqueda, categorías,  
historial), el ojo del usuario escanea en patrón F: lee la primera  
línea de arriba a abajo, baja un poco, lee hasta la mitad y sigue de  
largo. Por eso los nombres de los prestadores y sus datos clave van  
siempre alineados a la izquierda y en la parte superior de cada tarjeta.

En las pantallas principales de acción (home, perfil, confirmación de  
pedido), el ojo sigue el patrón Z: arriba-izquierda es el logo o el  
título, arriba-derecha es la acción secundaria (mensajes, perfil),  
el centro tiene el contenido de contexto y abajo va el botón de acción  
principal. No muevas el CTA principal hacia arriba de la pantalla:  
el usuario necesita ver primero quiénes hay disponibles antes de decidir  
buscar.

**Punto 5:**  
**Color, Tipografía y Componentes UI:**  
Define la paleta de “Oficios vecinos” como tokens de Tailwind, separados por funcion:  
-primary #1764AE: acciones principales ("Solicitar servicio", "Continuar", "Crear cuenta"). El azul transmite confianza y seguridad.  
- primary-dark #00112B: hover de los botones y textos principales.  
- secondary / neutral #E2E2E3: acciones secundarias ("Volver", "Cancelar", "Quizás más tarde"), fondos de cards y estado disabled.  
- success #00C8FF: confirmaciones ("Registro exitoso", "Solicitud enviada", "Servicio creado").  
- danger #FF0025: errores y acciones destructivas ("Eliminar servicio", "Cancelar suscripción", "Error al iniciar sesión").  
- warning: agregá un ámbar con buen contraste para estados intermedios ("Solicitud pendiente", "Tu suscripción vence el 30/11/26").  
Usá siempre estos tokens; no puede haber ningún color hex suelto en los componentes.  
Definí la escala tipográfica y respetala en toda la app. Las fuentes son sans-serif: Roboto para el texto y Roboto Mono para los títulos.  
- Tamaño normal: título de página 24px, subtítulo 18px, texto de cards 16px, detalles 12px.  
- Tamaño accesible: título 36px, subtítulo 24px, cards 20px, detalles 16px.  
Creá un componente Text/Heading con estas variantes. No uses tamaños de fuente inventados en ningún componente.  
Creá el componente Button con sus 5 estados:  
1. Default: fondo #1764AE, texto blanco.  
2. Hover: fondo #00112B.  
3. Active: se "hunde" (scale-95 y menos sombra).  
4. Focus: con el teclado muestra un borde resaltado visible (ring de 2px y offset).  
5. Disabled: fondo #E2E2E3, texto gris, opaco, cursor not-allowed y no se puede clickear.  
Hacé las variantes primary, secondary y danger con los mismos 5 estados. Aplicá la misma lógica de estados (default, hover, focus, error, disabled) al Input, a las cards clickeables y al selector de rol Cliente/Prestador.

**Punto 6**:  
**4 fases del DCU**  
**Entender el contexto (Investigación):** Identificamos como los vecinos dependen del boca a boca o carteles donde hay una baja conectividad en zonas alejadas del centro y una poca familiaridad en pagos digitales

**Especificar requisitos (Definir el problema a resolver)**: Necesitamos formularios simples y con alto contraste para poder usarse bajo el sol de la calle, la app debe ser liviana para no consumir datos moviles.

**Producir soluciones de diseño (Manos a la obra)**: Reemplazo de paneles complejos por botones grandes y literales. Para el prestador, un boton de “Ofrecer nuevo servicio” y “Mis servicios”. Para el vecino, botones claros como “Buscar servicio” y “Servicios mas populares”.

**Evaluar (El baño de realidad)**: Sometemos el prototipo a usuarios reales. Por ejemplo, si al pedirle a un adulto mayor que busque un electricista notamos que se pierde con el ícono de "Filtros", la iteración consistirá en cambiarlo por un texto directo como "Buscar por zona".

**Personas**:  
**Persona 1:** Marta (El Vecino - Cliente)  
**Perfil:** 62 años, jubilada, vecina de un barrio periférico.  
**Contexto de Uso:** Usa un celular de gama baja, principalmente para WhatsApp. No se maneja con tarjetas de crédito.  
**Frustración (Dolor):** Necesita un arreglo urgente (ej. plomería) pero su técnico de confianza ya no está. Le da miedo meter a cualquier desconocido a su casa y le frustran las apps donde hay que llenar muchos datos o pagar por adelantado.  
**Objetivo:** Encontrar a alguien de confianza en su propio barrio para que le solucione el problema rápido y poder pagarle en efectivo.

**Persona 2:** Carlos (El Profesional - Oficio)  
**Perfil:** 45 años, electricista y plomero independiente.  
**Contexto de Uso:** Trabaja todo el día en la calle, a veces con las manos sucias. Tiene conectividad intermitente (datos móviles).  
**Frustración (Dolor):** Sabe trabajar muy bien, pero le cuesta conseguir clientes nuevos fuera de su círculo cercano porque no sabe usar redes sociales para publicitarse. Le molestan las aplicaciones que son muy complejas de usar.  
**Objetivo:** Que los vecinos de zonas cercanas sepan que existe y lo llamen directamente con un solo toque, aumentando sus trabajos diarios.

**User Journey Map (El Viaje del Usuario)**

El siguiente mapa detalla el viaje de Marta interactuando con la app para solucionar la rotura de un caño:

|Etapa del Viaje|1. Descubrimiento (El Problema)|2. Configuración (Búsqueda)|3. Espera (Coordinación)|4. Consumo (Felicidad)|
|-|-|-|-|-|
|**Acción del usuario**|Marta ve que pierde agua el caño. Entra a la app.|Entra a "Plomería", ve que Carlos está cerca y tiene buenas reseñas.|Habla con Carlos por chat, arreglan el horario y él va a su casa.|Caño arreglado. Marta entra a la app y le deja 5 estrellas.|
|**Punto de contacto (Canal)**|App Mobile (Pantalla de inicio).|App Mobile (Lista de oficios filtrada).|Mensajes desde la app / Llamada física.|App Mobile (Pantalla de calificación).|
|**Pensamientos / Dudas**|"Ojalá encuentre a alguien cerca y de confianza rápido."|"¿Cómo lo contacto? ¿Me pedirá tarjeta de crédito?"|"Qué bueno que vive acá a la vuelta, llega rápido."|"Muy buen trabajo, lo voy a recomendar."|
|**Emoción (Curva UX)**|😰 Nerviosa / Preocupada|😐 Neutral / Expectante|🙂 Aliviada|😁 Feliz y satisfecha|
|**Oportunidad para el Dev**|Boton grande con Mensaje claro de Buscar servicios. sin pedir login previo.|Botón gigante de "Contactar". Evitar carritos.|Darle a Carlos un botón de "Enviar link de calificación" por el chat.|Pantalla de calificación de 1 solo toque (5 estrellas grandes), escribir no es una obligacion.|

# 

**Punto 7:**  
**Card Sorting:**  
Se decidió hacer un Card Sorting destinado a las 2 versiones de la interfaz que va a tener la aplicación: Cliente y Prestador.

El Card Sorting abierto dio como resultado que las 3 secciones principales se llamen de la siguiente manera:

\- Página principal  
- Mi perfil  
- Servicios

A partir de ese resultado, se le entregaron secciones predefinidas para ubicarlas dentro de las secciones principales a su preferencia.

**Sitemap del usuario cliente:
Pagina Principal 
- Servicios populares
Servicios
- Búsqueda de servicios
- Servicios Locales
Mi Perfil
- Mensajes
- Solicitudes pendientes
- Historial de servicios

Sitemap del usuario prestador:
Pagina Principal
- Crear Servicio
Servicios
- Solicitudes pendientes
- Historial de servicios
Mi Perfil
- Mensajes
- Subscripcion**


**Punto 9:**  
**Sistemas de Diseño, Diseño Atomico y Microinteracciones:**  
Usá el MCP de Stitch para traer el proyecto "Oficios Vecinos". Extraé la paleta de colores, las tipografías y los componentes, y generá un archivo DESIGN.md en la raíz del proyecto, con los componentes organizados en Átomos, Moléculas y Organismos.  
Con base en las pantallas del proyecto en Stitch, creá los componentes en React y Tailwind listos para producción, siguiendo el Diseño Atómico:  
- Átomos: Button, Input, Label, Icono, Avatar, Badge de estado, Estrellas, Toggle.  
- Moléculas: Barra de búsqueda (Input + Icono), Campo de formulario (Label + Input + error), Card de categoría, Card de profesional (Avatar + nombre/servicio + estrellas + botón), Card de solicitud.  
- Organismos: Header (logo + "Buscar" + "Iniciar sesión"), Galería de categorías, Lista de profesionales, Formularios, Modales de éxito/error, Chat.  
Regla: todo lo que se use más de 2 veces es un componente. Si cambio un token o un componente raíz, se tiene que actualizar en todas las pantallas.  
Armá la estructura del proyecto, instalá las dependencias y levantá la vista previa.  
Agregá microinteracciones de feedback:  
- Hover: los botones y las cards cambian de color o se elevan al pasar el cursor.  
- Error / Éxito: el campo inválido se pone en rojo con su mensaje; el válido muestra un check.  
- Loading: spinner en el botón mientras se envía, y skeletons mientras carga la lista de profesionales.  
- Toggle switch "Tamaño de texto accesible" en el perfil: el círculo se desliza de izquierda a derecha y el fondo pasa de #E2E2E3 a #1764AE con un ease-in-out suave. Al activarlo, cambia la escala tipográfica de toda la app.  
Agregá estos patrones de animación (200–400 ms, ease-in-out, respetando prefers-reduced-motion):  
- Dissolve: aparición y desaparición suave de los modales de éxito/error y de las notificaciones.  
- Slide in/out: el panel de filtros, el menú y los modales de confirmación entran y salen deslizándose.  
- Push: desplazamiento lateral entre los slides del onboarding, entre los pasos de la contratación, y de los mensajes del chat.

**Punto 10:**  
**Contexto del Proyecto "Oficios Vecinos":**  
**Tono de voz:** Empático, cercano, claro, directo y muy sencillo. Evita el tono corporativo o excesivamente técnico.  
**Público objetivo:** Vecinos (principalmente adultos mayores con baja adopción tecnológica y celulares de gama baja) y Oficios (trabajadores independientes con conectividad intermitente).  
**Emoción principal a transmitir:** Seguridad, confianza, inmediatez barrial y facilidad de uso.  
**Tus responsabilidades y reglas de diseño:**

1. **Principios de UX Writing y Contenido Funcional**

**Claridad, Brevedad y Empatía**: Genera textos funcionales, cortos y humanos que reduzcan la carga cognitiva del usuario, recordando que muchos tienen dificultades tecnológicas.  
**Verbos de Acción Concretos**: Elimina etiquetas genéricas como "OK", "Enviar" o "Continuar". Usa microcopys precisos como "Llamar al plomero", "Ver oficios cercanos" o "Guardar mi oficio".

2. **Accesibilidad Aplicada (Pautas WCAG)**

**Contraste de Color:** Sugiere combinaciones de alto contraste (mínimo 4.5:1 para texto normal). Evita combinaciones como texto gris claro (#9CA3AF) sobre blanco.  
**Tipografía y Legibilidad:** Recomienda fuentes legibles (como Inter o Sans-Serif limpias (En este proyecto vamos a utilizar Roboto como fuente principal), con un tamaño mínimo de 16px para mobile e interlineado de al menos 150%.  
**Áreas Táctiles (Targets):** Asegura que los botones tengan un tamaño táctil mínimo de 44x44px o 48x48px con padding adecuado, ya que los usuarios pueden tener dificultades motrices o usar la app apurados.  
**Iconos y Etiquetas:** Todo ícono debe estar acompañado obligatoriamente de una etiqueta de texto clara. No asumas que el usuario entiende metáforas visuales por sí solas.

3. **Patrones Avanzados de Interacción**

**Mensajes de Error:** Traduce cualquier error técnico a lenguaje cotidiano. Si falla la conexión, en lugar de "Error 504", usa "Tu internet está un poco lento. Volvé a intentarlo en un ratito".  
**Estados Vacíos (Empty States):** Si un vecino entra a un rubro sin oficios, no muestres "Sin datos". Usa: "Todavía no hay carpinteros en esta zona. ¡Contale a tu carpintero de confianza para que se sume!".

