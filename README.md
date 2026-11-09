 # Gestor de Tareas y Notas Rápidas (Task & Note Manager).
  
Estructura y Tecnologías Recomendadas
Backend: Node.js con Express (fácil de levantar y muy claro para definir rutas REST).

Base de Datos: Puedes usar una colección en Firebase / Firestore (vía firebase-admin o el SDK oficial) o una base de datos SQL (PostgreSQL / MySQL) usando pg o mysql2. Incluso puedes empezar con un arreglo local en memoria y luego meter la base de datos.

Frontend: HTML5 plano, CSS básico (o Simple.css / Bootstrap para que se vea bien rápido) y JavaScript nativo (fetch API) sin frameworks para entender la mecánica real de los llamados HTTP.

Funcionalidades por Fases
Para no saturarte, divide el desarrollo por etapas:

# Fase 1: El Backend (API RESTful)
Crea un servidor Node/Express con las siguientes rutas en formato JSON:

GET /api/tasks — Retorna la lista completa de tareas.

POST /api/tasks — Crea una nueva tarea (recibe { titulo, descripcion }).

PUT /api/tasks/:id — Actualiza el estado (ej. marcar como completada).

DELETE /api/tasks/:id — Elimina una tarea por su ID.

Tip: Configura el middleware cors en Express (npm install cors) para que tu HTML local pueda hacer peticiones a tu servidor sin bloqueos del navegador.

# Fase 2: El Frontend (HTML + JS)
Crea una interfaz sencilla con tres elementos principales:

Formulario: Un <form> con inputs para título y descripción, y un boton "Guardar".

```
Contenedor: Un <div> o <ul> donde se renderizarán las tareas.
```
Script JS (app.js):

Función obtenerTareas(): Ejecuta fetch('http://localhost:3000/api/tasks'), recorre el arreglo con forEach y genera los elementos en el DOM.

Evento submit: Intercepta el envío del formulario (e.preventDefault()), extrae los datos e invoca fetch con método POST.

Botones de acción: Agrega eventos de click en cada tarjeta de tarea para llamar a las rutas PUT (marcar completada) y DELETE (eliminar), seguidos de un refresco del DOM.

# Fase 3: Conexión con Base de Datos
Una vez que el flujo Frontend <-> Node.js funcione bien usando un arreglo simple en memoria:

Conecta el backend a la base de datos que elijas.

Sustituye la manipulación del arreglo local por consultas reales de lectura/escritura (usando promesas o async/await).

Plan de Trabajo Sugerido
Día 1: Inicia el proyecto Node (npm init -y), instala Express y construye el GET y POST probando las respuestas con Postman, Bruno o la extensión Thunder Client de VS Code.

Día 2: Maqueta el HTML básico y conecta el fetch() para leer y enviar datos desde la página Web.

Día 3: Implementa la eliminación, la edición y conecta la persistencia de datos real.

¿Te gustaría que empecemos armando la estructura inicial del servidor en Node.js o prefieres revisar primero cómo plantear los endpoints de la API?