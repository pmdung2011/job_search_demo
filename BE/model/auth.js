const Database = require('../util/database');

module.exports = class AuthModel {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static login(username, password) {
    return Database.execute(`
      SELECT * FROM users 
      WHERE username = ? AND password = ?
      LIMIT 1
    `, [username, password])
  }
}