const clientId= "dd5611bf7dec4bea8552cd833bd3a932"
const redirectUri="http://localhost:3000/"
let accessToken;


const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken
    }

    const matchToken = window.location.href.match(/access_token=([^&]*)/)
    const matchExpiration = window.location.href.match(/expires_in=([^&]*)/)

    if (matchToken && matchExpiration){
      //Set the access token_type
      accessToken = matchToken[1]
        console.log(matchToken);
      //Set expiration
      const expirationTime = Number(matchExpiration[1]);
      console.log(expirationTime);
      //set access toke to expire at the value
      window.setTimeout(()=> (accessToken = ''), expirationTime * 1000);
      window.history.pushState('Access Token', null, '/')
      console.log("line 25: ", accessToken)


  }else {
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
  }
},

  search(term){
    const accessToken = Spotify.getAccessToken();
    console.log("spotify search: ", accessToken)

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
      headers: {Authorization: `Bearer ${accessToken}`}
    })
      .then(results => results.json())
      .then(response => {
        console.log("Search response ",response.tracks)
        if (!response.tracks) {
        return "No Buéno, Try another search";
      }
        return response.tracks.items.map(track =>({
          id: track.id,
          name: track.name,
          artist: track.artist[0].name,
          album: track.album.name,
          uri: track.uri
        }))
      })
  },

  playlist(playlistName, trackURIs){
    if(!trackURIs){
      return trackURIs
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`}
    let userId;

    fetch(`https://api.spotify.com/v1/me`, {
      headers: headers})
      .then(results => results.json())
      .then(response => {
        let userId:response.id
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {

        headers:headers,
        method: 'POST',
        boby: JSON.stringify({ name:playlistName })
      })
      .then(results => results.json())
      .then(response => {
        let playlistID = response.id
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`,{

          headers:headers,
          method: 'POST',
          boby: JSON.stringify({ uri:trackURIs })
        }).then(results => results.json())
        .then(response => {
          playlistID = response.id
        })
      })
    })
  }
}

export default Spotify;


// return fetch(`https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${accessToken}&redirect_uri=${redirectUri}`, {
//   method:'POST',
//   headers: {Authorization: `Bearer ${accessToken}`}
// })
