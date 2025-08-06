import express from "express";

import ctrl from "../../controllers/contactsControllers.js";
import validateBody from "../../middlewares/validateBody.js";
import { addSchema } from "../../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", ctrl.getOneContact);

contactsRouter.post("/", validateBody(addSchema), ctrl.createContact);

contactsRouter.put("/:id", validateBody(addSchema), ctrl.updateContact);

contactsRouter.delete("/:id", ctrl.deleteContact);

export default contactsRouter;
