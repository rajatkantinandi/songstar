import React, { Component } from "react";
import "../App.css";
import Song from "./Song";
import Pagination from "react-js-pagination";
class Results extends Component {
  state = {
    activePage: 1,
    songs: this.props.songs
  };
  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
  };
  componentWillReceiveProps = nextProps => {
    if (this.state.songs !== nextProps.songs) {
      this.setState({ activePage: 1, songs: nextProps.songs });
    }
  };
  render() {
    return (
      <div
        className={this.props.isLoadingStarted ? "results" : "results-hidden"}
      >
        <h2>Results</h2>
        {this.props.loading && <div className="loader loader5" />}
        {this.state.songs.length > 10 && (
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.props.songs.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        )}
        {this.state.songs && this.state.songs.length > 0 && (
          <div className="list-songs">
            {this.props.songs
              .slice(
                (this.state.activePage - 1) * 10,
                this.state.activePage * 10
              )
              .map(song => (
                <Song
                  song={song}
                  key={song.id}
                  addToFav={this.props.addToFav}
                  removeFromFav={this.props.removeFromFav}
                  starred={this.props.favorites.some(
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
