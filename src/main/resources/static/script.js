const allUser = document.getElementById('allUserTable')
const requestURL = 'http://localhost:8080/api/users'
let output = ''
// GET
fetch(requestURL)
    .then(res => res.json())
    .then(data => {
        data.forEach(post => {
            post.roles.forEach(role => console.log(role.name))
            output += `
                <tr>
                    <td>${post.id}</td>
                    <td>${post.firstName}</td>
                    <td>${post.lastName}</td>
                    <td>${post.age}</td>
                    <td>${post.email}</td>
                    <td ${post.roles}>
                    </td>
                         
                    
                </tr>
                `
        })
        allUser.innerHTML = output
    })


// const requestURL = 'http://localhost:8080/api/users'
//
// // GET
//
// function sendRequest(method, url, body = null) {
//     return fetch(url).then(response => {
//         return response.json()
//     })
// }
//
// sendRequest('GET', requestURL)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

//POST

// const body = {
//     firstName: 'Lada',
//     lastName: 'Konovalova',
//     age: 17,
//     email: 'lada@gmail.com',
//     password: 111,
//     roles: [
//         {
//             id: 1,
//             name: "ROLE_USER"
//         },
//         {
//             id: 2,
//             name: "ROLE_ADMIN"
//         }
//     ]
// }
//
// fetch(requestURL, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(body)
// })
//     .then(response => response.json())
//     .then(result => alert(result.message))