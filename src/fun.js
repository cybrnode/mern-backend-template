"use strict";
exports.__esModule = true;
var twilio_config_1 = require("./config/twilio-config");
var twilioConfig = twilio_config_1["default"].getConfig();
console.log(twilioConfig.accountId);
console.log(twilioConfig.authToken);
