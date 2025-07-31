import express from "express";
import cors from "cors";
import "dotenv/config";
import db from "./utils/db.js";
import router from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 5001;

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//db
db();
//routes
app.use("/api/v2", router);

//connection
app.listen(port, () => {
  console.log(`Server is running on port ${port}...🥳`);
});
