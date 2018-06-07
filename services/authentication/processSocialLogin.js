const User = require(__root + 'services/user/model');

const findUser = ({ 
  id, 
  email, 
  provider 
}) => {
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

const createUser = ({ 
  id, 
  email, 
  provider,
  firstName, 
  lastName }) =>
  new Promise((resolve, reject) => {
    const user = new User({
      email,
      firstName,
      lastName,
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

const attachSocialAccount = async ({ _id }, {id, provider}) => {
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
  user[profile.provider].id ? user : await attachSocialAccount(user, profile);

module.exports = profile =>
  new Promise((resolve, reject) => {
    findUser(profile)
      .then(user => {
        return user === null
          ? createUser(profile)
          : hasAttachedAccount(user, profile);
      })
      .then(user => resolve(user))
      .catch(err => {
        reject(err);
      });
  });
