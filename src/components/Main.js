import React, { Component } from "react";
import "../App.css";
import Results from "./Results";
import Favorites from "./Favorites";
class Main extends Component {
  render() {
    return (
      <div className="main-content">
        <Favorites
          favorites={this.props.favorites}
          removeFromFav={this.props.removeFromFav}
        />
        <Results
          songs={this.props.songs}
          loading={this.props.loading}
          isLoadingStarted={this.props.isLoadingStarted}
          addToFav={this.props.addToFav}
          removeFromFav={this.props.removeFromFav}
          favorites={this.props.favorites}
          page={this.props.page}
          setPage={this.props.setPage}
        />
      </div>
    );
  }
}
export default Main;
