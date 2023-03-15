var express = require('express');
var router = express.Router();
const tagLookUpAndInsertService = require('../../services/lookupAndInsertService');
const User = require('../../models/user')

// router.use(validateToken)

//import the Products model
const Posts = require('../../models/post');

const validateToken = require('../../middleware/validateToken');

//define endpoints for Posts resource

//Get All Posts
router.get('/', (req, res) => {
  // executes, passing results to callback

  Posts.find((err, data) => {
    //handle if an error occurred
    if (err) {
      res.status(500).send('An error occurred');
    }

    res.json(data);
  });
});

//Get One post By ID
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id, (err, data) => {
    if (err) {
      return res.status(400).send(`Error: ${err}`);
    }

    if (!data) {
      res.status(404).send('No Data Found');
    }

    res.send(data);
  });
});

//Create a new post
router.post('/', validateToken, async (req, res) => {
  const thePost = new Posts(req.body);
  
  /**
   * Here the code is expecting an array with tags object, example:
   * [
   *  {
   *    "title": car
   *  },
   *  {
   *    "title": gardening
   *  },
   * ... etc
   * ]
   * 
   */
  const listOfTags = await tagLookUpAndInsertService.tagLookupAndInsert(
    req.body.tags
  );

  thePost.validate(req.body, (error) => {
    if (error) {
      return res.status(422).send(error);
    }

    const newPost = new Posts({
      writer: req.body.writer,
      title: req.body.title,
      body: req.body.body,
      tags: listOfTags,
      availability: req.body.availability,
      status: req.body.status,
      location: req.body.location,
      people_needed: req.body.people_needed,
      applicants: req.body.applicants,
      people_accepted: req.body.people_accepted,
      media: req.body.media
    });

    console.log(newPost);

    newPost
      .save()
      .then((pos) => {
        res.status(201).json(pos);
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  });
});

//Update post By ID
router.put('/:id', validateToken, async (req, res) => {
  const thePost = new Posts(req.body);
  const listOfTags = await tagLookUpAndInsertService.tagLookupAndInsert(
    req.body.tags
  );
  thePost.validate(req.body, (error) => {
    if (error) {
      return res.status(422).send(error);
    }

    Posts.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        body: req.body.body,
        tags: listOfTags,
        availability: req.body.availability,
        date_created: req.body.date_created,
        status_id: req.body.status_id,
        location: req.body.location,
        people_needed: req.body.people_needed,
        applicants: req.body.applicants,
        people_accepted: req.body.people_accepted,
        media: req.body.media
      },
      (err, data) => {
        if (err) {
          return res.status(401).send(err);
        }
        if (!data) {
          res.status(404).send();
        }
        res.status(204).send('Post updated');
      }
    );
  });
});

//Delete post By ID\
router.delete('/:id', validateToken, (req, res) => {
  Posts.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return res.status(401).send(err);
    }

    if (!data) {
      res.status(404).send();
    }

    res.send(data);
  });
});

module.exports = router;
