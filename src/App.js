import React, { useState, useEffect } from "react";
import "./App.css";

/* 🎵 Punjabi Playlist */
const songsData = [
  { title: "Wavy", artist: "Karan Aujla" },
  { title: "Softly", artist: "Karan Aujla" },
  { title: "Winning Speech", artist: "Karan Aujla" },
  { title: "For A Reason", artist: "Karan Aujla" },
  { title: "Old Skool", artist: "Prem Dhillon" },
  { title: "Here & There", artist: "Arjan Dhillon" },
  { title: "Check It Out", artist: "Navaan Sandhu" },
  { title: "Levels", artist: "Sidhu Moosewala" },
  { title: "One Love", artist: "Shubh" },
  { title: "Supreme", artist: "Shubh" },
  { title: "Pasoori", artist: "Ali Sethi" }
];

/* 🔊 Demo beep sound */
function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = 440;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
  osc.stop(ctx.currentTime + 1);
}

export default function App() {
  const [songs] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(null);
  const [search, setSearch] = useState("");
  const [progress, setProgress] = useState(0);

  const playSong = (song) => {
    setCurrentSong(song);
    setProgress(0);
    playBeep();
  };

  /* Fake progress animation */
  useEffect(() => {
    if (!currentSong) return;
    const interval = setInterval(() => {
      setProgress((old) => (old >= 100 ? 0 : old + 5));
    }, 300);
    return () => clearInterval(interval);
  }, [currentSong]);

  /* Filter search */
  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  /* Unique artist list */
  const artists = [...new Set(songs.map((s) => s.artist))];

  return (
    <div className="app">
      <h1 className="logo">🎧 Hoodiego</h1>

      {/* Search Bar */}
      <input
        className="search"
        placeholder="Search song or artist..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Artist Filter */}
      <div className="artists">
        {artists.map((artist, i) => (
          <span key={i} onClick={() => setSearch(artist)}>
            {artist}
          </span>
        ))}
      </div>

      {/* Now Playing */}
      {currentSong && (
        <div className="glass player">
          <div className="cover-placeholder"></div>
          <h2>{currentSong.title}</h2>
          <p>{currentSong.artist}</p>

          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>

          <button onClick={() => playSong(currentSong)}>Play Again</button>
        </div>
      )}

      {/* Playlist */}
      <div className="glass playlist">
        <h3>🔥 Punjabi Hits</h3>

        {filteredSongs.map((song, i) => (
          <div key={i} className="song" onClick={() => playSong(song)}>
            <div className="mini-cover"></div>
            <div>
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
