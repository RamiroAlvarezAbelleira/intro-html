const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = 8080;
const mainRoutes = require('./src/routes/mainRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');
const session = require('express-session');
const loggedUserMW = require('./src/middleware/loggedUserMW');

/*SETTING*/

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(session({
    secret: 'shhh',
    resave: false,
    saveUninitialized: false
}));
app.use(loggedUserMW);

/*RUTAS*/

app.use('/', mainRoutes);
app.use('/productos', productRoutes);
app.use('/usuarios', userRoutes)
app.listen(process.env.PORT || port, () => console.log(`servidor funcionando en el puerto ${port}`));




