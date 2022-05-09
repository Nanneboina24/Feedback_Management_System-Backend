const express = require('express');
const authRoute = require('./routes/auth-route');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/auth', authRoute);


//mongodb connection            username   password   project-name                       dbname
mongoose.connect("mongodb+srv://nanneboina:6303309765@angular-mongodb1.c5bcw.mongodb.net/LoginDb",
    (err) => {
        if (err) {
            console.log("DB not Connected");
        } else {
            console.log("DB Connected");
        }


    }
)





app.get('/', (req, res) => {
    res.send("Hello world from Nanneboina Sumanth");

});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('listening on port : ', port);
});