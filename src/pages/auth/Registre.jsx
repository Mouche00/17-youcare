import React, { useState } from "react";
import Form from "@components/ui/Form";
import Input from "@components/ui/Input";
import Button from "@components/ui/button/Button";
import InputMultiValues from "@components/ui/InputMultiValues";
import instance from "../../services/api/api";
import { useAuth } from "../../hooks/contexts/AuthContext";
const Registre = () => {
    const [currentButton, setCurrentButton] = useState(false);
    const { setToken, token, user, setUser } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "volunteer",
        competences: [],
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        competences: "",
    });

    const handleRemoveCompetences = (index) => {
        const updatedCompetences = formData.competences.filter(
            (_, i) => i !== index
        );

        setFormData((prevCompetences) => ({
            ...prevCompetences,
            competences: updatedCompetences,
        }));
    };

    const handleCompetenceChange = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            let newCompetence = e.target.value.trim();
            if (newCompetence !== "") {
                setFormData((prevCompetences) => ({
                    ...prevCompetences,
                    competences: [
                        ...prevCompetences.competences,
                        newCompetence,
                    ],
                }));
                e.target.value = "";
            }
        }
    };
    const handleRoleOrganizer = () => {
        setCurrentButton(true);
        setFormData({
            ...formData,
            role: "organizer",
        });
    };

    const handleRoleVolunteer = () => {
        setCurrentButton(false);
        setFormData({
            ...formData,
            role: "volunteer",
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({
            name: "",
            email: "",
            password: "",
            competences: "",
        });
        try {
            const response = await instance.post("/register", formData);

            if (response.status) {
                if (response.data.status) {
                    setToken(response.data.authorization.token);
                    setUser(response.data.user);
                } else {
                    if (response.data.data.name) {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            name: response.data.data.name[0],
                        }));
                    }
                    if (response.data.data.email) {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            email: response.data.data.email[0],
                        }));
                    }
                    if (response.data.data.password) {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            password: response.data.data.password[0],
                        }));
                    }
                    if (
                        formData.role === "volunteer" &&
                        response.data.data.competences
                    ) {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            competences: response.data.data.competences[0],
                        }));
                    }
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center w-full justify-center bg-slate-50">
            <Form handleSubmit={handleSubmit}>
                <div>
                    <h5 className="text-center text-4xl text-secondary">
                        Youcare
                    </h5>
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            type={"button"}
                            onClick={handleRoleOrganizer}
                            buttonClass={`border-2 border-primary text-sm py-1.5 ${
                                currentButton ? "active" : ""
                            }`}
                        >
                            Organizer
                        </Button>
                        <Button
                            type={"button"}
                            onClick={handleRoleVolunteer}
                            buttonClass={`border-2 border-primary text-sm py-1.5 ${
                                !currentButton ? "active" : ""
                            }`}
                        >
                            Volunteer
                        </Button>
                    </div>
                </div>
                <input type={"hidden"} value={formData.role} name={"role"} />
                <Input
                    label={"Name"}
                    type={"text"}
                    handleChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value,
                        })
                    }
                    value={formData.name}
                    classInput={
                        "text-sm px-3 text-slate-700  py-2 outline-none block w-full mt-1 focus:border-secondary focus:ring-4 focus:ring-primary/10 transition-all rounded-md  border-2"
                    }
                    placeholder={"Name"}
                    error={errors.name}
                />
                <Input
                    label={"Email"}
                    type={"text"}
                    handleChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value,
                        })
                    }
                    value={formData.email}
                    classInput={
                        "text-sm px-3 text-slate-700  py-2 outline-none block w-full mt-1 focus:border-secondary focus:ring-4 focus:ring-primary/10 transition-all rounded-md  border-2"
                    }
                    placeholder={"Email"}
                    error={errors.email}
                />

                <Input
                    label={"Password"}
                    type={"password"}
                    handleChange={(e) =>
                        setFormData({
                            ...formData,
                            password: e.target.value,
                        })
                    }
                    value={formData.password}
                    name={"password"}
                    classInput={
                        "text-sm px-3  text-slate-700 py-2 outline-none block w-full mt-1 focus:border-secondary focus:ring-4 focus:ring-primary/10 transition-all rounded-md  border-2"
                    }
                    placeholder={"Password"}
                    error={errors.password}
                />
                {!currentButton && (
                    <InputMultiValues
                    label={competences}
                        data={formData.competences}
                        handleChange={handleCompetenceChange}
                        handleRemove={handleRemoveCompetences}
                        error={errors.competences}
                    />
                )}

                <Button
                    type={"submit"}
                    buttonClass={" text-white bg-primary w-full"}
                >
                    Register
                </Button>
            </Form>
        </div>
    );
};

export default Registre;
