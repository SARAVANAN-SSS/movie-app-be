import express from "express";
import { addMovies, deleteMovieById, getAllMovies, getMovieById, updateMovieById } from "../helper.js";


const router = express.Router();
// send movies with query params
router.get("/",async(req,res)=>{
    if(req.query.rating){
        req.query.rating = +req.query.rating
    }
    // db.movies.find({}) - to get all movies
    let queryMovies = await getAllMovies(req)
    res.send(queryMovies)
})

// send only asked(by id) movie
router.get("/:id",async(req,res)=>{
    console.log(req.params);
    const { id } = req.params;
    // db.movies.findOne({id:"100"})
    const movie = await getMovieById(id)
    movie
    ? res.send(movie)
    : res.status(404).send({message:"Movie Not Found"})
})

// delete movie by id
router.delete("/:id",async(req,res)=>{
    const { id } = req.params;
    // db.movies.deleteOne({id:"100"})
    const movie = await deleteMovieById(id)
    res.send(movie)
})

// add movie
router.post("/",async(req,res)=>{
    const newMovies = req.body ;
    // db.movies.inserytMany()
    const result = await addMovies(newMovies)
    res.send(result)
})

router.put("/:id",async(req,res)=>{
    const updateMovie = req.body ;
    const { id } = req.params ;
    // db.movies.updateOne({id:"100"},{$set:{rating:8}})
    const result = await updateMovieById(id,updateMovie)
    res.send(result)
})

export const moviesRouter = router;