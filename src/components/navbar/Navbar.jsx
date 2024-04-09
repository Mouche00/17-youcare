import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import instance from "@/services/api/api";
import "./navbar.css";
const Navbar = () => {
    const { user } = useAuth();
    const handleLogout = async () => {
        try {
            const resp = await instance.post("/logout");
            if (resp.status === 200) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.location.href = "/";
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    return (
        <nav className="shadow shadow-black/10 py-4">
            <div className="container mx-auto w-[85%]">
                <div className="flex items-center justify-between">
                    <div>
                        <Link to="/">
                            <h2 className="text-3xl text-primary">Youcare</h2>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <ul className="flex items-center gap-2">
                            <li>
                                <Link
                                    to="/home"
                                    className="text-secondary/90 hover:text-secondary"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/home"
                                    className="text-secondary/90 hover:text-secondary"
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                        <div className="ml-7">
                            {!user && (
                                <>
                                    <Link
                                        to="login"
                                        className="text-white bg-primary border-2 px-6 border-primary py-2 rounded-md mx-3"
                                    >
                                        <button>Login</button>
                                    </Link>
                                    <Link
                                        to={"register"}
                                        className="text-primary border-2 border-primary px-6 py-2 rounded-md"
                                    >
                                        <button>Register</button>
                                    </Link>
                                </>
                            )}
                            {user && (
                                <>
                                    <div className="relative flex items-center show__dropdown">
                                        <FaRegUserCircle className="text-3xl cursor-pointer block text-primary" />
                                        <div className="mx-2">{user.name}</div>

                                        <ul className="absolute  top-[110%] right-0  min-w-[200px] z-50  dropdown  shadow rounded-md bg-white p-5">
                                            {user.organizer && (
                                                <li className="my-2">
                                                    <Link
                                                        to={"/dashboard"}
                                                    >
                                                        Dashboard
                                                    </Link>
                                                </li>
                                            )}
                                            <li className="my-2">
                                                <a
                                                    href="#"
                                                    onClick={handleLogout}
                                                >
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
