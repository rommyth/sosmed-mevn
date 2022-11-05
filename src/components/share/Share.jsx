import './share.scss';
import Image from '../../assets/img.png';
import Map from '../../assets/map.png';
import Friend from '../../assets/friend.png';
import { useState } from 'react';
import axios from '../../utils/axios';

import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../../features/posts/postsSlice';

import { useAddPostsMutation } from '../../features/posts/postsApi';

const Share = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const [addPosts] = useAddPostsMutation();

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState('');

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = '';
    try {
      if (file) imgUrl = await upload();
      addPosts({ desc, img: imgUrl });
      // await axios.post('/posts', {
      //   desc,
      //   img: imgUrl,
      // });
      // dispatch(fetchPosts());
      setDesc('');
      setFile(null);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button type="button" onClick={handleClick}>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
