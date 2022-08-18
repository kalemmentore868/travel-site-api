const db = require("../config/db.js");

class Property {
  static async createProperties(property) {
    const results = await db.query(
      `INSERT INTO property (title, location, star_rating, type, price, details, image_url) VALUES('${property.title}','${property.location}','${property.starRating}', '${property.type}','${property.price}', '${property.details}', '${property.imageUrl}') RETURNING *`
    );
    return results.rows[0];
  }
  static async getAllProperties() {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      "SELECT id, title, location, star_rating, type, price, details, image_url FROM property;"
    );

    return results.rows;
  }

  static async getProperty(id) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id,title, location, star_rating, type, price, details, image_url FROM property WHERE id = ${id}`
    );
    return results.rows[0];
  }

  static async deleteProperty(id) {
    await db.query(`DELETE FROM property WHERE id = ${id}`);
  }

  static async updateProperty(property, id) {
    const results = await db.query(
      `UPDATE property SET title ='${property.title}',
          location='${property.location}',
          star_rating='${property.starRating}',
          type='${property.type}',
          price='${property.price}',
          details='${property.details}',
          image_url='${property.imageUrl}'
          WHERE id=${id} RETURNING *;`
    );
    return results.rows[0];
  }
}

module.exports = Property;
