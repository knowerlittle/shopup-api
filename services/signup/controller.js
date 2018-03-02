const Category = require(__root + 'services/category/model');
const Demography = require(__root + 'services/demography/model');
const User = require(__root + 'services/user/model');
const Brand = require(__root + 'services/brand/model')
const errorResponse = require(__root + 'services/utils/errorResponse');

const getInfo = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    const demographics = await Demography.find({}).exec();
    res.status(200)
      .json({
        categories,
        demographics
      })
  } catch (err) {
    res.status(404).json(errorResponse(err));
  }
};

const attachBrandToUser = async ({ userId, brandId }) => {
  // console.log('user', userId, 'brand', brandId);
  const user = User.findById(userId).exec();
  user.set({ brand: brandId });
  await user.save();
  return user;

  // return await User.findById(userId).exec()
  //   .then((user) => {
  //     user.set({ brand: brandId });
  //     return user.save((err, updatedUser) => {
  //       if (err) return console.log('error 2', err);
  //       return updatedUser;
  //   })
  // });

};

const createBrandAndAttachUser = async ({ 
  user, 
  body: brandInfo
}, res) => {
  try {
    const brandInfoWithUser = Object.assign({}, brandInfo, { users: [user.id]});
    const brand = new Brand(brandInfoWithUser);
    await brand.save()

    // console.log('brandid', brand)
    const updatedUser = await attachBrandToUser({ userId: user.id, brandId: brand.id });
    console.log('ua', updatedUser);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json(errorResponse(err));
  }
};

module.exports = {
  getInfo,
  createBrandAndAttachUser,
}