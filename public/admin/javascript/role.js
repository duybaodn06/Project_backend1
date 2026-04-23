//permissions
const tablePermissions = document.querySelector('[table-permissions]')
if (tablePermissions){
    const btnSubmit = document.querySelector('[button-submit]')
    btnSubmit.addEventListener('click', ()=> {
        let permissions = []
        const row = tablePermissions.querySelectorAll('[data-name]')
        row.forEach(item => {
            const name = item.getAttribute('data-name')
            const inputs = item.querySelectorAll('input')
            if (name == 'id'){
                inputs.forEach(input => {
                    const id = input.value
                    permissions.push({
                        id: id,
                        permissions: []
                    })
                })
            }
            else{
                inputs.forEach((input,index) => {
                    if (input.checked == true)
                    permissions[index].permissions.push(item.getAttribute('data-name'))           
                })
            }  
        })
        if (permissions.length > 0){
            const formSubmit = document.querySelector('#form-change-permissions')
            if (formSubmit){
                const formInput = formSubmit.querySelector('[name="permissions"]')
                formInput.value = JSON.stringify(permissions)
                formSubmit.submit()
            }
        }
        
    })
}
//end permissions

//permissions default
const dataRecords = JSON.parse(document.querySelector('[data-records]').getAttribute('data-records'))
if (dataRecords){
    const tablePermissions = document.querySelector('[table-permissions]')
    dataRecords.forEach((item,index) => {
        const permissions = item.permissions
        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name=${permission}]`)
            const input = row.querySelectorAll('input')[index]
            input.checked = true
        })

    })
}
//end permissions default