import User from "../models/auth.models.js";
import bcrypt from "bcrypt";
import { generarToken } from "../utils/generarToken.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { userName, password, confirmPassword } = req.body;
        if(confirmPassword !== password){
            res.status(400).json({error: "password don't match"});
        }
        
        const user = await User.findOne({userName});
        if(user) {
            return res.status(400).json({error: 'user already exists'});
        }

        //Hash password aca se crea uan contraseña mas segura gracias el bcrypt

        //Salt: esto realiza una cadena de texto diferente cada ves que se usa,
        //      de esta manera se asegura que aunque la contraseññas sean iguales 
        //      se guardara una contraseña diferente para cada contraseña gracias al salt.
        const salt = await bcrypt.genSalt(10);

        //aca tomamos la contraseña pasada por el usuario y el salt generado y esto genera un hash
        //y esto se pasara ala base de datos.
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            password: passwordHash,
        });
        if(newUser) {
            generarToken({_id: newUser._id}, res);
            const UserSave = await newUser.save();

            res.status(201).json(UserSave)
        }else {
            res.status(400).json({error: 'invalid user data'})
        }
        

    } catch(error){
        res.status(500).json({error: 'internal error'})
    }
}

export const login = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const userFound = await User.findOne({ userName }); 
        if(!userFound) return res.status(400).json({Error: 'usuario no existe'});
        const matchPassword = await bcrypt.compare(password, userFound.password);
        if(!matchPassword) return res.status(400).json({ Error: 'password Incorrecto'});
        generarToken({_id: userFound._id}, res);
        res.status(200).json({
            id: userFound._id,
            userName: userFound.userName,
            password: userFound.password
        });

    }catch(error) {
        res.status(500).json({error: "internal error"})
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("token", "", {expires: new Date(0)})
        console.log("logou succel")
        res.status(200).json({message: "logout successfully"})
    }catch (error) {
        res.status(500).json({error: "internal error"})
    }
}

export const validarSecion = (req, res) => {
    try{
        const {token} = req.cookies;
        if(!token) {
            return res.status(401).json({error: "Unauthorized - No token provided", valid: false});
        }
        jwt.verify(token, process.env.JWT_SECRET, async (error, user) => {
            if(error){
                return res.status(401).json({valid: false, error: "token no authorized"});
            }
            const userFound = await User.findById(user._id).select('-password');
            if(!userFound) return res.status(400).json({valid: false, error: "usuarion no encontrado"});
            res.status(201).json({valid: true, user: userFound});
        })
    }catch(error){
        res.status(500).json({error: "internal Error"});
    }
}