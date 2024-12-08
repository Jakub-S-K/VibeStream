import React, { useState } from 'react';

const Upload = () => {
  const [step, setStep] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);
  const [albumData, setAlbumData] = useState({
    title: '',
    genre: '',
    description: '',
  });

  //==========BROWSE BUTTON==========//
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    validateFiles(selectedFiles);
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

  //==========VALIDATE IF AUDIO FILES==========//
  const validateFiles = (files) => {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith('audio/')
    );

    if (validFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setStep(2);
    } else {
      setError('At least one music file must be added!');
    }
  };

  //==========ALBUM FORM CHANGE==========//
  const handleAlbumChange = (e) => {
    const { name, value } = e.target;

    setAlbumData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //==========ALBUM SUBMIT==========//
  const handleSubmitAlbum = async (e) => {
    e.preventDefault();

    // if (files.length === 0) {
    //   setError('At least one music file must be added!');
    //   return;
    // }

    // if (!albumData.title || !albumData.genre || !albumData.description) {
    //   setError('All album fields must be filled out!');
    //   return;
    // }

    // const formData = new FormData();

    // files.forEach((file, index) => {
    //   formData.append('file_' + index, file);
    // });
    // formData.append('title', albumData.title);
    // formData.append('genre', albumData.genre);
    // formData.append('description', albumData.description);

    // try {
    //   const response = await fetch('', {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     alert('The album has been successfully created!');
    //     setStep(1);
    //     setFiles([]);
    //     setAlbumData({
    //       nazwa: '',
    //       artysta: '',
    //       rok_wydania: '',
    //     });
    //   } else {
    //     setError('An error occurred while creating the album.');
    //   }
    // } catch (error) {
    //   setError('Server error. Please try again later.');
    // }
  };

  return (
    <main>
      {/*=============== UPLOAD ===============*/}
      <section className='upload section' id='upload'>
        <div className='upload__container container'>
          {step === 1 && (
            <>
              <h2 className='section__title'>Add your tracks</h2>
              <div
                className={`upload__drag-and-drop ${
                  dragging ? 'upload__drag-and-drop--dragging' : ''
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <i class='bx bx-cloud-upload'></i>
                <p>Drag and drop your tracks here</p>
                <p>MP3 and WAV formats, up to 300 MB</p>
                <input
                  type='file'
                  multiple
                  style={{ display: 'none' }}
                  id='fileInput'
                  onChange={handleFileSelect}
                />
                <button
                  className='upload__browse-button'
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  Browse Files
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className='section__title'>WORK IN PROGRESS...</h2>
              {/*==========ALBUM FORM==========*/}
              <form className='album__form' onSubmit={handleSubmitAlbum}>
                <div className='album_form-top'>
                  {/*=====IMAGE=====*/}
                  <div className='album__image'></div>

                  <div className='album_form-top-inputs'>
                    {/*=====TITLE=====*/}
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

                    {/*=====GENRE=====*/}
                    <div className='album__group'>
                      <span class='album__label'>Genre</span>
                      <select
                        className='album__input album__select'
                        name='genre'
                        value={albumData.genre}
                        onChange={handleAlbumChange}
                      >
                        <option value=''>Select Genre</option>
                        <option value='rock'>Rock</option>
                        <option value='pop'>Pop</option>
                        <option value='hiphop'>Hip Hop</option>
                        <option value='jazz'>Jazz</option>
                        <option value='classical'>Classical</option>
                      </select>
                    </div>

                    {/*=====DESCRIPTION=====*/}
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
                  <button type='submit' className='album__button'>
                    Create Album
                  </button>
                </div>
              </form>

              <ul>
                {files.map((file, index) => (
                  <li className='upload__file' key={index}>
                    {file.name}
                  </li>
                ))}
              </ul>
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
