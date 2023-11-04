import { config } from "dotenv";
config();

import app from './app.js';
import connectionToDB from "./config/dbConnection.js";
import { v2 } from "cloudinary";
import cloudinary from 'cloudinary'

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

//port listening 
const PORT = process.env.PORT ||5010;
app.listen(PORT, async ()=>{
    // Connect to DB
    await connectionToDB();
    console.log(`App is running at http://localhost:${PORT} `);
})