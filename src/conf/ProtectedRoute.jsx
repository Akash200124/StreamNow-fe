import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { combineSlices } from "@reduxjs/toolkit";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.status);
    
    console.log("isAuthenticated", isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
