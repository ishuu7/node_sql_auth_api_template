const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//helper functions
const getUser = async(id) => {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

const omitHash = (user) => {
    const { password, ...userwithouthash } = user;
    return userwithouthash;
}

module.exports = {
    login: async({ username, password }) => {
        const user = await db.User.scope('withPassword').findOne({ where: { username } });
        // console.log(password, user.password);
        if(!user || !(await bcrypt.compare(password, user.password)))
            throw 'Username or password is incorrect';
        
        // authentication succesful
        const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '7d' });
        return { ...omitHash(user.get()), token};
    },
    
    create: async(params) => {
        // validate
        if(await db.User.findOne({ where: { username: params.username } })) {
            throw `Username ${params.username} is already taken!`;
        }

        // hash password
        if(params.password) {
            params.password = await bcrypt.hash(params.password, 10);
        }

        // save user
        await db.User.create(params);
    },
    
}