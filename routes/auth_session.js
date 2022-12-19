import { Router } from "express";
import { matchEmailPassword } from "../utils/verification.js";
import { nanoid } from 'nanoid'
import { DBUSERS } from "../db.js";

// ?Esto debe ir en la base de datos
const sessions = [];

const authSessionRouter = Router();

authSessionRouter.post('/login', (req, res) => {
    const { email, password } = req.body;

    if ( !email || !password ) return res.status(400).send({
        ok: false,
        message: "Falta el email o la contraseña"
    })
    try {
        const { _id } = matchEmailPassword( email, password );

        const sessionId = nanoid();
        sessions.push({ sessionId, _id });

        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            // secure: true,
        })

        return res.status(200).send({
            ok: true,
            sessionId,
            message: 'Credenciales correctas'
        })

    } catch (error) {
        return res.status(401).send({
            ok: false,
            message: 'Credenciales incorrectas'
        })
    }
})

authSessionRouter.get('/profile', (req, res) => {
     
    const { cookies } = req 

    if( !cookies.sessionId ) return res.status(401).send({
        ok: false,
        message: 'No viene el session id en la cookie'
    })
    const userSession = sessions.find(session => session.sessionId === cookies.sessionId)

    if ( !userSession ) return res.status(401).send({
        ok: false,
        message: 'No existe un usuario con ese session id'
    })
     
    const user = DBUSERS.find(user => user._id === userSession._id );

    if ( !user ) return res.status(401).send({
        ok: false,
        message: 'El usuario no esta en la base de datos'
    })

    delete user.password;

    return res.status(200).send(user)
})

export default authSessionRouter