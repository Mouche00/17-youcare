import { React, useState } from "react";
import { useAuth } from "@contexts/AuthContext";
import { Navigate } from "react-router-dom";
import Label from "../../components/profile/Label";
import Info from "../../components/profile/Info";
import Form from "../../components/ui/Form";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/button/Button";
import instance from "../../services/api/api";
import { editUser } from "../../data/user/UserData";

const Profile = () => {
    const { token, user, setUser } = useAuth();
    const [loading, setLoading] = useState(false)
    if (!token || !user) {
        return <Navigate to={"/login"} />;
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await editUser(formData)
        setUser(response)
        setTimeout(
            () => setLoading(false),
            700
        )
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    console.log(formData);

    const role = user.organizer ? 'organizer' : 'volunteer'

    return (
        <>
            {loading ? (
                <div className="h-screen w-full flex items-center justify-center">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    <h2 className="text-secondary  mt-10 mb-20 text-center text-5xl">
                        My Profile
                    </h2>
                    <div className="my-5">
                        {/* <h3 className="text-4xl text-secPink text-center">
                            Welcome To Your Profile {user.name}
                        </h3> */}
                        <div className="grid grid-cols-3">
                            <div className="h-64 mx-16 px-24 flex flex-col items-center gap-4">
                                <Label
                                    name='INFO'
                                    classes='w-full text-center text-5xl font-black'
                                />
                                <img
                                    src="https://paintingvalley.com/images/abstract-self-portrait-painting-17.jpg"
                                    alt=""
                                    className="rounded-lg w-full"
                                />
                                <div className="w-full grid grid-cols-3 auto-cols-auto text-center gap-2">

                                    <Label name='name'/>
                                    <Info value={user.name}/>
                                    
                                    <Label name='email'/>
                                    <Info value={user.email}/>

                                    <Label name='role'/>
                                    <Info value={role}/>
                                </div>
                            </div>

                            <div className="col-span-2 space-y-4 px-64">
                                <Label
                                    name='UPDATE INFO'
                                    classes='w-full text-center text-5xl font-black'
                                />

                                <Form
                                    classes='w-full'
                                    handleSubmit={handleSubmit}
                                >
                                    <Input
                                        label='Name'
                                        name='name'
                                        divStyle={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px'
                                        }}
                                        classInput='px-2 py-1 rounded border-2 border-black'
                                        placeholder='name'
                                        handleChange={handleChange}
                                    />

                                    <Input
                                        label='Email'
                                        name='email'
                                        divStyle={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px'
                                        }}
                                        classInput='px-2 py-1 rounded border-2 border-black'
                                        placeholder='email'
                                        handleChange={handleChange}
                                    />

                                    <Input
                                        label='Password'
                                        name='password'
                                        divStyle={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '4px'
                                        }}
                                        classInput='px-2 py-1 rounded border-2 border-black'
                                        placeholder='password'
                                        handleChange={handleChange}
                                    />

                                    <Button
                                        type='submit'
                                        buttonClass='bg-primary text-white w-full'
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Profile;
