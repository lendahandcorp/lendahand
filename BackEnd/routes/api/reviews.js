var express = require('express')
var router = express.Router()

// Import Review Model
const Reviews = require('../../models/review')

// Get all the reviews --> Delete this
router.get('/', (req, res) => {

    Reviews.find((err, data) => {

        if (err) {
            res.status(500).send('An error occurred')
        }

        res.json(data)
    })
})

// Get all the reviews by post_id
router.get('/:post_id', (req, res) => {

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

// Get One review By ID --> Delete this
// router.get('/:id', (req, res) => {

//   Reviews.findById(req.params.id, (err, data) => {
//         if (err) {
//             return res.status(400).send(`Error: ${err}`)
//         }

//         if (!data) {
//             res.status(404).send('No Data Found')
//         }

//         res.send(data)
//     })
// })

// Create a new review
// * Create a review under "post id" *
router.post('/', (req, res) => {
    const theReview = new Reviews(req.body)
    theReview.validate(req.body, (error) => {

        if (error) {
            return res.status(422).send(error);
        }

        const newReview = new Reviews({
            reviewer: req.body.reviewer,
            post_id: req.body.post_id,
            title: req.body.title,
            body: req.body.body,
            stars: req.body.stars,
            date_created: req.body.date_created
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
// * Validation : update ONLY by "reviewer" who created the review *
router.put('/:id', (req, res) => {
    const theReview = new Reviews(req.body)
    theReview.validate(req.body, (error) => {

        if (error) {
            return res.status(422).send(error);
        }

        Reviews.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
            if (err) {
                return res.status(401).send(err)
            }

            if (!data) {
                res.status(404).send()
            }

            res.send('Review was Edited')
        })
    })

})

// Delete review By ID
// * Validation : delete ONLY by "reviewer" who created the review *
router.delete('/:id', (req, res) => {

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