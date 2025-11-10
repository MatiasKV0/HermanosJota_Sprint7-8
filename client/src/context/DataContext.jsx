import { createContext, useContext, useState, useEffect } from "react";
import { getProductos, getProductoPorId } from "../data/db";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const reloadProductos = async () => {
    setLoading(true);
    try {
      const data = await getProductos();
      setProductos(data);
    } catch {
      setError("Error al recargar productos.");
    } finally {
      setLoading(false);
    }
  };

   const getProductoById = async (id) => {
    const encontrado = productos.find((p) => p._id === id);
    if (encontrado) return encontrado;
    try {
      const data = await getProductoPorId(id);
      return data;
    } catch (err) {
      console.error("Error al obtener producto por ID:", err);
      return null;
    }
  };

  return (
    <DataContext.Provider value={{ productos, loading, error, reloadProductos, getProductoById }}>
      {children}
    </DataContext.Provider>
  );
}