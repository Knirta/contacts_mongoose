import {
  loginUser,
  registerUser,
  logoutUser,
  refreshUser,
} from "../services/auth.js";
import { ctrlWrapper } from "../helpers/index.js";

import { ONE_DAY } from "../constants/index.js";

const setupSession = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

const register = async (req, res) => {
  const newUser = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully registed an user",
    data: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const login = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Successfully logged in an user!",
    data: { accessToken: session.accessToken },
  });
};

const logout = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await logoutUser(sessionId);
  }

  res.clearCookie("sessionId");
  res.clearCookie("refreshToken");

  res.status(204).send();
};

const refresh = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const session = await refreshUser({ sessionId, refreshToken });

  setupSession(res, session);

  res.json({
    status: 200,
    message: "Successfully refreshed a session",
    data: {
      accessToken: session.accessToken,
    },
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh),
};
