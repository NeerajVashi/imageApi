/* eslint-disable no-tabs */
const allowmiddle = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Header', '*');
	next();
};

module.exports = allowmiddle;
