import {useEffect, useState} from "react";
import PropTypes from "prop-types";


const VueChoice = ({setApplicationsAsMainVue,setAnnouncementsAsMainVue,setCreateAnnouncementAsMainVue,activeView}) => {

    const [view,setView] = useState(activeView);

    useEffect(() => {
        setView(activeView);
    }, [activeView]);

    return(
        <div className='flex w-full justify-center items-center gap-[2rem] mt-[5rem]'>
            <button onClick={setAnnouncementsAsMainVue} className={`font-medium ${(view === 'announcements') ? 'border-b-2 border-secPink text-secPink' : ''}`}>My announcements</button>
            <button onClick={setApplicationsAsMainVue} className={`font-medium ${(view === 'applications') ? 'border-b-2 border-secPink text-secPink' : ''}`}>View applications</button>
            <button onClick={setCreateAnnouncementAsMainVue} className={`font-medium ${(view === 'create') ? 'border-b-2 border-secPink text-secPink' : ''}`}>Make Announcement</button>
        </div>
    )
}

VueChoice.propTypes = {
    setApplicationsAsMainVue : PropTypes.func.isRequired,
    setAnnouncementsAsMainVue : PropTypes.func.isRequired,
    setCreateAnnouncementAsMainVue : PropTypes.func.isRequired,
    activeView : PropTypes.string.isRequired
}
export default VueChoice;