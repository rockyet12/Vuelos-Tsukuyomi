import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import LoginForm from './components/LoginForm';
import ProductForm from './components/ProductForm';
import SalesDashboard from './components/SalesDashboard';
// Define un componente de página de inicio para los clientes
const Home = ({ user, handleAddProductToCart, cart, onUpdateCart, onClearCart }) => {
  return (
    <>
      <ProductList onAddProduct={handleAddProductToCart} />
      <ShoppingCart
        cart={cart}
        onUpdateCart={onUpdateCart}
        onClearCart={onClearCart}
        userId={user ? user.id : null}
      />
    </>
  );
};

// Define un componente para la navegación
const HeaderNav = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  return (
    <header className="App-header">
      <h1>Viajes Tsukoyomi</h1>
      <nav>
        {user ? (
          <>
            <p>Bienvenido, {user.nombre} ({user.rol})</p>
            {user.rol === 'Vendedor' && <button onClick={() => navigate('/vendedor')}>Gestión de Productos</button>}
            {user.rol === 'Gerente' && <button onClick={() => navigate('/gerente')}>Reporte de Ventas</button>}
            {user.rol === 'Cliente' && <button onClick={() => navigate('/')}>Tienda</button>}
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>Iniciar Sesión</button>
        )}
      </nav>
    </header>
  );
};


function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Hook para la navegación programática

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.rol === "Vendedor") {
      navigate('/vendedor');
    } else if (userData.rol === "Gerente") {
      navigate('/gerente');
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('userToken');
    navigate('/login');
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
      <HeaderNav user={user} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLogin} />} />
          <Route path="/" element={<Home
            user={user}
            handleAddProductToCart={handleAddProductToCart}
            cart={cart}
            onUpdateCart={handleUpdateCart}
            onClearCart={handleClearCart}
          />} />
          <Route path="/vendedor" element={user && user.rol === "Vendedor" ? <ProductForm /> : <p>Acceso denegado.</p>} />
          <Route path="/gerente" element={user && user.rol === "Gerente" ? <SalesDashboard /> : <p>Acceso denegado.</p>} />
          <Route path="*" element={<p>Página no encontrada.</p>} />
        </Routes>
      </main>
      <footer>
        <p>&copy; 2025 Viajes Tsukoyomi</p>
      </footer>
    </div>
  );
}

export default App;