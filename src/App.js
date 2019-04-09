import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";
import * as localForage from "localforage";
class App extends Component {
  state = {
    songs: [],
    loading: false,
    loadingInit: false,
    favourites: []
  };
  componentDidMount = async () => {
    let favourites = await localForage.getItem("favourites");
    if (favourites) this.setState({ favourites });
  };
  showResult = async input => {
    this.setState({ loading: true, loadingInit: true, songs: [] });
    const url = "https://www.songsterr.com/a/ra/songs.json?pattern=" + input;
    const response = await fetch(url);
    let result = await response.json();
    this.setState({ songs: result, loading: false });
  };
  addToFav = async song => {
    let favourites = [...this.state.favourites, song];
    await this.setState({ favourites });
    await localForage.setItem("favourites", favourites);
  };
  removeFromFav = async toRemove => {
    let favourites = this.state.favourites.filter(song => song !== toRemove);
    await this.setState({ favourites });
    await localForage.setItem("favourites", favourites);
  };
  render() {
    return (
      <div className="App">
        <SearchBar search={this.showResult} />
        <Main
          songs={this.state.songs}
          loading={this.state.loading}
          loadinginit={this.state.loadingInit}
          addToFav={this.addToFav}
          removeFromFav={this.removeFromFav}
          favourites={this.state.favourites}
        />
      </div>
    );
  }
}

export default App;
