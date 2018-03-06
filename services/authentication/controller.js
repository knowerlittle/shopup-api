const createToken = require(__root + 'services/authentication/createToken');
const processSocialLogin = require(__root + 'services/authentication/socialLogin.js');
const User = require(__root + 'services/user/model');
const Brand = require(__root + 'services/brand/model');

const socialLogin = async ({body: profile}, res) => {
  try {
    const user = await processSocialLogin(profile);
    const token = await createToken(user);
    return res.status(200).json({
      token: token
    });
  } catch (err) {
    return res.status(404).json({
      message: err
    });
  }
};

const userSignin = async (req, res) => {
	try {
    const user = await User.findById(req.user.id).exec();
    if (user.brand) {
      const brand = await Brand.findById(user.brand).exec();
      return res.status(200).json({
        user,
        type: 'brand',
        brand,
      });
    }
    if (user.space) {
      // return findSpaceWithUser(user);
      return console.log('narp');
    }
    return res.status(200).json({
      user,
      type: 'new',
    })
	} catch (err) {
    return res.status(404).json(err)
  }
}

module.exports = {
  socialLogin,
  userSignin,
};
