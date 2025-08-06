import app from "./app.js";

import mongoose from "mongoose";

const DB_HOST =
  "mongodb+srv://Knirta:Knirta1984@cluster0.g35o2vw.mongodb.net/contacts_db?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
