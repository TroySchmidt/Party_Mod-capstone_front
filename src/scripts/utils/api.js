import queryString from 'query-string'


export const saveToken = () =>{
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
   if(accessToken){
       sessionStorage.setItem('token', accessToken)
   }
    return accessToken
}

export const getToken = () => {
  const accessToken = sessionStorage.getItem('token')
  return accessToken ? accessToken : saveToken()
}

export const deleteToken = () => {
    sessionStorage.removeItem('token')
}

export const fetchAPI = (urlToFetch) => fetch(
    'https://api.spotify.com/v1/' + urlToFetch,
    {
        headers: {'Authorization': 'Bearer ' + getToken()}
    }
).then(response => {
    if (response.status === 401) {
        deleteToken()
    }
    return response.json()
}).then(data => {
    console.log('Fetched URL: ' + urlToFetch, data)
    return data
})

export const like = () => {
    alert('Liked!')
}

export const saveUser = (user) => {
    return fetch(`http://localhost:8088/user?email=${user.email}`)
    .then(r => r.json())
      .then(r => {
        if(r == "") {
          fetch("http://localhost:8088/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              displayName: user.name,
              image: user.image,
              email: user.email
            })
          }).then(() => {
            return fetch ("http://localhost:8088/user")
          }).then(r => r.json())
        }
      })
}