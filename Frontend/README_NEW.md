# Task Management System - Trabajo Práctico Integrador 3

**Autor:** Máximo Colman

## 📋 Descripción del Proyecto

Sistema integral de gestión de tareas desarrollado como trabajo práctico integrador. Es una aplicación web full-stack que permite a los usuarios crear, administrar y monitorear sus tareas diarias con una interfaz moderna y responsiva.

### Características Principales

- **Autenticación de Usuarios**: Sistema seguro de registro e inicio de sesión con JWT
- **Gestión de Tareas**: Crear, editar, eliminar y marcar tareas como completadas
- **Dashboard Interactivo**: Visualizar estadísticas en tiempo real (tareas totales, completadas y pendientes)
- **Perfil de Usuario**: Ver y administrar información personal
- **Interfaz Cyberpunk**: Diseño moderno con efectos de neón y dark mode
- **Responsive Design**: Optimizado para dispositivos móviles y desktop

## 🛠️ Stack Tecnológico

### Frontend
- **React 18**: Biblioteca para construcción de interfaces
- **Vite**: Bundler y servidor de desarrollo ultrarrápido
- **Tailwind CSS**: Framework CSS para estilos modernos
- **React Router**: Enrutamiento de la aplicación
- **Fetch API**: Comunicación con el backend

### Backend
- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web minimalista
- **Sequelize**: ORM para Node.js
- **SQLite/MySQL**: Base de datos
- **JWT**: Autenticación segura con tokens
- **Bcrypt**: Encriptación de contraseñas

## 📂 Estructura del Proyecto

```
proyecto-root/
├── Frontend/                    # Aplicación React
│   ├── src/
│   │   ├── components/         # Componentes reutilizables
│   │   ├── pages/              # Páginas principales
│   │   │   ├── auth/           # Páginas de autenticación
│   │   │   ├── Home.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Tasks.jsx
│   │   ├── router/             # Configuración de rutas
│   │   ├── hooks/              # Custom hooks
│   │   └── App.jsx
│   └── package.json
│
└── servidor/                    # API Express
    ├── src/
    │   ├── controllers/        # Lógica de negocios
    │   ├── routes/             # Definición de rutas
    │   ├── models/             # Modelos de datos
    │   ├── middlewares/        # Middlewares personalizados
    │   └── utils/              # Utilidades
    └── package.json
```

## 🚀 Guía de Instalación y Ejecución Local

### Requisitos Previos

- **Node.js** (v16 o superior): [Descargar aquí](https://nodejs.org/)
- **npm** (incluido con Node.js) o **yarn**
- **Git**: [Descargar aquí](https://git-scm.com/)

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/MaxiColmena/trabajo-practico-integrador-3-maximo-colman.git
cd trabajo-practico-integrador-3-maximo-colman
```

### Paso 2: Configurar el Backend

```bash
# Navegar a la carpeta del servidor
cd servidor

# Instalar dependencias
npm install

# (Opcional) Ejecutar seed de datos
npm run seed

# Iniciar el servidor en http://localhost:3000
npm run dev
```

**Variables de entorno** (crear archivo `.env` en la carpeta `servidor` si es necesario):
```
PORT=3000
DATABASE_URL=tu_conexion_base_datos
JWT_SECRET=tu_clave_secreta
```

### Paso 3: Configurar el Frontend

```bash
# En una nueva terminal, navegar a la carpeta del frontend
cd Frontend

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo en http://localhost:5173
npm run dev
```

### Paso 4: Acceder a la Aplicación

1. Abre tu navegador
2. Ve a `http://localhost:5173`
3. Crea una nueva cuenta o inicia sesión con credenciales existentes
4. ¡Comienza a gestionar tus tareas!

## 📝 Comandos Disponibles

### Backend
```bash
npm run dev      # Inicia el servidor en modo desarrollo
npm run seed     # Ejecuta el seed de datos iniciales
```

### Frontend
```bash
npm run dev      # Inicia el servidor de desarrollo con HMR
npm run build    # Construye la aplicación para producción
npm run preview  # Previsualiza la build de producción
npm run lint     # Ejecuta eslint
```

## 🔐 Autenticación

- Los usuarios se autentican con **username** y **password**
- El backend genera un **JWT** que se almacena en una cookie HTTP-only
- Las rutas protegidas validan el token antes de permitir el acceso
- Sesiones de 1 hora de duración

## 📊 Características de Gestión de Tareas

- **Crear tarea**: Añadir nuevas tareas con título y descripción
- **Listar tareas**: Ver todas las tareas del usuario autenticado
- **Actualizar tarea**: Modificar título, descripción o estado
- **Marcar completada**: Cambiar el estado de la tarea
- **Eliminar tarea**: Borrar tareas del sistema
- **Estadísticas**: Dashboard con resumen de tareas

## 🎨 Diseño

El proyecto utiliza un diseño **Cyberpunk/Neon** con:
- Colores neón (azul cielo, violeta, fuchsia)
- Fondo oscuro con gradientes
- Efectos de sombra luminosa
- Interfaz futurista y moderna

## 📱 Responsividad

La aplicación está completamente optimizada para:
- Dispositivos móviles (smartphones)
- Tablets
- Computadoras de escritorio
- Pantallas ultra anchas

## 🐛 Solución de Problemas

### El backend no inicia
- Verifica que el puerto 3000 esté disponible
- Asegúrate de que Node.js está correctamente instalado: `node --version`
- Comprueba la conexión a la base de datos

### El frontend no se conecta con el backend
- Verifica que el servidor está corriendo en `http://localhost:3000`
- Revisa la consola del navegador (F12) para errores CORS
- Asegúrate de que las URLs en el frontend apunten a `http://localhost:3000`

### Error de autenticación
- Limpia las cookies del navegador
- Vuelve a iniciar sesión
- Comprueba que el JWT_SECRET está configurado correctamente

Desarrollado por **Máximo Colman**

