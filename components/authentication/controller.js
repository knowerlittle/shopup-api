const createToken = require(__root + 'components/authentication/createToken');
const processFacebookUser = require(__root + 'components/authentication/facebook');
const processGoogleUser = require(__root + 'components/authentication/google.js');

const facebookLogin = async ({body: profile}, res) => {
  try {
    const user = await processFacebookUser(profile);
    const token = await createToken(user);
    res.status(200).json({
      token: token
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};

const googleLogin = async ({body: profile}, res) => {
  try {
    const user = await processGoogleUser(profile); 
    const token = await createToken(user);
    res.status(200).json({
      token: token
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};

module.exports = {
  facebookLogin,
  googleLogin,
};
