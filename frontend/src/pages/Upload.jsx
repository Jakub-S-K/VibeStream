import './Upload.css';
import React, { useState, useEffect, useRef } from 'react';
import { Reorder } from 'framer-motion';
import Message from '../components/Message';
// import genresData from '../assets/json/genres.json';

const Upload = () => {
  const [step, setStep] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [albumCover, setAlbumCover] = useState(null);
  const [albumCoverPreview, setAlbumCoverPreview] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [files, setFiles] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRefs = useRef([]);
  const [genres, setGenres] = useState([]);
  const [albumData, setAlbumData] = useState({
    title: '',
    genre: '',
    description: '',
  });
  // const MAX_TOTAL_SIZE = 300 * 1024 * 1024;

  //==========BROWSE FILES BUTTON==========//
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    validateFiles(selectedFiles);
    e.target.value = null;
  };

  //==========DRAG & DROP==========//
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    validateFiles(droppedFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  //==========VALIDATE FILES==========//
  const validateFiles = (newFiles) => {
    // Filter files to include only audio files.
    const audioFiles = newFiles.filter((file) =>
      file.type.startsWith('audio/')
    );
    // const currentTotalSize = files.reduce((sum, file) => sum + file.size, 0);
    // const newFilesSize = audioFiles.reduce((sum, file) => sum + file.size, 0);

    // if (currentTotalSize + newFilesSize > MAX_TOTAL_SIZE) {
    //   setError('Total file size cannot exceed 300 MB!');
    //   return;
    // }

    // Check if any new audio files are empty.
    const emptyFiles = audioFiles.filter((file) => file.size === 0);
    if (emptyFiles.length > 0) {
      setError('One or more files are empty and cannot be added!');
    }

    if (audioFiles.length > 0) {
      const validAudioFiles = audioFiles.filter((file) => file.size > 0);

      // Map audio files to objects with metadata and a unique ID.
      const audioFileObjects = validAudioFiles.map((file, index) => ({
        id: (Date.now().toString(32) + Math.random().toString(16)).replace(
          /\./g,
          ''
        ),
        file,
        name: file.name.split('.').slice(0, -1).join('.'),
        src: URL.createObjectURL(file),
      }));

      // Check if any new audio files are already in the list.
      const filesAlreadyAdded = audioFileObjects.filter((newFile) =>
        files.some(
          (existingFile) => existingFile.file.name === newFile.file.name
        )
      );

      if (filesAlreadyAdded.length > 0) {
        setError('One or more files are already added!');
        return;
      }

      // Add new audio files to the list and move to the next step.
      setFiles((prevFiles) => [...prevFiles, ...audioFileObjects]);
      setStep(2);
    } else {
      setError('File format not supported! Please upload a valid music file.');
    }
  };

  //==========ALBUM COVER==========//
  const handleAlbumCoverChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      return;
    }

    const maxSize = 1 * 1024 * 1024;

    if (file.size > maxSize) {
      setError('File size exceeds the maximum limit of 16 MB.');
      return;
    }

    setAlbumCover(file);
    setAlbumCoverPreview(URL.createObjectURL(file));
  };

  //==========ALBUM FORM CHANGE==========//
  const handleAlbumChange = (e) => {
    const { name, value } = e.target;

    setAlbumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //==========REMOVE SONG==========//
  const removeSong = (id) => {
    setFiles((prevFiles) => prevFiles.filter((fileObj) => fileObj.id !== id));
  };

  //==========SONG NAME CHANGE==========//
  const handleSongNameChange = (id, newName) => {
    setFiles((prevFiles) =>
      prevFiles.map((fileObj) =>
        fileObj.id === id ? { ...fileObj, name: newName } : fileObj
      )
    );
  };

  //==========SONG PLAY TOGGLE==========//
  const handlePlayToggle = (id) => {
    const currentAudio = audioRefs.current[id];
    const lastAudio = audioRefs.current[currentPlaying];

    if (currentPlaying === id) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentPlaying(null);
    } else {
      if (currentPlaying && audioRefs.current[currentPlaying]) {
        lastAudio.pause();
        lastAudio.currentTime = 0;
      }

      if (currentAudio) {
        currentAudio.play();
        setCurrentPlaying(id);
      }
    }
  };

  //==========AUDIO END==========//
  const handleAudioEnd = (id) => {
    if (currentPlaying === id) {
      setCurrentPlaying(null);
    }
  };

  //==========CLOSE ERROR MESSAGE==========//
  const closeError = () => {
    setError(null);
  };

  //==========CLOSE SUCCESS MESSAGE==========//
  const closeSuccess = () => {
    setSuccess(null);
  };

  //==========GENRES FETCHING==========//
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/genres');
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        return 'Error fetching genres:', error;
      }
    };

    fetchGenres();
  }, []);

  //==========ALBUM SUBMIT==========//
  const handleSubmitAlbum = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      setError('At least one music file must be added!');
      return;
    }
    if (!albumData.title || !albumData.genre) {
      setError('Title and Genre fields must be filled out!');
      return;
    }

    const formData = new FormData();

    files.forEach((fileObj, index) => {
      formData.append('file', fileObj.file);
    });
    formData.append('title', albumData.title);
    formData.append('id', '37692021-37ea-41f1-b95f-3e8a2750c072'); //Temp logged user id
    formData.append('genre', albumData.genre);
    formData.append('description', albumData.description);

    if (albumCover) {
      formData.append('cover', albumCover);
    }

    try {
      const response = await fetch('http://localhost:3001/api/album', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        setError('An error occurred while creating the album.');
      }

      setSuccess('Album created successfully!');
      setStep(1);
      setFiles([]);
      setAlbumCover(null);
      setAlbumData({
        title: '',
        genre: '',
        description: '',
      });
    } catch (error) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <main>
      <section className='upload section' id='upload'>
        <div className='upload__container container'>
          {/*==========ERROR==========*/}
          {error && (
            <Message type='error' message={error} onClose={closeError} />
          )}
          {/*==========SUCCESS==========*/}
          {success && (
            <Message type='success' message={success} onClose={closeSuccess} />
          )}

          {/*=============== STEP 1. FILES UPLOADING - DRAG & DROP, SELECT ===============*/}
          {step === 1 && (
            <>
              <h2 className='section__title'>Upload your songs</h2>
              <div
                className={`upload__drag-and-drop ${
                  dragging ? 'upload__drag-and-drop--dragging' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() =>
                  document.getElementById('song-file-input').click()
                }
              >
                <i class='bx bx-cloud-upload'></i>
                <p>Drag and drop your songs to get started</p>
                <p>MP3 and WAV formats, up to X MB</p>
                <input
                  type='file'
                  multiple
                  accept='audio/*'
                  style={{ display: 'none' }}
                  id='song-file-input'
                  onChange={handleFileSelect}
                />
                <button
                  className='upload__browse-button'
                  // onClick={() =>
                  //   document.getElementById('song-file-input').click()
                  // }
                >
                  Browse Files
                </button>
              </div>
            </>
          )}
          {/*=============== STEP 2. ALBUM CREATING ===============*/}
          {step === 2 && (
            <>
              {/*==========ALBUM FORM==========*/}
              <form className='album__form' onSubmit={handleSubmitAlbum}>
                <div className='album_form-top'>
                  {/*=====COVER INPUT=====*/}
                  <input
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    onChange={handleAlbumCoverChange}
                    id='cover-file-input'
                  />
                  <div
                    className='album__cover'
                    onClick={() =>
                      document.getElementById('cover-file-input').click()
                    }
                    style={{
                      backgroundImage: albumCoverPreview
                        ? `url(${albumCoverPreview})`
                        : 'none',
                    }}
                  >
                    {!albumCoverPreview && (
                      <i class='bx bx-image-add album__cover-icon'></i>
                    )}
                  </div>

                  <div className='album_form-top-inputs'>
                    {/*=====TITLE INPUT=====*/}
                    <div className='album__group'>
                      <span class='album__label'>Album title</span>
                      <input
                        className='album__input'
                        type='text'
                        name='title'
                        placeholder='Title'
                        value={albumData.title}
                        onChange={handleAlbumChange}
                      />
                    </div>

                    {/*=====GENRE INPUT=====*/}
                    <div className='album__group'>
                      <span class='album__label'>Genre</span>
                      <select
                        className='album__input album__select'
                        name='genre'
                        value={albumData.genre}
                        onChange={handleAlbumChange}
                      >
                        <option value=''>Select Genre</option>
                        {genres.map((genre) => (
                          <option value={genre.name}>{genre.name}</option>
                        ))}
                      </select>
                    </div>

                    {/*=====DESCRIPTION INPUT=====*/}
                    <div className='album__group'>
                      <span class='album__label'>Album description</span>
                      <textarea
                        className='album__input album__textarea'
                        name='description'
                        placeholder='Describe your album'
                        value={albumData.description}
                        onChange={handleAlbumChange}
                        onInput={autoResizeTextarea}
                      />
                    </div>
                  </div>
                </div>

                <div className='album__form-bottom'>
                  {/*=====SUBMIT BUTTON=====*/}
                  <button
                    type='submit'
                    disabled={files.length === 0}
                    className={`album__button ${
                      files.length === 0 ? 'album__button--blocked' : ''
                    }`}
                  >
                    Create Album
                  </button>
                </div>
              </form>

              {/*=============== SONG LIST - DRAG TO REORDER===============*/}
              {files.length === 0 ? (
                <p className='files__info-text'>
                  At least one file must be added to the album...
                </p>
              ) : (
                <Reorder.Group
                  axis='y'
                  values={files}
                  onReorder={(newOrder) => {
                    setFiles(newOrder);
                    // setCurrentPlaying(null);
                  }}
                  className='files__list'
                  layoutScroll
                  style={{ overflowY: 'hidden' }}
                >
                  {files.map((fileObj, index) => {
                    return (
                      <Reorder.Item
                        key={fileObj.id}
                        value={fileObj}
                        className='files__item'
                      >
                        <div className='files__data-l'>
                          {/* =====PLAY-PAUSE BUTTON===== */}
                          <button
                            className='files__button files__button--toogle-play'
                            onClick={() => handlePlayToggle(fileObj.id)}
                          >
                            <i
                              className={`bx ${
                                currentPlaying === fileObj.id
                                  ? 'bx-pause'
                                  : 'bx-play'
                              }`}
                            ></i>
                          </button>
                          {/*=====NUMBER=====*/}
                          <span className='files__number'>{index + 1}</span>

                          {/*=====SONG NAME INPUT=====*/}
                          <input
                            className='files__song-name'
                            type='text'
                            value={fileObj.name}
                            onChange={(e) =>
                              handleSongNameChange(fileObj.id, e.target.value)
                            }
                          />
                          {/*=====FILE NAME=====*/}
                          <p className='files__file-name'>
                            {fileObj.file.name}
                          </p>
                        </div>

                        {/*=====REMOVE BUTTON=====*/}
                        <button
                          className='files__button files__button--delete'
                          onClick={() => removeSong(fileObj.id)}
                        >
                          <i class='bx bx-x'></i>
                        </button>
                        {/*=====AUDIO ELEMENT=====*/}
                        <audio
                          ref={(el) => (audioRefs.current[fileObj.id] = el)}
                          src={fileObj.src}
                          onEnded={() => handleAudioEnd(fileObj.id)}
                        />
                      </Reorder.Item>
                    );
                  })}
                </Reorder.Group>
              )}

              <div className='files__add-button-l'>
                <input
                  type='file'
                  multiple
                  accept='audio/*'
                  style={{ display: 'none' }}
                  id='song-file-input'
                  onChange={handleFileSelect}
                />
                <button
                  className='files__add-button'
                  onClick={() =>
                    document.getElementById('song-file-input').click()
                  }
                >
                  Add More Songs
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

function autoResizeTextarea(e) {
  e.target.style.height = 'auto';
  e.target.style.height = `${e.target.scrollHeight}px`;
}

export default Upload;
