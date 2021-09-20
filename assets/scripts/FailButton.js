// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var MoutainGame = require("MoutainGame");
cc.Class({
    extends: cc.Component,

    properties: {
        moutainGame: {
            default: null,
            type: MoutainGame //MoutainGame.js
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.on('click', function() {
            this.moutainGame.reStart();
        }, this);
    },



    // update (dt) {},
});