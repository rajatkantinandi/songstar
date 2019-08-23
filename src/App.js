import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";
import * as localForage from "localforage";
import { getParamsFromUrl } from './helpers/urlHelper';

class App extends Component {
  state = {
    songs: [],
    loading: false,
    isLoadingStarted: false,
    favorites: [],
    input: '',
    page: 1,
  };

  componentDidMount = async () => {
    const favorites = await localForage.getItem("favorites");
    if (favorites) this.setState({ favorites });
    window.addEventListener('popstate', this.updateStateFromURL);
    this.updateStateFromURL();
  };

  componentWillUnmount() {
    window.removeEventListener('popstate', this.updateStateFromURL);
  }

  updateStateFromURL = () => {
    const queryParams = getParamsFromUrl();
    const input = queryParams.q || '';
    const page = parseInt(queryParams.page) || 1;

    this.setState({ input, page }, () => this.showResult(input, page));
  }

  showResult = async (input, page) => {
    if (input.length > 0) {
      this.setState({ loading: true, isLoadingStarted: true, songs: [] });
      const url = "https://www.songsterr.com/a/ra/songs.json?pattern=" + input;
      const response = await fetch(url);
      let result = await response.json();
      this.setState({ songs: result, loading: false, page: page || 1 });
    }
    else {
      this.reset();
    }
  };

  addToFav = async song => {
    let favorites = [...this.state.favorites, song];
    await this.setState({ favorites });
    await localForage.setItem("favorites", favorites);
  };

  removeFromFav = async toRemove => {
    let favorites = this.state.favorites.filter(
      song => song.id !== toRemove.id
    );
    await this.setState({ favorites });
    await localForage.setItem("favorites", favorites);
  };

  reset = (navigate) => {
    this.setState({
      songs: [],
      loading: false,
      isLoadingStarted: false,
    });
    if (navigate) window.history.pushState({}, 'Home', `/`);
  };

  render() {
    return (
      <div className="App">
        <SearchBar search={this.showResult} reset={this.reset} input={this.state.input} />
        <Main
          songs={this.state.songs}
          loading={this.state.loading}
          isLoadingStarted={this.state.isLoadingStarted}
          addToFav={this.addToFav}
          removeFromFav={this.removeFromFav}
          favorites={this.state.favorites}
          page={this.state.page}
        />
      </div>
    );
  }
}

export default App;
