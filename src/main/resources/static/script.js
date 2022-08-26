const allUser = document.getElementById('allUserTable')
const requestURL = 'http://localhost:8080/api/users'
let output = ''
// GET
fetch(requestURL)
    .then(res => res.json())
    .then(data => {
        data.forEach(post => {
            const rolesNames = []
            post.roles.forEach(role => {
                rolesNames.push(role.name.substring(5))
            })
            output += `
                <tr>
                    <td>${post.id}</td>
                    <td>${post.firstName}</td>
                    <td>${post.lastName}</td>
                    <td>${post.age}</td>
                    <td>${post.email}</td>
                    <td>${rolesNames.join(' ')}</td>
                    <td>
                        <!-- Кнопка-триггер модального окна -->
                        <button type="button" class="btn btn-info" data-toggle="modal"
                                data-target="${'#editUser' + post.id}">
                            Edit
                        </button>
                        <!-- Модальное окно -->
                        
                    </td>
                </tr>
                `
        })
        allUser.innerHTML = output
    })