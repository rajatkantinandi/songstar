import React from "react";
import "../App.css";

export default function Song({ starred, addToFav, removeFromFav, song }) {
  const handleChange = () => {
    if (!starred) {
      addToFav(song);
    } 
    else {
      removeFromFav(song);
    }
  };

  return (
    <div className="song">
      <div className="song-details">
        <a
          href={"http://www.songsterr.com/a/wa/song?id=" + song.id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>{song.title}</h2>
        </a>
        <a
          href={"http://www.songsterr.com/a/wa/artist?id=" + song.artist.id}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4>Artist: {song.artist.name}</h4>
        </a>
      </div>
      <div className="star-btn">
        <input
          type="checkbox"
          className="star-btn"
          checked={starred}
          onChange={handleChange}
          title="star/unstar"
        />
        <div className="star-wrapper" />
      </div>
    </div>
  );
}
