import { client } from "./index.js";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";



export async function getAllMovies(req) {
    return await client
        .db("b29wd")
        .collection("movies")
        .find(req.query)
        .toArray();
}

export async function getMovieById(id) {
    return await client
        .db("b29wd")
        .collection("movies")
        .findOne({ _id: ObjectId(id) });
}

export async function deleteMovieById(id) {
    return await client
        .db("b29wd")
        .collection("movies")
        .deleteOne({ _id: ObjectId(id) });
}

export async function addMovies(newMovies) {
    return await client
        .db("b29wd")
        .collection("movies")
        .insertMany(newMovies);
}

export async function updateMovieById(id,updateMovie) {
    return await client
        .db("b29wd")
        .collection("movies")
        .updateOne({ _id: ObjectId(id) },{$set:updateMovie});
}

export async function genPassword(password) {

    const salt = await bcrypt.genSalt(10)//genSalt(No.of.Rounds)
    console.log(salt)
    const hashedPassword = await bcrypt.hash(password,salt)
    console.log(hashedPassword)
    return hashedPassword

}

export async function createUser(username,hashedPassword) {
    return await client
        .db("b29wd")
        .collection("users")
        .insertOne({username:username,password:hashedPassword});
}

export async function getUserByName(username) {
    return await client
        .db("b29wd")
        .collection("users")
        .findOne({ username:username});
}
