import express from "express";

import ctrl from "../../controllers/booksControllers.js";
import { validateBody, isValidId } from "../../middlewares/index.js";
import { schemas } from "../../models/book.js";
import { authenticate } from "../../middlewares/authenticate.js";

const booksRouter = express.Router();

booksRouter.use(authenticate);

booksRouter.get("/", ctrl.getAllBooks);

booksRouter.get("/:id", isValidId, ctrl.getOneBook);

booksRouter.post("/", validateBody(schemas.addSchema), ctrl.createBook);

booksRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateBook
);

booksRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

booksRouter.delete("/:id", isValidId, ctrl.deleteBook);

export default booksRouter;
