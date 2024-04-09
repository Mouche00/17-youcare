
import logo from '../../assets/images/Logo.png'
import profile from '../../assets/images/user.png'

const OrganizerHeader = () => {
    return(
        <div className='flex flex-col gap-[2rem]'>
            <div className='h-[100px] flex items-center w-[80%] mx-auto justify-between'>
                <img src={logo} className='w-[150px] h-[40px]' alt="logo"/>
                <div className='flex gap-[10px] items-center'>
                    <p className='text-primary font-medium'>Mouchyy Pussy</p>
                    <img src={profile} className='w-[60px] h-[55px]' alt="Profile"/>
                </div>
            </div>
            <div>
                <p className='text-center underline text-xl font-medium text-pink'>Organizers Dashboard</p>
            </div>
        </div>
    )
}
export default OrganizerHeader