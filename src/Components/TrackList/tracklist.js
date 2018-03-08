import React, {Component} from 'react';
import Track from '../Tracks/tracks';
import './tracklist.css';


class TrackList extends Component{
  render(){
    console.log("TrackList: ",this.tracks)
    return(
      <div className="TrackList">

        {this.props.tracks.map(track => (
           <Track
           track={track}
           key={track.id}
           onAdd={this.props.onAdd}
           onRemove={this.props.onRemove}/>)
        )}
      </div>
    )
  }
}

export default TrackList;
