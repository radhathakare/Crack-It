const mongoose = require('mongoose');

const DB = 'mongodb+srv://kartik:kartik27@cluster0.5jzxd.mongodb.net/placement_website';


mongoose.connect(DB).then(()=>{
        console.log('connection successful');
    }).catch((err) => console.log('no connection'));