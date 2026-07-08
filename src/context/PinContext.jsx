
import { createContext, useContext, useState, useEffect } from 'react';

const PinContext = createContext();

export const PinProvider = ({ children }) => {
  const [pinnedArtists, setPinnedArtists] = useState(() => {
    // Cargar desde localStorage al inicializar
    const saved = localStorage.getItem('tomorrowlandPinned');
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cuando cambie pinnedArtists
  useEffect(() => {
    localStorage.setItem('tomorrowlandPinned', JSON.stringify(pinnedArtists));
  }, [pinnedArtists]);

  const togglePin = (artist) => {
    if (!artist) return;
    const isPinned = pinnedArtists.some(
      (pinned) => 
        pinned.artista === artist.artista && 
        pinned.stage === artist.stage && 
        pinned.day === artist.day
    );

    if (isPinned) {
      setPinnedArtists(pinnedArtists.filter(
        (pinned) => 
          !(pinned.artista === artist.artista && 
          pinned.stage === artist.stage && 
          pinned.day === artist.day)
      ));
    } else {
      setPinnedArtists([...pinnedArtists, artist]);
    }
  };

  const isPinned = (artist) => {
    if (!artist) return false;
    return pinnedArtists.some(
      (pinned) => 
        pinned.artista === artist.artista && 
        pinned.stage === artist.stage && 
        pinned.day === artist.day
    );
  };

  const clearAll = () => {
    setPinnedArtists([]);
  };

  return (
    <PinContext.Provider
      value={{
        pinnedArtists, togglePin, isPinned, clearAll }}
    >
      {children}
    </PinContext.Provider>
  );
};

export const usePin = () => {
  const context = useContext(PinContext);
  if (!context) {
    throw new Error('usePin must be used within a PinProvider');
  }
  return context;
};

