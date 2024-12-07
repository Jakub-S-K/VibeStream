import React, { useState } from 'react';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  // const handleUpload = () => {
  //   const formData = new FormData();
  //   files.forEach((file) => formData.append('files[]', file));

  //   fetch('', {
  //     method: 'POST',
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Success:', data);
  //       setFiles([]);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //       alert('Wystąpił problem z przesłaniem pliku.');
  //     });
  // };

  return (
    <main>
      {/*=============== UPLOAD ===============*/}
      <section className='upload section' id='upload'>
        <div className='upload__container container'>
          {/* <h2 className='section__title'>UPLOAD</h2> */}

          {files.length > 0 ? (
            <>
              {' '}
              <h2 className='section__title'>Tracks added:</h2>
              <ul>
                {files.map((file, index) => (
                  <li className='upload__file' key={index}>
                    {file.name}
                  </li>
                ))}
              </ul>
            </>
          ) : (
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
        </div>

        {/* <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <p>
                Wybrano plik: <strong>{file.name}</strong>
              </p>
            ) : (
              <p>Przeciągnij i upuść plik tutaj lub kliknij, aby go wybrać.</p>
            )}
          </div> */}
        {/* {file && <button onClick={handleUpload}>Prześlij plik</button>} */}

        {/* <div className='upload__drag-and-drop'>
            <i class='bx bx-cloud-upload'></i>
            <p>Drag and drop your tracks here</p>
            <p>MP3 and WAV formats, up to 300 MB</p>
            <button className='upload__browse-button'>Browse File</button>
          </div> */}
      </section>
    </main>
  );
};

export default Upload;
