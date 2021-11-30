import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Main from "./components/Main";
import * as localForage from "localforage";
import { getParamsFromUrl } from "./helpers/urlHelper";

export default function App() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStarted, setIsLoadingStarted] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    localForage.getItem("favorites").then((favorites) => {
      if (favorites) {
        setFavorites(favorites);
      }
    });

    window.addEventListener("popstate", updateStateFromURL);
    updateStateFromURL();

    return () => {
      window.removeEventListener("popstate", updateStateFromURL);
    };
    // eslint-disable-next-line
  }, []);

  const updateStateFromURL = () => {
    const queryParams = getParamsFromUrl();
    const input = queryParams.q || "";
    const page = parseInt(queryParams.page) || 1;

    setSearchTerm(input);
    setPage(page);
    showResult(input, page);
  };

  const showResult = async (input, page) => {
    setSearchTerm(input);

    if (input.length > 0) {
      setIsLoading(true);
      setIsLoadingStarted(true);
      setSongs([]);
      const url = "https://www.songsterr.com/a/ra/songs.json?pattern=" + input;
      const response = await fetch(url);
      let result = await response.json();
      setSongs(result);
      setIsLoading(false);
      setPage(page || 1);
    } else {
      reset();
    }
  };

  const reset = (shouldNavigate) => {
    setSongs([]);
    setIsLoading(false);
    setIsLoadingStarted(false);

    if (shouldNavigate) {
      window.history.pushState({}, "Home", `/`);
    }
  };

  const addToFav = (song) => {
    const favoritesToSet = [...favorites, song];
    setFavorites(favoritesToSet);
    localForage.setItem("favorites", favoritesToSet);
  };

  const removeFromFav = (toRemove) => {
    let favoritesToSet = favorites.filter((song) => song.id !== toRemove.id);
    setFavorites(favoritesToSet);
    localForage.setItem("favorites", favoritesToSet);
  };

  return (
    <div className="App">
      <SearchBar
        search={showResult}
        reset={reset}
        searchTerm={searchTerm}
      />
      <Main
        songs={songs}
        isLoading={isLoading}
        isLoadingStarted={isLoadingStarted}
        addToFav={addToFav}
        removeFromFav={removeFromFav}
        favorites={favorites}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
