//INICIANDO PROYECTO CON EXPRESS Y MONGODB
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./Routes/auth.routes.js"
import productsRoutes from "./Routes/products.routes.js";
import { ConnectToMongoDB } from "./DB/ConnectToMongo.js";
import cookieParser from "cookie-parser"

const app = express();

//DOTENV PARA PODER USAR LAS VARIABLES DE ENTORNO DE .ENV 
dotenv.config();

//MIDDLEWARE CUANDO SE INICIA NUESTRO SEVIDOR

const PORT = 3000;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', productsRoutes);

//SERVIDOR CONNECTADO DESPUES DE PASAR POR LOS MIDDLEWARE ES DECIR CONFIGURACIONES DE NUESTTRO PROYECTO
app.listen(PORT, async () => {
    await ConnectToMongoDB();
    console.log(`server listening in the port ${PORT}`);
})