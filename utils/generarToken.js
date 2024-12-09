import jwt from "jsonwebtoken";

export const generarToken = (payload, res) => {
    try{
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.cookie("token", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true, //prevenir ataques cross-site scripting
            sameSite: "strict", //CSRF ATTACKS CROSS SITE REQUEST FORGERY ATTACK
            secure: process.env.NODE_ENV !== "development",
        });
    }catch (error) {
        console.log('error genenerar token:', error);
    }
}

