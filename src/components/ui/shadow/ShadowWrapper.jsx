import React from 'react'

const ShadowWrapper = ({ children, classes }) => {
    return (
        <div className={`relative z-10 ${classes}`}>
            { children }
        </div>
    )
}

export default ShadowWrapper