import express, { Express } from "express";
import router from "./routes/indexRouter";
import morgan from "morgan" 
import cors from "cors"


const app: Express = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(cors())


app.use(router)


export default app