const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const processFacebookUser = require('./facebook.js');
const processGoogleUser = require('./google.js');

const createToken = async user => {};

const facebookLogin = async (req, res) => {
  const profile = req.body;
  processFacebookUser(profile)
    .then(user => {
      const token = jwt.sign(
        {
          data: user._id,
        },
        process.env.SECRET,
        {
          expiresIn: '1h',
        },
      );
      res.status(200).json({
        token: token,
      });
    })
    .catch(err => {
      res.status(404).json({ message: err });
    });
};
const googleLogin = (req, res) => {
  const profile = req.body;
  processGoogleUser(profile)
    .then(user => {
      const token = jwt.sign(
        {
          data: user._id,
        },
        process.env.SECRET,
        {
          expiresIn: '1h',
        },
      );
      res.status(200).json({
        token: token,
      });
    })
    .catch(err => {
      res.status(404).json({ message: err });
    });
};

module.exports = {
  facebookLogin,
  googleLogin,
};
