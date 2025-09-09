import { useEffect, useState } from "react";
import api from "../api/client"; // tu axios configurado
import { Button, Modal, Form, Card } from "react-bootstrap";
import "./AdminPanel.css"; // estilos personalizados

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
    image: "",
  });

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

  const handleShowModal = (producto = null) => {
    setEditProducto(producto);
    setFormData(
      producto
        ? {
            name: producto.name,
            price: producto.price,
            stock: producto.stock,
            description: producto.description || "",
            image: producto.image || "",
          }
        : { name: "", price: "", stock: "", description: "", image: "" }
    );
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image.trim()) {
      alert("Debés ingresar la URL de la imagen.");
      return;
    }

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

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProductos();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-4">Cargando productos...</p>;

  return (
    <div className="admin-container">
      <h2 className="mb-4 text-center admin-title">
        Administración de productos
      </h2>
      <div className="d-flex justify-content-end mb-4">
        <Button className="btn-minimal" onClick={() => handleShowModal()}>
          + Crear Producto
        </Button>
      </div>

      {/* Grid de productos */}
      <div className="products-grid">
        {productos.map((p) => (
          <Card key={p._id} className="product-card">
            <Card.Img variant="top" src={p.image} className="product-img" />
            <Card.Body>
              <Card.Title>{p.name}</Card.Title>
              <Card.Text className="text-muted small">
                {p.description || "Sin descripción"}
              </Card.Text>
              <p className="fw-bold mb-1">${p.price}</p>
              <p className="small">Stock: {p.stock}</p>
              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  className="btn-action"
                  onClick={() => handleShowModal(p)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="btn-action"
                  onClick={() => handleDelete(p._id)}
                >
                  Eliminar
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editProducto ? "Editar Producto" : "Crear Producto"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {["name", "price", "stock", "description", "image"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label className="form-label">
                  {field === "image"
                    ? "URL de la Imagen"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </Form.Label>
                {field !== "description" && field !== "image" ? (
                  <Form.Control
                    type={
                      field === "price" || field === "stock" ? "number" : "text"
                    }
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    required
                  />
                ) : field === "description" ? (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                ) : (
                  <>
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
                        className="product-img-preview mt-2"
                      />
                    )}
                  </>
                )}
              </Form.Group>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button type="submit" className="btn-minimal">
              {editProducto ? "Actualizar" : "Crear"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
