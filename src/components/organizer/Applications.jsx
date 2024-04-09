import Application from "./Application.jsx";
import {useEffect, useState} from "react";
import {getApplicationsOfOrganizer} from "../../data/application/organzierApplicationsData.jsx";
import {approveApplication, declineApplication} from "../../data/application/applicationService.jsx";


const Applications = () => {

    const [applications,setApplications] = useState([]);
    const [applicationApprovedSuccess,setApplicationApprovedSuccess] = useState(false);
    const [applicationDeclinedSuccess,setApplicationDeclinedSuccess] = useState(false);


    const fetchApplications = async () =>{
        const response = await getApplicationsOfOrganizer();
        setApplications(response.applications);
    }

    const acceptApplication = async (application) =>{
        const response = await approveApplication(application);
        if(response.status === 201){
            setApplicationApprovedSuccess(true);
            fetchApplications();
        }
    }
    const refuseApplication = async (application) =>{
        const response = await declineApplication(application);
        if(response.status === 201){
            setApplicationDeclinedSuccess(true);
            fetchApplications();
        }
    }


    useEffect(() => {
        if (applicationApprovedSuccess) {
            const timer = setTimeout(() => {
                setApplicationApprovedSuccess(false);
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [applicationApprovedSuccess]);
    useEffect(() => {
        if (applicationDeclinedSuccess) {
            const timer = setTimeout(() => {
                setApplicationDeclinedSuccess(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [applicationDeclinedSuccess]);

    useEffect(() => {
        fetchApplications()
    }, []);

    return(
        <>
            {
                applicationApprovedSuccess &&
                <p className='text-center text-green mb-[1.5rem] font-medium underline'>Application approved successfully</p>            }
            {
                applicationDeclinedSuccess &&
                <p className='text-center text-green mb-[1.5rem] font-medium underline'>Application declined successfully</p>
            }
            <div className='flex w-full flex-wrap gap-[2rem]'>

                {
                    applications.length > 0 && applications.map((application) => <Application
                        approveApplication={acceptApplication} declineApplication={refuseApplication} key={application.id}
                        application={application}/>)
                }
            </div>

        </>

    )
}

export default Applications;