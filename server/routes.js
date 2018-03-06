const authRoute = require(__root + 'services/authentication/routes');
const userRoute = require(__root + 'services/user/routes');
const signupRoute = require(__root + 'services/signup/routes');

module.exports = [
  authRoute,
  userRoute,
  signupRoute,
];