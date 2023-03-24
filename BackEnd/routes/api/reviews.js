var express = require('express')
var router = express.Router()
const validateToken = require('../../middleware/validateToken');

// Import Review Model
const Reviews = require('../../models/review')

// Get all the reviews
router.get('/', (req, res) => {

    Reviews.find((err, data) => {

        if (err) {
            res.status(500).send('An error occurred')
        }

        res.json(data)
    })
})

// Get all the reviews by post_id
// frontEnd will need that
router.get('/:post_id', validateToken, (req, res) => {
    console.log('A1')
    Reviews.find((err, data) => {

        const newReviewArray = [];

        if (err) {
            res.status(500).send('An error occurred')
        }

        for(var i=0; i<data.length; i++){

         if(data[i].post_id == req.params.post_id){

           newReviewArray.push(data[i])
         }

        }

        res.send(newReviewArray)
    })
})

// Get One review By ID
// Meant to be used by "system admin"
router.get('/:id', validateToken, (req, res) => {
    console.log('A2')
  Reviews.findById(req.params.id, (err, data) => {
        if (err) {
            return res.status(400).send(`Error: ${err}`)
        }

        if (!data) {
            res.status(404).send('No Data Found')
        }

        res.send(data)
    })
})

// Create a new review
// * Create a review under "post id" *
router.post('/', validateToken, (req, res) => {
    const theReview = new Reviews(req.body)
    theReview.validate(req.body, (error) => {

        if (error) {
            return res.status(422).send(error);
        }

        const newReview = new Reviews({
            reviewer: req.body.reviewer,
            personBeingReviewed: req.body.personBeingReviewed,
            post_id: req.body.post_id,
            description: req.body.description,
            stars: req.body.stars
        })

        newReview.save()
            .then(pos => {
                res.status(201).send('New Review was Created')

            })
            .catch(err => {
                res.status(422).send(err)
            })
    })

})

// Update review By ID
// Reviews are not meant to be edited
// router.put('/:id', (req, res) => {
//     const theReview = new Reviews(req.body)
//     theReview.validate(req.body, (error) => {

//         if (error) {
//             return res.status(422).send(error);
//         }

//         Reviews.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
//             if (err) {
//                 return res.status(401).send(err)
//             }

//             if (!data) {
//                 res.status(404).send()
//             }

//             res.send('Review was Edited')
//         })
//     })

// })

// Delete review By ID
// * Validation : delete ONLY by "lendAHand admin"
router.delete('/:id', validateToken, (req, res) => {

    Reviews.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.status(401).send(err)
        }

        if (!data) {
            res.status(404).send()
        }

        res.status(201).send('Review was Deleted')
    })

 })

module.exports = router;