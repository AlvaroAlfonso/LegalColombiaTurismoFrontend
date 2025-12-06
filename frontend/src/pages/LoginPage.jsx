import React from 'react';
import { useForm } from 'react-hook-form'; // <-- Importar Hook Form
import { zodResolver } from '@hookform/resolvers/zod'; // <-- Resolver para Zod
import * as z from 'zod'; // <-- Importar Zod
import './styles/LoginPage.css'; 

const LoginSchema = z.object({
    email: z.string().email({ message: "Formato de correo inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    remember: z.boolean().optional(),
});

function LoginPage() {
    // 2. Integrar React Hook Form y Zod
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(LoginSchema), // Usar el esquema definido
    });

    // Función que se ejecuta si la validación es exitosa
    const onSubmit = (data) => {
        console.log("Datos de Login Válidos:", data);
        alert("¡Inicio de Sesión Válido!");
        // Aquí iría la lógica de autenticación (API call)
    };

    return (
        <div className="login-page-container">
            <div className="login-form-wrapper">
                <h2 className="login-title">Tu Puerta de Entrada a la Legalidad Turística</h2>
                
                {/* 3. Adjuntar handleSubmit y onSubmit al formulario */}
                <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                    
                    {/* Campo Correo Electrónico */}
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        {/* 4. Adjuntar la función register y el nombre del campo */}
                        <input 
                            type="email" 
                            id="email" 
                            placeholder=" " 
                            {...register("email")}
                        />
                        {/* Mostrar error si existe */}
                        {errors.email && <p className="error-message">{errors.email.message}</p>}
                    </div>
                    
                    {/* Campo Contraseña */}
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder=" " 
                            {...register("password")}
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </div>
                    
                    {/* Checkbox Recordar Información */}
                    <div className="form-checkbox">
                        <input type="checkbox" id="remember" {...register("remember")} />
                        <label htmlFor="remember">Recordar información</label>
                    </div>
                    
                    {/* Botón de Registro */}
                    <button type="submit" className="btn-login-submit">
                        Iniciar Sesión
                    </button>
                    
                    {/* Enlaces de Recuperación / Registro */}
                    <div className="login-links">
                        <p className="forgot-password">¿Olvidó su Contraseña?</p>
                        <p className="register-link">
                            ¿Aún no tiene cuenta? <a href="/registrarse">Regístrese aquí</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;