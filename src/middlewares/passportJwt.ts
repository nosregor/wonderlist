import 'dotenv/config';
import passport from 'passport';
import passportJwt from 'passport-jwt';

import { User } from '../models/user';

type JwtStrategyType = typeof passportJwt.Strategy;

const JwtStrategy: JwtStrategyType = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

// Verifying the JWT
/**
 * @description
 * determines, if the jwt_token in the request header is valid.
 * It verifies the token using jsonwebtoken. The result is attached to the
 * request as req.user = {}
 */
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

/**
 * @description Login Required middleware.
 * Verify incoming user using the passport JWT strategy.
 */
export const isAuthenticated = passport.authenticate('jwt', {
  session: false,
  failWithError: true,
});
