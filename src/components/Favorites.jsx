import React, { useEffect, useState } from "react";
import "../App.css";
import Song from "./Song";

export default function Favorites({ favorites, removeFromFav }) {
  const [filterInput, setFilterInput] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  useEffect(() => {
    setFilteredFavorites(favorites);
  }, [favorites]);

  const handleChange = (input) => {
    if (input !== '') {
      const regex = new RegExp(input, 'gi');

      setFilterInput(input);
      setFilteredFavorites(
        favorites.filter(
          (song) => regex.test(song.title) || regex.test(song.artist.name)
        )
      );
    } else {
      setFilterInput(input);
      setFilteredFavorites(favorites);
    }
  };

  return (
    <div className="favorites">
      <h2>Starred Songs</h2>
      <div style={{ width: "100%" }}>
        {favorites.length === 0 ? (
          <span>Starred songs will be listed here...</span>
        ) : (
          <div style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Filter starred songs.."
              onChange={(input) => handleChange(input.target.value)}
              value={filterInput}
              className="search-field small"
            />
            <div className="list-songs">
              {filteredFavorites.length === 0 && <div>Nothing matched!</div>}
              {filteredFavorites.map((song) => (
                <Song
                  song={song}
                  key={song.id}
                  removeFromFav={removeFromFav}
                  starred={true}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
