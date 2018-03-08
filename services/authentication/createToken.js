const jwt = require('jsonwebtoken');
const config = require(__root + 'config/config');

const TOKEN_EXPIRY = '6h';

const createToken = async (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET,
    {
      expiresIn: TOKEN_EXPIRY,
    },
  );
}

module.exports = createToken;