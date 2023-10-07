import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { Loader } from '../components';
import { getPosts } from '../api';
import styles from '../styles/home.module.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      // console.log(response);

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }
  console.log('posts', posts);
  console.log('hiiiii', posts[0].user)

  // const data = {
  //   name:'manish'
  // }
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <div className={styles.postWrapper} key={`post-${post._id}`}>
          <div className={styles.postHeader}>
            <div className={styles.postAvatar}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMlJQT1Rc7EKivuy0WFsA1IwFsIIhvricvExrQaUg&s"
                alt="user-pic"
              />
              <div>
              <Link
                  to={{
                    pathname: `/user/${post.user._id}`,
                  }}
                  state= {
                    // user: post.user,
                    // data: data.name,
                    post.user
                  } 
                  className={styles.postAuthor}
                >
                  {post.user.name}
                </Link>
                <span className={styles.postTime}>a minute ago</span>
              </div>
            </div>
            <div className={styles.postContent}>{post.conent}</div>

            <div className={styles.postActions}>
              <div className={styles.postLike}>
              <img
                  src="https://png.pngtree.com/png-clipart/20190516/original/pngtree-facebook-like-icon-png-image_3584862.jpg"
                  alt="likes-icon"
                />
                <span>5</span>
              </div>

              <div className={styles.postCommentsIcon}>
              <img
                  src="https://i.pinimg.com/736x/44/bd/61/44bd61eb2334919917cbf80e025501aa.jpg"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className={styles.postCommentBox}>
              <input placeholder="Start typing a comment" />
            </div>

            <div className={styles.postCommentsList}>
              {/* {post.comments.map((comment) => (
                // <Comment comment={comment} />
              ))} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
