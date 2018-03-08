import React, { Component } from 'react';
import TrackList from '../TrackList/tracklist';
import './playlist.css';


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange=this.handleNameChange.bind(this)

  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value)
  }


  render(){
    console.log(this.props.playlistName)
    return(
        <div className="Playlist">
          <input
            value={this.props.playlistName}
            onChange={this.handleNameChange}/>
          <TrackList
            tracks={this.props.playlistTracks}
            onRemove={this.props.onRemove} />
          <a className="Playlist-save"
            onClick={this.props.onSave}>
            SAVE TO SPOTIFY</a>
        </div>
    )
  }
}

export default Playlist;
