const buttonStatus = document.querySelectorAll('[button-status]')
if (buttonStatus.length > 0){
    

    buttonStatus.forEach(button => {
        button.addEventListener('click', ()=> {
            let url = new URL(window.location.href)
            const status = button.getAttribute('button-status')
            if (status) {
                url.searchParams.set("status", status)
            }else{
                url.searchParams.delete("status")
            }
            url.searchParams.delete('page')
            window.location.href = url.href
        })
    })
}

const formSearch = document.querySelector("#form-search")
if (formSearch){
    
    formSearch.addEventListener("submit", (e) => {
        let url = new URL(window.location.href)
        e.preventDefault()
        const keyWord = e.target.elements.keyword.value
        
        if (keyWord) {
            url.searchParams.set("keyword", keyWord)
        }else {
            url.searchParams.delete("keyword")
        }

        url.searchParams.delete('page')
        window.location.href = url.href
    })
}

const buttonPagination = document.querySelectorAll('[button-pagination]')
if (buttonPagination) {
    let url = new URL(window.location.href)
    buttonPagination.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('button-pagination')
            url.searchParams.set('page',page)
            window.location.href = url.href
        })
        
    })
    
}