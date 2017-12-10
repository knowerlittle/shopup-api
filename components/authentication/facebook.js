const User = require('../user/modal');

const findFacebookUser = (profile) => new Promise((resolve, reject) => {
    User.findOne({
        $or: [{
            'facebook.id': profile.id
        }, {
            'email': profile.email
        }]
    }, (err, user) => {
        if (err) {
            reject(err)
        }
        resolve(user);
    })
});


const createFacebookUser = (profile) => new Promise((resolve, reject) => {
    const user = new User({
        email: profile.email,
        familyName: profile.firstName,
        givenName: profile.lastName,
        facebook: {
            id: profile.id,
        }
    })
    user.save((err) => {
        if (err) {
            reject(err)
        }
        resolve(user)
    })

})

const attachFacebook = async(user, profile) => {
    const updatedUser = await User.findByIdAndUpdate({
        _id: user._id
    }, {
        facebook: {
            id: profile.id,
        }
    }, {
        new: true
    });
    return updatedUser;
}


const hasAttachedAccount = async(user, profile) => (user.facebook.id ? user : await attachFacebook(user, profile))


module.export = async(profile) => {
    return findFacebookUser(profile)
        .then(user => (user === null ? createFacebookUser(profile) : hasAttachedAccount(user, profile)))
        .then(user => user)
}