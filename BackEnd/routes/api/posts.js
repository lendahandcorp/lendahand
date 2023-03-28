var express = require('express');
var router = express.Router();
const tagLookUpAndInsertService = require('../../services/lookupAndInsertService');
const { postValidationSchema } = require('../../middleware/joiValidation');

// router.use(validateToken)

//import the Products model
const Posts = require('../../models/post');

const validateToken = require('../../middleware/validateToken');

//define endpoints for Posts resource

//Get All Posts
router.get('/', (req, res) => {
  // executes, passing results to callback

  Posts.find({})
    .sort({ date_created: -1 })
    .exec((err, data) => {
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
  const postObject = thePost.toObject();
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

  const { error, value } = postValidationSchema.validate(postObject);
  if (error) {
    return res.status(422).send(error.details[0].message);
  } else {
    const newPost = new Posts({
      writer: value.writer,
      title: value.title,
      body: value.body,
      tags: listOfTags,
      availability: value.availability,
      status: value.status,
      location: value.location,
      people_needed: value.people_needed,
      applicants: value.applicants,
      people_accepted: value.people_accepted,
      media: value.media,
    });

    newPost
      .save()
      .then((pos) => {
        //changed to .send only rather than .json(pos) because of the error "Error: Can't set headers after they are sent." while testing
        res.status(201).send();
      })
      .catch((err) => {
        res.status(422).send(err);
      });
  }
});

//Update post By ID
router.put('/:id', validateToken, async (req, res) => {
  const thePost = new Posts(req.body);
  const postObject = thePost.toObject();
  const listOfTags = await tagLookUpAndInsertService.tagLookupAndInsert(
    req.body.tags
  );

  const { error, value } = postValidationSchema.validate(postObject);
  if (error) {
    return res.status(422).send(error.details[0].message);
  } else {
    Posts.findByIdAndUpdate(
      req.params.id,
      {
        title: value.title,
        body: value.body,
        tags: listOfTags,
        availability: req.body.availability,
        date_created: req.body.date_created,
        status: req.body.status,
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
  }
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
