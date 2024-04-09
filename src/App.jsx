import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import Routers from "./routes/Routers";
import { AuthProvider } from "@contexts/AuthContext";

function App() {
    return (
        <>
            <AuthProvider>
                <RouterProvider router={Routers} />
            </AuthProvider>
        </>
    );
}

export default App;
