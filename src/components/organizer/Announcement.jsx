

import edit from '../../assets/images/edit.png'
const Announcement = ({listing,showUpdateForm,deleteListing}) => {
    return (
            <div className="w-[30%] mx-auto">
                <div className="relative group">
                    <div
                        className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div
                        className="relative  pt-6 pb-3 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col gap-[1rem] items-top justify-start ">
                        <div className='flex items-center w-[80%] justify-between mx-auto '>
                            <p>{listing.title}</p>
                        </div>
                        <p className='text-gray font-medium px-[10%] text-[0.9rem]'>{listing.description}</p>
                        <p className='px-[10%] font-medium text-pink text-[0.85rem]'>{listing.date}</p>
                        <p className='font-medium text-[0.9rem] px-[10%]'>required skills : <span className='text-pink'>{listing.skills.map(skill => <span key={skill}>{skill} , </span>)}</span>
                        </p>
                        <div className='w-full flex justify-end gap-[7.5px] items-center px-[5%]'>
                            <img data-id={listing.id} src={edit} className='w-7 h-7 cursor-pointer' onClick={showUpdateForm} alt=""/>
                            <button  onClick={() => deleteListing(listing.id)} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red mt-[6px]" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Announcement;