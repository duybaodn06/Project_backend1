module.exports = (query,products,countProducts) => {
    //init info of pages
    let objectPagination = {
        limitItems: 5,
        currentPage: 1,
        //skip: ...,
        //totalPages: ...,

    }

    //count number of pages
    
    objectPagination.totalPages = Math.ceil(countProducts/objectPagination.limitItems)

    //set current page
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page)
    }

    //cal skip pages and attach to Products
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    return objectPagination;
}
    