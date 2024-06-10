const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const postRouter = require("./router/postsRouter");
const categoryRouter = require("./router/categoryRouter");
const tagRouter = require("./router/tagRouter");
const authRouter = require("./router/authRouter");
const notFoundFormatter = require("./middlewares/404errorFormatter");
const allErrorFormatter = require("./middlewares/allErrorFormatter");
const cors = require("cors");



app.use(cors({}));

app.use(express.static("public"));

app.use(express.json());

app.use("/auth", authRouter);

app.use("/posts", postRouter);

app.use("/categories", categoryRouter);

app.use("/tags", tagRouter);

app.use(notFoundFormatter);

app.use(allErrorFormatter);



app.listen(port, () => {
  console.log(`Sto runnando il server sulla porta: ${port}`);
});
