import passport from "passport";
import jwt from "passport-jwt";
import "dotenv/config.js";

const secretOrKey = process.env.JWT_SECRET || process.env.SECRET_KEY || 'tu-clave-secreta-por-defecto';

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: secretOrKey,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
