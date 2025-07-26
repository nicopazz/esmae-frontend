import { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [productos, setProductos] = useState([]);

const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `http://localhost:5000${imagePath}`;
};

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProductos(res.data.products || res.data); // según cómo devuelva el backend
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {productos.map((prod) => (
          <div key={prod._id} style={{ border: '1px solid #ccc', padding: 10, width: 250 }}>
            <img
              src={getImageUrl(prod.image)}
              alt={prod.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <h3>{prod.name}</h3>
            <p>${prod.price}</p>
            <p>Stock: {prod.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
