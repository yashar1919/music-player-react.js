import React from 'react';
import SongListItem from './SongListItem';

const SongList = ({ songs , setCurrentSong,setSongs,displayListSong}) => {
    return (
        <div className={`song-list ${displayListSong ? "":"displayList"}`}>
            <h2>List of Songs</h2>
            <div className='song-list-items'>
                {songs.map(song => (<SongListItem key={song.id} song={song} setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs}/>))}
            </div>
        </div>
    );
};

export default SongList;