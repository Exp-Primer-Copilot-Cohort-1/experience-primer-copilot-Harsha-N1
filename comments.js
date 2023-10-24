// Create web server

// Import module
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mean-blog', { useNewUrlParser: true });

// Connect to MongoDB
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Connect to MongoDB
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB: ' + err);
});

// Get all comments
router.get('/', (req, res) => {
    Comment.find((err, comments) => {
        if (err) {
            res.send('Error getting comments: ' + err);
        }
        else {
            res.json(comments);
        }
    });
});

// Get a comment by id
router.get('/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.send('Error getting comment: ' + err);
        }
        else {
            res.json(comment);
        }
    });
});

// Save a comment
router.post('/', (req, res) => {
    let newComment = new Comment({