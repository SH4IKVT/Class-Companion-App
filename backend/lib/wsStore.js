class WsStore {
    static wss 
    static set(wss) {
        WsStore.wss = wss;
    }
    static get(){
        
        
        return WsStore.wss
    } 
}
module.exports = WsStore