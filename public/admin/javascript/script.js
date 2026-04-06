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

const checkboxMulti = document.querySelector('[checkbox-multi]')
if (checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector('input[name="checkall"]')
    const inputsId = checkboxMulti.querySelectorAll('input[name="id"]')
    inputCheckAll.addEventListener('click', () => {
        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true
            })
        }
        else {
            inputsId.forEach(input => {
                input.checked = false
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener('click',()=>{
            const countChecked = checkboxMulti.querySelectorAll('input[name="id"]:checked').length
            if (countChecked == inputsId.length){
                inputCheckAll.checked = true
            } 
            else inputCheckAll.checked = false
        })
    })
}



const formChangeMulti = document.querySelector('[form-change-multi]')
if (formChangeMulti){
    formChangeMulti.addEventListener('submit', (event) => {
        event.preventDefault()
        const typeChange = (event.target.elements.type.value)
        const checkboxMulti = document.querySelector('[checkbox-multi]')
        const inputsChecked = checkboxMulti.querySelectorAll('input[name="id"]:checked')
        
        if(inputsChecked.length > 0) {
            let ids =[]
            const inputIds = formChangeMulti.querySelector('input[name="ids"]') 
            
            inputsChecked.forEach(input => {
                const id = input.getAttribute('value')
                if(typeChange == 'change-position'){
                    const position = input.closest('tr').querySelector('input[name="position"]').value
                    ids.push(`${id}-${position}`)
                }else{
                    ids.push(id)
                }
            })
            
            inputIds.value = (ids.join(", "))
            formChangeMulti.submit()
        }else {
            alert('Vui lòng chọn ít nhất 1 bản ghi')
        }
    })
}




const deleteButtons = document.querySelectorAll('[button-delete]')
if (deleteButtons.length > 0){
    const formDeleteItem = document.querySelector('#form-delete-item')
    const path = formDeleteItem.getAttribute('data-path')
    deleteButtons.forEach(btn => {
        console.log
        btn.addEventListener('click', () => {
            const isConfirm = confirm('Bạn có chắc muốn xóa sản phẩm này không?')
            if (isConfirm){
                const buttonId = btn.getAttribute('data-id')
                formDeleteItem.action = `${path}/${buttonId}?_method=DELETE`
                
                formDeleteItem.submit()
            }
            
        })
    })
}

//Show alert
const showAlert = document.querySelector('[show-alert]')
if (showAlert) {
    const time = showAlert.getAttribute('data-time')
    const closeAlert = showAlert.querySelector('[close-alert]')
    setTimeout(() => {
        showAlert.classList.add('alert-hidden')
    },time)
    closeAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden')
    })
}
//End show alert

const uploadImage = document.querySelector('[upload-image]')
if(uploadImage) {
    const uploadImageInput = document.querySelector('[upload-image-input]')
    const uploadImagePreview = document.querySelector('[upload-image-preview]')
    uploadImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0]
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file)
        }
    })
}