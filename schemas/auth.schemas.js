import {z} from "zod"

export const validateLogin = z.object({
    userName: z.string({
        required_error: "Nombre de usuario es requerido"
    }),
    password: z.string({
        required_error: "constraseña es requerida"
    }).min(6, {
        message: "contraseña debe ser mayor a 6 caracteres"
    })

})