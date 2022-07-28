const db = require("../config/db.js");

class Property {
  static async createProperties(property) {
    await db.query(
      `INSERT INTO property (title, location, star_rating, type, price, details, image_url) VALUES('${property.title}','${property.location}','${property.starRating}', '${property.type}','${property.price}', '${property.details}', '${property.imgUrl}' )`
    );
  }
  static async getAllProperties() {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      "SELECT id, title, location, star_rating, type, price, details, image_url FROM property;"
    );

    return results.rows;
  }

  static async getUser(id) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id,title, location, star_rating, type, price, details, image_url FROM property WHERE id = ${id}`
    );
    return results.rows[0];
  }

  static async deleteUser(id) {
    await db.query(`DELETE FROM property WHERE id = ${id}`);
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

module.exports = Property;
