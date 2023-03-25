import router from "./routes/user.js";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import MovieRouter from "./routes/movie.js";

const app = express();
app.use(express.json());
app.use(helmet());
//app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* ROUTES */
app.use("/user",router);
app.use("/movie",MovieRouter);

/* MONGOOSE SETUP */
const mg ="mongodb+srv://salem:5a0NpjUqijrw2LaT@cluster0.yyhfd.mongodb.net/?retryWrites=true&w=majority"
const PORT=9000;
mongoose
  .connect(mg, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    
  .then((S) => {
    app.listen(PORT);
    console.log("connected");
  })
  .catch((error) => console.log(`${error} did not connect`));
