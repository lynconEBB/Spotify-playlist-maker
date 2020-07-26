import express from 'express';
import Router from './Routes';
import cookies from 'cookie-parser'

const app = express();

app.use(Router);
app.use(cookies());
app.use(express.json());

app.listen(3030,() => {console.log("Server ouvindo na porta 3030")});



