const router = require('express').Router();
const GuildExperience = require('../database/models/GuildMemberExperience');

function isAuthenticated(req, res, next) {
  if (req.user) next();
  else {
    res.status(403).send({ msg: 'Not Authorized'});
  }
}

router.get('/', isAuthenticated, async (req, res) => {
  const result = await GuildExperience.findAll({
    where: {
      memberId: req.user.dataValues.userId,
    }
  });
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(500).send({ msg: 'Something went wrong' });
  }
});

module.exports = router;
