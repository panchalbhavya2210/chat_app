const moment = require("moment");

function formatMsg(userName, text) {
  return {
    userName,
    text,
    time: moment().format("h:mm a"),
  };
}

module.exports = formatMsg;
//
