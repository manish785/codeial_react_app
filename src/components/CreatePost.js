import { useState } from 'react';
import styles from '../styles/home.module.css';
import { useToasts } from 'react-toast-notifications';

import { addPost } from '../api';
import { usePosts } from '../hooks';


const CreatePost = () => {
    const [post, setPosts] = useState('');
    const [addingPost, setaddingPost] = useState(false);
    const { addToast } = useToasts();
    const posts = usePosts();

    const handleAddPostClick = async () => {
        setaddingPost(true);
        // do some checks
        const response = await addPost(post);
        if(response.success){
            setPosts('');
            posts.addPostToState(response.data.post);
            addToast('Post created succesfully', {
                appearance: 'success'
            })
        }else{
            addToast(response.message, {
                appearance: 'error'
            })
        }
        setaddingPost(false);
    };
    
    return (
        <div className={styles.createPost}>
          <textarea
            className={styles.addPost}
            value={post}
            onChange={(e) => setPosts(e.target.value)}
        />
    
        <div>
          <button
            className={styles.addPostBtn}
            onClick={handleAddPostClick}
            disabled={addingPost}
          >
            {addingPost ? 'Adding post...' : 'Add post'}
          </button>
        </div>
        </div>
      );

}


export default CreatePost;