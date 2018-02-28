const Category = require(__root + 'services/category/model');
const Demography = require(__root + 'services/demography/model');
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

const createBrand = async ({ 
  user, 
  body: brandInfo
}, res) => {
  try {
    const brandInfoWithUser = Object.assign({}, brandInfo, { users: [user.id]});
    const brand = new Brand(brandInfoWithUser);
    await brand.save()
    res.status(200).json(brand);
  } catch (err) {
    res.status(404).json(errorResponse(err));
  }
};

module.exports = {
  getInfo,
  createBrand,
}