import MyAnnouncements from "./MyAnnouncements.jsx";
import Applications from "./Applications.jsx";
import CreateAnnouncement from "./CreateAnnouncement.jsx";
import {useEffect, useState} from "react";



const Content = ({activeVue}) => {
    const [view,setView] = useState(activeVue);

    useEffect(() => {
        setView(activeVue);
    }, [activeVue]);
    return(
        <div className='w-[60%] rounded-2xl mx-auto bg-background h-[60vh] mt-[3rem] px-[5%] py-[1.5rem] '>
            {view === 'applications' && <Applications/>}
            {view === 'announcements' && <MyAnnouncements/>}
            {view === 'create' && <CreateAnnouncement/>}
        </div>
    )
}

export default Content