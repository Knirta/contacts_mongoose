import { Book } from "../models/book.js";
import { calculatePaginationData } from "../helpers/index.js";
import { SORT_ORDER } from "../constants/index.js";

export const getAll = async ({
  page = 1,
  perPage = 5,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const booksQuery = Book.find();
  const booksCount = await Book.find().merge(booksQuery).countDocuments();

  const books = await booksQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(booksCount, page, perPage);

  return { data: books, ...paginationData };
};
