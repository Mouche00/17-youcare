import {fetchAuthenticatedUserListings} from "./listingService.jsx";


export const authenticatedOrganizerListings = async () => {
    const res = await fetchAuthenticatedUserListings();
    return{
        'listings' : res.data.listings
    }
}

