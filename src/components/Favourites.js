import React, { Component } from "react";
import "../App.css";
import Song from "./Song";

class Favourites extends Component {
  state = {
    input: "",
    favourites: []
  };
  componentWillReceiveProps = nextProps => {
    this.setState({ favourites: nextProps.favourites });
  };
  handleChange = input => {
    if (input !== "") {
      const regex = new RegExp(input, "gi");
      this.setState({
        input,
        favourites: this.state.favourites.filter(
          song => regex.test(song.title) || regex.test(song.artist.name)
        )
      });
    } else {
      this.setState({ input, favourites: this.props.favourites });
    }
  };
  render() {
    return (
      <div className="favourites">
        <h2>Starred Songs</h2>
        <div style={{ width: "100%" }}>
          {this.props.favourites.length === 0 ? (
            <span>Starred songs will be listed here...</span>
          ) : (
            <div style={{ width: "100%" }}>
              <input
                type="text"
                placeholder="Filter starred songs.."
                onChange={input => this.handleChange(input.target.value)}
                value={this.state.input}
                className="search-field small"
              />
              <div className="list-songs">
                {this.state.favourites.map(song => (
                  <Song
                    song={song}
                    key={song.id}
                    removeFromFav={this.props.removeFromFav}
                    starred={true}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Favourites;
