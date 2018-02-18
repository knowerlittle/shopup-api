const User = require(__root + 'components/user/model');

const findFacebookUser = profile =>
  new Promise((resolve, reject) => {
    User.findOne(
      {
        $or: [
          {
            'facebook.id': profile.id,
          },
          {
            email: profile.email,
          },
        ],
      },
      (err, user) => {
        if (err) {
          reject(err);
        }
        resolve(user);
      },
    );
  });

const createFacebookUser = profile =>
  new Promise((resolve, reject) => {
    const user = new User({
      email: profile.email,
      givenName: profile.firstName,
      familyName: profile.lastName,
      facebook: {
        id: profile.id,
      },
    });
    user.save(err => {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });

const attachFacebook = async (user, profile) => {
  const updatedUser = await User.findByIdAndUpdate(
    {
      _id: user._id,
    },
    {
      facebook: {
        id: profile.id,
      },
    },
    {
      new: true,
    },
  );
  return updatedUser;
};

const hasAttachedAccount = async (user, profile) =>
  user.facebook.id ? user : await attachFacebook(user, profile);

module.exports = profile =>
  new Promise((resolve, reject) => {
    findFacebookUser(profile)
      .then(user => {
        return user === null
          ? createFacebookUser(profile)
          : hasAttachedAccount(user, profile);
      })
      .then(user => resolve(user))
      .catch(err => {
        reject(err);
      });
  });
