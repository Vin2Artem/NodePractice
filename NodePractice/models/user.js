const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './databases/site.db'
});

const User = sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        login: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        password: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        avatar: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);
module.exports = User;