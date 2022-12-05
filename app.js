const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users.routes');
const authRouter = require('./routes/auth.routes');
const vehicleRouter = require('./routes/vehicles.routes');
const serviceRouter = require('./routes/service.routes');

const app = express();

app.use(cors());

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/vehicle', vehicleRouter);
app.use('/service', serviceRouter)

module.exports = app;
