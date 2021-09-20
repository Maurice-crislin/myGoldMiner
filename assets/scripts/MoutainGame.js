// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Hook = require("Hook");
var config = require("Config");
cc.Class({
    extends: cc.Component,

    properties: {
        hook: {
            default: null,
            type: Hook //Hook.js
        },
        curTimeDisplay: {
            default: null,
            type: cc.Label
        },

        treasure: {
            default: null,
            type: cc.Prefab
        },
        levelDisplay: {
            default: null,
            type: cc.Label

        },
        level: {
            default: 1,
            type: cc.Integer

        },
        curScoreDisplay: {
            default: null,
            type: cc.Label
        },
        targetScoreDisplay: {
            default: null,
            type: cc.Label
        },
        freezeTip: {
            default: null,
            type: cc.Label

        }


    },

    // LIFE-CYCLE CALLBACKS:


    onLoad() {


        //碰撞检测系统
        this.collisionManager = cc.director.getCollisionManager();
        this.collisionManager.enabled = true;




        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
            if (!this.hook.shouldLengthen && this.hook.ableClick) {
                this.hook.shouldLengthen = true;
            }

        }, this)
        this.reStart();
    },
    exitPlay() {
        cc.director.loadScene("Entrance");
    },
    reStart() {

        this.hook.removeTheGrandSon();

        this.treasureNode = cc.instantiate(this.treasure)
        this.treasureNode.parent = this.node;


        this.hook.reStart();

        this.freezeNode = cc.find("Canvas/freeze");
        this.freezeNode.active = false;
        this.setTimer();


        cc.director.resume();
        this.collisionManager.enabled = true; //开启碰撞检测

    },
    gameOver() {
        this.collisionManager.enabled = false; //暂停碰撞检测
        if (parseInt(this.curScoreDisplay.string) > parseInt(this.targetScoreDisplay.string)) {
            this.levelUpdate();
            this.targetScoreDisplay.string = parseInt(this.targetScoreDisplay.string) + config.gapTarget;
            this.freezeTip.string = "点击进入下一关";
        } else {
            this.freezeTip.string = "失败了，再来一次";
        }
        this.freezeNode.active = true;
        this.treasureNode.destroy();
        this.hook.removeTheGrandSon();
        cc.director.pause();


    },

    levelUpdate() {

        this.levelDisplay.string = this.level;
        this.level += 1;

    },
    setTimer() {
        this.time = config.time;
        this.curTimeDisplay.string = this.time;
        this.timerCallback = function() {
            this.time--;
            this.curTimeDisplay.string = this.time;
            if (this.time == 0) {
                this.unschedule(this.timerCallback);
                this.gameOver();
            }
        };
        this.schedule(this.timerCallback, 1);
    },

    // update (dt) {},
});

// if (this.score >= this.target) {
//     this.bSuccess = true;
//     cc.find("btn-next/label", gameOver).getComponent(cc.Label).string =
//         "下一关";
// } else {
//     this.bSuccess = false;
//     cc.find("btn-next/label", gameOver).getComponent(cc.Label).string =
//         "退出游戏";
// }

// time: {
//     default: 0,
//     type: cc.Integer
// },