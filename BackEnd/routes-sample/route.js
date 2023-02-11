const express = require(`express`)
const bcrypt = require(`bcrypt`)
const router = express.Router()
var jwt = require('jsonwebtoken')
require("dotenv/config")

const {
    Pokemon
} = require('../models/pokemon')
const {
    User
} = require('../models/pokemon')

const validateJWT = require('../middleware/checkMyJWT')
const headerName = 'x-auth-token'

// POST NEW USER
router.post("/user/register", async (req, res) => {

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

        //Querying mongo
    const checkForEmail = await User.findOne({
        email: user.email
    })

    if (!checkForEmail) {
        // encrypting
        user.password = await bcrypt.hash(user.password, 1)

        //Saving
        user.save()
            .then(data => {
                newJWT = jwt.sign({email: req.body.email}, process.env.JWT)
                res.header('Access-Control-Expose-Headers', headerName)
                res.header(headerName, newJWT)
                res.status(201).json({
                    id: data._id,
                    email: data.email
                });
            })
            .catch(err => {
                res.status(422).json({
                    message: err
                })
            })

    } else {
        res.status(400).json({
            message: "email already registered."
        })
    }    

})

// POST LOGIN
router.post("/user/login", async (req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    //Querying mongo
    const checkUser = await User.findOne({
        email: user.email
    })

    if (checkUser) {

        // encrypting
        bcrypt.compare(user.password, checkUser.password, function (err, result) {


            if (result) {
                newJWT = jwt.sign({email: req.body.email}, process.env.JWT)
                res.header('Access-Control-Expose-Headers', headerName)
                res.header(headerName, newJWT)
                res.status(200).send()
            } else {
                res.status(401).json({
                    message: "Invalid Username or Password"
                })
            }

        })

    } else {
        res.status(401).json({
            message: "Invalid Username or Password"
        })
    }

})


// GET
router.get("/", async (req, res) => {
    try {
        const data = await Pokemon.find();
        res.status(200).json(data);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

// POST
router.post("/", (req, res) => {

    // Taking off some mandatory fields
    // type: req.body.type,
    // height: req.body.height,
    // weight: req.body.weight,
    // weaknesses: req.body.weaknesses,
    // next_evolution: req.body.next_evolution

    if (validateJWT.checkMyJWT(req.get(headerName))) {
        const pokemon = new Pokemon({
            id: req.body.id,
            num: req.body.num,
            name: req.body.name,
            img: req.body.img
        });

        pokemon.save()
            .then(data => {
                res.status(201).json(data);
            })
            .catch(err => {
                res.status(422).json({
                    message: err
                })
            })

    } else {
        res.status(401).json({
            message: "Access is Denied"
        })
    }


})

// GET BY ID

router.get("/:Id", async (req, res) => {
    try {
        const specificPokemon = await Pokemon.findById(req.params.Id);
        if (!specificPokemon) {
            res.status(404).send("Not Found");
        } else {
            res.status(200).json(specificPokemon);
        }
    } catch (err) {
        res.json({
            message: err
        });
    }
})

// DELETE

router.delete("/:Id", async (req, res) => {
    if (validateJWT.checkMyJWT(req.get(headerName))) {
        try {
            const deletedPokemon = await Pokemon.deleteOne({
                _id: req.params.Id
            });
            if (deletedPokemon.deletedCount === 0) {
                res.status(404).send("Not Found")
            } else {
                res.status(204).json(deletedPokemon);
            }
        } catch (err) {
            res.json({
                message: err
            })
        }


    } else {
        res.status(401).json({
            message: "Access is Denied"
        })
    }
})

// PUT

router.put("/:Id", async (req, res) => {

    // Taking some fields out
    // type: req.body.type,
    // height: req.body.height,
    // weight: req.body.weight,
    // weaknesses: req.body.weaknesses,
    // next_evolution: req.body.next_evolution

    if (validateJWT.checkMyJWT(req.get(headerName))) {
        try {
            const updatedPokemon = await Pokemon.updateOne({
                _id: req.params.Id
            }, {
                $set: {
                    id: req.body.id,
                    num: req.body.num,
                    name: req.body.name,
                    img: req.body.img,
                }
            })
            if (updatedPokemon.matchedCount === 0) {
                res.status(404).send("Not Found");
            } else {
                res.status(204).json(updatedPokemon)
            }
        } catch (err) {
            res.status(422).json({
                message: err
            });
        }

    } else {
        res.status(401).json({
            message: "Access is Denied"
        })
    }


})

module.exports = router