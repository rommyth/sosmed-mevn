import React, { useState } from 'react';

import './profile.scss';
import { useParams } from 'react-router-dom';

import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../../components/posts/Posts';

// redux
import { useGetUserQuery } from '../../features/profile/userApi';
import {
  useGetRelationshipsQuery,
  useAddRelationshipMutation,
  useDeleteRelationshipMutation,
} from '../../features/profile/relationshipsApi';
import { useSelector } from 'react-redux';
import Update from '../../components/update/Update';

export default function Profile() {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { id } = useParams();
  const currentUser = useSelector((state) => state.auth.user);
  const { isLoading, error, data: user } = useGetUserQuery(id);
  const { isLoading: loadRelations, data: relationship } =
    useGetRelationshipsQuery(id);

  const [addRelationship] = useAddRelationshipMutation();
  const [deleteRelationship] = useDeleteRelationshipMutation();
  // General Function ---
  const handleFollow = (e) => {
    e.preventDefault();

    if (!relationship.includes(currentUser.id)) {
      addRelationship({ userId: id });
    } else {
      deleteRelationship(id);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="profile">
          <div className="images">
            <img src={'/upload/' + user.coverPic} alt="" className="cover" />
            <img
              src={'/upload/' + user.profilePic}
              alt=""
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="userInfo">
              <div className="left">
                <a href="http://facebook.com">
                  <FacebookTwoToneIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <InstagramIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <TwitterIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <LinkedInIcon fontSize="large" />
                </a>
                <a href="http://facebook.com">
                  <PinterestIcon fontSize="large" />
                </a>
              </div>
              <div className="center">
                <span>{user.name}</span>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{user.city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{user.website}</span>
                  </div>
                </div>
                {user.id === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <>
                    {loadRelations ? (
                      <button disabled>Loading...</button>
                    ) : (
                      <button onClick={handleFollow}>
                        {relationship?.includes(currentUser.id)
                          ? 'Following'
                          : 'Follow'}
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="right">
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>
          <div style={{ padding: '0px 20px' }}>
            <Posts userId={id} />
          </div>
        </div>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={user} />}
    </>
  );
}
