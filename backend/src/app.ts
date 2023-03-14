import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { batteriesRouter } from "./routes/batteries";
import { connectToDatabase } from "./database";

const app = express();

dotenv.config();

app.use(bodyParser.json({limit: '5mb'}));

connectToDatabase()
  .then(() => {
    app.use("/api/v1/batteries", batteriesRouter);

    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });