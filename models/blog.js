const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:  { type: String, required: true },
    location: String,
    body: String,
    
    
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog