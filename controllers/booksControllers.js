import { Book } from "../models/book.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const getAll = async (_, res) => {
  const result = await Book.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Book.findOne({ _id: id });
  const result = await Book.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Book.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "Delete success" });
};

export default {
  getAllBooks: ctrlWrapper(getAll),
  getOneBook: ctrlWrapper(getById),
  createBook: ctrlWrapper(add),
  updateBook: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteBook: ctrlWrapper(deleteById),
};
