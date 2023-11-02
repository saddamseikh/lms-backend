import { config } from "dotenv";
config();

import app from './app.js';

//port listening 
const PORT = process.env.PORT ||5010;
app.listen(PORT,()=>{

    console.log(`App is running at http://localhost:${PORT} `);
})