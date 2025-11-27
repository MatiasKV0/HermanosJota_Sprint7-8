import { createContext, useContext, useState, useEffect } from "react";
import {
  ObtenerPerfil,
  CrearUsuario,
  Login,
  ObtenerPedidos,
} from "../data/user";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      if (!token) {
        setAuth(null);
        setLoading(false);
        return;
      }

      try {
        const perfil = await ObtenerPerfil(token);
        setAuth(perfil);
      } catch (error) {
        console.error(error);
        setAuth(null);
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, [token]);

  const registrar = async (datos) => {
    const respuesta = await CrearUsuario(datos);
    return respuesta;
  };

  const login = async (datos) => {
    const respuesta = await Login(datos);

    localStorage.setItem("token", respuesta.token);
    setToken(respuesta.token);
    setAuth(respuesta.usuario); 

    return respuesta;
  };

  const obtenerPedidos = async () => {
    if (!token) throw new Error("Usuario no autenticado");
    return await ObtenerPedidos(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuth(null);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        loading,
        registrar,
        login,
        logout,
        obtenerPedidos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
