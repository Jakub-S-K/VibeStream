import { Link } from 'react-router-dom';
import Loading from './Loading';
import { useFetch } from '../hooks/useFetch.js';
import './AlbumDisplay.css';

function AlbumDisplay({ album }) {

  return (
    <>
      <div className='AlbumDisplay'>
	<a href={"/album/"+album.id}>
	  <h2>{album.name}</h2>
	  <img src={"http://localhost:3001/api/image/"+album.id}/>
	</a>
	<p>Likes: {album.like_count}</p>
      </div>
    </>
  );
}

export default AlbumDisplay;
