"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var http_1 = __importDefault(require("http"));
var PORT = 5000;
var server = http_1.default.createServer(app_1.app);
server.listen(PORT, function () {
    console.log("Server running on port " + PORT);
});
