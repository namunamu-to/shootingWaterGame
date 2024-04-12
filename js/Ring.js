const showElm = document.getElementById("gameDisplay"); //表示先の要素
const ringImgPaths = { "red": "./img/redRing.png", "blue": "./img/blueRing.png" }
let createdNum = 0;

function createRing(x = 0, y = 0, color = "red") {
    id = ++createdNum;

    //サークル画像の要素作り、引数で指定された要素に追加
    const elm = document.createElement("img");
    elm.setAttribute("class", "ring");
    elm.setAttribute("id", id);
    elm.setAttribute("src", ringImgPaths[color]);
    showElm.appendChild(elm);

    //引数で指定された座標に描画
    elm.style.left = x + "px";
    elm.style.top = y + "px";

    //ボールを落下させ続ける
    var Moverandom=1+Math.random();
    setInterval(() => {
        move(elm, 0, Moverandom);
    }, 8 + id);
   

    // //傾きに応じてx座標をずらす

     var Rotationrandom = Math.floor( Math.random() * 7 )+10;
    setInterval(() => {
        move(elm, parseInt(currentRotation / Rotationrandom ), 0);
    }, 20);

    return elm;
}

//どこの側面にいるか
function whichSide(elm) {
    const leftInt = parseInt(elm.style.left);
    const showElmWidth = parseInt(showElm.clientWidth);
    const topInt = parseInt(elm.style.top);
    const showElmHeight = parseInt(showElm.clientHeight);

    let nowSide = { "top": false, "bottom": false, "right": false, "left": false };
    nowSide["left"] = leftInt < 0; //左端
    nowSide["right"] = leftInt > showElmWidth - parseInt(elm.clientWidth); //右端
    nowSide["top"] = topInt < 0; //上端
    nowSide["bottom"] = topInt > showElmHeight - parseInt(elm.clientHeight); //下端

    return nowSide;
}

//ゲーム画面からはみ出していたら、はみ出さないようにする
function restoreFromMoveOut(elm) {
    const nowSide = whichSide(elm);
    const showElmWidth = parseInt(showElm.clientWidth);
    const showElmHeight = parseInt(showElm.clientHeight);

    if (nowSide["left"]) elm.style.left = "0px"; //左端
    else if (nowSide["right"]) elm.style.left = (showElmWidth - parseInt(elm.clientWidth)) + "px"; //右端
    else if (nowSide["top"]) elm.style.top = "0px"; //上端
    else if (nowSide["bottom"]) elm.style.top = (showElmHeight - parseInt(elm.clientHeight)) + "px"; // 下端

    elm.style.zIndex = 1000 + id; //この行がないとringが表示されなくなる。
}

//引数で指定された分だけ移動
function move(elm, x = 0, y = 0) {
    restoreFromMoveOut(elm);

    elm.style.position = "relative";
    elm.style.left = parseInt(elm.style.left) + x + "px";
    elm.style.top = parseInt(elm.style.top) + y + "px";
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