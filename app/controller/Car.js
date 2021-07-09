const { create, findAll, findOne } = require('../service/Car');

module.exports= {
    createCar: (req, res) => {
        const car = req.body;
        const file = req.file;
        create(car, file, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            return res.status(200).json({
                message: "Voiture ajoute avec success!"
            });
        })
    },

    getAllCar: (req, res) => {
        findAll((err, results) => {
            results.forEach(data => {
                const fileCar = `${req.origin_protocol}://${req.get('host')}/` + data.destination;
                data.destination = fileCar;
            })
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).send(results);
        });
    },
    getCarById: (req, res) => {
        const id = req.params.id;
        findOne(id, (err, results) => {
            const fileCar = `${req.origin_protocol}://${req.get('host')}/` + results.destination;
            results.destination = fileCar;
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Category not found"
                });
            }
            return res.status(200).send(results);
        });
    },
}
