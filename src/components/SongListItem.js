import React from 'react';

const SongListItem = ({ song, setCurrentSong, songs, setSongs }) => {

    const songSelect = () => {
        const selectedSong = songs.filter(item => item.id === song.id);
        setCurrentSong(selectedSong[0]);

        const newSongsList = songs.map(item => {
            if (item.id === song.id) {
                return { ...item, active: true }
            } else {
                return { ...item, active: false }
            }
        })

        setSongs(newSongsList);
    }

    return (
        <div onClick={songSelect} className={`song-item ${song.active ? "selected" : ""}`}>
            <img src={song.cover} />

            <div className='song-description'>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>

        </div>
    );
};

export default SongListItem;