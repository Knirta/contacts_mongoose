import { HttpError } from "http-errors";

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
};

export default errorHandler;
