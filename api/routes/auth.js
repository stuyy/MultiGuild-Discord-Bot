const router = require('express').Router();
const passport = require('passport');
const GuildExperience = require('../database/models/GuildMemberExperience');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord'), async (req, res) => {
  try {
    const results = await GuildExperience.findAll({
      where: {
        memberId: req.user.dataValues.userId
      }
    });
    console.log(results);
    res.redirect('http://localhost:8080/');
  } catch(err) {
    console.log(err);
    res.status(500).send({ msg: 'Error.' });
  }
});

router.get('/authorized', (req, res) => {
  if (req.user) res.status(200).json({ msg: 'Authorized' });
  else res.status(403).json({ msg: 'Forbidden' });
});

module.exports = router;