import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";

import Layout from "./layout/Layout";
import NotFound from "./components/NotFound";
import Home from "./pages/home/Home";
import Contacto from "./pages/contacto/Contacto";
import ProductosContainer from "./pages/productos/ProductosContainer";
import Producto from "./pages/producto/Producto";
import Carrito from "./pages/carrito/Carrito";

import CrearProducto from "./pages/admin/crear-producto/CrearProductos";
import EditarProducto from "./pages/admin/editar-producto/EditarProducto";

import Registro from "./pages/user/registro/Registro";
import Login from "./pages/user/login/Login";
import Pedidos from "./pages/user/pedidos/Pedidos";
import Perfil from "./pages/user/perfil/Perfil";

import "./style.css";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <BrowserRouter basename="/">
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<ProductosContainer />} />
                <Route path="/producto/:id" element={<Producto />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/admin/crear-producto" element={<CrearProducto />} />
                <Route path="/admin/editar-producto/:id" element={<EditarProducto />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mis-pedidos" element={<Pedidos />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
