import React, { Component } from "react";
import "../App.css";

class Song extends Component {
  state = {
    starred: this.props.starred || false
  };
  componentWillReceiveProps = nextProps => {
    this.setState({ starred: nextProps.starred });
  };
  handleChange = () => {
    this.setState({ starred: this.refs.starred.checked });
    if (this.refs.starred.checked) {
      this.props.addToFav(this.props.song);
    } else {
      this.props.removeFromFav(this.props.song);
    }
  };
  render() {
    return (
      <div className="song">
        <div className="song-details">
          <h2>{this.props.song.title}</h2>
          <h4>Artist: {this.props.song.artist.name}</h4>
        </div>
        <div className="star-btn">
          <input
            type="checkbox"
            className="star-btn"
            checked={this.state.starred}
            onChange={this.handleChange}
            ref="starred"
            title="star/unstar"
          />
          <div className="star-wrapper" />
        </div>
      </div>
    );
  }
}
export default Song;
