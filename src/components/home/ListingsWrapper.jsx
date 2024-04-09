import React from 'react'

const ListingsWrapper = ({ children, classes }) => {
    return (
        <div
            className={`${classes}`}
        >
            { children }
        </div>
    )
}

export default ListingsWrapper