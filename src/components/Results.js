import React, { Component } from "react";
import "../App.css";
import Song from "./Song";
class Results extends Component {
  render() {
    return (
      <div className={this.props.loadinginit ? "results" : "results-hidden"}>
        <h2>Results</h2>
        {this.props.loading && "Loading..."}
        {this.props.songs && this.props.songs.length > 0 && (
          <div className="list-songs">
            {this.props.songs.map(song => (
              <Song
                song={song}
                key={song.id}
                addToFav={this.props.addToFav}
                removeFromFav={this.props.removeFromFav}
                starred={this.props.favourites.some(
                  elem => song.id === elem.id
                )}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default Results;
