const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

//router
const categoriesRouter = require('./app/api/v1/categories/router')
const imagesRouter = require('./app/api/v1/images/router')
const bimbelRouter = require('./app/api/v1/bimbel/router')
const usersRouter = require('./app/api/v1/users/router')
const authCMSRouter = require('./app/api/v1/auth/router')
const ordersRouter = require('./app/api/v1/orders/router')
const participantsRouter = require('./app/api/v1/participants/router')

const v1 = '/api/v1/cms'

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.status(200).json({
        message: 'welcome',
    });
});

app.use(v1, categoriesRouter);
app.use(v1, imagesRouter);
app.use(v1, bimbelRouter);
app.use(v1, usersRouter);
app.use(v1, authCMSRouter);
app.use(v1, ordersRouter);
app.use(v1, participantsRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
