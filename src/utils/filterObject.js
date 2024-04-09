const filterObject = (object, condition = null) => {
    let filteredObj = Object.keys(object).reduce((r, e) => {
        if(object[e].trim()) r[e] = object[e]
        return r
    }, {})

    return filteredObj
}

export default filterObject