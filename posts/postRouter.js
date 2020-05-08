const express = require('express');
const db = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
db.get()
.then(posts=>{
  res.status(200).json(posts)
})
.catch(err=>{
  console.log(err)
  res.status(500).json({error: 'Cannot find resources'})
})
});

router.get('/:id', validatePostId, (req, res) => {
db.getById(req.user)
.then(post =>{
    res.status(200).json(post)
})
});

router.delete('/:id', validatePostId, (req, res) => {
  db.remove(req.user)
  .then(postsDeleted=>{
    if(postsDeleted >= 1){
      res.status(200).json({message: "Post has succesfully been deleted"})
    }
    else{
      res.status(500).json({error: "Post could not be deleted"})
    }
  })
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
    db.update(req.user, req.body)
    .then(numberUpdated=>{
      if(numberUpdated>=1){
        res.status(500).json({id: id, text: req.body.text})
      }
      else{
        res.status(500).json({error: "Post could not be updated"})

      }
    })
  
});

// custom middleware

function validatePostId(req, res, next) {
  db.getById(req.params.id)
.then(post =>{
  if(post){
    req.user= req.params.id
    next()
  }
  else{
    res.status(400).json({error: 'A post with that ID does not exist'})
  }
})
}

function validatePost(req,res,next){
  if(req.body.text != '' && req.body.text){
    next()
  }
  else{
    res.status(400).json({ message: "missing required text field" })
  }
}

module.exports = router;
