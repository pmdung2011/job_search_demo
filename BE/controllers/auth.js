const CreateError = require('http-errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthModel = require('../model/auth');

exports.postLogin = async (req, res, next) => {
	const { username, password } = req.body;

	const [result] = await AuthModel.login(username, password);

	if (!result.length) {
		next(CreateError(404, 'User not found!'));
	}

	const { password: userPassword, ...user } = result[0];
  
	const token = jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

	res.json({ user, token });
};
