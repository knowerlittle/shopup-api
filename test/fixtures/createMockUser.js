const casual = require('casual');

const facebookFixed = {
  id: '11111',
  email: 'user@social.com',
  givenName: 'Test',
  familyName: 'Person',
  name: 'Test Person',
  provider: 'facebook',
};

const googleFixed = {
  id: '22222',
  email: 'user@social.com',
  givenName: 'Test',
  familyName: 'Person',
  name: 'Test Person',
  provider: 'google',
};

const givenName = casual.first_name;
const familyName = casual.last_name;
const randomNumber = Math.floor(Math.random() * 1000) + 1;

const generateRandom = (provider) => {
  return {
    id: `${randomNumber}`,
    email: casual.email,
    givenName,
    familyName,
    name: `${givenName} ${familyName}`,
    provider,
  }
};

const facebook = (type) => {
  return type === 'fixed' ? 
    facebookFixed :
    generateRandom('facebook');
}

const google = (type) => {
  return type === 'fixed' ? 
    googleFixed :
    generateRandom('google');
}

const options = {
  facebook: (type) => facebook(type),
  google: (type) => google(type),
};

const createMockUser = (provider = 'facebook', type = 'random') => options[provider](type);

module.exports = createMockUser; 