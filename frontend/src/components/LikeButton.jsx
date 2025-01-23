import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useAlert } from '../context/AlertContext.jsx';

const LikeButton = ({ userId, albumId }) => {
  const { user, token } = useAuth();
  const { setAlert } = useAlert();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLikeToggle = async () => {
    try {
      const endpoint = isLiked ? '/removelike' : '/addlike';
      console.log(albumId, user.id);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ album_id: albumId, user_id: user.id }),
      });

      console.log(response.body);

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        setIsLiked(!isLiked);
      } else {
        setAlert('Failed to update like status', 'error');
      }
    } catch (error) {
      setAlert('Failed to update like status', 'error');
    }
  };

  return (
    <div>
      {user && (
        <div className='like__container'>
          <p>{likes}</p>{' '}
          <button onClick={handleLikeToggle}>
            {isLiked ? (
              <i class='bx bxs-like like'></i>
            ) : (
              <i class='bx bx-like like'></i>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
