import React, { useRef, useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPlaying, songs, setCurrentSong, setSongs }) => {

    useEffect(() => {
        const newSongsList = songs.map(item => {
            if (item.id === currentSong.id) {
                return { ...item, active: true }
            } else {
                return { ...item, active: false }
            }
        })

        setSongs(newSongsList);
    }, [currentSong]);


    const audioRef = useRef(null);

    const playSong = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const [songInfo, setSongInfo] = useState({ currentTime: 0 }, { duration: 0 });

    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;

        if (currentTime === duration) {
            const currentIndex = songs.findIndex(item => item.id === currentSong.id);
            if (currentIndex === (songs.length - 1)) {
                setCurrentSong(songs[0])
            }else{
                setCurrentSong(songs[currentIndex + 1])
            }
            playSong();
        }
        setSongInfo({ ...songInfo, currentTime: currentTime, duration: duration });
    }

    const timeFormat = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }

    const skipSong = (direction) => {
        const currentSongIndex = songs.findIndex(item => item.id === currentSong.id);
        if (direction === "next") {
            if (currentSongIndex === songs.length - 1) {
                setCurrentSong(songs[0])
            } else {
                setCurrentSong(songs[currentSongIndex + 1])
            }
        }

        if (direction === "previous") {
            if (currentSongIndex === 0) {
                setCurrentSong(songs[(songs.length - 1)])
            } else {
                setCurrentSong(songs[currentSongIndex - 1])
            }
        }

    }

    
    return (
        <div className='player'>

            <div className='time-control'>
                <p>{timeFormat(songInfo.currentTime)}</p>
                <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type='range' />
                <p>{timeFormat(songInfo.duration)}</p>
            </div>

            <div className='play-control'>
                <FontAwesomeIcon onClick={() => skipSong("previous")} className='skip-back' size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSong} className='play' size='2x' icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipSong("next")} className='skip-forward' size='2x' icon={faAngleRight} />
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

        </div>
    );
};

export default Player;