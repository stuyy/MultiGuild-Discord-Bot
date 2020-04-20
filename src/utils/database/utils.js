const StateManager = require('../StateManager');

async function exists(guildId, memberId) {
  return await StateManager.connection.query(
    `SELECT * FROM GuildMemberExperience WHERE guildId = ${guildId} AND memberId = ${memberId}`
  );
}

async function insertGuildMember(guildId, memberId) {
  return await StateManager.connection.query(
    `INSERT INTO GuildMemberExperience VALUES (
      '${guildId}', '${memberId}', DEFAULT, DEFAULT
    )`
  );
}

async function updateGuildMemberExperience(guildId, memberId, updatedXP, updatedLevel) {
  return await StateManager.connection.query(
    `UPDATE GuildMemberExperience SET experiencePoints = ${updatedXP}, currentLevel = ${updatedLevel} WHERE guildId = ${guildId} AND memberId = ${memberId}`
  );
}
module.exports = { 
  exists,
  insertGuildMember,
  updateGuildMemberExperience,
};