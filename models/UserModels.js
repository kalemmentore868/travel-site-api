const db = require("../config/db.js");
const bcrypt = require("bcryptjs");

class User {
  static async createUsers(user) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    await db.query(
      `INSERT INTO users (firstname,lastname,email,password,type) VALUES('${user.firstname}','${user.lastname}','${user.email}', '${hashPassword}','${user.type}')`
    );
  }
  static async getAllUsers() {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      "SELECT id, firstname,lastname,email,password,type FROM users;"
    );

    return results.rows;
  }

  static async getUser(id) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id,firstname,lastname,email,password,type FROM users WHERE id = ${id}`
    );
    return results.rows[0];
  }

  static async deleteUser(id) {
    await db.query(`DELETE FROM users WHERE id = ${id}`);
  }

  //   static async updateUser(user_form_data, id) {
  //     await db.query(
  //       `UPDATE users SET first_name ='${user_form_data.firstName}',
  //         last_name='${user_form_data.lastName}',
  //         location='${user_form_data.location}'
  //         WHERE id=${id};`
  //     );
  //   }
}

module.exports = User;
