const moment = require('moment');
module.exports = function () {
    getDate: function (timestamp, format) {
        return moment.unix(timeStamp).format(format);
    }
}