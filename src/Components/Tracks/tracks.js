import React, { Component } from 'react';
import './tracks.css';


class Track extends Component{
  constructor(props) {
    super(props);
    this.state={
      isRemoval: true
    }
    this.renderAction = this.renderAction.bind(this)
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack=this.removeTrack.bind(this)
  }


  renderAction() {
    if (this.props.isRemoval) {
      return (
        <a className="Track-action" onClick={this.removeTrack}> - </a>
      );
    } else {
      return(
        <a className="Track-action" onClick={this.addTrack} > + </a>
      )
    }
  }

addTrack(){
  this.props.onAdd(this.props.track)
}

removeTrack(){
  this.props.onRemove(this.props.track)
}

  render(){
    console.log("Removal: ", this.state.isRemoval)
    console.log(this.props.track)
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <div>{this.renderAction}</div>
      </div>
    )
  }
}

export default Track;
