import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';

// icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

// react-redux
import { useDispatch, useSelector } from 'react-redux';
import { appTheme } from '../../features/theme/themeSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span>khasocial</span>
        </Link>
        <HomeOutlinedIcon />
        {isDarkMode ? (
          <WbSunnyOutlinedIcon
            onClick={() => dispatch(appTheme.setThemeDark())}
          />
        ) : (
          <DarkModeOutlinedIcon
            onClick={() => dispatch(appTheme.setThemeDark())}
          />
        )}

        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placholder="Search" />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img src={user.profilePic} alt="" />
          <span>{user.name}</span>
        </div>
      </div>
    </div>
  );
}
