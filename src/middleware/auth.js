const jwt = require('jsonwebtoken')
const TOKEN_KEY = process.env.SECRET;
let userdata;

const generateAuthToken = (user) => {
    const token = jwt.sign({ id: user.id.toString() }, TOKEN_KEY);
    return token;
};

const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        if (decoded) {
            userdata = await User.find({ id: decoded })
            console.log(data)
            if (!data) {
                res.send("invalid token")
            }
        }
        return userdata;
    }
    catch (err) {   
    }
}

module.exports = { generateAuthToken, verifyToken };