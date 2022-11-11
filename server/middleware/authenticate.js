const User = require("../model/userSchema");
const jwt = require('jsonwebtoken');

const Authenticate = async (req, res, next) => {
    try{
        const token1 = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token1, "ONLINESURVEYSYSTEM");
        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token1 });
        
        if(!verifyToken){throw new Error('User not found')}
        if(!rootUser){throw new Error('User not found 22')}

        req.rootUser=rootUser;
        next();

    }catch (err) {
        res.status(401).send('Unauthorised');
        // console.log(err);
    }
}

module.exports = Authenticate;