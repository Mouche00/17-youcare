import React, { useState } from 'react'
import Button from './button/Button'

const Pagination = ({ pages, page, onPageChange }) => {
    // const currentPage = pages.current_page
    const pageCount = pages.last_page
    const links = pages.links
    const previousPage = links.find((e) => e.label.includes(page - 1) && page > 1) || null
    const nextPage = links.find((e) => e.label.includes(page + 1) && page < pageCount) || null

    const activeStyle = 'bg-primary text-white border-solid'

    const handleActiveLinkChange = (e) => {
        onPageChange(e.target.dataset.id)
    }

    return (
        <div className='flex justify-center items-center pt-10'>
            {[...Array(pageCount)].map((x, i) => (
                <Button
                    dataId={i+1}
                    key={i+1}
                    buttonClass={`p-4 border-2 border-white m-2 ${links[i+1].label.includes(page) ? activeStyle : 'bg-transparent text-white border-dashed'}`}
                    onClick={handleActiveLinkChange}
                >
                    {links[i+1].label}
                </Button>
            ))}
        </div>
    )
}

export default Pagination