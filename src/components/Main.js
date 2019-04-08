import React, { Component } from "react";
import "../App.css";
import Results from "./Results";
import Favourites from "./Favourites";
class Main extends Component {
  render() {
    return (
      <div className="main-content">
        <Favourites
          favourites={this.props.favourites}
          removeFromFav={this.props.removeFromFav}
        />
        <Results
          songs={this.props.songs}
          loading={this.props.loading}
          loadinginit={this.props.loadinginit}
          addToFav={this.props.addToFav}
          removeFromFav={this.props.removeFromFav}
          favourites={this.props.favourites}
        />
      </div>
    );
  }
}
export default Main;
