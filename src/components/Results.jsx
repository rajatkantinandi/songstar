import React, { useEffect, useState } from "react";
import "../App.css";
import Song from "./Song";
import Pagination from "react-js-pagination";
import { setQueryParams } from "../helpers/urlHelper";

export default function Results({
  songs,
  page,
  addToFav,
  removeFromFav,
  isLoadingStarted,
  setPage,
  isLoading,
  favorites,
}) {
  const [activePage, setActivePage] = useState(page);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    setQueryParams({ page: pageNumber });
  };

  useEffect(() => {
    setActivePage(Math.min(page, Math.ceil(songs.length / 10)));
  }, [page, songs]);

  return (
    <div className={isLoadingStarted ? "results" : "results-hidden"}>
      <h2>Results</h2>
      {isLoading && <div className="loader loader5" />}
      {songs.length > 10 && (
        <Pagination
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={songs.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
        />
      )}
      {songs && songs.length > 0 && (
        <div className="list-songs">
          {songs.slice((activePage - 1) * 10, activePage * 10).map((song) => (
            <Song
              song={song}
              key={song.id}
              addToFav={addToFav}
              removeFromFav={removeFromFav}
              starred={favorites.some((elem) => song.id === elem.id)}
            />
          ))}
        </div>
      )}
      {!isLoading && songs.length === 0 && <div>No results!</div>}
    </div>
  );
}
