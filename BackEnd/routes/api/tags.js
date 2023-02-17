var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

// import the User model
const { Tag } = require('../../models/tag');

// GET
router.get("/", async (req, res) => {
    try {
        const data = await Tag.find();
        res.status(200).json(data);
    } catch (err) {
        res.json({
            message: err
        })
    }
});

// POST
router.post("/", (req, res) => {

    title: req.body.title

    // JWtoken validation goes here
    if (true) {
        const tag = new Tag({
            title: req.body.title
        });

        tag.save()
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
        const specificTag = await Tag.findById(req.params.Id);
        if (!specificTag) {
            res.status(404).send("Not Found");
        } else {
            res.status(200).json(specificTag);
        }
    } catch (err) {
        res.json({
            message: err
        });
    }
})

// DELETE

router.delete("/:Id", async (req, res) => {
    // jwt validation goes here
    if (true) {
        try {
            const deletedTag = await Tag.deleteOne({
                _id: req.params.Id
            });
            if (deletedTag.deletedCount === 0) {
                res.status(404).send("Not Found")
            } else {
                res.status(204).json(deletedTag);
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

    title: req.body.Id

    // JWT validation goes here
    if (true) {
        try {
            const updatedTag = await Tag.updateOne({
                _id: req.params.Id
            }, {
                $set: {
                    title: req.body.title
                }
            })
            if (updatedTag.matchedCount === 0) {
                res.status(404).send("Not Found");
            } else {
                res.status(204).json(updatedTag)
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

module.exports = router;