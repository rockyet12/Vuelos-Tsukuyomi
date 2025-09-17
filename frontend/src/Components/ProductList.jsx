import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Haz la petición GET a tu backend
                const response = await axios.get("https://localhost:5251/api/productos");
                setProducts(response.data);
            } catch (err) {
                setError("Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.");
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); // El array vacío asegura que se ejecute solo una vez

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div>
            <h2>Nuestros Productos</h2>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h3>{product.descripcion}</h3>
                            <p>Código: {product.codigo}</p>
                            <p>Precio: ${product.precioUnitario.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos disponibles en este momento.</p>
            )}
        </div>
    );
};

export default ProductList;