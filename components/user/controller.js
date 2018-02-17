const User = require(__root + 'components/user/model');

const getUser = (req, res) => {
    const user = User.findById(req.params.id).exec()
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => {
            res.status(404).json({
                message: 'Something went wrong.'
            });
        });
}

module.exports = {
    getUser,
}