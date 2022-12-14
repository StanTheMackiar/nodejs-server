console.clear();

import { createServer } from 'http';


//! Crear servidor

const httpServer = createServer();


httpServer.on('request', (req, res)=> {

    //? POST para enviar NUEVA DATA
    //? PUT para enviar data y REEMPLAZAR la que ya existe

    //* Path o ruta
    console.log({ ruta: req.url });

    //* Headers, la key las parsea a lowercase SIEMPRE
    console.log({  headers: req.headers })

    //* Body
    let data = '';
    let chunkIndex = 0;

    req.on('data', (chunk) => {
        data += chunk;
        chunkIndex++;
        console.log(chunkIndex);
    })

    req.on('end', () => {
        // console.log(data)
    });
 

    res.end('Recibido colega');
})



//* Escoger el puerto
httpServer.listen(3000)

