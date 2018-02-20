const JWT = require('jsonwebtoken')

function createToken ({
	_id: id, 
	givenName, 
	email
}){
	return JWT.sign({
		id,
		givenName,
		email
	}, process.env.SECRET);
};

module.exports = createToken;