import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "@components/navbar/Navbar";
import { useAuth } from "@contexts/AuthContext";
const AuthLayout = () => {
    const { token, user } = useAuth();
    // Redirect User is  Already Login
    if (token) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AuthLayout;
