import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { json } from "react-router-dom";
import instance from "@/services/api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [user, setUser_] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );

    // Function to set the authentication token
    const setToken = (newToken) => {
        setToken_(newToken);
    };
    // set user to local storage
    const setUser = (user) => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
        setUser_(user);
    };
    useEffect(() => {
        if (token) {
            instance.defaults.headers.common["Authorization"] =
                "Bearer " + token;
            localStorage.setItem("token", token);
        } else {
            delete instance.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
        }
    }, [token]);

    // Memoized value of the authentication context
    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            user,
            setUser,
        }),
        [user, token]
    );

    // Provide the authentication context to the children components
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
