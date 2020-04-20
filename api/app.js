require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.SERVER_PORT || 3001;
const discordStrategy = require('./strategy/discord');
const passport = require('passport');
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);
const cors = require('cors');

const database = require('./database/database');

const DiscordUser = require('./database/models/DiscordUser');
const GuildMember = require('./database/models/GuildMemberExperience');

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');

DiscordUser.init(database);
DiscordUser.sync();

GuildMember.init(database);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true,
}));

app.use(session({
  saveUninitialized: false,
  secret: 'some secret',
  resave: false,
  cookie: {
    maxAge: 60 * 10000 * 60
  },
  store: new SessionStore({ db: database }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/user', userRoute);

app.listen(PORT, () => console.log(`Listening to Port ${PORT}`));