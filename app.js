import express from 'express'
import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from './routes/user.routes.js'
import errorMiddleware from './middlewares/error.Middleware.js';

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

//Routes modules 
app.use('/api/v1/user/',userRoutes)
// Default route
app.all('*',(req, res)=>{
    res.status(404).send('OOPS!! 404 page not found');
});

app.use(errorMiddleware);
export default app;