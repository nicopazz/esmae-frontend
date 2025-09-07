import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import ProductoForm from "../components/ProductoForm";
import api from "../api/client";
import "../pages/adminPanel.css";

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);

  // Traer productos del backend
  const fetchProductos = async () => {
  try {
    const { data } = await api.get("/products"); // misma ruta que Home
    console.log("Data recibida del backend:", data); // <--- esto nos dice qué está llegando
    setProductos(data.products || data); 
  } catch (error) {
    console.error("Error al traer productos:", error);
  }
};


  useEffect(() => {
    fetchProductos();
  }, []);

  // Eliminar producto
  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProductos(productos.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Ocultar/mostrar producto
  const toggleOculto = async (producto) => {
    try {
      await api.put(`/products/${producto._id}`, { oculto: !producto.oculto });
      setProductos(
        productos.map((p) =>
          p._id === producto._id ? { ...p, oculto: !p.oculto } : p
        )
      );
    } catch (error) {
      console.error("Error al actualizar visibilidad:", error);
    }
  };

  // Abrir modal para agregar/editar
  const abrirModal = (producto = null) => {
    setProductoEditar(producto);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setProductoEditar(null);
    setModalOpen(false);
    fetchProductos();
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <button className="btn agregar-btn" onClick={() => abrirModal()}>
        Agregar Producto
      </button>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Visible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p._id}>
              <td>
                {p.imagenUrl ? (
                  <img
                    src={p.imagenUrl}
                    alt={p.nombre}
                    className="tabla-img"
                  />
                ) : (
                  "Sin imagen"
                )}
              </td>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.oculto ? "No" : "Sí"}</td>
              <td>
                <button className="btn toggle-btn" onClick={() => toggleOculto(p)}>
                  {p.oculto ? "Mostrar" : "Ocultar"}
                </button>
                <button className="btn editar-btn" onClick={() => abrirModal(p)}>
                  Editar
                </button>
                <button className="btn eliminar-btn" onClick={() => eliminarProducto(p._id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {modalOpen && <ProductoForm producto={productoEditar} onClose={cerrarModal} />}
    </div>
  );
}
