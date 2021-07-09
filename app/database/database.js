const { createPool } = require('mysql');

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    connectionLimit: 10,
    multipleStatements: true,
    api: {
        allowedOrigin: [
            'http://localhost:3000',
            'http://localhost:4200',
        ]
    }
});

module.exports = pool;
