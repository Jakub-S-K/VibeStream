import './Upload.css';
import React, { useState, useEffect, useRef } from 'react';
import { color, Reorder } from 'framer-motion';
import Message from '../components/Message';
import { useAuth } from '../context/AuthContext';
import Select from 'react-select';

const Upload = () => {
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => setAlert({ message, type });

  const [files, setFiles] = useState([]);
  const audioRefs = useRef([]);
  const [currentPlaying, setCurrentPlaying] = useState(null);

  const [genreOptions, setGenreOptions] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);

  const [albumCover, setAlbumCover] = useState(null);
  const [albumCoverPreview, setAlbumCoverPreview] = useState(null);
  const [albumData, setAlbumData] = useState({
    title: '',
    genre: '',
    tags: '',
    description: '',
  });
  // const MAX_TOTAL_SIZE = 300 * 1024 * 1024;

  const customTheme = (theme) => ({
    ...theme,
    borderRadius: '0.25rem',
    colors: {
      ...theme.colors,
      primary: 'var(--first-color)', // Active & Focus
      primary25: 'var(--first-color-alt-light)', // Hover
      primary50: 'var(--first-color-alt-dark)', // Select
      neutral0: 'var(--body-color-alt)', // Background
      neutral20: 'var(--third-color)', // Border
      neutral30: 'var(--third-color)', // Border - hover
      neutral80: 'var(--white-color)', // Text
    },
  });

  const customStyles = {
    placeholder: (provided) => ({
      ...provided,
      fontSize: 'var(--tiny-font-size)',
      color: 'var(--third-color)',
    }),
    control: (provided) => ({
      ...provided,
      fontSize: 'var(--normal-font-size)',
      padding: '0 6px',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: 'var(--first-color)',
      borderRadius: '0.25rem',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: 'rgb(237, 36, 0)',
      },
    }),
  };

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
    //   showAlert('Total file size cannot exceed 300 MB!', 'error');
    //   return;
    // }

    // Check if any new audio files are empty.
    const emptyFiles = audioFiles.filter((file) => file.size === 0);
    if (emptyFiles.length > 0) {
      showAlert('One or more files are empty and cannot be added!', 'error');
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
        showAlert('One or more files are already added!', 'error');
        return;
      }

      // Add new audio files to the list and move to the next step.
      setFiles((prevFiles) => [...prevFiles, ...audioFileObjects]);
      setStep(2);
    } else {
      showAlert(
        'File format not supported! Please upload a valid music file.',
        'error'
      );
    }
  };

  //==========ALBUM COVER==========//
  const handleAlbumCoverChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      return;
    }

    const maxSize = 16 * 1024 * 1024;

    if (file.size > maxSize) {
      showAlert('File size exceeds the maximum limit of 16 MB.', 'error');
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

  const handleGenreChange = (newGenre) => {
    setAlbumData((prevData) => ({
      ...prevData,
      ['genre']: newGenre.value,
    }));
  };

  const handleTagsChange = (newTags) => {
    newTags = newTags.map((tag) => ({
      id: tag.value,
    }));

    setAlbumData((prevData) => ({
      ...prevData,
      ['tags']: newTags,
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

  //==========ALBUM SUBMIT==========//
  const handleSubmitAlbum = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      showAlert('You must be logged in to create an album!', 'error');
      return;
    }

    if (files.length === 0) {
      showAlert('At least one music file must be added!', 'error');
      return;
    }
    if (!albumData.title || !albumData.genre) {
      showAlert('Title and Genre fields must be filled out!', 'error');
      return;
    }

    const formData = new FormData();

    files.forEach((fileObj) => {
      formData.append('files', fileObj.file);
      formData.append('filesNames', fileObj.name);
    });

    formData.append('id', user.id);
    formData.append('title', albumData.title);
    formData.append('genre', albumData.genre);

    if (albumCover) {
      formData.append('cover', albumCover);
    }
    if (albumData.tags && albumData.tags.length > 0) {
      formData.append('tags', JSON.stringify(albumData.tags));
    }
    if (albumData.description && albumData.description.trim() !== '') {
      formData.append('description', albumData.description);
    }

    try {
      const response = await fetch('http://localhost:3001/api/album', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const resData = await response.json();

      if (!response.ok) {
        showAlert(resData.message || 'Failed to create album.');
        return;
      }

      showAlert(resData.message, 'success');
      setStep(1);
      setFiles([]);
      setAlbumCover(null);
      setAlbumData({
        title: '',
        genre: '',
        tags: '',
        description: '',
      });
    } catch (error) {
      showAlert('Failed to create album. Please try again later.', 'error');
    }
  };

  //==========GENRES & TAGS FETCHING==========//
  useEffect(() => {
    if (step !== 2) return;

    async function fetchOptions(url, setOptions, errorMessage) {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error((await response.text()) || errorMessage);
        }

        const resData = await response.json();
        const options = resData.map((item) => ({
          value: item.id,
          label: item.name,
        }));

        setOptions(options);
      } catch (error) {
        showAlert(errorMessage, 'error');
      }
    }

    fetchOptions(
      'http://localhost:3001/api/genres',
      setGenreOptions,
      'Failed to fetch genres list.'
    );
    fetchOptions(
      'http://localhost:3001/api/tags',
      setTagOptions,
      'Failed to fetch tags list.'
    );
  }, [step]);

  return (
    <main>
      <section className='upload section' id='upload'>
        <div className='upload__container container'>
          {/*========== ALERT ==========*/}
          {alert && (
            <Message
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
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
                {/* <p>MP3 and WAV formats, up to X MB</p> */}
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
                      <span class='album__label'>
                        Title <span>*</span>
                      </span>
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
                      <span class='album__label'>
                        Genre <span>*</span>
                      </span>
                      <Select
                        name='genre'
                        onChange={handleGenreChange}
                        options={genreOptions}
                        theme={customTheme}
                        styles={customStyles}
                        placeholder='Genre'
                      />
                      {/* <select
                        className='album__input album__select'
                        name='genre'
                        value={albumData.genre}
                        onChange={handleAlbumChange}
                        side='bottom'
                      >
                        <option value=''>Select Genre</option>
                        {genreData.map((genre) => (
                          <option value={genre.id}>{genre.name}</option>
                        ))}
                      </select> */}
                    </div>

                    {/*=====TAGS=====*/}
                    <div className='album__group'>
                      <span class='album__label'>Tags</span>
                      <Select
                        isMulti
                        name='tags'
                        onChange={handleTagsChange}
                        options={tagOptions}
                        theme={customTheme}
                        styles={customStyles}
                        placeholder='Tags'
                      />
                    </div>

                    {/*=====DESCRIPTION INPUT=====*/}
                    <div className='album__group'>
                      <span class='album__label'>Description</span>
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
