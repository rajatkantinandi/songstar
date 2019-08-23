import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";
import * as localForage from "localforage";
class App extends Component {
  state = {
    songs: [],
    loading: false,
    isLoadingStarted: false,
    favorites: []
  };

  componentDidMount = async () => {
    let favorites = await localForage.getItem("favorites");
    if (favorites) this.setState({ favorites });
  };

  showResult = async input => {
    this.setState({ loading: true, isLoadingStarted: true, songs: [] });
    const url = "https://www.songsterr.com/a/ra/songs.json?pattern=" + input;
    const response = await fetch(url);
    let result = await response.json();
    this.setState({ songs: result, loading: false });
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

  render() {
    return (
      <div className="App">
        <SearchBar search={this.showResult} />
        <Main
          songs={this.state.songs}
          loading={this.state.loading}
          isLoadingStarted={this.state.isLoadingStarted}
          addToFav={this.addToFav}
          removeFromFav={this.removeFromFav}
          favorites={this.state.favorites}
        />
      </div>
    );
  }
}

export default App;
