import { Node, NodeAPI, NodeDef, NodeMessageInFlow} from "@node-red/registry";
import { checkInternetConnection } from "./verify-connection";

interface CheckOnlineProps extends NodeDef {
  name: string;
  url: string;
  action: number;
}

module.exports = function(RED: NodeAPI) {
  function CheckOnlineNode(this: Node, config: CheckOnlineProps) {
    RED.nodes.createNode(this, config);
    const node = this;
    this.on('input', (msg: NodeMessageInFlow, send: any, done: any) => {
        try {
          checkInternetConnection().subscribe(status => node.send({ payload: status}));
        } catch (error) {
            node.error(error)
        }
     
    });
  }
  RED.nodes.registerType("check-online", CheckOnlineNode);
};