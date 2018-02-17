const authRoute = require(__root + 'components/authentication/routes');
const userRoute = require(__root + 'components/user/routes');

module.exports = [
  authRoute,
  userRoute,
];