import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportJwt from 'passport-jwt';

import { User } from '../models/user';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// SIGN UP / PASSWORD STRATEGY
passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (user) {
          return done(null, false, {
            message: 'email already taken!',
          });
        }
        const newUser = await User.create({ email, password });
        console.log(newUser, 'user created');

        return done(null, newUser);
      } catch (error) {
        done(error);
      }
    },
  ),
);

// USER LOGIN / AUTHENTICATION STRATEGY
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email', // default is username, override to accept email
      passwordField: 'password',
      session: false,
      passReqToCallback: true, // allows us to access req in the call back
    },
    async (req, email, password, done) => {
      try {
        // Check if user and password is valid
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate: boolean = await user.isValidPassword(
          password,
        );

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, {
          message: 'Logged in Successfully',
        });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// Verifying the JWT
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'TOP_SECRET',
    },
    async (jwtToken: any, done: any) => {
      try {
        const {
          user: { _id },
        } = jwtToken;
        const users = await User.findOne({
          _id: _id,
        });
        return done(null, users, jwtToken);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

// Verify incoming user (JWT strategy) using tokens
exports.verifyUser = passport.authenticate('jwt', { session: false });
