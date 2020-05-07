
const router = require('express').Router();
const db = require('../data/db');

//posts
//get posts
router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
});
//add post
router.post('/', (req, res) => {
    if (req.body.title && req.body.contents) {
        db.insert(req.body)
            .then(id => {
                res.status(201).json({
                    id: id.id,
                    ...req.body
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            })
    }
    else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
});
//get post by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.find()
        .then(posts => {
            if (posts.find(element => element.id == id)) {
                db.findById(id)
                    .then(post => {
                        res.status(200).json(post[0])
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "The post information could not be retrieved." })
                    })
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });

        })
    });
//delete post by ID
router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    db.find()
    .then(posts => {
        if (posts.find(element => element.id == id)) {
            db.remove(id)
                .then(response => {
                    if(response == 1){
                        res.status(200).json({ posts_deleted: response})
                    }
                    else{
                        res.status(500).json({ error: "The post could not be removed" })
                    }
                })
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });

    })
});
//edit post by ID
router.put('/:id', (req, res)=>{
    const id = req.params.id;
    db.find()
    .then(posts => {
        if (posts.find(element => element.id == id)) {
           if(req.body.title && req.body.contents){
            db.update(id, req.body)
            .then(response =>{
                if(response == 1){
                    res.status(200).json({id: id, title: req.body.title, contents: req.body.contents})
                }
                else{
                    res.status(500).json({ error: "The post information could not be modified." })
                }

            })
           }
           else{
               res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
           }
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });

    })
});

//comments
//get comments by post ID
router.get('/:id/comments', (req, res)=>{
    const id = req.params.id;
    db.find()
    .then(posts => {
        if (posts.find(element => element.id == id)) {
            db.findPostComments(id)
            .then(comments =>{
                if(comments.length > 0){
                    res.status(200).json(comments)
                }
                else{
                    res.status(500).json({ error: "The comments information could not be retrieved." })
                }
            })
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });

    })
})
//add commenst to post by post ID
router.post('/:id/comments', (req, res)=>{
    const id = req.params.id;
    db.find()
    .then(posts => {
        if (posts.find(element => element.id == id)) {
          if(req.body.text){
            db.insertComment({text: req.body.text, post_id: id})
            .then(response => {
                res.status(201).json({text: req.body.text, post_id: response.id})
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
          }
          else{
              res.status(400).json({ errorMessage: "Please provide text for the comment." })
          }
        }
        else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." });

    })
})


    










module.exports = router;