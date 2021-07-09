const pool = require('../database/database');

module.exports = {
    create: (user, callback) => {
        let date = new Date();
        pool.query(
            `INSERT INTO user(lastName, firstName, email, password, createdAt) VALUES (?, ?, ?, ?, ?)`,
            [
                user.lastName,
                user.firstName,
                user.email,
                user.password,
                date
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUserByUserEmail: (email, callback) => {
        pool.query(
            `SELECT * FROM user WHERE email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    callback(error)
                }
                return callback(null, results[0]);
            }
        );
    }
};
