import express from 'express';
import dotenv from 'dotenv'
import { accountRouter } from './routes/account.js';
import authRouter from './routes/auth.js';
import authTokenRouter from './routes/auth_token.js';
import authSessionRouter from './routes/auth_session.js';
import cookieParser from 'cookie-parser';

//? Leer variables de entorno
dotenv.config();

//! Crear servidor
const expressServer = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

//! Middlewares

expressServer.use(express.json())
expressServer.use(express.text())
expressServer.use(cookieParser())

//* Aqui estoy metiendo el otro server dentro de este, SE DEBE DEFINIR LA RUTA DE ENTORNO PROPIO
expressServer.use('/account', accountRouter)
expressServer.use('/auth', authRouter)

expressServer.use('/auth-token', authTokenRouter)
expressServer.use('/auth-session', authSessionRouter)


//? Mensaje al levantar el server
expressServer.listen(PORT, () => console.log('Servidor levantado en el puerto ' + PORT))



