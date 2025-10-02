import { Book } from "../models/book.js";
import { getAll } from "../services/books.js";
import {
  ctrlWrapper,
  parsePaginationParams,
  parseSortParams,
} from "../helpers/index.js";
import createHttpError from "http-errors";

const getAllController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const result = await getAll({ page, perPage, sortOrder, sortBy });
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Book.findOne({ _id: id });
  const result = await Book.findById(id);
  if (!result) {
    throw createHttpError(404, "Book not found");
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
    throw createHttpError(404, "Book for updating not found");
  }
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createHttpError(404, "Book for updating favorite field not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndDelete(id);
  if (!result) {
    throw createHttpError(404, "Book for deleting not found");
  }
  res.json({ message: "Delete success" });
};

export default {
  getAllBooks: ctrlWrapper(getAllController),
  getOneBook: ctrlWrapper(getById),
  createBook: ctrlWrapper(add),
  updateBook: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteBook: ctrlWrapper(deleteById),
};
