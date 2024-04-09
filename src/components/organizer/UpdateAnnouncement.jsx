import {useEffect, useState} from "react";
import InputMultiValues from "../ui/InputMultiValues.jsx";
import {updateListing} from "../../data/listing/listingService.jsx";


const UpdateAnnouncement = ({hideForm,listing,afterUpdatingListing,syncAllListingsData}) => {

    const [formData,setFormData] = useState({
        title : listing.title,
        description : listing.description,
        date : listing.date,
        location : listing.location,
        skills : listing.skills
    });
    const [errors, setErrors] = useState({
        global : '',
        title: "",
        description: "",
        date: "",
        location: "",
        skills: "",
    });

    const handleSkillsChange = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            let newSkill = e.target.value.trim();
            if (newSkill !== "") {
                setFormData((prevSkills) => ({
                    ...prevSkills,
                    skills: [
                        ...prevSkills.skills,
                        newSkill,
                    ],
                }));
                e.target.value = "";
            }
        }
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = formData.skills.filter(
            (_, i) => i !== index
        );
        setFormData((prevSkills) => ({
            ...prevSkills,
            skills: updatedSkills,
        }));
    };

    const handleDataChange = (e) => {
        const { name , value } = e.target;
        setFormData(
            {
                ...formData,
                [name]: value,
            }
        )
    }

    useEffect(() => {
        setFormData(listing)
    }, [listing]);


    const handleUpdateAction = async (e) => {
        e.preventDefault();
        const response = await updateListing(formData);
        if(response.status === 200){
            hideForm();
            afterUpdatingListing();
            syncAllListingsData(formData)
        }
        else if(response.status === 'error'){
            setErrors({
                global : response.message
            })
        }
    }

    return (
        <form className='w-full flex flex-col gap-[1.25rem] items-center justify-center py-[2rem]' method='PUT' onSubmit={handleUpdateAction}>
            <div className="w-[40%]">
                <input type="text"
                       name='title'
                       onChange={handleDataChange}
                       defaultValue={formData.title}
                       className="w-full h-12 px-4 py-1 rounded-md border border-third text-gray focus:outline-none"
                       placeholder="Title"/>
            </div>
            <div className="w-[40%]">
                <input type="text"
                       name='description'
                       onChange={handleDataChange}
                       defaultValue={formData.description}
                       className="w-full h-12 px-4 py-1 rounded-md border border-third text-gray focus:outline-none"
                       placeholder="Description"/>
            </div>

            <div className="w-[40%]">
                <input type="text"
                       name='location'
                       onChange={handleDataChange}
                       defaultValue={formData.location}
                       className="w-full h-12 px-4 py-1 rounded-md border border-third text-gray focus:outline-none"
                       placeholder="Location"/>
            </div>
            <div className="w-[40%]">
                <input type="date"
                       name='date'
                       onChange={handleDataChange}
                       defaultValue={formData.date}
                       className="w-full h-12 px-4 py-1 rounded-md border border-third text-gray focus:outline-none"
                       placeholder="date"/>
            </div>
            <div className="w-[40%]">
                <InputMultiValues
                    data={formData.skills}
                    handleChange={handleSkillsChange}
                    handleRemove={handleRemoveSkill}
                    error={errors.skills}
                />
            </div>
            <p className='text-red font-medium text-[0.9rem]'>
                {(errors.global  !== "") &&  errors.global}
            </p>
            <button
                className='px-[0.5rem] py-[0.4rem] rounded-lg w-[25%] bg-pink text-white font-medium mt-[1rem]'>Update
            </button>
        </form>
    )
}

export default UpdateAnnouncement