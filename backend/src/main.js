import express from 'express';
import dotenv from "dotenv-defaults";
import allRoute from './routes/index';
import db from './mongo';
import cors from 'cors';
dotenv.config();

db.on("error", (err) => console.log(err));
    db.once("open", async () => {
      const app = express();

      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));

      // init middleware
      app.use(cors())

      // define routes
      app.use('/api', allRoute)

      const port = process.env.PORT || 5000
      app.listen(port, () =>
        console.log(`listening on port ${port}!`),
      );
    });

