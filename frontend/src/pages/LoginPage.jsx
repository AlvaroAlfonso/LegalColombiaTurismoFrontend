import React from 'react';
import { useForm } from 'react-hook-form'; // <-- Importar Hook Form
import { zodResolver } from '@hookform/resolvers/zod'; // <-- Resolver para Zod
import * as z from 'zod'; // <-- Importar Zod
import './styles/LoginPage.css'; 
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginSchema = z.object({
    email: z.string().email({ message: "Formato de correo inválido" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    remember: z.boolean().optional(),
});

function LoginPage() {
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({
        resolver: zodResolver(LoginSchema), // Usar el esquema definido
    });

    const onSubmit = async (data) => {
        try {
            const response = await login(data);
            const role = response?.user?.role || response?.user?.rol;
            if (role === 'turista') {
                navigate('/dashboard-turista');
            } else if (role === 'empresa') {
                navigate('/dashboard-empresa');
            } else {
                navigate('/dashboard-proveedor');
            }
        } catch (err) {
            // error ya se maneja en el contexto
        }
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
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                    {error && <p className="error-message">{String(error)}</p>}
                    
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