const createToken = require(__root + 'services/authentication/createToken');
const User = require(__root + 'services/user/model');

async function createUserWithToken () {
  const user = await new User({
    firstName: 'test1',
    email: 'test1@test.com',
  }).save();

  const token = await createToken(user);

  return { user, token };
}

module.exports = createUserWithToken;