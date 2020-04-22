require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(require('./routers/routers'));


// mongoose.connect('mongodb://localhost:27017/cafe', (err, resp) => {
//     if (err) throw err;
//     console.log('Base de datos OnLine');

// });


// const connecMongoDb = async() => {
//     await mongoose.connect('mongodb://localhost:27017/cafe', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }, (err) => {
//         if (err) throw err
//         console.log('Base de datos ONLINE');
//     });
// }

// connecMongoDb()
//     .then()
//     .catch(console.log);

mongoose.connect(process.env.urlBD, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },

    (err, resp) => {
        if (err) throw err;
        console.log('Base de datos OnLine');
    });

app.listen(process.env.PORT, () => {
    console.log(`escuchando por el puerto ${process.env.PORT} `);
});