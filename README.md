# Mueblería Hermanos Jota – Proyecto NEXUS

## Integrantes del equipo
- Lucas Rotelli
- Matias Nicolas Villan
- Santiago Ribecca

## 📌 Descripción
Este proyecto corresponde a la consigna final de los Sprints 7 y 8 (NEXUS). El objetivo principal es presentar una aplicación web E-Commerce completa, escalable y persistente ("Full Stack"). Se ha evolucionado desde un sitio estático a una aplicación dinámica que conecta un frontend moderno en React con un backend robusto en Express y una base de datos MongoDB Atlas.

La aplicación incorpora un sistema de autenticación y autorización (JWT), permitiendo dos roles diferenciados:

* Clientes: Pueden navegar el catálogo, gestionar su carrito, realizar pedidos y ver su historial de compras.

* Administradores: Tienen acceso a un Dashboard exclusivo para la gestión integral del inventario (CRUD de productos).

## 🏛️ Arquitectura del Proyecto
La estructura es monorepo, con dos carpetas principales:
- `/backend`  # Servidor Node.js + Express + MongoDB
- `/client`   # Aplicación React + Vite

### Backend
* Servidor: Node.js con Express.
* Base de Datos: MongoDB Atlas (ODM Mongoose).
* Autenticación: JSON Web Tokens (JWT) y Hash de contraseñas con Bcrypt.
* **Endpoints**:
    * `/api/productos` → CRUD de productos.
    * `/api/users` → Gestión de usuarios.
    * `/api/pedidos` → Gestión de pedidos.
* Middleware de validación de tokens, cors y manejo de errores centralizado.

### Frontend
* Single Page Application (SPA) construida con **React**.
* Gestión de Estado:
    * CartContext: Manejo global del carrito de compras.
    * DataContext: Sincronización de productos con la API.
    * AuthContext: Manejo de sesión, persistencia de usuario y roles.
* Vistas mediante renderizado condicional.

## ⚙️ Instalación y Uso

### Backend
1.  Entrar al directorio `backend`:
    ```sh
    cd backend
    ```
2.  Instalar dependencias:
    ```sh
    npm install
    ```
    Variables necesarias (.env):
    ```sh
    MONGO_URI=<cadena_de_conexion_mongodb_atlas>
    JWT_SECRET=<frase_secreta>
    FRONTEND_URL=<dirección_client>
    PORT=<puerto>
     ```
4.  Iniciar servidor en modo desarrollo:
    ```sh
    npm run dev
    ```
El backend correrá en: `http://localhost:5000` (por defecto).

### Frontend
1.  Entrar al directorio `client`:
    ```sh
    cd client
    ```
2.  Instalar dependencias:
    ```sh
    npm install
    ```
    Variables necesarias (.env):
    ```sh
    VITE_BACKEND_URL=<dirección_backend>
     ```
3.  Iniciar aplicación de desarrollo:
    ```sh
    npm run dev
    ```
El frontend correrá en: `http://localhost:5173` (por defecto).

## 🌳 Estructura del Proyecto

root/    
│    
├── backend/    
│   ├── src/    
│   │   ├── config/    
│   │   ├── controllers/    
│   │   ├── middleware/    
│   │   ├── models/      
│   │   └── routes/    
│   ├── .env    
│   ├── index.js    
│   ├── package.json    
│   
├── client/    
│   ├── public/    
│   ├── src/    
│   │   ├── components/    
│   │   ├── context/    
│   │   ├── data/    
│   │   ├── layout/    
│   │   ├── pages/    
│   │   │   ├── admin/   
│   │   │   ├── carrito/    
│   │   │   ├── contacto/    
│   │   │   ├── home/    
│   │   │   ├── producto/    
│   │   │   ├── productos/    
│   │   │   ├── user/    
│   │   │   │   ├── login/      
│   │   │   │   ├── pedidos/    
│   │   │   │   ├── perfil/  
│   │   │   │   ├── registro/   
│   │   ├── App.jsx    
│   │   ├── main.jsx    
│   │   └── styles.css    
│   ├── .env    
│   ├── package.json    
│   ├── index.html   
│   └── vite.config.js    


## 🚀 Tecnologías Utilizadas
* **Frontend**: `React`, `Vite`, `CSS`,`React Router DOM`.
* **Backend**: `Node.js`, `Express`,`Dotenv`, `JWT (JsonWebToken)`, `Bcrypt`.
* **Base de Datos**: `MongoDB Atlas`,`Mongoose`.
* **Otros**: `JavaScript (ES6+)`, `Fetch API`,`Git`, `NPM`, `Postman`.

## 📌 Despliegue
- **Frontend:** [[URL del Frontend]](https://hermanos-jota-sprint7-8-front.vercel.app/)  
- **Backend:** [[URL del Backend] ](https://hermanos-jota-sprint7-8-dun.vercel.app/) 
