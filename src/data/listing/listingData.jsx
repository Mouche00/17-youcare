import {fetchListings, fetchSpecificListing} from './listingService'

export const getListings = async (query = '', page = '1', ) => {
    try {
        const response = await fetchListings(query, page)
        return {
            'data': response.data.listings.data,
            'links': response.data.listings
        }
    } catch (error) {
        throw error
    }
}

export const getListing = async (id) => {
    const res = await fetchSpecificListing(id);
    return{
        'listing' : res.data.listing
    }
}