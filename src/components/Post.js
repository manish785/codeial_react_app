import PropTypes from 'prop-types';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import { createComment, toggleLike } from '../api';
import { usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import { Comment } from './';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes.length);
  const [postComments, setPostComments] = useState(post.comments);
  const posts = usePosts();
  const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        setPostComments([...postComments, response.data.comment]); // Update comments state in the real time
        addToast('Comment created successfully!', {
          appearance: 'success',
        });
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
      }

      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, 'Post');

    if (response.success) {
      if (response.data.deleted) {
        setPostLikes(postLikes - 1);                       // update the like in the real time
        addToast('Like removed successfully!', {
          appearance: 'success',
        });
      } else {
        setPostLikes(postLikes + 1);
        addToast('Like added successfully!', {
          appearance: 'success',
        });
      }
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  };

  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        {/* Post header JSX */}
      </div>

      <div className={styles.postContent}>{post.content}</div>

      <div className={styles.postActions}>
        <div className={styles.postLike}>
          <button onClick={handlePostLikeClick}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSyl9mrjSt0NQbcEhW5Gn0hEOy25MMBgzGBfqwbeE&s"
              alt="likes-icon"
            />
          </button>
          <span>{postLikes}</span>
        </div>

        <div className={styles.postCommentsIcon}>
          {/* Comments icon JSX */}
        </div>
      </div>

      <div className={styles.postCommentBox}>
        <input
          placeholder="Start typing a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleAddComment}
        />
      </div>

      <div className={styles.postCommentsList}>
        {postComments.map((comment) => (
          <Comment comment={comment} key={`post-comment-${comment._id}`} />
        ))}
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};


export default Post;