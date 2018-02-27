const Category = require(__root + 'services/category/model');
const Demography = require(__root + 'services/demography/model');

const brandSignup = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    const demographics = await Demography.find({}).exec();
    res.status(200)
      .json({
        categories,
        demographics
      })
  } catch (err) {
    res.status(404).json({
      message: 'Something went wrong.'
    });
  }
};

module.exports = {
  brandSignup,
}