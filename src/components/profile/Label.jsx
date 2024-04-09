import React from 'react'

const Label = ({ name, classes }) => {
    name = name.charAt(0).toUpperCase() + name.slice(1)
    return <p className={`text-lg text-white bg-secondary rounded py-2 px-4 ${classes}`}>{name}</p>
}

export default Label