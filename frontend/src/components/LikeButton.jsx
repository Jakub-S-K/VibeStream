import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useAlert } from '../context/AlertContext.jsx';

const LikeButton = ({ likesCount, isLiked, userId, albumId }) => {
  const { user, token } = useAuth();
  const { setAlert } = useAlert();
  const [isLikedState, setIsLikedState] = useState(isLiked);
  const [likes, setLikes] = useState(likesCount);

  const handleLikeToggle = async () => {
    console.log(isLikedState);
    try {
      const endpoint = isLikedState
        ? 'http://localhost:3001/api/removelike'
        : 'http://localhost:3001/api/addlike';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ album_id: albumId, user_id: user.id }),
      });

      console.log(response.body);

      if (!response.ok) {
        return;
        // setAlert('Failed to update like status', 'error');
      }
      if (isLikedState) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      const data = await response.json();
      // setAlert(data.message, 'success');
      setIsLikedState(!isLikedState);
    } catch (error) {
      // setAlert('Failed to update like status', 'error');
    }
  };

  return (
    <div>
      <div className='like__container'>
        <p>Likes: {likes}</p>
        {user && (
          <button onClick={handleLikeToggle}>
            {isLikedState ? (
              <i class='bx bxs-like like'></i>
            ) : (
              <i class='bx bx-like like'></i>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default LikeButton;
