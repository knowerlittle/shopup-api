const authRoute = require(__root + 'services/authentication/routes');
const userRoute = require(__root + 'services/user/routes');
const signupRoute = require(__root + 'services/signup/routes');
const spaceRoute = require(__root + 'services/space/routes');

module.exports = [
  authRoute,
  userRoute,
  signupRoute,
  spaceRoute,
];