const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});
