const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
const authenticate = require('./middleware/authenticate');

app.use(express.json());
app.use(require('./router/auth'));

app.listen(4000, ()=>{
    console.log('server is running at port 4000');
});

app.get('/auth', authenticate, (req,res) => {
    // console.log("Hello user");
    res.send(req.rootUser);
});