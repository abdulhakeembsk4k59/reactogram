const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const PostModel = mongoose.model("PostModel");
const protectedRoute = require("../middlewre/protectedResource");

//all users posts
router.get("/allposts", (req, res) => {
    PostModel.find()
        .populate("author", "_id fullName profileImg")
        .then((dbPosts) => {
            res.status(200).json({ posts: dbPosts })
        })
        .catch((error) => {
            console.log(error);
        })
});

//all posts only from logged in user
router.get("/myallposts", protectedRoute, (req, res) => {
    PostModel.find({ author: req.user._id })
        .populate("author", "_id fullName profileImg")
        .then((dbPosts) => {
            res.status(200).json({ posts: dbPosts })
        })
        .catch((error) => {
            console.log(error);
        })
});

router.post("/createpost", protectedRoute, (req, res) => {
    const { description, location, image } = req.body;
    if (!description || !location || !image) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    req.user.password = undefined;
    const postObj = new PostModel({ description: description, location: location, image: image, author: req.user });
    postObj.save()
        .then((newPost) => {
            res.status(201).json({ post: newPost });
        })
        .catch((error) => {
            console.log(error);
        })
});

module.exports = router;
