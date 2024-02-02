import { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';

import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utils';

import styles from '../styles/navbar.module.css';
import { useAuth } from '../hooks';
import { searchUsers } from '../api';

const Navbar = () => {
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
      const fetchUsers = async () =>{
        const response = await searchUsers(searchText);

        if(response.success){
          setResults(response.data.users);
        }
      }

      if(searchText.length > 2){
        fetchUsers();
      }else{
        setResults([]);
      }
    }, [searchText]);

    useEffect(() => {
        const getUser = async () => {
          const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
          if(userToken){
              const user = jwt(userToken);

              setUser({...user});
          }
          setLoading(false);
        }
        getUser();
    }, []);

    const handleSignOut = () => {
      setUser(null);
      removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
      return navigate('/login');
    }
   
 
    return (
      <div className={styles.nav}>
        <div className={styles.leftDiv}>
          <Link to="/">
            <img
              alt=""
              src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
            />
          </Link>
        </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-vector-search-icon-png-image_320926.jpg"
          alt=""
        />

        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              
              <>
                <li className='ml-7 mt-2' onClick={handleSignOut}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};


export default Navbar;
