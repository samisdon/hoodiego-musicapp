import { useState } from "react";

const songs = [
  { title: "Wavy", artist: "Karan Aujla" },
  { title: "Softly", artist: "Karan Aujla & Ikky" },
  { title: "Winning Speech", artist: "Karan Aujla" },
  { title: "For A Reason", artist: "Karan Aujla & Ikky" },
  { title: "Afsos", artist: "Anuv Jain & AP Dhillon" },
  { title: "Supreme", artist: "Shubh" },
  { title: "Haseen", artist: "Talwinder & Rippy Grewal" },
  { title: "One Love", artist: "Shubh" },
  { title: "Millionaire", artist: "Yo Yo Honey Singh" },
  { title: "Pasoori", artist: "Ali Sethi & Shae Gill" },
  { title: "Back To Me", artist: "Arjan Dhillon" },
  { title: "Desi Hood", artist: "Prem Dhillon" },
  { title: "8 Asle", artist: "Navaan Sandhu" }
];

export default function App() {
  const [current, setCurrent] = useState(null);

  return (
    <div className="app">
      <h1>🎧 Hoodiego</h1>
      <p>Punjabi New Hits</p>

      <div className="glass">
        {songs.map((song, index) => (
          <div
            key={index}
            className="song"
            onClick={() => setCurrent(song)}
          >
            <strong>{song.title}</strong>
            <span>{song.artist}</span>
          </div>
        ))}
      </div>

      {current && (
        <div className="player">
          Now Playing: <b>{current.title}</b> – {current.artist}
        </div>
      )}
    </div>
  );
}
