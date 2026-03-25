module.exports = (query) => {
    let objectSearch = {
        keyword: ""
    }
    if (query.keyword){
        objectSearch.keyword = query.keyword
        const regexp = new RegExp(objectSearch.keyword,'i') 
        objectSearch.regexp = regexp
    }
    return objectSearch
}
