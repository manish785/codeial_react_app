import { useParams, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { Loader } from '../components';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { fetchUserProfile, addFriend, removeFriend } from '../api';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setrequestInProgress] = useState(false);

  const { userId } = useParams();
  const { addToast } = useToasts();
  const history = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      console.log('response', response);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return history.push('/');
      }

      setLoading(false);
    };

    getUser();
  }, [userId, history, addToast]);

  if (loading) {
    return <Loader />;
  }
  // console.log('user', user);

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;
    
   
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);
  
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleRemoveFriendClick = async () => {
    setrequestInProgress(true);

    const response = await removeFriend(userId);

    if(response.success){
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id == userId
      );

      auth.updateUserFriends(false, friendship[0]);
      addToast('Friend removed successfully', {
        appearance: 'success',
      })
    }else{
      addToast(response.message, {
        appearance: 'error',
      })
    }

    setrequestInProgress(false);
  }

  const handleAddFriendClick = async () => {
       setrequestInProgress(true);

      const response = await addFriend(userId);

      if(response.success){
        const { friendship } = response.data;

        auth.updateUserFriends(true, friendship);
        addToast('Friend added successfully', {
          appearance: 'success',
        })
      }else{
        addToast(response.message, {
          appearance: 'error',
        })
      }

      setrequestInProgress(false);
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? 'Removing friend...' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding friend...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
