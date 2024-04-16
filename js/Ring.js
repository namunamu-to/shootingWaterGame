const showElm = document.getElementById("gameDisplay"); //表示先の要素
let rings = [];
const ringImgPaths = { "red": "./img/redRing.png", "blue": "./img/blueRing.png" }
let createdNum = 0;
const ringSize = 40;
const ringRadius = parseInt(ringSize / 2)

function createRing(x = 0, y = 0, color = "red") {
    id = ++createdNum;

    //サークル画像の要素作り、引数で指定された要素に追加
    const elm = document.createElement("img");
    elm.setAttribute("class", "ring");
    elm.setAttribute("id", id);
    elm.setAttribute("src", ringImgPaths[color]);
    elm.style.width = ringSize + "px";
    elm.style.height = ringSize + "px";
    showElm.appendChild(elm);

    //引数で指定された座標に描画
    elm.style.left = x + "px";
    elm.style.top = y + "px";

    //ボールを落下させ続ける
    var Moverandom = 1 + Math.random();
    setInterval(() => {
        move(elm, 0, Moverandom);
    }, 8);


    // //傾きに応じてx座標をずらす
    var Rotationrandom = Math.floor(Math.random() * 7) + 10;
    setInterval(() => {
        move(elm, parseInt(currentRotation / Rotationrandom), 0);
    }, 20);

    return elm;
}

//int型の要素のx座標を取得する関数
function getX(elm) {
    return parseInt(elm.style.left);
}

function setX(elm, x) {
    elm.style.left = x + "px";
}

function setY(elm, y) {
    elm.style.top = y + "px";
}

//int型の要素のy座標を取得する関数
function getY(elm) {
    return parseInt(elm.style.top);
}

//int型の要素の横幅を取得する関数
function getWidth(elm) {
    return parseInt(elm.clientWidth);
}

//int型の要素の縦幅を取得する関数
function getHeight(elm) {
    return parseInt(elm.clientHeight);
}

//elm1がgameDisplayのどこの側面にいるか
function whichSide(elm1) {
    let nowSide = { "top": false, "bottom": false, "right": false, "left": false };
    nowSide.left = getX(elm1) < 0; //左端
    nowSide.right = getX(elm1) > getWidth(showElm) - getWidth(elm1); //右端
    nowSide.top = getY(elm1) < 0; //上端
    nowSide.bottom = getY(elm1) > getHeight(showElm) - getWidth(elm1); //下端

    return nowSide;
}

//elm1がelm2からはみ出していたら、はみ出さないようにする
function restoreFromMoveOut(elm1) {
    const nowSide = whichSide(elm1, showElm);

    if (nowSide.left) setX(elm1, 0); //左端
    else if (nowSide.right) setX(elm1, getWidth(showElm) - ringSize); //右端
    else if (nowSide.top) setY(elm1, 0); //上端
    else if (nowSide.bottom) setY(elm1, getHeight(showElm) - ringSize); // 下端
}

//引数で指定された分だけ移動
let exedRings = []
for(let i=0; i<rings.length; i++) exedRings.push(false);
function move(elm, x = 0, y = 0) {
    restoreFromMoveOut(elm);

    //他の要素と重ならないようにする
    for (let i = rings.indexOf(elm) + 1; i < rings.length; i++) {
    // for (let i = 0; i < rings.length; i++) {
        // if (elm.getAttribute("id") == rings[i].getAttribute("id")) continue; //同じ要素参照していたらcontinue
        // if(exedRings[i]) continue; //すでに実行されてたらcontinue
        const elm2 = rings[i];

        //方程式で当たり判定
        //ring1の座標とring2の座標の距離 < ring1半径＋ring2の半径
        //dはdistanceの略
        const elmX = getX(elm) + ringRadius;
        const elmY = getY(elm) + ringRadius;
        const elm2X = getX(elm2) + ringRadius;
        const elm2Y = getY(elm2) + ringRadius;
        let dx = elmX - elm2X;
        let dy = elmY - elm2Y;
        const ringBetween = dx ** 2 + dy ** 2
        const maxRingBetween = (ringRadius * 2) ** 2
        if (ringBetween < maxRingBetween) {
            x *= -1;
            y = 0;

            break;
        }

    }

    setX(elm, getX(elm) + x);
    setY(elm, getY(elm) + y);

    restoreFromMoveOut(elm);
}

//指定された時間をかけて指定された移動量を移動する
function repeatMove(elm, oneMoveAmmountX, oneMoveAmmountY, interval, numberOfMove) { //intervalはmsで指定
    let count = 0;
    const xIntervalId = setInterval(() => {
        move(elm, oneMoveAmmountX, oneMoveAmmountY);
        count++;
        if (count == numberOfMove) clearInterval(xIntervalId);
    }, interval);
}


//リングの生成
for (let i = 0; i < 1; i++) {
    const randomX = Math.random() * (getWidth(gameDisplay) - ringSize); //0～ (showElm - ringSize)の横幅の範囲でランダム
    const romdomY = Math.random() * (getHeight(gameDisplay) - ringSize); //0～　(gameDIsplay縦幅 - ringSize)の範囲でランダム
    rings.push(createRing(randomX, romdomY, color = "blue"));
}

for (let i = 0; i < 1; i++) {
    const randomX = Math.random() * (getWidth(gameDisplay) - ringSize); //0～ (showElm - ringSize)の横幅の範囲でランダム
    const romdomY = Math.random() * (getHeight(gameDisplay) - ringSize); //0～　(gameDIsplay縦幅 - ringSize)の範囲でランダム
    rings.push(createRing(randomX, romdomY, color = "red"));
}