const User = require(__root + 'services/user/model');
const Brand = require(__root + 'services/brand/model');

const getUser = (req, res) => {
    const user = User.findById(req.user.id).exec()
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(404).json({
                message: 'Something went wrong.'
            });
        });
}

module.exports = getUser;