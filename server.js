const express = require("express");
const app = express();
const sequelize = require("./config/connection");
const path = require("path");
const exphbs = require("express-handlebars");
const helpers = require("./utils/helpers");
const routes =  require("./controllers");



// creates session
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
//require("dotenv").config();
const hbs = exphbs.create({ helpers });

const sess = {
    secret: process.env.SECRET,
  // secret:'Super secret secret',
    cookie: {}, 
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        // checks for session expiration every 15 minutes
        checkExpirationInterval: 15 * 60 * 1000,
        // session expires in 24 hours
        expiration: 24 * 60 * 60 * 1000 
    })
};


// sets handlebars as template engine

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(session({ secret: 'somevalue' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uses public folder
app.use(express.static(path.join(__dirname, "public")));


// turn on routes

app.use(routes);

// turn on connection to db and server 
const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(
        `\nServer running on port ${PORT}. Visit http://localhost:${PORT} and create an account!`
      ))
});