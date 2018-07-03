import queryString from 'query-string'


export const saveToken = () => {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    if (accessToken) {
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
        headers: { 'Authorization': 'Bearer ' + getToken() }
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
            if (r == "") {
                fetch("http://localhost:8088/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        displayName: user.name,
                        image: user.image,
                        email: user.email,
                        id: user.id
                    })
                }).then(() => {
                    return fetch("http://localhost:8088/user")
                }).then(r => r.json())
            }
        })
}

export const savePL = (playlists, user) => {
    playlists.items.forEach((playlist) => {
        fetch(`http://localhost:8088/playlist?id=${playlist.id}`)
            .then(r => r.json())
            .then(r => {
                if (r == "") {
                    return fetch("http://localhost:8088/playlist", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: playlist.id,
                            name: playlist.name,
                            userid: user.email,
                            invitedFriendid: "",
                            image: playlist.images[0].url
                        })
                    })
                        .then(() => fetch("http://localhost:8088/playlist"))
                        .then(r => r.json())
                }
                return r
            })
    })
}

export const saveSongs = (song, playlist, user) => {
    fetch(`http://localhost:8088/songs?playlistid=${song.playlistid}`)
    .then(r => r.json())
    .then(r => {
        if(r == ""){
            return fetch("http://localhost:8088/songs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: song.id,
                    songName: song.name,
                    playlistid: song.playlistid,
                    user: user.email,
                    playlistName: playlist.name,
                    image: song.image,
                    artist: song.artist
                })
            })
        }
    })
}

export const inviteFriendtoPL = (playlist, currentUser, invitedFriend) => {
    fetch(`http://localhost:8088/playlistInvitedFriends?playlistid=${playlist}&invitedFriendid=${invitedFriend}`)
    .then(r => r.json())
    .then(r => {
        if(r == ""){
            return fetch("http://localhost:8088/playlistInvitedFriends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                invitedFriendid: invitedFriend,
                playlistid: playlist,
                invitingUser: currentUser,
            })
            })
        }
    })
}

export const likedSong = (playlistid, songsid, invitedFriendid) => {
    fetch(`http://localhost:8088/playlistSongs?playlistid=${playlistid}&songsid=${songsid}&invitedFriendid=${invitedFriendid}`)
    .then(r => r.json())
    .then(r => {
        if(r == ""){
            fetch('http://localhost:8088/playlistSongs', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playlistid: playlistid,
                    songsid: songsid,
                    invitedFriendid: invitedFriendid,
                    like: true
                })
            })
        }
    })
}

export const dislikeSong = (playlistid, songsid, invitedFriendid) => {
    fetch(`http://localhost:8088/playlistSongs?playlistid=${playlistid}&songsid=${songsid}&invitedFriendid=${invitedFriendid}`)
    .then(r => r.json())
    .then(r => {
        if(r == ""){
            fetch('http://localhost:8088/playlistSongs', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    playlistid: playlistid,
                    songsid: songsid,
                    invitedFriendid: invitedFriendid,
                    like: false
                })
            })
        }
    })
}

export const add = () => {
    let counter = 0;
    {return counter += 1;}
}

export const addLikes = (songid) => {
    document.getElementById(songid).innerHTML = add()
    localStorage.setItem(`${songid}`, 'like')
}

export const addDislikes = (songid) => {
    document.getElementById(songid).innerHTML = add()
    localStorage.setItem(`${songid}`, 'dislike')
}


