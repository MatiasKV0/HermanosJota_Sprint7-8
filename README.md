# Mueblería Hermanos Jota – Proyecto NEXUS

## Integrantes del equipo
- Arturo Toranzos
- Lucas Rotelli
- Matias Nicolas Villan
- Santiago Ribecca

## 📌 Descripción
Este proyecto corresponde a la consigna final de los Sprints 5 y 6 (NEXUS).
El objetivo principal es convertir la aplicación de Mueblería Hermanos Jota en una aplicación web completa y persistente, conectando el backend de Express a una base de datos MongoDB Atlas y ofreciendo una API RESTful con CRUD completo (Crear, Leer, Actualizar, Borrar).

El frontend de React evoluciona para consumir esta API real, permitiendo:

- Listar todos los productos.
- Ver detalles individuales.
- Crear nuevos productos mediante formularios.
- Editar productos existentes.

## 🏛️ Arquitectura del Proyecto
La estructura es monorepo, con dos carpetas principales:
- `/backend`  # Servidor Node.js + Express
- `/client`   # Aplicación React

### Backend
* Servidor Express.
* La API de Express se conecta a una base de datos MongoDB Atlas usando Mongoose.
* **Endpoints**:
    * `GET /api/productos` → Devuelve la lista completa de productos.
    * `GET /api/productos/:id` → Devuelve un producto por su _id.
    * `POST	/api/productos` → Crea un nuevo producto.
    * `PUT	/api/productos/:id` → Actualiza un producto existente.
    * `DELETE	/api/productos/:id` → Elimina un producto por su _id.
* Middleware global para loguear cada petición recibida.
* Middleware `express.json()` para procesar el cuerpo de las peticiones POST.
* Manejo de rutas modularizado con `express.Router`.
* Manejadores de error para rutas no encontradas (404) y errores de servidor (500).

### Frontend
* Single Page Application (SPA) construida con **React**.
* Componentes reutilizables.
* Consumo de la API propia (`/api/productos`) mediante `fetch`.
* Renderizado dinámico de la lista de productos.
* Vista de detalle de producto mediante renderizado condicional.
* Estado global para el carrito de compras (manejado con `Context API`).
* Formulario de contacto controlado con el hook `useState`.

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
│   ├── uploads/    
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
│   │   │   └── productos/    
│   │   ├── App.jsx    
│   │   ├── main.jsx    
│   │   └── styles.css    
│   ├── .env    
│   ├── package.json    
│   └── vite.config.js    


## 🚀 Tecnologías Utilizadas
* **Frontend**: `React`, `Vite`, `CSS`,`React Router DOM`.
* **Backend**: `Node.js`, `Express`,`Mongoose`,`Dotenv`.
* **Base de Datos**: `MongoDB Atlas`.
* **Otros**: `JavaScript (ES6+)`, `Fetch API`.

## 📌 Despliegue
- **Frontend:** [[URL del Frontend]](https://hermanos-jota-sprint5-6.vercel.app/)  
- **Backend:** [[URL del Backend] ](https://hermanos-jota-sprint5-6-q4ms.vercel.app/) 
