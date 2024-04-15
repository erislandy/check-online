"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInternetConnection = void 0;
const rxjs_1 = require("rxjs");
const https_1 = __importDefault(require("https"));
const checkInternetConnection = (url = 'https://www.google.com', timeoutPeriod = 5000) => {
    return new rxjs_1.Observable(subscriber => {
        const request = https_1.default.request(url, { method: 'HEAD' }, response => {
            if (response.statusCode === 200) {
                subscriber.next({ isConnected: true, message: 'Internet connection active' });
            }
            else {
                subscriber.next({ isConnected: false, message: `No internet connection or timeout exceeded: ${response.statusCode}` });
            }
            subscriber.complete();
        });
        request.on('error', error => {
            subscriber.next({ isConnected: false, message: "No internet connection" + JSON.stringify({ error }) });
        });
        request.setTimeout(timeoutPeriod, () => {
            request.abort(); // Cancel the request if it takes longer than timeoutPeriod
            subscriber.next({ isConnected: false, message: "No internet connection. Request time out" });
        });
        request.end();
    });
};
exports.checkInternetConnection = checkInternetConnection;
