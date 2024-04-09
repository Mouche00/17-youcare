import InputMultiValues from "@components/ui/InputMultiValues";
import Input from "@components/ui/Input";
import { useState } from "react";
import { createListing } from "../../data/listing/listingService";
const CreateAnnouncement = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        competences: [],
    });
    const [errors, setFormmErrors] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        competences: "",
    });
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
    const handleRemoveCompetences = (index) => {
        const updatedCompetences = formData.competences.filter(
            (_, i) => i !== index
        );
        setFormData((prevCompetences) => ({
            ...prevCompetences,
            competences: updatedCompetences,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createListing(formData)
            .then((response) => {
                if (!response.ok) {
                    console.error("Connetion problem");
                }
                return response;
            })
            .then((json) => {
                console.log(json);
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    setFormmErrors(error.response.data.errors);
                }
            });
    };
    console.log(errors);
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col  items-center justify-center py-[2rem]"
        >
            <div className="w-[50%]">
                <Input
                    type={"text"}
                    handleChange={(e) =>
                        setFormData({
                            ...formData,
                            title: e.target.value,
                        })
                    }
                    value={formData.title}
                    classInput={
                        "text-sm px-3 text-slate-700  py-2 outline-none block w-full mt-1 focus:border-secondary focus:ring-4 focus:ring-primary/10 transition-all rounded-md  border-2"
                    }
                    placeholder={"Title"}
                    error={errors.title}
                />
            </div>
            <div className="w-[50%]">
                <Input
                    type={"text"}
                    handleChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value,
                        })
                    }
                    value={formData.description}
                    classInput={
                        "text-sm px-3 text-slate-700  py-2 outline-none block w-full mt-1 focus:border-secondary focus:ring-4 focus:ring-primary/10 transition-all rounded-md  border-2"
                    }
                    placeholder={"Description"}
                    error={errors.description}
                />
            </div>

            <div className="w-[50%]">
                <Input
                    type={"date"}
                    handleChange={(e) =>
                        setFormData({
                            ...formData,
                            date: e.target.value,
                        })
                    }
                    value={formData.date}
                    classInput={
                        "text-sm px-3 text-slate-700  py-2 outline-none block w-full mt-1 focus:border-secondary focus:ring-4 focus:ring-primary/10 transition-all rounded-md  border-2"
                    }
                    error={errors.date}
                />
            </div>
            <div className="w-[50%]">
                <Input
                    type={"text"}
                    handleChange={(e) =>
                        setFormData({
                            ...formData,
                            location: e.target.value,
                        })
                    }
                    value={formData.location}
                    classInput={
                        "text-sm px-3 text-slate-700  py-2 outline-none block w-full mt-1 focus:border-secondary focus:ring-4 focus:ring-primary/10 transition-all rounded-md  border-2"
                    }
                    placeholder={"Location"}
                    error={errors.location}
                />
            </div>

            <div className="w-[50%]">
                <InputMultiValues
                    data={formData.competences}
                    handleChange={handleCompetenceChange}
                    handleRemove={handleRemoveCompetences}
                    error={errors.competences}
                />
            </div>
            <button className="px-[0.5rem] py-[0.4rem] rounded-lg w-[25%] bg-pink text-white font-medium mt-[1rem]">
                Create
            </button>
        </form>
    );
};

export default CreateAnnouncement;
