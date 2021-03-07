const { DataTypes, Sequelize } = require('sequelize');


const model = (sequelize) => {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    }

    const options = {
        defaultScope: {
            // exclude password by default
            attributes: { exclude: ['password']}
        },
        scopes: {
            // include password with this scope
            withPassword: { attributes: {}, }
        }
    };
    return sequelize.define('User', attributes, options);
}

module.exports = model;
