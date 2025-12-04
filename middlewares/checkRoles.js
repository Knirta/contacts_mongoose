import { HttpError } from "../helpers/index.js";

import { Book } from "../models/book.js";
import { ROLES } from "../constants/index.js";

const checkRoles = (...roles) => {
  const func = async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(HttpError(401));
      return;
    }

    const { role } = user;
    if (roles.includes(ROLES.ADMIN && role === ROLES.ADMIN)) {
      next();
      return;
    }

    if (roles.includes(ROLES.USER) && role === ROLES.USER) {
      const { bookId } = req.params;
      if (!bookId) {
        next(HttpError(403));
        return;
      }

      const book = await Book.findOne({ _id: bookId, owner: user._id });

      if (book) {
        next();
        return;
      }
    }

    next(HttpError(403));
  };
  return func;
};

export { checkRoles };
