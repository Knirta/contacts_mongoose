import contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAll = async (_, res) => {
  const result = await contactsService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contactsService.add(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.deleteById(id);
  if (!result) {
    throw HttpError(404);
  }
  // res.status(204).send();
  res.json({ message: "Delete success" });
};

export default {
  getAllContacts: ctrlWrapper(getAll),
  getOneContact: ctrlWrapper(getById),
  createContact: ctrlWrapper(add),
  updateContact: ctrlWrapper(updateById),
  deleteContact: ctrlWrapper(deleteById),
};
