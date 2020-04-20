const DiscordStrategy = require('passport-discord');
const passport = require('passport');
const DiscordUser = require('../database/models/DiscordUser');

passport.serializeUser((user, done) => {
  done(null, user.dataValues.userId)
});

passport.deserializeUser((id, done) => {
  console.log(id);
  console.log('Inside here.');
  DiscordUser.findOne({ where: { userId: id }})
    .then((user) => {
      done(null, user);
    })
    .catch(err => done(err, null));
});

passport.use(new DiscordStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CLIENT_REDIRECT,
  scope: ['identify', 'guilds']
}, async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('Hello?');
      const user = await DiscordUser.findOne({ where: { userId: profile.id }});
      if (user) {
        done(null, user);
      } else {
        const newUser = await DiscordUser.create({
          userId: profile.id,
          username: profile.username,
          discriminator: profile.discriminator,
        });
        await newUser.save();
        done(null, newUser);
      }
    } catch(err) {
      done(null, false);
    }
}));