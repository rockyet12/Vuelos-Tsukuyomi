import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import ShoppingCart from './ShoppingCart';
import LoginForm from './LoginForm';
import ProductForm from './ProductForm';
import SalesDashboard from './SalesDashboard'; 

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  const handleAddProductToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };

  const handleUpdateCart = (productId, action) => {
    setCart(prevCart => {
      if (action === 'increment') {
        return prevCart.map(item =>
          item.id === productId ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      if (action === 'decrement') {
        return prevCart.map(item =>
          item.id === productId ? { ...item, cantidad: item.cantidad - 1 } : item
        ).filter(item => item.cantidad > 0);
      }
      if (action === 'remove') {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart;
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Viajes Tsukoyomi</h1>
        {user ? (
          <p>
            Bienvenido, {user.nombre} ({user.rol}) <button onClick={handleLogout}>Cerrar Sesión</button>
          </p>
        ) : (
          <p>Por favor, inicia sesión para acceder a la tienda.</p>
        )}
      </header>
      <main>
        {user ? (
          // Lógica condicional para renderizar los componentes según el rol
          user.rol === "Vendedor" ? (
            <ProductForm />
          ) : user.rol === "Gerente" ? (
            <SalesDashboard />
          ) : (
            // Rol "Cliente" y cualquier otro rol no especificado
            <>
              <ProductList onAddProduct={handleAddProductToCart} />
              <ShoppingCart
                cart={cart}
                onUpdateCart={handleUpdateCart}
                onClearCart={handleClearCart}
                userId={user.id}
              />
            </>
          )
        ) : (
          <LoginForm onLoginSuccess={handleLogin} />
        )}
      </main>
      <footer>
        <p>&copy; 2025 Viajes Tsukoyomi</p>
      </footer>
    </div>
  );
}

export default App;