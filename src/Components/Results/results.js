import React, { Component } from 'react';
import TrackList from '../TrackList/tracklist';
import './results.css';

class SearchResults extends Component {
  render(){
    console.log("Search: ", this.props.searchResults)
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          tracks={this.props.searchResults}
          onAdd={this.props.onAdd} />
      </div>
    )
  }
}

export default SearchResults;
