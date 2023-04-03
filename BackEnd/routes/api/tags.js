var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
const validateToken = require('../../middleware/validateToken');

// import the Tag model
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
router.post("/", validateToken, async (req, res) => {

    // I'm expecting an array of objects here
    findMyTags = async() => {
        return await Tag.find()
    }

    insertMyTags = async(objectToInsert) => {
        return await Tag.insertMany(objectToInsert).catch(err => console.log(err))
    }
    
    let currentTagList = await findMyTags()

    let listOfExistingTags = currentTagList.filter(currentTag => req.body.some(reqBody => currentTag.title === reqBody.title))

    let tagsToInsert = req.body.filter(reqBodyTag => !currentTagList.some(currentTag => currentTag.title === reqBodyTag.title))

    if(tagsToInsert.length>0) {
        
        let listOfNewTags = await insertMyTags(tagsToInsert)
        res.status(201).json(listOfNewTags);
    }
    else {
        res.status(422).json({
            message: "These tags already exist",
            listOfExistingTags
            });
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
router.delete("/:Id", validateToken, async (req, res) => {
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
router.put("/:Id", validateToken, async (req, res) => {

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
            res.status(422).send({
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