const User = require(__root + 'components/user/model');

const findFacebookUser = ({ 
  id, 
  email, 
  provider 
}) => {
  console.log('provider', provider);
  return new Promise((resolve, reject) => {
    User.findOne(
      {
        $or: [
          {
            [provider] : {
              id,
            }
          },
          {
            email,
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
}

const createFacebookUser = ({ 
  id, 
  email, 
  provider,
  firstName : givenName, 
  lastName : familyName }) =>
  new Promise((resolve, reject) => {
    const user = new User({
      email,
      givenName,
      familyName,
      [provider]: {
        id,
      },
    });
    user.save(err => {
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  });

const attachFacebook = async ({ _id }, {id, provider}) => {
  const updatedUser = await User.findByIdAndUpdate(
    {
      _id,
    },
    {
      [provider]: {
        id,
      },
    },
    {
      new: true,
    },
  );
  return updatedUser;
};

const hasAttachedAccount = async (user, profile) =>
  user[profile.provider].id ? user : await attachFacebook(user, profile);

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
