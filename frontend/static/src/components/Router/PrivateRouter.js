import { Routes, Route, Link, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuth, children }) => {
  if (!isAuth) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

export default PrivateRoute;