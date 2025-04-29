import mongoose from "mongoose";
import { global } from "styled-jsx/css";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }
        cached.promise = mongoose.connect(
            `${process.env.MONGODB_URI}/quickcart`,
            opts
        ).then(mongoose => {
            return mongoose;
        });

    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export default connectDB;