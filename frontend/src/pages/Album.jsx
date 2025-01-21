import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch.js';
import './Album.css';
import SongDisplay from '../components/SongDisplay';
import SongPlayer from '../components/SongPlayer';


function Album() {

	const { name } = useParams();
	const { fetchedData: albumData, isLoading }
	= useFetch(`http://localhost:3001/api/albumpage/${name}`, []);

	const SongPlayerRef = React.useRef(null);
	const SongPlayerText = React.useRef(null);

	const SongClick = (song, index) => {
		let songs = document.getElementsByClassName("song");
		for (let i = 0; i < songs.length; i++) {
    		songs[i].classList.remove("playing")
		}

		document.getElementById("song"+index).classList.add("playing");
		SongPlayerRef.current.src = "http://localhost:3001/api/stream/"+song.id;
		SongPlayerRef.current.play();
		SongPlayerText.current.innerHTML = albumData.songs[index].title;

		let next = document.getElementById("song"+(index+1));
		if (next) {
			SongPlayerRef.current.addEventListener("ended", (event) => {
				next.click();
			}, {once : true});
		}
	}

	return (
    <main>
	<h1>{!isLoading && albumData.name} {isLoading && "Loading"} </h1>
	<img class="album-banner" src={!isLoading && "http://localhost:3001/api/image/"+albumData.image}></img>
	<h2 class="album-author">By <Link to={"/user/"+albumData.author}> {!isLoading && albumData.author} </Link></h2>
	
	<ul>{!isLoading && typeof albumData.songs !== "undefined" && albumData.songs.map((song, index) => {
		return (
			<SongDisplay id={"song"+index} onClick={() => SongClick(song, index)} key={index} Song={song} />
		);
	})}</ul>

	<SongPlayer ref1={SongPlayerRef} ref2={SongPlayerText} src=""/>

    </main>
  );
}

export default Album;
