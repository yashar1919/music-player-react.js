import React, { useState } from "react";
import Song from "./components/Song";
import Player from "./components/Player";
import './styles/index.scss'
import data from "./data"
import SongList from "./components/SongList";
import ToggleList from "./components/ToggleList";

function App() {

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayListSong, setDisplayListSong] = useState(false);

  return (
    <div className="App">
      <ToggleList displayListSong={displayListSong} setDisplayListSong={setDisplayListSong}/>
      <Song currentSong={currentSong}/>
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songs={songs}/>
      <SongList songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs} displayListSong={displayListSong}/>
    </div>
  );
}

export default App;
