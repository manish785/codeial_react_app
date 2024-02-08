import { useState, useEffect } from 'react';
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
import useOnlineStatus from '../hooks/useOnlineStatus';
import { searchUsers } from '../api';

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const navigate = useNavigate();

  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await searchUsers(searchText);
        console.log('Search response:', response);

        if (response.success) {
          setResults(response.data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
        if (userToken) {
          const decodedUser = jwt(userToken);
          setUser(decodedUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleSignOut = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    auth.user = null;
    navigate('/');
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Clear search results if search input is empty
    if (value.trim() === '') {
      setResults([]);
    }
  };

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
        {auth.user && (
          <>
            <img
              className={styles.searchIcon}
              src="https://png.pngtree.com/png-vector/20190115/ourmid/pngtree-vector-search-icon-png-image_320926.jpg"
              alt=""
            />
            <input
              placeholder="Search users"
              value={searchText}
              onChange={handleSearchChange}
            />
          </>
        )}

        {auth.user && results.length > 0 && (
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
          <div className="">
            <ul>
              <li className="mr-16 mt-2">
                Online Status: {onlineStatus ? '✅' : '🚫'}
              </li>
            </ul>
          </div>
        )}

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
                <li className="ml-7 mt-2" onClick={handleSignOut}>
                  Log out
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Log in</Link>
                </li>
                <li>
                  <Link to="/sign-up">Sign Up</Link>
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
