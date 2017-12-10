const User = require('../user/modal');

const findGoogleUser = profile =>
  new Promise((resolve, reject) => {
    User.findOne(
      {
        $or: [
          {
            'google.id': profile.id,
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

const createGoogleUser = profile =>
  new Promise((resolve, reject) => {
    const user = new User({
      email: profile.email,
      familyName: profile.firstName,
      givenName: profile.lastName,
      google: {
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

const attachGoogle = async (user, profile) => {
  const updatedUser = await User.findByIdAndUpdate(
    {
      _id: user._id,
    },
    {
      google: {
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
  user.google.id ? user : await attachGoogle(user, profile);

module.exports = async profile => {
  return findGoogleUser(profile)
    .then(
      user =>
        user === null
          ? createGoogleUser(profile)
          : hasAttachedAccount(user, profile),
    )
    .then(user => user);
};
