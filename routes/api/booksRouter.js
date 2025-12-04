import express from "express";

import ctrl from "../../controllers/booksControllers.js";
import { validateBody, isValidId } from "../../middlewares/index.js";
import { schemas } from "../../models/book.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { checkRoles } from "../../middlewares/checkRoles.js";

import { ROLES } from "../../constants/index.js";

const booksRouter = express.Router();

booksRouter.use(authenticate);

booksRouter.get("/", ctrl.getAllBooks);

booksRouter.get(
  "/:id",
  checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  ctrl.getOneBook
);

booksRouter.post("/", validateBody(schemas.addSchema), ctrl.createBook);

booksRouter.put(
  "/:id",
  checkRoles(ROLES.ADMIN),
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateBook
);

booksRouter.patch(
  "/:id/favorite",
  checkRoles(ROLES.USER),
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

booksRouter.delete(
  "/:id",
  checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  ctrl.deleteBook
);

export default booksRouter;
