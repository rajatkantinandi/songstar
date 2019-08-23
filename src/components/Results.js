import React, { Component } from "react";
import "../App.css";
import Song from "./Song";
import Pagination from "react-js-pagination";
import { setQueryParams } from '../helpers/urlHelper';
class Results extends Component {
  state = {
    activePage: this.props.page,
    songs: this.props.songs
  };

  handlePageChange = pageNumber => {
    this.props.setPage(pageNumber);
    setQueryParams({ page: pageNumber });
  };

  componentWillReceiveProps = nextProps => {
    if (this.state.songs !== nextProps.songs) {
      this.setState({ activePage: 1, songs: nextProps.songs });
    }
    if (this.state.activePage !== nextProps.page) {
      this.setState({ activePage: nextProps.page })
    }
  };

  render() {
    const activePage = Math.min(this.state.activePage, Math.ceil(this.props.songs.length / 10));

    return (
      <div
        className={this.props.isLoadingStarted ? "results" : "results-hidden"}
      >
        <h2>Results</h2>
        {this.props.loading && <div className="loader loader5" />}
        {this.state.songs.length > 10 && (
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.props.songs.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        )}
        {this.state.songs && this.state.songs.length > 0 && (
          <div className="list-songs">
            {this.props.songs
              .slice((activePage - 1) * 10, activePage * 10)
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
