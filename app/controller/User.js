const { create, getUserByUserEmail } = require('../service/User');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
//const Response = require('../services/response');
const { sign } = require('jsonwebtoken');
//const jwtUtils = require('../utils/jwt_utils');

module.exports = {
    createUser: (req, res, next) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: `Duplicate entry for key 'email' + ${err}`
                });
            }
            return res.status(200).json({
                message: "User create succesfull",
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if(err){
                console.log(err)
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result) {
                results.password = undefined;
                const jsontoken = sign({
                        id: results.id,
                        email: results.email,
                        phone: results.phone,
                    },
                    process.env.JWT_SIGN_SECRET,
                    {
                        expiresIn: "10h"
                    });
                return res.json({
                    nom: results.firstName,
                    token: jsontoken,
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password",
                });
            }
        });
    }
};
