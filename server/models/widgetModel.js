var mongoose = require("mongoose"),
    schema = mongoose.Schema;

var WidgetSchema = schema({
    title: {
        type: String,
        required: true
    },
    iconClass: {
        type: String
    },
    widgetType: {
        type: String,
        required: true
    },
    widgetData: schema.Types.Mixed
});

module.exports = mongoose.model("Widget", WidgetSchema);