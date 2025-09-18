import React, { useState, useEffect } from "react";
import ApiClient from "../api/api";
const SalesDashboard = () => {
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                // Haz la petición GET a tu backend para obtener las ventas
                const response = await ApiClient.get("/ventas");
                // Actualiza el estado con los datos recibidos
                setSales(response.data);
                //manejo de errores
            } catch (err) {
                setError("Error al cargar las ventas. Por favor, inténtalo de nuevo más tarde.");
                console.error("Error fetching sales:", err);
                //finalizacion de carga
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    if (loading) {
        return <div>Cargando reporte de ventas...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
            <h2>Reporte de Ventas</h2>
            {sales.length > 0 ? (
                <ul>
                    {sales.map((sale) => (
                        <li key={sale.id}>
                            <h3>Venta #{sale.id}</h3>
                            <p>Fecha: {new Date(sale.fechaVenta).toLocaleDateString()}</p>
                            <p>Total: ${sale.total.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se han registrado ventas.</p>
            )}
        </div>
    );
};

export default SalesDashboard;