import { Router } from "express";
import { matchEmailPassword } from "../utils/verification.js";

const authTokenRouter = Router();

authTokenRouter.post('/login', (req, res) => {
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


export default authTokenRouter