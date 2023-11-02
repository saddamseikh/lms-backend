import express from 'express'
import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

// Middlewares
// Built-In
app.use(express.json());

// Third-Party
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true
}));
app.use(cookieParser());
app.use('/ping',function(req, res){
    res.send('/pong')
});
app.use(morgan('dev'));

// Default route
app.all('*',(req, res)=>{
    res.status(404).send('OOPS!! 404 page not found');
});


export default app;