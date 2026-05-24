import express, { Express } from "express";
import router from "./routes/indexRouter";
import morgan from "morgan"
import cors from "cors"


const app: Express = express();


app.use(morgan("dev"));
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "https://pm-3-alejandro-m-cejas-k9tv12rg8.vercel.app"
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("No permitido por CORS"))
        }
    },
    credentials: true
}))


app.use(router)


export default app