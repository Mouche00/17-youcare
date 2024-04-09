import React from 'react'

const Sticker = ({ children, classes }) => <p className={`text-6xl text-white font-black bg-primary py-8 px-16 rounded ${classes}`}>{ children }</p>

export default Sticker