const db = require("../config/db.js");
const bcrypt = require("bcryptjs");

class Booking {
  static async createBooking(bookingData, user_id, property_id) {
    await db.query(
      `INSERT INTO bookings (check_in,check_out,date_booked,user_id,property_id) VALUES('${bookingData.check_in}','${bookingData.check_out}','${bookingData.date_booked}', '${user_id}','${property_id}')`
    );
  }
  static async getAllBookings() {
    //ALWAYS RETURN 0 OR MANY!!
    const results = await db.query(
      "SELECT id, check_in,check_out,date_booked,user_id,property_id FROM bookings;"
    );

    return results.rows;
  }

  static async getBooking(id) {
    //ALWAYS RETURN 0 or 1
    //db.query() - ASYNC OPERATIONS!!! THAT IT WILL ALWAYS  PROMISE!!!!!!!!
    const results = await db.query(
      `SELECT id,check_in,check_out,date_booked,user_id,property_id FROM bookings WHERE id = ${id}`
    );
    return results.rows[0];
  }

  static async deleteBooking(id) {
    await db.query(`DELETE FROM bookings WHERE id = ${id}`);
  }

  //   static async updateUser(user_form_data, id) {
  //     await db.query(
  //       `UPDATE bookings SET first_name ='${user_form_data.firstName}',
  //         last_name='${user_form_data.lastName}',
  //         location='${user_form_data.location}'
  //         WHERE id=${id};`
  //     );
  //   }
}

module.exports = Booking;
