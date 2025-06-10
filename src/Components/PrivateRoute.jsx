import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (allowedRoles.includes(decoded.role)) {
      return children;
    }
  } catch {
    localStorage.removeItem('token');
    return <Navigate to="/" replace />;
  }

  // Unauthorized
  return <Navigate to="/" replace />;
}

export default PrivateRoute;
