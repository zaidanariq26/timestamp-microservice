const moment = require('moment');

const result = '1451001600000';
// console.log(moment(result, true).isValid());
const parseDate = Date.parse(result);

// if (parseDate != 'Invalid Date') {
// 	console.log(parseDate);
// }

console.log(parseDate);
