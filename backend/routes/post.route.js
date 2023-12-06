const express = require('express');
const postRoute = express.Router();

let PostModel = require("../models/Post");

// index
postRoute.route('/').get(async (req, res, next) => {
    try {
        const posts = await PostModel.find();
        res.json(posts);
    } catch (error) {
        next(error);
    }
});


// create post
postRoute.route('/create-post').post(async (req, res, next) => {
    try {
        const post = await PostModel.create(req.body);
        res.json(post);
    } catch (error) {
        next(error);
    }
});

// update post
postRoute.route('/update-post/:id').post(async (req, res, next) => {
    try {
        const updatedPost = await PostModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true } // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(updatedPost);
        console.log('Post updated!');
    } catch (error) {
        next(error);
    }
});

// delete post
postRoute.route('/delete-post/:id').delete(async (req, res, next) => {
    try {
        const deletedPost = await PostModel.findOneAndDelete({ _id: req.params.id });

        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({
            msg: 'Post deleted',
            data: deletedPost
        });
    } catch (error) {
        next(error);
    }
});



module.exports = postRoute;
