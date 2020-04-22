//===============================
// PUERTO
//===============================

process.env.PORT = process.env.PORT || 3001;

//===============================
// AMBIENTE
//===============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===============================
// BD
//===============================

let urlBD;

if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/cafe';
} else {
    urlBD = 'mongodb+srv://strider:rIPb8g2g6OpIwN2H@clusternodejs-ymoqg.mongodb.net/test';
}

process.env.urlBD = urlBD;