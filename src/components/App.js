import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './index';

function PrivateRoute({ element: Element, ...rest }) {
  const auth = useAuth();

  return auth.user ? <Element {...rest} /> : <Navigate to="/login" />;
}

const Page404 = () => {
  return <h1>Page 404</h1>;
};

function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  const routes = (
    <Routes>
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/" element={<Login />} />
      <Route path="/home-page" element={<Home />} />
      
      {/* Protected routes */}
      <Route path="/settings" element={<PrivateRoute element={Settings} />} />
      <Route path="/users/:userId" element={<PrivateRoute element={UserProfile} />} />

      <Route path="*" element={<Page404 />} />
    </Routes>
  );

  return (
    <div className="App">
      <Router>
        {auth.user && <Navbar />}
        {routes}
      </Router>
    </div>
  );
}


export default App;