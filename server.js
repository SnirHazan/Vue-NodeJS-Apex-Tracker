const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

//Load env
dotenv.config({path : './config.env'});

const app = express();

//Dev logging
if(process.env.NODE_ENV === 'Development'){
    app.use(morgan('dev'));
}

//Profile routes
const router = require('./routes/profile');
app.use('/api/v1/profile', router);

//Handle Production
if(process.env.NODE_ENV === 'Production'){
    //set static folder
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA
    app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 8000;

app.listen(port,() => {
    console.log(`Server Running In ${process.env.NODE_ENV} Mode On Port ${port}`);
})