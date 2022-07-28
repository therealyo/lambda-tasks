const isEmptyQuery = (query) => {
    return Object.keys(query).length === 0;
}

module.exports = {
    isEmptyQuery
}