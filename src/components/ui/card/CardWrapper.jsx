import React from 'react'

const CardWrapper = ({ children }) => {
    return (
        <div
            className='w-full p-8 my-4 flex flex-wrap items-center justify-center gap-10'
        >
            { children }
        </div>
    )
}

export default CardWrapper