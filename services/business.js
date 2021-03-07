const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

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
    getAll: async() => {
        return await db.User.findAll();
    },
    getById: async(id) => {
        return await db.User.getUser(id);
    },
    update: async(id, params) => {
        const user = await getUser(id);

        // validate
        const usernameChanged = params.username && user.username !== params.username;
        if(usernameChanged && await db.User.findOne({ where: { username: paramas.username } })) {
            throw `Username ${params.username} is already taken!`
        }

        // hash password if it was entered
        if(params.password) {
            params.password = await bcrypt.has(params.password, 10);
        }

        // copy params to user and save
        Object.assign(user, params);
        await user.save();

        return omitHash(user.get());
    },
    _delete: async(id) => {
        const user = await getUser(id);
        await user.destroy();
    },
};