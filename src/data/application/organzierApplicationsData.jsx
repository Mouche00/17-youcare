import {fetchApplicationsOfOrganizer} from "./applicationService.jsx";


export const getApplicationsOfOrganizer = async () => {
    const response = await fetchApplicationsOfOrganizer();
    return {
        "applications" : response.data.applications
    }
}

