const express = require('express');

const router = express.Router();


let posts = [
    {id: 1, title: "post1"},
    {id: 2, title: "post2"},
    {id: 3, title: "post3"},
    {id: 4, title: "post4"},
    {id: 5, title: "post5"},

]

// Get all posts
router.get('/', (req,res)=>{
    const limit = parseInt(req.query.limit)


    if(!isNaN(limit) && limit > 0){
        return res.status(200).json(posts.slice(0, limit));
    }

    res.status(200).json(posts)

})


// Get single post
router.get('/:id', (req,res, next)=>{
    const id = (parseInt(req.params.id))
    const post = posts.find((post)=>post.id === id)
    if(!post){
        const error = new Error(`A post with the id of ${id} was not found`)
        error.status = 404;
        return (next(error));
    }

    res.status(200).json(post)

})




//Create new post
router.post('/', (req, res, next)=>{

    
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if(!newPost.title){
        const error = new Error('please include a title')
        error.status = 400;
        return(next(error));
    }

    res.status(201).json(newPost)
})



//Update post
router.put('/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    const post = posts.find((post)=> post.id == id)


    if(!post){
        return res.status(404).json({msg: 'post not found'});
    }
    post.title = req.body.title
    res.status(200).json(posts)

})


router.delete('/:id', (req,res)=>{
    const id = parseInt(req.params.id)

    posts = posts.filter((post)=>post.id !== id)

    res.status(200).json(posts)
})









module.exports = router;