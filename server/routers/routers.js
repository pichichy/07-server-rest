const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const _ = require('underscore');

// parse application/json
app.use(bodyParser.json());


const Usuario = require('../model/usuario');

app.get('/usuario/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findById(id, (err, usuarioBd) => {
        if (err) {
            return res.status(400).json({
                ok: true,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBd
        })

    })
})

app.get('/usuario', (req, res) => {

    let estado = req.query.estado || true;

    Usuario.find({ estado }, 'nombre email img role estado google')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: true,
                    err
                });
            }

            Usuario.count({ estado })
                .exec((err, contador) => {
                    res.json({
                        ok: true,
                        contador,
                        usuarios
                    })
                })
        })
})

app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        img: body.img,
        role: body.role,
        estado: body.estado,
        google: body.google
    })

    usuario.save((err, usarioBd) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usarioBd
        })
    })

});


app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioBD) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBD
        })

    });

});


app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
});


app.delete('/usuarioestado/:id', (req, res) => {

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
});

module.exports = app;