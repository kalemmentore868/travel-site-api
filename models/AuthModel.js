const db = require("../config/db.js");
const bcrypt = require("bcryptjs");

class Auth {
  static async authenticate(email, password) {
    const results = await db.query(
      `SELECT id, firstname,lastname,email,password,type FROM users WHERE email= '${email}'`
    );
    const user = results.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        return user;
      }
    }

    return null;
  }
}

module.exports = Auth;
