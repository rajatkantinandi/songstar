import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Main from './components/Main';
import * as localForage from 'localforage';
import { getParamsFromUrl } from './helpers/urlHelper';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SongStar />
    </QueryClientProvider>
  );
}

const SongStar = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const {
    data: songs = [],
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: [searchTerm],
    queryFn: async () => {
      const url = 'https://www.songsterr.com/a/ra/songs.json?pattern=' + searchTerm;
      const response = await fetch(url);
      return response.json();
    },
    enabled: !!searchTerm.trim(),
  });

  useEffect(() => {
    localForage.getItem('favorites').then((favorites) => {
      if (favorites) {
        setFavorites(favorites);
      }
    });

    window.addEventListener('popstate', updateStateFromURL);
    updateStateFromURL();

    return () => {
      window.removeEventListener('popstate', updateStateFromURL);
    };
    // eslint-disable-next-line
  }, []);

  const updateStateFromURL = () => {
    const queryParams = getParamsFromUrl();
    const input = queryParams.q || '';
    const page = parseInt(queryParams.page) || 1;

    setSearchTerm(input);
    setPage(page);
  };

  const reset = (shouldNavigate) => {
    setSearchTerm('');
    setPage(1);

    if (shouldNavigate) {
      window.history.pushState({}, 'Home', `/`);
    }
  };

  const addToFav = (song) => {
    const favoritesToSet = [...favorites, song];
    setFavorites(favoritesToSet);
    localForage.setItem('favorites', favoritesToSet);
  };

  const removeFromFav = (toRemove) => {
    let favoritesToSet = favorites.filter((song) => song.id !== toRemove.id);
    setFavorites(favoritesToSet);
    localForage.setItem('favorites', favoritesToSet);
  };

  const onSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(1);
  };

  return (
    <div className="App">
      <SearchBar onSearch={onSearch} reset={reset} searchTerm={searchTerm} />
      <Main
        songs={songs}
        isLoading={isLoading}
        isFetched={isFetched}
        addToFav={addToFav}
        removeFromFav={removeFromFav}
        favorites={favorites}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};
