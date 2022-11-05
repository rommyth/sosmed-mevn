import React, { useState } from 'react';
import axios from '../../utils/axios';
import './update.scss';
import { useUpdateUserMutation } from '../../features/profile/userApi';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UpdateScreen({ setOpenUpdate, user }) {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: '',
    city: '',
    website: '',
  });

  const [updateUser] = useUpdateUserMutation();

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(user.coverPic);
  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;
    try {
      coverUrl = cover ? await upload(cover) : user.coverPic;
      profileUrl = profile ? await upload(profile) : user.profilePic;

      updateUser({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
      // await axios.post('/posts', {
      //   desc,
      //   img: imgUrl,
      // });
      // dispatch(fetchPosts());
      setOpenUpdate(false);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : '/upload/' + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: 'none' }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : '/upload/' + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: 'none' }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          {/* <label>Email</label>
          <input
            type="text"
            value={texts.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={texts.password}
            name="password"
            onChange={handleChange}
          /> */}
          <label>Name</label>
          <input
            type="text"
            value={texts.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={texts.city}
            onChange={handleChange}
          />
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={texts.website}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
}
