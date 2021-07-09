const pool = require('../database/database');

module.exports = {
    create: (car, file, callback) => {
        let date = new Date();
        let ids;
        const sql = `INSERT INTO car (name, description, createdAt) VALUES ('${car.name}', '${car.description}', ?);
                     INSERT INTO files (name, destination, type, size, code) VALUES ('${file.filename}', '${file.path}', '${file.mimetype}', '${file.size}', '${file.fieldname}');
                   `;
        pool.query(
            sql,
            [date],
            (error, results, filed) => {
                console.log(error)
                ids = results.map(e => e.insertId);
                if (error || !ids) {
                    return callback(error);
                }
                pool.query(`INSERT INTO car_files (car_id, files_id) VALUES(${ids.join(",")})`,
                    (err, res)=> {
                        if(err) {
                            return callback(err);
                        }
                    });
                return callback(null, results);
            }
        );
    },
    findAll: callback => {
        pool.query(
            `SELECT c.id, c.name, c.description, f.destination
                    FROM car_files cf
                    JOIN car c ON cf.car_id = c.id
                    JOIN files f ON cf.files_id = f.id
                    `,
            [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    findOne: (id, result) => {
        pool.query(
            `SELECT c.id, c.name, c.description, f.destination
                 FROM car_files cf
                 JOIN car c ON cf.car_id = c.id
                 JOIN files f ON cf.files_id = f.id
                 WHERE c.id = ${id}`,
            (error, results, fields) => {
                if (error) {
                    return result(error);
                }
                return result(null, results[0]);
            }
        );
    },
}
