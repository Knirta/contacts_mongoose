import { Book } from "../models/book.js";
import calculatePaginationData from "../helpers/calculatePaginationData.js";

export const getAll = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const booksQuery = Book.find();
  const booksCount = await Book.find().merge(booksQuery).countDocuments();

  const books = await booksQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(booksCount, page, perPage);

  return { data: books, ...paginationData };
};
