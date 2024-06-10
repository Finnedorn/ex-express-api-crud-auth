const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const tokenGenerator = (payload, expiresIn = '5m') => {
    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn});
}

const passwordHusher = async(password) => {
    const hushed = await bcrypt.hash(password, 10);
    return hushed;
}

const passwordComparer = async(password, passwordHushed) => {
    const isValid = bcrypt.compare(password, passwordHushed);
    return isValid;
}

module.exports= {
    tokenGenerator,
    passwordHusher,
    passwordComparer
}