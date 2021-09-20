// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var config = require("Config");

cc.Class({
    extends: cc.Component,

    properties: {
        standardLen: {
            default: 0,
            type: cc.Integer
        },
        standardAngle: {
            default: 0,
            type: cc.Integer
        },
        curScoreDisplay: {
            default: null,
            type: cc.Label
        },
        initialLen: {
            default: 60,
            type: cc.Integer
        },


    },



    reStart() {


        this.node.stopAllActions();
        this.removeTheGrandSon();

        this.createAction();
        this.node.angle = 70;
        this.node.height = this.initialLen;

        this.curScore = 0;
        this.ableClick = true;
        this.shouldLengthen = false;


        this.repeatSwing();

        this.isShorten = false; //收缩阶段不能产生碰撞

        this.curScoreDisplayUpdate(0);

    },
    onDisable() {
        console.log("wuhu")
    },
    removeTheGrandSon() {

        if (this.node.children[2].children.length != 0) { //name: 'claw-1'
            let nodeArr = this.node.children[2].children;
            for (let i = 0; i < nodeArr.length; i++) {
                nodeArr[i].destroy();
                console.log(nodeArr[i].name + "            faild")
            }
        }

    },
    curScoreDisplayUpdate(score) {


        this.curScore += score;
        this.curScoreDisplay.string = "" + this.curScore;
    },
    interrupt() {

        this.node.stopAllActions();
        this.ableClick = false;
        this.isShorten = true;
        cc.tween(this.node)
            .to(2, {
                height: this.initialLen
            }, { easing: 'sineInOut' })
            .call(function() {

                if (this.node.children[2].children && this.node.children[2].children.length == 1) {
                    let grandson = this.node.children[2].children[0];
                    grandson.destroy();
                    this.curScoreDisplayUpdate(config[grandson.name].score)
                    console.log(grandson.name + "            success")
                }
                this.node.runAction(this.repeat);
                this.ableClick = true;
                this.isShorten = false;
            }, this)
            .start()
    },

    lengthenAndShorten() {
        this.removeTheGrandSon()
        cc.tween(this.node)
            .delay(0.001).call(function() {
                this.node.stopAction(this.repeat);
                this.shouldLengthen = false;
                this.ableClick = false;
            }, this)
            .to(0.5, {
                height: this.node.height + this.standardLen
            }, { easing: 'sineInOut' })
            .call(function() { this.isShorten = true; }, this)
            .to(0.5, {
                height: this.node.height
            }, { easing: 'sineInOut' })
            .call(function() {
                this.isShorten = false;
                this.node.runAction(this.repeat);
                this.ableClick = true;
            }, this)
            .start()
    },
    createAction() {
        if (this.repeat) return;
        let m1 = cc.rotateTo(2, this.standardAngle);
        m1.easing(cc.easeOut(1));
        let m2 = cc.rotateTo(2, -this.standardAngle);
        m2.easing(cc.easeOut(1));
        let seq = cc.sequence([m1, m2]);
        this.repeat = cc.repeatForever(seq);

    },
    repeatSwing() {
        this.removeTheGrandSon()
        this.node.runAction(this.repeat);
    },

    update(dt) {

        if (this.shouldLengthen) {
            this.lengthenAndShorten()
        }
    },
});