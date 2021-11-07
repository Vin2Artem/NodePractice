const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './databases/site.db'
});

const Feedback = sequelize.define(
    'feedback',
    {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        topic: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        message: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: false,
    }
);
module.exports = Feedback;