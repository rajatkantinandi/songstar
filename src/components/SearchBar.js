import React, { Component } from "react";
import logo from "../logo.png";
import logo_small from "../logo_small.svg";
import "../App.css";

class SearchBar extends Component {
  state = {
    input: "",
    loaded: false
  };
  handleChange = input => {
    this.setState({ input });
  };
  search = async event => {
    event.preventDefault();
    if (this.state.input.length === 0) alert("Keyword must not be empty");
    else {
      this.setState({ loaded: true });
      await this.props.search(this.state.input);
    }
  };
  render() {
    return (
      <div className="App">
        <header
          className={this.state.loaded ? "App-header loaded" : "App-header"}
        >
          <img
            src={this.state.loaded ? logo_small : logo}
            className="logo"
            alt="logo"
          />
          <form onSubmit={event => this.search(event)}>
            <input
              type="text"
              autoFocus
              placeholder="Type a keyword.."
              onChange={input => this.handleChange(input.target.value)}
              value={this.state.input}
              className="search-field"
            />
          </form>
        </header>
        <main />
      </div>
    );
  }
}

export default SearchBar;
