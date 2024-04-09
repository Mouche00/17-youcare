
const Application = ({application,approveApplication,declineApplication}) => {
    return (
        <div
            className="w-[45%] flex justify-between px-3 py-1 bg-white items-center gap-1 rounded-lg border border-gray-100 my-3">
            <div>
                <span className="font-mono">{application.volunteer_name} applied for Your Listing {application.listing_title}</span>
            </div>
            <div className="flex gap-2">
                <button onClick={() => approveApplication({
                    "application_id" : application.id
                })}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
                <button onClick={() => declineApplication({
                        "application_id" : application.id
                    })}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Application;