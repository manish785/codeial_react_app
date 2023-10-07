import {BrowserRouter as Router, redirect, Route, Routes} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './index';

function PrivateRoute({ children, ...rest}){
    const auth = useAuth();

    return (
      <Route
         {...rest}
         render={()=>{
           if(auth.user){
             return children;
           }

           return <Navigate to='/login'/>
         }}
      />
    )
}

const Page404 = () => {
  return <h1>Page 404</h1>;
};


function App() {
  const auth = useAuth();
  console.log('auth', auth);

  if (auth.loading) {
    return <Loader />;
  }

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      {/* Protected route */}
      <Route
        path="/settings"
        element={auth.user ? <Settings /> : <Navigate to="/login" />}
      />
      <Route
        path="/user/:userId"
        element={auth.user ? <UserProfile /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );

  return (
    <div className="App">
      <Router>
        <Navbar />
        {routes}
      </Router>
    </div>
  );
}

export default App;
