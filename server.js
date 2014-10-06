var mongoose = require("mongoose"),
    passport = require("passport"),
    database = require("./server/config/database");

mongoose.connect(database.url);

require("./server/config/mongoose")(mongoose);
require("./server/config/passport")(passport);

var app = require("./server/config/express")(passport);

require("./server/routes/welcomeRoutes")(app, passport);
require("./server/routes/widgetServiceRoutes")(app);

//var seeder = require("./server/config/seeder");
//seeder.widgetSeeder();
//seeder.userSeeder();

app.listen(app.get("port"));