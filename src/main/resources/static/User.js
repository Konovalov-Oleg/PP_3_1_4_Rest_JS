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