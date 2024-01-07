import express from 'express'; //require is not working
import Connection from './database/db.js';
import Router from './routes/route.js';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(bodyParser.json({extended:true})); //for fetching the data from the body
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', Router);

const PORT = 4000;
app.listen(PORT, ()=> console.log(`server is up and running at port no. ${PORT}`));
Connection();