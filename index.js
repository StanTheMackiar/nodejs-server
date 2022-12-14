console.clear();

import express from 'express';

//! Crear servidor
const expressServer = express();

const PORT = 3000;

//? Mensaje al levantar el server
expressServer.listen(3000, () => console.log('Servidor levantado en el puerto ' + PORT))

//! Middlewares
//? este middleware se ejecuta en todos los enpoints, parsea los json
expressServer.use(express.json())
expressServer.use(express.text())


//! Metodos que se van a ejecutar dependiendo el path y el tipo de request

expressServer.get('/cuenta/', (req, res) => {
    res.status(400).json({
        message: 'Debe pasar dos parametros separados por slash /'
    })
})

expressServer.get('/cuenta/:id', (req, res) => {
    res.status(400).json({
        message: 'Le falta un slash / seguido del segundo parametro'
    })
})

//? obtener param por ruta dinamica
expressServer.get('/cuenta/:id/:name', (req, res) => {
    res.status(200).json({
        ID: req.params.id,
        Name: req.params.name,
    })
})

//? Obtener search querys 
expressServer.get('/search', (req, res) => {
    res.status(200).json({
        Parametros_de_busqueda: req.query
    })
})

//? obtener headers por ruta dinamica (siempre la key viene en lowercase)
expressServer.get('/headers', (req, res) => {
    
    const accept = req.get('accept')
    const headersRest = req.headers
    res.status(200).json({
        accept,
        resto_de_headers: headersRest,
    })
})

//? Obtener body (ver arriba los middlewares)

expressServer.post('/body', (req, res) => {
    const body = req.body

    console.log(body)

    res.status(200).send({
        body,
    })
})

//? Hara match con todos los metodos
// expressServer.all('/todos', (req, res) => {
//     res.send('Esto afecta todos los metodos')
// })

