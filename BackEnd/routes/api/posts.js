var express = require('express')
var router = express.Router()


// router.use(validateToken)

//import the Products model
const Posts = require('../../models/post')

//define endpoints for Posts resource

//Get All Posts
router.get('/', (req, res) => {

    // executes, passing results to callback

    Posts.find((err, data) => {

        //handle if an error occurred 
        if (err) {
            res.status(500).send('An error occurred')
        }

        res.json(data)
    })
})

//Get One post By ID
router.get('/:id', (req, res) => {

    Posts.findById(req.params.id, (err, data) => {
        if (err) {
            return res.status(400).send(`Error: ${err}`)
        }

        if (!data) {
            res.status(404).send('No Data Found')
        }

        res.send(data)
    })
})

//Create a new post
router.post('/', (req, res) => {
    const thePost = new Posts(req.body)
    thePost.validate(req.body, (error) => {

        if (error) {
            return res.status(422).send(error);
        }

        const newPost = new Posts({
            title: req.body.title,
            body: req.body.body,
            tags: req.body.tags,
            availability: req.body.availability,
            date_created: req.body.date_created,
            status_id: req.body.status_id,
            reviews: req.body.reviews,
            location: req.body.location,
            people_needed: req.body.people_needed,
            people_accepted: req.body.people_accepted
        })

        newPost.save()
            .then(pos => {
                res.status(201).send('The new post was successfully created')

            })
            .catch(err => {
                res.status(422).send(err)
            })
    })

})

//Update post By ID
router.put('/:id', (req, res) => {
    const thePost = new Posts(req.body)
    thePost.validate(req.body, (error) => {

        if (error) {
            return res.status(422).send(error);
        }

        Posts.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
            if (err) {
                return res.status(401).send(err)
            }

            if (!data) {
                res.status(404).send()
            }

            res.send(data)
        })
    })

})

//Delete post By ID\
router.delete('/:id', (req, res) => {

    Posts.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.status(401).send(err)
        }

        if (!data) {
            res.status(404).send()
        }

        res.send(data)
    })

})

module.exports = router