import React, { useState } from 'react';
import axios from 'axios';

const ShoppingCart = ({ cart, onUpdateCart, onClearCart }) => {
    // Estado para gestionar si se está procesando un pedido
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderMessage, setOrderMessage] = useState('');

    // Función para calcular el precio total del carrito
    const totalAmount = cart.reduce((total, item) => total + item.precioUnitario * item.cantidad, 0);

    // Función para enviar el pedido al backend
    const handlePlaceOrder = async () => {
        setIsOrdering(true);
        setOrderMessage('');

        const orderData = {
            ClienteId: 1, // Nota: Cambia esto a un ID de cliente dinámico en un proyecto real
            Fecha: new Date(),
            Items: cart.map(item => ({
                ProductoId: item.id,
                Cantidad: item.cantidad,
                PrecioUnitario: item.precioUnitario
            }))
        };

        try {
            const response = await axios.post('https://localhost:7123/api/pedidos', orderData);
            setOrderMessage('Pedido realizado con éxito. ¡Gracias por tu compra!');
            onClearCart(); // Limpia el carrito después de un pedido exitoso
            console.log('Order successful:', response.data);
        } catch (error) {
            setOrderMessage('Error al procesar el pedido. Por favor, inténtalo de nuevo.');
            console.error('Error placing order:', error.response?.data || error.message);
        } finally {
            setIsOrdering(false);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} style={{ marginBottom: '10px' }}>
                                <h4>{item.descripcion}</h4>
                                <p>Cantidad: {item.cantidad}</p>
                                <p>Precio: ${item.precioUnitario.toFixed(2)}</p>
                                <p>Subtotal: ${(item.precioUnitario * item.cantidad).toFixed(2)}</p>
                                {/* Botones para aumentar/disminuir cantidad y eliminar */}
                                <button onClick={() => onUpdateCart(item.id, 'increment')}>+</button>
                                <button onClick={() => onUpdateCart(item.id, 'decrement')}>-</button>
                                <button onClick={() => onUpdateCart(item.id, 'remove')}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${totalAmount.toFixed(2)}</h3>
                    <button onClick={handlePlaceOrder} disabled={isOrdering}>
                        {isOrdering ? 'Procesando...' : 'Finalizar Compra'}
                    </button>
                </>
            )}
            {orderMessage && <p style={{ marginTop: '10px', color: orderMessage.includes('éxito') ? 'green' : 'red' }}>{orderMessage}</p>}
        </div>
    );
};

export default ShoppingCart;