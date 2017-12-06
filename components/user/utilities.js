const User = require('./modal');

const createUser = (user) => new User(user).save();

const updateUser = (id, user) => User.findByIdAndUpdate({
    _id: id
}, user, {
    new: true
});
const findUser = (user) => User.findOne(user);

const processFacebookUser = async(req, token, refreshToken, profile, done) => {
    try {
        let user = await findUser({
            $or: [{
                'facebook.id': profile.id
            }, {
                'email': profile.emails[0].value
            }]
        })
        if (user === null ) {
            let newUser = await createUser({
                email: profile.emails[0].value,
                familyName: profile.name.familyName,
                givenName: profile.name.givenName,
                facebook: {
                    id: profile.id,
                }
            });
            done(null, newUser);
        } else {
            if (user.facebook.id) {
                done(null, user)
            } else {
                let updatedUser = await updateUser(user._id, {
                    facebook: {
                        id: profile.id,
                    }
                })
                done(null, updatedUser)
            }
        }
    } catch (err) {
        err => done(err)
    }
}

const processGoogleUser = async(req, token, refreshToken, profile, done) => {
    try {
        let user = await findUser({
            $or: [{
                'google.id': profile.id
            }, {
                'email': profile.emails[0].value
            }]
        })
        if (user === null) {
            let newUser = await createUser({
                email: profile.emails[0].value,
                familyName: profile.name.familyName,
                givenName: profile.name.givenName,
                google: {
                    id: profile.id,
                }
            });
            done(null, newUser);
        } else {
            if (user.google.id) {
                done(null, user)
            } else {
                let updatedUser = await updateUser(user._id, {
                    google: {
                        id: profile.id,
                    }
                })
                done(null, updatedUser)
            }
        }
    } catch (err) {
        err => done(err)
    }
}

module.exports = {
    processFacebookUser,
    processGoogleUser,
    createUser,
    updateUser 
}