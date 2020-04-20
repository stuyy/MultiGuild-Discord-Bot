const { Model, DataTypes } = require('sequelize');

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      discriminator: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      tableName: 'DiscordUsers',
      timestamps: true,
      sequelize,
    });
  }
}