var mongoose = require("mongoose"),
    passport = require("passport"),
    database = require("./server/config/database");

mongoose.connect(database.url);

require("./server/config/mongoose")(mongoose);
require("./server/config/passport")(passport);

var app = require("./server/config/express")(passport);

require("./server/api/routes/widgetServiceRoutes")(app);

app.route("/").get(function(req, res) {
    res.sendfile("./server/views/layouts/master.html");
});

//var seeder = require("./server/config/seeder");
//seeder.widgetSeeder();
//seeder.userSeeder();

app.listen(app.get("port"));