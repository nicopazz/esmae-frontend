// src/pages/AdminPanel.jsx
import { useEffect, useState } from "react";
import api from "../api/client"; // tu axios configurado
import { Table, Button, Modal, Form } from "react-bootstrap";

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Para el modal
  const [showModal, setShowModal] = useState(false);
  const [editProducto, setEditProducto] = useState(null); 
  const [formData, setFormData] = useState({ nombre: "", precio: "", stock: "" });

  // Cargar productos
 const fetchProductos = async () => {
  try {
    const res = await api.get("/products");
    console.log("Respuesta API:", res.data); 
    setProductos(res.data.products); 
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProductos();
  }, []);

  // Abrir modal para crear o editar
  const handleShowModal = (producto = null) => {
    setEditProducto(producto);
    setFormData(
      producto ? { nombre: producto.name, precio: producto.price, stock: producto.stock } : { nombre: "", precio: "", stock: "" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  // Crear o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProducto) {
        await api.put(`/products/${editProducto._id}`, formData);
      } else {
        await api.post("/products", formData);
      }
      fetchProductos();
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProductos();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="container mt-4">
      <h2>Panel de Administración</h2>
      <Button className="mb-3" onClick={() => handleShowModal()}>
        Crear Producto
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowModal(p)}>Editar</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(p._id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para crear/editar */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editProducto ? "Editar Producto" : "Crear Producto"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
            <Button type="submit" variant="primary">{editProducto ? "Actualizar" : "Crear"}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
