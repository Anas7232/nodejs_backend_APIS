const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min:3,
        max:30
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    email: {
        type: String,
        required: true
    },
    hash_password: {
        type: String
    },
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        index: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    contactNumber: { type: String },
    profilePicture: { type: String }
}, { timestamps: true });


userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10)
})

userSchema.virtual('fullName')
.get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
};

module.exports = mongoose.model('User', userSchema);