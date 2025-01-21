import { Link } from 'react-router-dom';
import Loading from './Loading';
import { useFetch } from '../hooks/useFetch.js';
import './SongDisplay.css';

function SongDisplay({ id, onClick, Song }) {

  return (
    <>
      <div id={id} onClick={onClick} className='song'>
	    <span>
		  {Song.title}, {Math.floor(Song.length/60)}:{String(Song.length % 60).padStart(2, '0')}
		</span>
      </div>
    </>
  );
}

export default SongDisplay;
