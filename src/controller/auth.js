const User = require('../models/auth');
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {

    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(user){
            return res.status(400).json({ message: 'User Allready Registered...!!!' })
        }

        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const _user = User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()
        });

        _user.save((error, data) => {
            if(error){
                return res.status(400).json({ message: 'something Went Wrong...!!!' })
            };
            if(data){
                return res.status(201).json({ message: 'User Created successfully...!!!' })
            }
        })

    })

}


exports.signin = (req, res) => {

    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if(error) return res.status(400).json({ error })
        if(user){

            if(user.authenticate(req.body.password)){
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '10d' });
                const { _id, firstName, lastName, email, role, fullName } = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName
                    }
                })
            }else{
                return res.status(400).json({ message: 'Invalid password..!!!' })
            }

        }else{
            return res.status(400).json({ message: 'Something Went Wrong...!!!' })
        }
    })

}


