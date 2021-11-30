import React, { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import logo_small from "../images/logo_small.svg";
import "../App.css";
import { setQueryParams } from '../helpers/urlHelper';

export default function SearchBar({ searchTerm, search, reset }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [input, setInput] = useState(searchTerm);

  const handleChange = input => {
    setInput(input);
    setIsInvalid(input.trim().length === 0);
  };

  useEffect(() => {
    setInput(searchTerm);

    if (searchTerm.length > 0) {
      setIsLoaded(true);
    }
  }, [searchTerm]);

  const performSearch = (ev) => {
    ev.preventDefault();
    setQueryParams({ q: input, page: 1 });

    setIsLoaded(true);
    search(input);
  };

  return (
    <div className="App">
      <header
        className={isLoaded ? "App-header loaded" : "App-header"}
      >
        <img
          src={isLoaded ? logo_small : logo}
          className="logo"
          alt="logo"
          onClick={() => {
            reset(true);
            setInput('');
            setIsLoaded(false);
          }}
        />
        <form
          onSubmit={performSearch}
          onInvalid={() => setIsInvalid(true)}
          className={isInvalid ? 'invalid' : ''}>
          <input
            name="q"
            type="text"
            autoFocus
            placeholder="Type a keyword.."
            onChange={input => handleChange(input.target.value)}
            value={input}
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
