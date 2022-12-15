import express from 'express'
import { DBUSERS } from '../db.js';

export const accountRouter = express.Router();

//* Este middleware solo afectara estas rutas
//! Se ejecuta ANTES que la peticion
accountRouter.use((req, res, next) => {
    console.log('PASANDO POR EL MIDDLEWARE')

    next();
})


//Obtener detalles de cuenta

accountRouter.get('/:id', (req, res) => {
    const user = DBUSERS.find(user => user._id === req.params.id);

    if (!user) return res.status(404).send({ok: false, message: '404, not found'});

    res.send(user);
})

// Crear nueva cuenta a aprtir de id y name
accountRouter.post('/', (req, res) => {

    const { id, name } = req.body;

    if (!id || !name) return res.status(400).send({ok: false, message: 'Bad request'})

    const userIndex = DBUSERS.findIndex(user => user._id === req.params.id);
    if ( userIndex !== -1 ) return res.status(409).send({ok: false, message: 'Ya existe un usuario con ese id'});

    DBUSERS.push({
        id, name
    })

    res.send({
        ok: true,
        user: {
            id, name
        }
    });
});

// Actualizar nombre de cuenta
accountRouter.patch('/:id', (req, res) => {

    const { name } = req.body;
    if (!name) return res.status(400).send({
        ok: false,
        message: 'Bad request'
    })

    const user = DBUSERS.find(user => user._id === req.params.id);

    if (!user) return res.status(404).send({ok: false, message: '404, not found'});

    user.name = name;

    res.status(200).send({
        ok: true,
        message: 'Actualizado nombre exitosamente'
    })

});

// Eliminar cuenta
accountRouter.delete('/:id', (req, res) => {
    const userIndex = DBUSERS.findIndex(user => user._id === req.params.id);

    if ( userIndex === -1 ) return res.status(404).send({ok: false, message: '404, not found'});

    DBUSERS.splice(userIndex, 1);

    res.send({
        ok: true,
        message: 'Eliminado con exito'
    });
});
