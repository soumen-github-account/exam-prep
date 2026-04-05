
import express from "express"
import "dotenv/config"
import connectDB from "./config/Db.js"
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoute.js"
import examRouter from "./routes/examRoute.js"
import cors from "cors"

const app = express()
app.use(express.json())
const port = 8000
connectDB();
app.use(cors())
app.get("/", (req, res)=>{
    res.send("Api is working")
})

app.use("/auth", authRouter);
app.use("/user", userRouter)
app.use("/exam", examRouter)


app.listen(port, ()=>{
    console.log("App started on ", port);
})

