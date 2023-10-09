import { Link } from 'react-router-dom';

import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';


const FriendsList = () => {
    const auth = useAuth();
    const { friends= [] } = auth.user;

    return (
        <div className={styles.friendsList}>
          <div className={styles.header}>Friends</div>
    
          {friends && friends.length === 0 && (
            <div className={styles.noFriends}>NO friends found!</div>
          )}
    
          {friends &&
            friends.map((friend) => (
              <div key={`friend-${friend._id}`}>
                <Link className={styles.friendsItem} to={`/user/${friend._id}`}>
                  <div className={styles.friendsImg}>
                    <img
                      src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                      alt=""
                    />
                  </div>
                  <div className={styles.friendsName}>{friend.to_user.email}</div>
                </Link>
              </div>
            ))}
        </div>
      );
}

export default FriendsList;