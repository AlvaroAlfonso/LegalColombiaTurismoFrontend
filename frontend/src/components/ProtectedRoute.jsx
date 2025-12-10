import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const hasAllowedRole = (userRole, allowedRoles = []) => {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  if (!userRole) return false;

  const normalizedUserRole = userRole.toLowerCase();
  const normalizedAllowedRoles = allowedRoles.map(r => r.toLowerCase());

  return normalizedAllowedRoles.includes(normalizedUserRole);
};

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  if (!hasAllowedRole(role, allowedRoles)) {
    // Si tienes roles pero no el correcto, te mandamos al home o a una página de "No autorizado"
    return <Navigate to="/" replace />;
  }

  return children;
}

