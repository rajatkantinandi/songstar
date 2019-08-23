import React, { Component } from "react";
import logo from "../logo.png";
import logo_small from "../logo_small.svg";
import "../App.css";
import { getParamsFromUrl } from '../helpers/urlHelper';

class SearchBar extends Component {
  state = {
    input: "",
    loaded: false,
    isInvalid: false,
  };

  componentDidMount() {
    const queryParams = getParamsFromUrl();

    this.setState({ input: queryParams.q || '' }, this.search);
  }

  handleChange = input => {
    this.setState({ input, isInvalid: input.trim().length === 0 });
  };

  search = () => {
    if (this.state.input) {
      this.setState({ loaded: true });
      this.props.search(this.state.input);
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
          <form
            method="get"
            action="/"
            onInvalid={() => this.setState({ isInvalid: true })}
            className={this.state.isInvalid ? 'invalid' : ''}>
            <input
              name="q"
              type="text"
              autoFocus
              placeholder="Type a keyword.."
              onChange={input => this.handleChange(input.target.value)}
              value={this.state.input}
              className="search-field"
              required
              pattern=".*\S+.*"
              autoComplete="off"
            />
            <button className="search-btn" type="submit">
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
          </form>
        </header>
        <main />
      </div>
    );
  }
}

export default SearchBar;
