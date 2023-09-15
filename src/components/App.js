import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import { Route, Routes } from 'react-router-dom';


import { getPosts } from '../api';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';

const About = () =>{
  return <h1> About </h1>
};

const UserInfo = () =>{
  return <h1> User </h1>
};

const Page404 = () => {
  return <h1> Page Not Found! </h1>
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

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

  return (
    <div className="App">
    <Navbar />
    <Router>
      <Routes>
      <Route exact path="/" element={<Home posts={posts} />}/>
       

      <Route exact path="/login"  element={<Login />} />
      

      <Route exact path="/about" element={<About />} />
       

      <Route exact path="/user/asdasd" element={<UserInfo />} />

       
      <Route element={<Page404 />} />
      </Routes>
    </Router>
  </div>

  );
}

export default App;
