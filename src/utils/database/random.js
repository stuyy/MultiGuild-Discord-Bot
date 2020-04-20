const BASE = 10;

function randomExperience() {
  return Math.ceil(Math.random() * 200);
}

/**
 * BASE = 10
 * LEVEL = 1
 * e^LEVEL
 */
function checkExperience(experience, level) {
  const y = (BASE*level) * (Math.pow(Math.E, level));
  return experience >= y ? ++level : level;
}
module.exports = {
  randomExperience,
  checkExperience,
}