import { Router } from "express";
import { matchEmailPassword } from "../utils/verification.js";


const authRouter = Router();

//? Endpoint public ( no autenticado ni autorizado )

authRouter.get("/public", (req, res) => res.send('Endpoint Publico'))



//? Endpoint autenticado para todo usuario

authRouter.post("/autenticado", (req, res) => {

    const { email, password } = req.body;

    if ( !email || !password ) return res.status(400).send({
        ok: false,
        message: "Falta el email o la contraseña"
    })
    try {
        const dbUser = matchEmailPassword( email, password );
        return res.send({
            ok: true,
            user: dbUser,
            status: 'Authenticated'
        })

    } catch (error) {
        return res.status(401).send({
            ok: false,
            status: 'Unauthenticated'
        })
    }
})


//? Endpoint autorizado para administradores \\
authRouter.post('/autorizado', (req, res) => {
    
    const { email, password } = req.body

    if ( !email || !password ) return res.status(400).send({
        ok: false,
        message: "Falta el email o la contraseña"
    })

    try {
        const dbUser = matchEmailPassword( email, password );
        if (dbUser.role !== 'admin') {

            return res.status(403).send({
                ok: false,
                user: dbUser,
                isAdmin: false,
            })
        }

        return res.send({
            ok: true,
            isAdmin: true,
        })
        
    } catch (error) {
        return res.status(401).send({
            ok: false,
            status: 'Unauthenticated'
        })
    }
})



export default authRouter