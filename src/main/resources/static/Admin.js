const requestURL = 'http://localhost:8080/api/users'

// Get Authenticated User
fetch('http://localhost:8080/api/user')
    .then(res => res.json())
    .then(data => getAuthenticatedUser(data))

const getAuthenticatedUser = (post) => {
    const userTitle = document.getElementById('userTitle')
    const authenticatedUserTable = document.getElementById('authenticatedUserTable')

    const rolesNames = []
    post.roles.forEach(role => {
        rolesNames.push(role.name.substring(5))
    })
    const outputTitle = `
            <span class="font-weight-bold">${post.email}</span>
                with roles: ${rolesNames.join(' ')}
       `
    const outputUserTable = `
            <td>${post.id}</td>
            <td>${post.firstName}</td>
            <td>${post.lastName}</td>
            <td>${post.age}</td>
            <td>${post.email}</td>
            <td>${rolesNames.join(' ')}</td>
        `

    userTitle.innerHTML = outputTitle
    authenticatedUserTable.innerHTML = outputUserTable
}

// GET All Users
const allUser = document.getElementById('allUserTable')
fetch(requestURL)
    .then(res => res.json())
    .then(data => getTableUser(data))


const getTableUser = (posts) => {
    let output = ''
    posts.forEach(post => {
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
                    <div class="modal fade" id="${'editUser' + post.id}" tabindex="-1"
                         aria-labelledby="editModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="editModalLabel">Edit user</h5>
                                    <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body m-auto">
                                    <form id="${'editForm' + post.id}">
                                        <fieldset disabled>
                                            <div class="form-group text-center">
                                                <label for="ID"><strong>ID</strong></label>
                                                <input type="text"
                                                       value="${post.id}"
                                                       name="id" required
                                                       class="form-control form-control-sm"
                                                       id="${'editId' + post.id}">
                                            </div>
                                        </fieldset>
                                        <div class="form-group text-center">
                                            <label for="firstName"><strong>First
                                                name</strong></label>
                                            <input type="text" value="${post.firstName}"
                                                   name="firstName" required
                                                   class="form-control form-control-sm"
                                                   id="${'editFirstName' + post.id}">
                                        </div>
                                        <div class="form-group text-center">
                                            <label for="lastName"><strong>Last
                                                name</strong></label>
                                            <input type="text" value="${post.lastName}"
                                                   name="lastName" required
                                                   class="form-control form-control-sm"
                                                   id="${'editLastName' + post.id}">
                                        </div>
                                        <div class="form-group text-center">
                                            <label for="age"><strong>Age</strong></label>
                                            <input type="number" value="${post.age}"
                                                   name="age" required
                                                   class="form-control form-control-sm"
                                                   id="${'editAge' + post.id}">
                                        </div>
                                        <div class="form-group text-center">
                                            <label for="email"><strong>Email</strong></label>
                                            <input type="email" value="${post.email}"
                                                   name="email" required
                                                   class="form-control form-control-sm"
                                                   id="${'editEmail' + post.id}">
                                        </div>
                                        <div class="form-group text-center">
                                            <label for="password"><strong>Password</strong></label>
                                            <input type="password"
                                                   value=""
                                                   name="password"
                                                   class="form-control form-control-sm"
                                                   id="${'editPassword' + post.id}">
                                        </div>
                                        <div class="form-group text-center">
                                            <label for="Roles"><strong>Role</strong></label>
                                            <select multiple name="roles[]" required
                                                    class="form-control form-control-sm"
                                                    id="${'rolesEditUser' + post.id}"
                                                    size="2">
                                                <option value="2">Admin</option>
                                                <option value="1">User</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                            data-dismiss="modal">Close
                                    </button>
                                    <button type="submit" data-dismiss="modal"
                                            class="btn btn-primary" onclick="putUser(${post.id})">Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td>
                    <!-- Кнопка-триггер модального окна -->
                    <button type="button" class="btn btn-danger" data-toggle="modal"
                            data-target="${'#deleteUser' + post.id}">
                        Delete
                    </button>
                    <!-- Модальное окно -->
                    <div class="modal fade" id="${'deleteUser' + post.id}" tabindex="-1"
                         aria-labelledby="deleteModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="deleteModalLabel">Delete
                                        user</h5>
                                    <button type="button" class="close" data-dismiss="modal"
                                            aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body m-auto">
                                    <form id="${'deleteForm' + post.id}">
                                        <fieldset disabled>
                                            <div class="form-group text-center">
                                                <label for="deleteID"><strong>ID</strong></label>
                                                <input type="text" value="${post.id}"
                                                       class="form-control form-control-sm"
                                                       name="id">
                                            </div>
                                            <div class="form-group text-center">
                                                <label for="deleteFirstName"><strong>First
                                                    name</strong></label>
                                                <input type="text"
                                                       value="${post.firstName}"
                                                       class="form-control form-control-sm"
                                                       name="firstName">
                                            </div>
                                            <div class="form-group text-center">
                                                <label for="deleteLastName"><strong>Last
                                                    name</strong></label>
                                                <input type="text"
                                                       value="${post.lastName}"
                                                       class="form-control form-control-sm"
                                                       name="lastName">
                                            </div>
                                            <div class="form-group text-center">
                                                <label for="deleteAge"><strong>Age</strong></label>
                                                <input type="number" value="${post.age}"
                                                       class="form-control form-control-sm"
                                                       name="age">
                                            </div>
                                            <div class="form-group text-center">
                                                <label for="deleteEmail"><strong>Email</strong></label>
                                                <input type="email"
                                                       value="${post.email}"
                                                       class="form-control form-control-sm"
                                                       name="email">
                                            </div>
                                            <div class="form-group text-center">
                                                <label for="deleteRoles"><strong>Role</strong></label>
                                                <select multiple name="roles[]" required
                                                        class="form-control form-control-sm"
                                                        size="2">
                                                    <option value="2">Admin</option>
                                                    <option value="1">User</option>
                                                </select>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                            data-dismiss="modal">Close
                                    </button>
                                    <button type="submit" data-dismiss="modal"
                                            class="btn btn-danger"
                                            onclick="deleteUser(${post.id})">Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            `
    })
    allUser.innerHTML = output
}

function getRoles(selector) {
    let collection = selector.selectedOptions
    let rolesNewUser = []
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].value === '1') {
            rolesNewUser.push({
                id: 1,
                name: 'ROLE_USER'
            })
        } else if (collection[i].value === '2') {
            rolesNewUser.push({
                id: 2,
                name: 'ROLE_ADMIN'
            })
        }
    }
    return rolesNewUser
}

// POST
function createNewUser() {
    let rolesNewUser = getRoles(document.getElementById('rolesNewUser'))
    fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: document.getElementById('firstNameNewUser').value,
            lastName: document.getElementById('lastNameNewUser').value,
            age: document.getElementById('ageNewUser').value,
            email: document.getElementById('emailNewUser').value,
            password: document.getElementById('passwordNewUser').value,
            roles: rolesNewUser
        })
    })
        .then(res => res.json())
        .then(data => {
            setTimeout(() => {
                getTableUser(data)
            }, 250)
        })
}

//PUT
function putUser(id) {
    let rolesNewUser = getRoles(document.getElementById('rolesEditUser' + id))
    fetch(requestURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: document.getElementById('editId' + id).value,
            firstName: document.getElementById('editFirstName' + id).value,
            lastName: document.getElementById('editLastName' + id).value,
            age: document.getElementById('editAge' + id).value,
            email: document.getElementById('editEmail' + id).value,
            password: document.getElementById('editPassword' + id).value,
            roles: rolesNewUser
        })
    })
        .then(res => res.json())
        .then(data => getTableUser(data))
}


//DELETE
function deleteUser(id) {
    fetch(requestURL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(res => res.json())
        .then(data => getTableUser(data))
}

