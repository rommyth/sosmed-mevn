import React, { useState } from 'react';
import './post.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';
// icons
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Comments from '../comments/Comments';

// Redux
import {
  useGetLikesPostQuery,
  useAddLikeMutation,
  useDeleteLikeMutation,
} from '../../features/likes/likesApi';
import { useDeletePostMutation } from '../../features/posts/postsApi';
import { useSelector } from 'react-redux';

export default function Post({ post }) {
  // tempory
  const liked = false;
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { data } = useGetLikesPostQuery(post.id);
  const [addLike] = useAddLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const [deletePost] = useDeletePostMutation();

  const handleLike = async () => {
    if (data.includes(user.id)) {
      deleteLike({ postId: post.id });
    } else {
      addLike({ postId: post.id });
    }
  };

  const handleDelete = async () => {
    deletePost(post.id);
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={'/upload/' + post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === user.id && (
            <div className="menus">
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={`./upload/${post.img}`} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {data && data.includes(user.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: 'red' }}
                onClick={() => handleLike()}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={() => handleLike()} />
            )}
            {data && data.length} likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
}
