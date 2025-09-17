import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        codigo: '',
        descripcion: '',
        precioUnitario: ''
    });
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            // Envía los datos del formulario a tu endpoint del backend
            const response = await axios.post('https://localhost:5251/api/productos', formData);
            
            setMessage('Producto agregado con éxito!');
            setFormData({
                codigo: '',
                descripcion: '',
                precioUnitario: ''
            }); // Limpia el formulario
            console.log('Producto agregado:', response.data);

        } catch (error) {
            setMessage('Error al agregar el producto. Por favor, revisa los datos.');
            console.error('Error adding product:', error.response?.data || error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
            <h2>Agregar Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Código:</label>
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Precio Unitario:</label>
                    <input
                        type="number"
                        name="precioUnitario"
                        value={formData.precioUnitario}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Agregando...' : 'Agregar Producto'}
                </button>
            </form>
            {message && <p style={{ color: message.includes('éxito') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
};

export default ProductForm;