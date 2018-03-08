import React, { Component } from 'react';
import SearchBar from '../Search/search';
import SearchResults from '../Results/results';
import Playlist from '../Playlist/playlist';
import Spotify from '../../util/Spotify'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      SearchResults:[],
      playlistName: "New Playlist",
      playlistTracks:[]

    }
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack=this.removeTrack.bind(this)
    this.updatePlaylistName=this.updatePlaylistName.bind(this)
    this.savePlaylist =this.savePlaylist.bind(this)
    this.search=this.search.bind(this)
  }


  addTrack(track){
    let tracks = [...this.state.playlistTracks, track];
        this.setState({playlistTracks: tracks})
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(rmtrack =>  rmtrack.id !== track.id)
    this.setState({playlistTracks: tracks})
  }

  updatePlaylistName(name){
    //Accept a name
    this.setState({ playlistName: name})
    //set name of playlist to input value
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist()
    this.setState({ playlistName: 'New Playlist', playlistTracks: [] })

  }

  search(term) {
    Spotify.search(term).then(response =>(
      console.log("app search: ",response),

        this.setState({ SearchResults: response })

    ));

  }


  render() {
    return (
      <div>
        <h1 className="Logo">Musiek</h1>
        <div className="App-Background">
          <SearchBar
            onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
            searchResults={this.state.SearchResults}
            onAdd={this.addTrack}/>
          <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
