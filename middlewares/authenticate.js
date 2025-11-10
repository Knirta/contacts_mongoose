import { Session } from "../models/session.js";
import { User } from "../models/user.js";
import { HttpError } from "../helpers/index.js";

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  if (!authorization) {
    next(HttpError(401, "Please provide authorization header"));
    return;
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(HttpError(401, "Auth header should be of type Bearer"));
    return;
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    next(HttpError(401, "Session not found"));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(HttpError(401, "Access token expired"));
    return;
  }

  const user = await User.findById(session.userId);

  if (!user) {
    next(HttpError(401));
    return;
  }

  req.user = user;
  next();
};
