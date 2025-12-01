import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';
import { useData } from '../../../context/DataContext';

import { eliminarProducto } from '../../../data/db';

import ConfirmModal from '../../../components/ConfirmModal';

import './dashboard.css';

export default function Dashboard() {
  const { auth, loading } = useAuth();
  const { productos, loading: dataLoading, reloadProductos } = useData();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const openDeleteModal = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await eliminarProducto(productToDelete);
        await reloadProductos();
      } catch (error) {
        console.error(error);
        alert("Error al eliminar");
      }
      setIsModalOpen(false);
      setProductToDelete(null);
    }
  };

  useEffect(() => {
    if (!loading && !auth) {
      navigate("/");
    }
  }, [loading, auth, navigate]);

  useEffect(() => {
    if (!loading && auth && auth.rol !== 'admin') {
      navigate("/");
    }
  }, [loading, auth, navigate]);

  const handleEdit = (id) => {
    navigate(`/admin/editar-producto/${id}`);
  };

  const handleView = (id) => {
    navigate(`/producto/${id}`);
  };

  if (!auth || auth.rol !== 'admin') return null;
  if (loading || dataLoading) return <div className="msg">Cargando panel...</div>;

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <div>
            <h1>Administrar Productos</h1>
            <p className="subtitle">Gestión del inventario y catálogo</p>
          </div>
          <button
            className="btn-add"
            onClick={() => navigate('/admin/crear-producto')}
          >
            + Nuevo Producto
          </button>
        </div>

        <div className="table-responsive">
          <table className="products-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>ID</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((producto) => (
                  <tr key={producto._id || producto.id}>
                    <td>
                      <div className="img-wrapper">
                        <img
                          src={producto.imagenUrl || "https://placehold.co/50"}
                          alt={producto.nombre}
                        />
                      </div>
                    </td>
                    <td className="fw-bold">{producto.nombre}</td>
                    <td>${producto.precio?.toLocaleString('es-AR')}</td>
                    <td className="text-muted small">{producto._id || producto.id}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-action btn-view"
                          onClick={() => handleView(producto._id || producto.id)}
                          title="Ver"
                        >
                          Ver
                        </button>
                        <button
                          className="btn-action btn-edit"
                          onClick={() => handleEdit(producto._id || producto.id)}
                          title="Editar"
                        >
                          Editar
                        </button>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => openDeleteModal(producto._id || producto.id)}
                          title="Eliminar"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-row">
                    No hay productos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Producto"
        message="¿Estás seguro de que deseas eliminar este producto permanentemente? Esta acción no se puede deshacer."
      />
    </main>
  );
}