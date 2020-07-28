import express from 'express';
import Router from './Routes';
import cookies from 'cookie-parser'
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookies());
app.use(Router);

app.listen(3030,() => {console.log("Server ouvindo na porta 3030")});



