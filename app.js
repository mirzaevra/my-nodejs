const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const analyticsRoutes = require('./routes/analytics');
const authRoutes = require('./routes/auth');
const categoyRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const keys = require('./config/keys');
const app = express();

async function start() {
    try {
        await mongoose.connect(keys.mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoyRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

module.exports = app;
