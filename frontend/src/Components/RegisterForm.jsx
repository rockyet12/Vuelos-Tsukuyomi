import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
    const [Nombre, setNombre] = useState('');
    const [Apellido, setApellido] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar el mensaje de error anterior

        if (Password !== ConfirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }

        try {
            const response = await axios.post('https://localhost:7123/api/clientes', {
                // Asegúrate de que estos nombres de propiedad coincidan con tu modelo Cliente en C#
                Nombre,
                Apellido,
                Email,
                Password,
            });
            console.log("Registro exitoso:", response.data);
            alert("¡Registro exitoso!");
        } catch (error) {
            console.error("Error en el registro:", error.response?.data || error.message);
            setErrorMessage("Error en el registro. Por favor, intenta de nuevo.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registrarse</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                <label>Nombre:</label>
                <input type="text" value={Nombre} onChange={(e) => setNombre(e.target.value)} required />
            </div>
            <div>
                <label>Apellido:</label>
                <input type="text" value={Apellido} onChange={(e) => setApellido(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>Confirmar Contraseña:</label>
                <input type="password" value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default RegisterForm;