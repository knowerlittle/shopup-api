const createToken = require(__root + 'services/authentication/createToken');
const processSocialLogin = require(__root + 'services/authentication/socialLogin.js');

const socialLogin = async ({body: profile}, res) => {
  try {
    const user = await processSocialLogin(profile);
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

module.exports = socialLogin;
