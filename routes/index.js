
/*
 * GET home page.
 */
var mongoose = require('mongoose'),
    Duration = mongoose.model('Duration');

var DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function dateDiff(start_date, end_date) {
    return Math.round((end_date - start_date)/1000/60/60/24) + 1;
};

function getDateFromat (_date) {
	var formatted = {
		month : _date.getMonth() + 1,
		date  : _date.getDate(),
		day   : DAY[_date.getDay()]
	};
	return formatted;
}

exports.insertSchedule = function (req, res) {
    var _name = req.body.name,
        _is_check = [],
        new_join,
        i;
    console.log(_name);
    Duration.findById(req.params.id, function (err, duration) {
        for (i = 0; i < duration.diff; i += 1 ) {
            _is_check[i] = req.body['checkbox_' + i] ? true : false;
        }
        new_join = {
            name: _name,
            is_check: _is_check
        };
        duration.join_status.push(new_join);
        duration.save(function (err, duration, count) {
            res.redirect('/gathering/' + duration.id);
        });
    });
};

exports.gathering = function (req, res) {
    Duration.findById(req.params.id, function (err, duration) {
        var date = [],
        	new_date,
            start_date = new Date(duration.start),
            end_date = new Date(duration.end),
            date_diff = duration.diff - 1;//dateDiff(start_date, end_date);

        date[0] = getDateFromat(new Date(duration.start));
        for (date_i = 0; date_i < date_diff; date_i += 1) {
            new_date = new Date(start_date.setDate(start_date.getDate() + 1));
            date[date_i + 1] = getDateFromat(new_date);
        };
    console.log(duration.join_status[0]);
        res.render('gathering', {title: 'Create', date: date, duration: duration});
    });
};

exports.createDuration = function (req, res) {

    var body = req.body,
        event_title = body.event_title,
        start_date = body.start_date,
        end_date = body.end_date,
        date_diff = dateDiff(new Date(start_date), new Date(end_date));

    var duration = new Duration({
        title : event_title,
        start : start_date,
        end   : end_date,
        diff  : date_diff,
        join_status : []
    });
    
    duration.save(function (err, duration, count) {
        res.redirect('/gathering/' + duration.id);
    });
};

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};