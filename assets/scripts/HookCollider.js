// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Hook = require("Hook");
cc.Class({
    extends: cc.Component,

    properties: {
        hook: {
            default: null,
            type: Hook //Hook.js
        },

    },

    onCollisionEnter(other, self) {

        if (this.hook.isShorten || this.node.children.length == 1) return; //收缩阶段不产生碰撞
        if (other.node.group == "wall") { this.hook.interrupt(); return; }
        other.node.anchorY = 1
        other.node.position = cc.v2(0, -10)
        other.node.parent = self.node;

        this.hook.interrupt();


    },
    // update (dt) {},
});