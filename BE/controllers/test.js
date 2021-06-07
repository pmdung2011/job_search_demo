const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const Test = require('../model/test');

exports.postSignup = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const [existedUser] = await Test.findByUsername(username);

		if (existedUser.length) {
			return next(createError(401, 'This username already exist'));
		}

		const encodePass = bcrypt.hashSync(password, 12);

		const user = new Test(username, encodePass);

		await user.save();

		res.json({ user });
	} catch (e) {
		next(e);
	}
};

exports.postLogin = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const [user] = await Test.findByUsername(username);

		if (!user.length) {
			return next(createError(401, 'Wrong username/password!'));
		}

		const isMatch = bcrypt.compareSync(password, user[0].password);

		if (!isMatch) {
			return next(createError(401, 'Wrong username/password!'));
		}

		res.json({ user: user[0] });
	} catch (e) {
		next(e);
	}
};
