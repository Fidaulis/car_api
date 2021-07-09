const { createCar, getAllCar, getCarById } = require('../controller/Car')

const express = require('express');
const Router = express.Router();

const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/')
    },
    filename: (req, file, cb) => {
        const mime = file.mimetype.split('').splice(6, 5).join('');
        cb(null, uuidv4() + '.' + mime)
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    else {
        callback({message: 'Unsuported file'}, false);
    }
}

const uploadFileCar = multer({
    storage: storage,
    limits: { fileSize: 1024*1024 },
    fileFilter: fileFilter
});

Router.post('/', uploadFileCar.single('fileCar'), createCar);
Router.get('/all', getAllCar);
Router.get('/:id', getCarById);

module.exports = Router;
