import { Book } from "../models/book.js";
import { calculatePaginationData } from "../helpers/index.js";
import { SORT_ORDER, ROLES } from "../constants/index.js";

export const getAll = async ({
  page = 1,
  perPage = 5,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
  filter = {},
  owner,
  role,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const roleFilter = role === ROLES.ADMIN ? {} : { owner };

  const booksQuery = Book.find(roleFilter, " -createdAt -updatedAt").populate(
    "owner",
    "name email"
  );

  if (filter.genre) {
    booksQuery.where("genre").equals(filter.genre);
  }
  if (filter.maxRating) {
    booksQuery.where("rating").lte(filter.maxRating);
  }
  if (filter.minRating) {
    booksQuery.where("rating").gte(filter.minRating);
  }

  const booksCount = await Book.find().merge(booksQuery).countDocuments();

  const books = await booksQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(booksCount, page, perPage);

  return { data: books, ...paginationData };
};
