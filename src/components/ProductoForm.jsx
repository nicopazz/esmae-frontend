import { useState, useEffect } from "react";
import api from "../api/client";
import "./ProductoForm.css";

export default function ProductoForm({ producto, onClose }) {
  const [nombre, setNombre] = useState(producto?.nombre || "");
  const [precio, setPrecio] = useState(producto?.precio || "");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(producto?.imagenUrl || null);

  useEffect(() => {
    if (!imagen) return;
    const objectUrl = URL.createObjectURL(imagen);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imagen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("precio", precio);
    if (imagen) formData.append("imagen", imagen);

    try {
      if (producto) {
        await api.put(`/products/${producto._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onClose();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{producto ? "Editar Producto" : "Agregar Producto"}</h2>
        <form onSubmit={handleSubmit} className="form-producto">
          <label>Nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />

          <label>Precio</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />

          <label>Imagen</label>
          <input type="file" onChange={(e) => setImagen(e.target.files[0])} />

          {preview && (
            <div className="preview-container">
              <p>Preview:</p>
              <img src={preview} alt="preview" className="preview-img" />
            </div>
          )}

          <div className="botones">
            <button type="submit" className="btn guardar-btn">
              {producto ? "Guardar Cambios" : "Agregar"}
            </button>
            <button type="button" className="btn cancelar-btn" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
