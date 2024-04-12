const showElm = document.getElementById("gameDisplay"); //表示先の要素
let rings = [];
const ringImgPaths = { "red": "./img/redRing.png", "blue": "./img/blueRing.png" }
let createdNum = 0;
const ringSize = 40;

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
function getX(elm){
    return parseInt(elm.style.left);
}

function setX(elm, x){
    elm.style.left = x + "px";
}

function setY(elm, y){
    elm.style.top = y + "px";
}

//int型の要素のy座標を取得する関数
function getY(elm){
    return parseInt(elm.style.top);
}

//int型の要素の横幅を取得する関数
function getWidth(elm){
    return parseInt(elm.clientWidth);
}

//int型の要素の縦幅を取得する関数
function getHeight(elm){
    return parseInt(elm.clientHeight);
}

//どこの側面にいるか
function whichSide(elm) {
    const elmX = getX(elm);
    const elmY = getY(elm);

    let nowSide = { "top": false, "bottom": false, "right": false, "left": false };
    nowSide["left"] = elmX < 0; //左端
    nowSide["right"] = elmX > getWidth(showElm) - getWidth(elm); //右端
    nowSide["top"] = elmY < 0; //上端
    nowSide["bottom"] = elmY > getHeight(showElm) - getWidth(elm); //下端

    return nowSide;
}

//ゲーム画面からはみ出していたら、はみ出さないようにする
function restoreFromMoveOut(elm) {
    const nowSide = whichSide(elm);

    if (nowSide["left"]) setX(elm, 0); //左端
    else if (nowSide["right"]) setX(elm, getWidth(showElm) - getWidth(elm)); //右端
    else if (nowSide["top"]) setY(elm, 0); //上端
    else if (nowSide["bottom"]) setY(elm, getHeight(showElm) - getHeight(elm)); // 下端

    elm.style.zIndex = 1000 + id; //この行がないとringが表示されなくなる。
}

//引数で指定された分だけ移動
//進行方向に他のリングがあれば重ならないように移動
function move(elm, x = 0, y = 0) {
    restoreFromMoveOut(elm);

    //移動
    elm.style.position = "relative";
    setX(elm, getX(elm) + x);
    setY(elm, getY(elm) + y);
    elm.style.position = "absolute";

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
for (let i = 0; i < 8; i++) {
    const randomX = parseInt(Math.random() * (getWidth(gameDisplay) - ringSize)); //0～ (gameDIsplay - ringSize)の横幅の範囲でランダム
    const romdomY = parseInt(Math.random() * (getHeight(gameDisplay) - ringSize)); //0～　(gameDIsplay縦幅 - ringSize)の範囲でランダム
    rings.push(createRing(randomX, romdomY, color = "blue"));
}

for (let i = 0; i < 8; i++) {
    const randomX = parseInt(Math.random() * (getWidth(gameDisplay) - ringSize)); //0～ (gameDIsplay - ringSize)の横幅の範囲でランダム
    const romdomY = parseInt(Math.random() * (getHeight(gameDisplay) - ringSize)); //0～　(gameDIsplay縦幅 - ringSize)の範囲でランダム
    rings.push(createRing(randomX, romdomY, color = "red"));
}