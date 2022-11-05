import { db } from '../db.js';
import jwt from 'jsonwebtoken';

export const testUser = (req, res) => {
  res.send('/test testUser');
};

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = 'SELECT * FROM users WHERE id=?';

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...others } = data[0];
    return res.status(200).json(others);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not Logged in');

  jwt.verify(token, 'secretkey', (err, userInfo) => {
    if (err) return res.status(403).json('Not Valid Token');

    const q =
      'UPDATE users SET `name` = ?, `city` = ?, `website` = ? , `profilePic` = ? , `coverPic` = ? WHERE id = ?';
    const values = [
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.profilePic,
      req.body.coverPic,
      userInfo.id,
    ];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json('Updated');
      return res.status(403).json('You can update only yout post!');
    });
  });
};
