/*
 *
 * */
// 开始按钮
var startButton,
// 剩余机会
    count,
// 游戏信息
    gameMessage,
// 关闭按钮
    closeButton,
// 人物
    role,
// 总次数
    numOfTimes = 10;

app();

function app() {
    startButton = document.getElementById("start-button");
    count = document.getElementById("count");
    gameMessage = document.getElementById('game-message');
    closeButton = gameMessage.firstElementChild;
    role = document.getElementById('role');

    count.src = 'img/number/' + numOfTimes + '.png'

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
        dice.src = 'img/dice/dice_Action_' + index + '.png';
        index++;
        if (index >= 3) {
            index = 0;
        }
    }, 16);

    // 获得骰子点数，停止动画
    setTimeout(function () {
        dice.src = 'img/dice/dice_' + i + '.png';
        clearInterval(id);
        // 主角移动
        role.className = 'zoom';
        setTimeout(function () {
            roleMove(i, 'forward');
            role.className = '';
        }, 1500);
    }, 1000);
}

// 主角移动
var x = 100,   // 主角的位置
    y = -120;
function roleMove(i, direction) {
    var role = document.getElementById("role");
    var total = 0;     // 所走的格子数
    var direction = direction;     // 移动方向

    var id = setInterval(function () {
        if (direction === 'forward') {
            if (y < 10) {
                y += 130;
            }
            else if (y === 10 && x < 520) {
                x += 140;
            }
            else if (x === 520 && y < 538) {
                y += 132;
            }
            else if (y === 538 && x > 100) {
                x -= 140;
            }
            else if (x === 100 && y > 10) {
                y -= 132;
            }
        } else if (direction === 'back') {
            if (y === 10 && x > 100) {
                x -= 140;
            }
            else if (x === 520 && y > 10) {
                y -= 132;
            }
            else if (y === 538 && x < 520) {
                x += 140;
            }
            else if (x === 100 && y < 538) {
                y += 132;
            }
        }

        role.style.left = x + 'px';
        role.style.top = y + 'px';
        total++;

        if (total === i) {
            clearInterval(id);
            triggerEvent(role, x, y);
        }
    }, 500);
}

// 有几次机会
function leftCount() {
    numOfTimes--;
    count.setAttribute('src', 'img/number/' + numOfTimes + '.png');
    if (numOfTimes <= 0) {
        gameMessage.className = 'over';
        closeButton.className = 'close';
        addEventHandler(closeButton, 'click', closePopWindow);
        disStartButton();
    }
}

// 奖励或惩罚事件
function triggerEvent(role, x, y) {
    // 中奖
    if (x === 520 && y === 142 ||
        x === 520 && y === 538 ||
        x === 100 && y === 274) {
        var rand = Math.random();
        if (rand <= 0.5) {
            // 中奖
            gameMessage.className = 'win';
            closeButton.className = 'close';
            addEventHandler(closeButton, 'click', closePopWindow);
        } else {
            // 谢谢参与
            gameMessage.className = 'lose';
            closeButton.className = 'close';
            addEventHandler(closeButton, 'click', closePopWindow);
        }
    }

    // 前进3步
    if (x === 240 && y === 10 ||
        x === 100 && y === 406) {
        role.className = 'zoom';
        setTimeout(function () {
            roleMove(3, 'forward');
            role.className = '';
        }, 1500)
    }

    // 后退3步
    else if (x === 520 && y === 10 ||
        x === 100 && y === 142) {
        role.className = 'zoom';
        setTimeout(function () {
            roleMove(3, 'back');
            role.className = '';
        }, 1500)
    }

    // 前进1步
    else if (x === 520 && y === 406) {
        role.className = 'zoom';
        setTimeout(function () {
            roleMove(1, 'forward');
            role.className = '';
        }, 1500)
    }

    // 后退1步
    else if (x === 240 && y === 538) {
        role.className = 'zoom';
        setTimeout(function () {
            roleMove(1, 'back');
            role.className = '';
        }, 1500)
    }else {
        startButtonAble();
        leftCount();
    }
}

// 投骰子按钮可用
function startButtonAble() {
    addEventHandler(startButton, "click", castDice);
    startButton.className = 'able';
}
// 投骰子按钮不可用
function disStartButton() {
    removeEventHandler(startButton, "click", castDice);
    startButton.className = 'disable';
}

// 弹窗关闭
function closePopWindow() {
    gameMessage.className = '';
    closeButton.className = '';
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