import { serviceFetchUser, updateUser } from "./UserService";
import filterObject from "../../utils/filterObject";

export const getUser = async () => {
    try {
        let response = await serviceFetchUser()
        response = {
            ...response,
            data: {
                ...response.data,
                user: {
                    ...response.data.user,
                    role: 'test'
                }
            }
        }
        
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("User not authenticated. Redirecting to login page...");
        } else {
            console.error("Error fetching user data:", error);
        }
    }
}

export const editUser = async (data) => {

    data = filterObject(data)

    try {
        const response = await updateUser(data)
        return response.data.user;
    } catch (error) {
        console.log("Error updating user: ", error)
        throw error
    }
}