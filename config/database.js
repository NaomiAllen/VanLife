// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/blogs', {
//   useNewUrlParser: true, 
//   useCreateIndex: true, 
//   useUnifiedTopology: true
// });

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});
