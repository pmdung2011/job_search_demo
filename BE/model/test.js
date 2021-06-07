const Database = require('../util/database');

module.exports = class Test {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	save() {
		return Database.execute(
			`
      INSERT INTO users 
        (username, password) 
      VALUES 
        (?, ?)
    `,
			[this.username, this.password],
		);
	}

	static findByUsername(username) {
		return Database.execute(
			`
      SELECT *
      FROM users
      WHERE username = ?
      LIMIT 1
    `,
			[username],
		);
	}
};
