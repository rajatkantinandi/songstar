import React from "react";
import "../App.css";
import Results from "./Results";
import Favorites from "./Favorites";

export default function Main({
  favorites,
  isLoading,
  songs,
  isLoadingStarted,
  addToFav,
  removeFromFav,
  page,
  setPage,
}) {
  return (
    <div className="main-content">
      <Favorites favorites={favorites} removeFromFav={removeFromFav} />
      <Results
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
