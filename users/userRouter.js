const express = require('express');
const db = require('./userDb.js');
const postDB = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  db.insert(req.body)
  .then(user=>{
    if(user){
      res.status(201).json(user)
    }
    else{
      res.status(500).json({message: "User could not be created"})
    }
  })
});

router.post('/:id/posts',validateUserId, validatePost,  (req, res) => {
postDB.insert({text: req.body.text, user_id: req.user})
.then(post=>{
  if(post){
    res.status(201).json(post)
  }
  else{
    res.status(500).json({message: "Post could not be added"})
  }
})
});

router.get('/', (req, res) => {
  db.get()
.then(users=>{
  res.status(200).json(users)
})
.catch(err=>{
  console.log(err)
  res.status(500).json({error: 'Cannot find resources'})
})});

router.get('/:id', validateUserId, (req, res) => {
  db.getById(req.user)
  .then(post =>{
      res.status(200).json(post)
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  db.getUserPosts(req.user)
  .then(posts=>{
    if(posts.length > 0){
      res.status(200).json(posts)
    }
    else{
      res.status(404).json({message: 'User has no posts'})
    }
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({error: 'Cannot find resources'})
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  db.remove(req.user)
  .then(usersDeleted=>{
    if(usersDeleted >= 1){
      res.status(200).json({message: "User has succesfully been deleted"})
    }
    else{
      res.status(500).json({error: "User could not be deleted"})
    }
  })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
    db.update(req.user, req.body)
    .then(numberUpdated=>{
      if(numberUpdated>=1){
        res.status(500).json({id: id, text: req.body.name})
      }
      else{
        res.status(500).json({error: "User could not be updated"})

      }
    })
});

//custom middleware

function validateUserId(req, res, next) {
  db.getById(req.params.id)
.then(post =>{
  if(post){
    req.user = req.params.id;
    next()
  }
  else{
    res.status(400).json({error: "A user with that ID does not exist"})
  }
})
}

function validateUser(req, res, next) {
  if(req.body.name != ''){
    next()
  }
  else{
    res.status(400).json({ message: "missing required name field" })
  }
}

function validatePost(req,res,next){
  if(req.body.text != ''){
    next()
  }
  else{
    res.status(400).json({ message: "missing required text field" })
  }
}


module.exports = router;
