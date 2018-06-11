import queryString from 'query-string'

export const onTextChange = () =>
{text => this.setState({filterString: text})}

export const saveToken = () =>{
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    sessionStorage.setItem('token', accessToken)
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