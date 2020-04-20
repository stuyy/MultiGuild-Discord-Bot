const { Model, DataTypes } = require('sequelize');

module.exports = class GuildMemberExperience extends Model {
  static init(sequelize) {
    return super.init({
      guildId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true
      },
      memberId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true
      },
      currentLevel: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
      },
      experiencePoints: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
      }
    }, {
      tableName: 'GuildMemberExperience',
      sequelize,
      timestamps: false,
    });
  }
}