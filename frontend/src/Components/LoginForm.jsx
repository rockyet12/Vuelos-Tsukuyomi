import { useState } from "react";
import axios from "axios";

// Recibe la función onLoginSuccess como una propiedad (prop)
const LoginForm = ({ onLoginSuccess }) => {
    // Definimos el estado para el email y la contraseña
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Estado para manejar mensajes de error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        setErrorMessage(''); // Limpia cualquier mensaje de error anterior
``
        try {
            // Hacemos una petición POST a la ruta de login de tu API
            const response = await axios.post('https://localhost:7123/api/clientes/login', {
                email: email,
                password: password,
            });

            console.log("Inicio de sesión exitoso:", response.data);
            
            // Llama a la función onLoginSuccess del componente padre
            // y le pasa los datos del usuario para que se guarden en el estado de la aplicación
            if (onLoginSuccess) {
                onLoginSuccess(response.data);
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error.response?.data || error.message);
            // Muestra un mensaje de error amigable al usuario
            setErrorMessage("Error al iniciar sesión. Por favor, verifica tu email y contraseña.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Entrar</button>
        </form>
    );
};  

export default LoginForm;