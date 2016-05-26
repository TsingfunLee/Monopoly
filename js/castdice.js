/**
 * Created by 李庆芳 on 2016/5/26.
 */

var startButton = document.getElementById("start-button");
app();

function app() {
    addEventHandler(startButton, "click", castDice);
}

// 投骰子
function castDice() {
    var dice = document.getElementById("dice");
    var index = 0;  // 骰子动画序列
    var i = parseInt(Math.random() * 6 + 1);   // 随机获得骰子点数

    // 先移除投骰子的函数，使游戏时不可点击
    disStartButton();

    // 投骰子动画
    var id = setInterval(function () {
        dice.style.backgroundImage = "url(img/dice/dice_Action_" + index + ".png)";
        index++;
        if (index >= 3) {
            index = 0;
        }
    }, 41);

    // 获得骰子点数，停止动画
    setTimeout(function () {
        dice.style.backgroundImage = "url(img/dice/dice_" + i + ".png)";
        clearInterval(id);
        // 主角移动
        roleMove(i);
    }, 1000);
}

// 主角移动
var x = 78,   // 主角的位置
    y = 32;
function roleMove(i) {
    var role = document.getElementById("role");
    var total = 0;     // 所走的格子数

    var id = setInterval(function () {
        role.style.left = x + "px";
        role.style.top = y + "px";
        var realX = x,
            realY = y;
        if (y === 32 && x < 558) {
            x += 120;
            total++;
        }
        else if (x === 558 && y < 872) {
            y += 120;
            total++;
        }
        else if (y === 872 && x > 78) {
            x -= 120;
            total++;
        }
        else if (x === 78 && y > 32) {
            y -= 120;
            total++;
        }
        if (total === i) {
            clearInterval(id);
            // 重新绑定投骰子函数
            startButtonAble();
            count();
            win(role, realX, realY);
        }
    }, 500);
}

// 有几次机会
function count() {
    var count = document.getElementById("count");
    var countNum = parseInt(count.innerHTML);
    countNum--;
    count.innerHTML = countNum;
    if (countNum <= 0) {
        alert("您的机会已用完！");
        disStartButton();
    }
}

// 中奖
function win(role, realX, realY) {
    if (realX === 558 && realY === 32 ||
        realX === 558 && realY === 272 ||
        realX === 558 && realY === 632 ||
        realX === 318 && realY === 872 ||
        realX === 78 && realY === 152 ||
        realX === 78 && realY === 512) {
        var rand = Math.random();
        if (rand <= 0.5) {
            alert("恭喜中奖了！");
        } else {
            alert("谢谢参与！")
        }
    }
}

// 投骰子按钮可用
function startButtonAble() {
    addEventHandler(startButton, "click", castDice);
    startButton.style.background = "url(img/start.png)";
}
// 投骰子按钮不可用
function disStartButton() {
    removeEventHandler(startButton, "click", castDice);
    startButton.style.background = "url(img/start-disable.png)";
}

/**
 * 绑定、移除事件函数
 */
// 用于给元素绑定事件，解决浏览器兼容问题
function addEventHandler(element, event, fun) {
    if (element.addEventListener) {
        element.addEventListener(event, fun, false);
    } else if (element.attachEvent()) { // 兼容IE
        element.attachEvent("on" + event, fun)
    } else {
        element["on" + event] = fun;
    }
}
// 用于给元素移除事件，解决浏览器兼容问题
function removeEventHandler(element, event, fun) {
    if (element.removeEventListener) {
        element.removeEventListener(event, fun, false);
    } else if (element.detachEvent) {  // 兼容IE
        element.detachEvent("on" + event, fun);
    } else {
        element["on" + event] = fun;
    }
}