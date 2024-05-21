import config from "config";
import jwksRsa from "jwks-rsa";
import passport, { PassportStatic } from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { formatResponse } from "../response/Response";
import { NextFunction, Request, Response } from "express";

const awsCognitoClientId = config.get<string>("awsCognitoClientId");
const awsCognitoIssuer = config.get<string>("awsCognitoIssuer");

export default function passportConfig(passport: PassportStatic) {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKeyProvider: jwksRsa.passportJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: awsCognitoIssuer,
        }),
        audience: awsCognitoClientId,
        issuer: awsCognitoIssuer,
        algorithms: ["RS256"],
        passReqToCallback: true,
      },
      async (_req: Request, jwtPayload: any, done: any) => {
        try {
          done(null, jwtPayload);
        } catch (error) {
          done(error, false);
        }
      },
    ),
  );
}

export const authenticate = () => {
  return (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      "jwt",
      { session: false },
      async (_err: Error | null, user: any, info: any) => {
        if (!user) {
          return formatResponse(res, 401, info.message);
        }
        if (!user.data) {
          return formatResponse(res, 401, "Invalid access_token");
        }

        req.user = user.data;

        return next();
      },
    )(req, res, next);
};
