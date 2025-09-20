#Vuelos Tsukuyomi
Descripción del Proyecto

Este es un proyecto de aplicación web completa (full-stack) para Viajes Tsukoyomi, una plataforma de venta de productos. La aplicación consta de dos partes principales que se comunican entre sí: un back-end robusto y seguro y un front-end interactivo y dinámico.

Características Principales

    Autenticación de Usuarios: Permite a los usuarios registrarse e iniciar sesión de forma segura. El back-end gestiona la autenticación con hashing de contraseñas y JSON Web Tokens (JWT) para proteger las rutas.

    Roles de Usuario: La aplicación diferencia entre tres roles clave:

        Cliente: Puede ver y agregar productos al carrito de compras para finalizar pedidos.

        Vendedor: Puede agregar nuevos productos a la base de datos a través de un formulario de gestión.

        Gerente: Puede acceder a un panel de control para ver un reporte de todas las ventas.

    Gestión de Productos: Los clientes pueden ver una lista de productos disponibles, y los vendedores pueden añadir nuevos.

    Carrito de Compras: Un sistema de carrito de compras permite a los usuarios agregar, actualizar y eliminar productos antes de finalizar la compra.

Tecnologías Utilizadas

Back-End

    Lenguaje: C#

    Framework: ASP.NET Core

    Base de Datos: Entity Framework Core

    Seguridad: Autenticación JWT y encriptación de contraseñas

Front-End

    Librería: React.js

    Framework: Vite (o Create React App)

    Comunicación: Axios para las peticiones HTTP a la API.

    Enrutamiento: React Router DOM para la navegación.

Configuración e Instalación

Para ejecutar este proyecto de forma local, sigue los siguientes pasos para cada parte:

Back-End

    Abre una terminal en la carpeta /backend.

    Ejecuta el comando para iniciar el servidor:
    dotnet run

Front-End

    Abre una terminal en la carpeta /frontend.

    Instala las dependencias del proyecto:
    npm install

    Inicia el servidor de desarrollo:
    npm run start

La aplicación estará disponible en tu navegador en http://localhost:3000.

ERRORES A RESOLVER (xd)
Failed to compile.

Module not found: Error: Can't resolve '../api/api' in '/home/roque/Proyecto/frontend/src/components'
ERROR in ./src/components/SalesDashboard.jsx 6:0-35
Module not found: Error: Can't resolve '../api/api' in '/home/roque/Proyecto/frontend/src/components'
Proxima tareas 
agregacion de cors, terminar logica de compras y comprobar toda las funciones que anden correctamente
