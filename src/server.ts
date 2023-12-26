import mustacheExpress from "mustache-express";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import passport from "passport";
import path from "path";
import apiRoutes from "./routes/apiRoutes";
import pageRoutes from "./routes/pageRoutes";
import mongooseConnection from "./connections/mongoConnection";

const app = express();
mongooseConnection();
dotenv.config();

app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));
app.engine("mustache", mustacheExpress());

app.use(cors());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", pageRoutes);
app.use("/api", apiRoutes);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);});
