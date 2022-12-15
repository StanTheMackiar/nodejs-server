import express from 'express';
import dotenv from 'dotenv'
import { accountRouter } from './routes/account.js';

//? Leer variables de entorno
dotenv.config();

//! Crear servidor
const expressServer = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

//? Mensaje al levantar el server
expressServer.listen(3000, () => console.log('Servidor levantado en el puerto ' + PORT))

//! Middlewares

expressServer.use(express.json())
expressServer.use(express.text())

//* Aqui estoy metiendo el otro server dentro de este, SE DEBE DEFINIR LA RUTA DE ENTORNO PROPIO
expressServer.use('/account', accountRouter)


expressServer.get('/root', (req, res)=> res.send())



