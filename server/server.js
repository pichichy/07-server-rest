require('./config/config');


const express = require('express');
const app = express();

app.get('/usuario', (req, res) => {

    res.json("hello world get");
})

app.post('/usuario', (req, res) => {

    res.json({

        "nombre": "post"

    });
})

app.put('/usuario', (req, res) => {

    res.json("hello world put");
})

app.delete('/usuario', (sreq, res) => {

    res.json("hello world delete");
})

app.listen(process.env.PORT, () => {
    console.log(`escuchando por el puerto ${process.env.PORT} `);
});