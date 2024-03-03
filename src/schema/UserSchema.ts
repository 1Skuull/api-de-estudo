import { z } from "zod"


export const login = z.object({
    email: z.string().email(),
    password: z.string().min(6, "Ser no minimo 6 caracteres")
})


export const register = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "Ser no minimo 6 caracteres")
})