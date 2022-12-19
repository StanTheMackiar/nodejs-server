import { Router } from "express";
import { matchEmailPassword } from "../utils/verification.js";
import { SignJWT, jwtVerify } from 'jose';
import { DBUSERS } from "../db.js";
import dotenv from 'dotenv';


dotenv.config();

// eslint-disable-next-line no-undef
const SECRET = process.env.JWT_SECRET_KEY
const authTokenRouter = Router();

authTokenRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if ( !email || !password ) return res.status(400).send({
        ok: false,
        message: "Falta el email o la contraseña"
    })
    try {
        const { _id, name } = matchEmailPassword( email, password );

        //! Generar token y devolverlo
        const jwtConstructor = new SignJWT({ _id, name });

        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(encoder.encode(SECRET))


        return res.status(200).send({
            ok: true,
            jwt,
            message: 'Credenciales correctas'
        })

    } catch (error) {
        console.log(error)
        return res.status(401).send({
            ok: false,
            message: 'Credenciales incorrectas'
        })
    }
})

authTokenRouter.get('/profile', async(req, res) => {
     
    
    const { authorization } = req.headers

    if ( !authorization ) return res.status(401).send({ok: false, message: "No hay token"})

    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(authorization, encoder.encode(SECRET))


        const user = DBUSERS.find(user => user._id === payload._id );

        if ( !user ) return res.status(401).send({
            ok: false,
            message: 'El usuario no esta en la base de datos'
        })

        return res.status(200).send(user)



    } catch (error) {
        return res.status(401).send({ok: false, message: "Token invalido"})
    }

})

export default authTokenRouter