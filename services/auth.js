import { randomBytes } from "crypto";
import bcrypt from "bcrypt";
import { HttpError } from "../helpers/index.js";

import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/index.js";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";

const createSession = () => {
  const accessToken = randomBytes(30).toString("base64");
  const refreshToken = randomBytes(30).toString("base64");

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw HttpError(409, "Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({ ...payload, password: hashedPassword });
};

const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw HttpError(401);
  }

  await Session.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await Session.create({
    userId: user._id,
    ...newSession,
  });
};

const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

const refreshUser = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });
  if (!session) {
    throw HttpError(401, "Session not found");
  }

  const isRefreshTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isRefreshTokenExpired) {
    throw HttpError(401, "Session token expired");
  }

  await Session.deleteOne({ _id: sessionId, refreshToken });

  const newSession = createSession();

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};

export { registerUser, loginUser, logoutUser, refreshUser };
