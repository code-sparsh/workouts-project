const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

// static signup method
userSchema.statics.signup = async function(email,password) {
    
    if(!email || !password) {
        throw Error('All fields must be filled');
    }

    if(!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }

    if(!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough (minimum 8 characters with 1 upper,1 lower, 1 integer and 1 special character)');
    }

    const exists = await this.findOne( {email}) 
    if(exists) {
        throw Error('Email already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash});

    return user;
}

// static login method

userSchema.statics.login = async function(email,password) {
    if(!email || !password) {
        throw Error("All the fiels must be filled");
    }

    if(!validator.isEmail(email)) {
        throw Error("Email is not valid")
    }

    const user = await this.findOne({email});

    if(!user) {
        throw Error("Email ID is not registered")
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    console.log(hash)
    console.log(user.password);
    
    const match = await bcrypt.compare(password,user.password)

    if(!match) {
        throw Error("Password is incorrect")
    }
    return user;

}


module.exports = mongoose.model('User', userSchema);