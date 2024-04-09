import instance from "@/services/api/api";

export const serviceFetchUser = async () => {
    try {
        const response = await instance.get("/user");
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("User not authenticated. Redirecting to login page...");
        } else {
            console.error("Error fetching user data:", error);
        }
    }
};

export const updateUser = async (data) => {
    console.log(data)
    try {
        const response = await instance.put("/user/update", data);
        return response;
    } catch (error) {
        throw error
    }
};
