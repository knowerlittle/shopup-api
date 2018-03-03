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
  const user = await User.findById(userId).exec();
  user.set({ brand: brandId });
  await user.save();
  return user;
};

const createBrandAndAttachUser = async (req, res) => {
  try {
    const brandInfoWithUserId = Object.assign({}, req.body, { users: req.user.id });
    const brand = new Brand(brandInfoWithUserId);
    await brand.save()
    const updatedUser = await attachBrandToUser({ userId: req.user.id, brandId: brand.id });
    res.status(200).json({ 
      user: updatedUser,
      brand
    });
  } catch (err) {
    res.status(404).json(errorResponse(err));
  }
};

module.exports = {
  getInfo,
  createBrandAndAttachUser,
}