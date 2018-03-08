const Space = require(__root + 'services/space/model');
const errorResponse = require(__root + 'services/utils/errorResponse');

const getAll = async (req, res) => {
  try {
    const spaces = await Space.find({}).exec();
    res.status(200)
      .json({
        spaces
      })
  } catch (err) {
    res.status(400).json(errorRespnse(err));
  }
};

const findById = async (req, res) => {
  try {
    const space = await Space.findById(req.params.id).exec();
    res.status(200)
      .json(space)
  } catch (err) {
    res.status(400).json(errorResponse(err));
  }
};

module.exports = {
  getAll,
  findById,
}