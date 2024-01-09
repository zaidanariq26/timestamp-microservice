// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' });
});

// app.get('/api/:date?', (req, res) => {
// 	const date = req.params.date;
// 	const regex = /^\d+$/;
// 	const formatCheck = moment(date, true).isValid();

// 	if (date == undefined) {
// 		res.json({
// 			unix: new Date().getTime(),
// 			utc: new Date().toUTCString(),
// 		});
// 	} else if (!formatCheck && !regex.test(date)) {
// 		res.json({ error: 'Invalid Date' });
// 	}

// 	const check = (params) => (/-/.test(params) ? params : parseInt(params, 10));
// 	const unix = new Date(check(date)).getTime();
// 	const utc = new Date(check(date)).toUTCString();
// 	res.json({ unix, utc });
// });
app.get('/api/:date?', (req, res) => {
	const dateParams = req.params.date;
	const parseDate = Date.parse(dateParams);

	if (dateParams == undefined) {
		res.json({
			unix: new Date().getTime(),
			utc: new Date().toUTCString(),
		});
	} else if (parseDate) {
		res.json({
			unix: new Date(parseDate).getTime(),
			utc: new Date(parseDate).toUTCString(),
		});
	} else if (/^\d+$/.test(dateParams)) {
		res.json({
			unix: new Date(parseInt(dateParams, 10)).getTime(),
			utc: new Date(parseInt(dateParams, 10)).toUTCString(),
		});
	} else {
		res.json({ error: 'Invalid Date' });
	}
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
