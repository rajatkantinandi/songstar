import React, { Component } from "react";
import "../App.css";
import Song from "./Song";

class Favourites extends Component {
  render() {
    return (
      <div className="favourites">
        <h2>Starred Songs</h2>
        <div className="list-songs">
          {this.props.favourites.length === 0 ? (
            <span>Starred songs will be listed here...</span>
          ) : (
            this.props.favourites.map(song => (
              <Song
                song={song}
                key={song.id}
                removeFromFav={this.props.removeFromFav}
                starred={true}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}
export default Favourites;
