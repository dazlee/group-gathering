var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    duration = new schema ({
    	title  : String,
        start  : Date,
        end    : Date,
        diff   : Number,
        join_status : Array
    });

mongoose.model('Duration', duration);
mongoose.connect('mongodb://localhost/group-gathering');