import React, { useState } from "react";
import Form from "@components/ui/Form";
import Input from "@components/ui/Input";
import Button from "@components/ui/button/Button";
import { useAuth } from "@contexts/AuthContext";
import instance from "../../services/api/api";
import { Navigate } from "react-router-dom";

const Login = () => {
    const { setToken, token, user, setUser } = useAuth();
    const [pwdErr, setErrPwd] = useState("");
    const [emailErr, setErrEmail] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post("/login", formData);
            if (response.status === 200) {
                if (response.data.status) {
                    setToken(response.data.authorization.token);
                    setUser(response.data.user);
                } else {
                    if (response.data.data.email) {
                        setErrEmail(response.data.data.email[0]);
                    } else {
                        setErrEmail("");
                    }
                    if (response.data.data.password) {
                        setErrPwd(response.data.data.password[0]);
                    } else {
                        setErrPwd("");
                    }
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };
    return (
        <>
            <div className="min-h-[90vh] flex items-center w-full justify-center bg-slate-50">
                <Form handleSubmit={handleSubmit}>
                    <Input
                        label={"Email"}
                        type={"text"}
                        handleChange={handleChange}
                        value={formData.email}
                        name={"email"}
                        classInput={
                            "text-sm px-3 text-slate-700  py-2 outline-none block w-full mt-1 focus:border-secondary focus:ring-4 focus:ring-primary/10 transition-all rounded-md  border-2"
                        }
                        placeholder={"Email"}
                        error={emailErr}
                    />

                    <Input
                        label={"Password"}
                        type={"password"}
                        handleChange={handleChange}
                        value={formData.password}
                        name={"password"}
                        classInput={
                            "text-sm px-3  text-slate-700 py-2 outline-none block w-full mt-1 focus:border-secondary focus:ring-4 focus:ring-primary/10 transition-all rounded-md  border-2"
                        }
                        placeholder={"Password"}
                        error={pwdErr}
                    />
                    <Button
                        type={"submit"}
                        children={"Login"}
                        buttonClass={" text-white bg-primary w-full"}
                    />
                </Form>
            </div>
        </>
    );
};

export default Login;
