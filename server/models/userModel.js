var mongoose = require("mongoose"),
    bcrypt   = require("bcrypt-nodejs");

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/, "Please enter a valid email"]
    },
    password: String,
    roles: {
        type: Array,
        default: ["basic"]
    },
    widgets: {
        type: Array
    }
});

UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.isAdmin = function() {
    return this.roles.indexOf("admin") !== -1;
};

UserSchema.methods.hasRole = function(role) {
    var roles = this.roles;
    return roles.indexOf(role.toLowerCase()) !== -1;
};

module.exports = mongoose.model("User", UserSchema);