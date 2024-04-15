"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verify_connection_1 = require("./verify-connection");
module.exports = function (RED) {
    function CheckOnlineNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        this.on('input', (msg, send, done) => {
            try {
                (0, verify_connection_1.checkInternetConnection)().subscribe(status => node.send({ payload: status }));
            }
            catch (error) {
                node.error(error);
            }
        });
    }
    RED.nodes.registerType("check-online", CheckOnlineNode);
};
