module.exports = (query) => {
    let filerStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Hoạt động",
            status: "active",
            class: ""
        },
        {
            name: "Dừng hoạt động",
            status: "inactive",
            class: ""
        }
    ]
    
    if (query.status){
        const index = filerStatus.findIndex(item => item.status == query.status)
        filerStatus[index].class = 'active'
    }
    else {
        const index = filerStatus.findIndex(item => item.status == '')
        filerStatus[index].class = 'active'
    }
    return filerStatus;
}