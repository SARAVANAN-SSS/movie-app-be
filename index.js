import dotenv from "dotenv"
import express from "express";//new syntax//"type":"module"
import { MongoClient } from "mongodb";//new syntax//"type":"module"
import { getAllMovies, getMovieById, deleteMovieById, addMovies } from "./helper.js";
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";
import cors from "cors"

dotenv.config();
console.log(process.env)
const MONGO_URL = process.env.MONGO_URL; 

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongodb is connected");
    return client;
}

export const client = await createConnection();
const app = express();
const PORT = process.env.PORT;
app.listen(PORT,(req,res)=>console.log("app is started on Port", PORT))

app.use(express.json())//middleware used to convert all the request body to json
app.use(cors())

app.get('/',(req,res)=>{
    res.send(`Hello World`)
})

app.use("/movies",moviesRouter)
app.use("/users",usersRouter)

