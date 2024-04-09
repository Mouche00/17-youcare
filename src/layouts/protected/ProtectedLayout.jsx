import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "@components/navbar/Navbar";
import { useAuth } from "@contexts/AuthContext";
import { getUser } from "@/data/user/UserData";

const ProtectedLayout = () => {
    const { token, user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    if (!token) {
        return <Navigate to={"/login"} />;
    }

    const loading = () => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };
    loading();

    
    return (
        <>
            {isLoading ? (
                <div className="h-screen w-full flex items-center justify-center">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    <header>
                        <Navbar user={user} />
                    </header>
                    <main>
                        <Outlet />
                    </main>
                </>
            )}
        </>
    );
};

export default ProtectedLayout;
