import { useEffect, useState } from "react";
import api from "../api/client"; // tu axios configurado
import { Table, Button, Modal, Form } from "react-bootstrap";

export default function AdminPanel() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editProducto, setEditProducto] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "", // 👈 ahora es string (link)
  });

  // Cargar productos
  const fetchProductos = async () => {
    try {
      const res = await api.get("/products");
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

  // Abrir modal
  const handleShowModal = (producto = null) => {
    setEditProducto(producto);
    setFormData(
      producto
        ? {
            name: producto.name,
            price: producto.price,
            stock: producto.stock,
            description: producto.description || "",
            image: producto.image || "", // 👈 precargamos link
          }
        : { name: "", price: "", stock: "", description: "", image: "" }
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
      console.error(err.response?.data || err.message);
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
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
              </td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShowModal(p)}
                >
                  Editar
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p._id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editProducto ? "Editar Producto" : "Crear Producto"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>

            {/* 👇 Imagen como link */}
            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginTop: "10px",
                    objectFit: "cover",
                  }}
                />
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {editProducto ? "Actualizar" : "Crear"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
