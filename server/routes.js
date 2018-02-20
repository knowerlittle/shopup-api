const authRoute = require(__root + 'services/authentication/routes');
const userRoute = require(__root + 'services/user/routes');

module.exports = [
  authRoute,
  userRoute,
];