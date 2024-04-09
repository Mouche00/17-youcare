import Announcement from "./Announcement.jsx";
import React, {useEffect, useState} from "react";
import {authenticatedOrganizerListings} from "../../data/listing/authenticatedOrganizerData.jsx";
import Spinner from "../ui/spinner/Spinner.jsx";
import UpdateAnnouncement from "./UpdateAnnouncement.jsx";
import {getListing} from "../../data/listing/listingData.jsx";
import {deleteListing, fetchSpecificListing} from "../../data/listing/listingService.jsx";

const MyAnnouncements = () => {
    const [listings,setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState('');
    const [shownUpdateForm,setShownUpdateForm] = useState(false);
    const [announcementToUpdate,setAnnouncementToUpdate] = useState(null);
    const [listingToUpdate,setListingToUpdate] = useState({});
    const [updateListingSuccess, setUpdateListingSuccess] = useState(false);
    const [deleteListingSuccess, setDeleteListingSuccess] = useState(false);
    const [updatedListing, setUpdatedListing] = useState(null);


    const showUpdateForm = (e) => {
        setShownUpdateForm(true);
        let id = e.target.dataset.id;
        setAnnouncementToUpdate(id);
    }
    const hideUpdateForm = () =>{
        setShownUpdateForm(false);
        setAnnouncementToUpdate(null);
    }
    const load = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 700);
    };
    const fetchMyListings = () => {
        const fetch = async () => {
            const response = await authenticatedOrganizerListings();
            setListings(response.listings);
        }

        fetch().catch(() => {
            load();
            setError("An error occured while fetching the data");
        });
        load();
    }

    const removeListing = async (listingId) =>{
        const response = await getListing(listingId);
        const listingToDelete = response.listing;
        const res = await deleteListing(listingToDelete);
        if(res.status === 200){
            setDeleteListingSuccess(true);
            fetchMyListings();
        }
    }


    const updateAllListings = (data) => {
        setUpdatedListing(data);
    }
    const afterUpdatingListing = () => {
        setUpdateListingSuccess(true);
    }
    const fetchListing = async (announcementId) => {
        const response = await getListing(announcementId);
        setListingToUpdate(response.listing);
    };

    useEffect(() => {
        if (updateListingSuccess) {
            const timer = setTimeout(() => {
                setUpdateListingSuccess(false);
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [updateListingSuccess]);
    useEffect(() => {
        if (deleteListingSuccess) {
            const timer = setTimeout(() => {
                setDeleteListingSuccess(false);
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [deleteListingSuccess]);

    useEffect(() => {
        fetchMyListings();
    }, []);

    useEffect(() => {
        if (updatedListing) {
            setListings(listings.map(listing => listing.id === updatedListing.id ? updatedListing : listing));
            setUpdatedListing(null);
        }
    }, [updatedListing]);

    useEffect(() => {
        if (announcementToUpdate !== null) {
            fetchListing(announcementToUpdate);
        }
    }, [announcementToUpdate]);



    // useEffect(() => {
    //     console.log(listingToUpdate);
    // }, [listingToUpdate]);

    return (
        <>
            {
                updateListingSuccess && <div className='flex mb-[1rem] w-[80%] rounded-lg mx-auto h-[40px]'>
                    <div className='h-full w-[2.5%]  rounded-l-lg bg-secGreen'></div>
                    <div className='w-[97.5%] h-full flex items-center rounded-r-lg bg-green text-white font-medium px-[2%]'>
                        <p>Listing Updated Successfully</p>
                    </div>
                </div>
            }
            {
                deleteListingSuccess && <div className='flex mb-[1rem] w-[80%] rounded-lg mx-auto h-[40px]'>
                    <div className='h-full w-[2.5%] rounded-l-lg bg-secRed'></div>
                    <div className='w-[97.5%] h-full flex items-center rounded-r-lg bg-red text-white font-medium px-[2%]'>
                        <p>Listing Deleted Successfully</p>
                    </div>
                </div>
            }
            <div
                className={`absolute w-full h-full inset-0 z-20 bg-primary bg-opacity-60 backdrop-blur-sm backdrop-filter-sm flex items-center justify-center ${!shownUpdateForm ? 'hidden' : ""}`}>
                <div className='w-[50%] h-[60vh] rounded-2xl bg-background'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red mt-[1rem] ml-[95%] cursor-pointer"
                         onClick={hideUpdateForm}
                         viewBox="0 0 20 20"
                         fill="currentColor">
                        <path fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </svg>
                    <UpdateAnnouncement syncAllListingsData={updateAllListings} afterUpdatingListing={afterUpdatingListing} hideForm={hideUpdateForm} listing={listingToUpdate}/>
                </div>
            </div>

            <div className='flex w-full h-full flex-wrap gap-[2rem] relative'>
                {
                    (loading) ? <Spinner/> : error ?
                        (
                            <div className='absolute inset-0 w-full h-full flex items-center justify-center'>
                                <p className=' font-medium text-red underline'>{error}</p>
                            </div>
                        ) : (listings.length === 0) ? (
                            <div className='absolute inset-0 w-full h-full flex items-center justify-center'>
                                <p className=' font-medium text-secPink underline'>You don't have any listings yet !</p>
                            </div>
                        ) : (
                                listings.map((listing) => <Announcement deleteListing={removeListing} showUpdateForm={showUpdateForm} key={listing.id} listing={listing}/>
                            )
                        )
                }
            </div>
        </>
    )
}
export default MyAnnouncements;