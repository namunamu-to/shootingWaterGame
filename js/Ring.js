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

//elm1がelm2のどこの側面にいるか
function whichSide(elm1, elm2) {
    let nowSide = { "top": false, "bottom": false, "right": false, "left": false };
    nowSide["left"] = getX(elm1) < 0; //左端
    nowSide["right"] = getX(elm1) > getWidth(elm2) - getWidth(elm1); //右端
    nowSide["top"] = getY(elm1) < 0; //上端
    nowSide["bottom"] = getY(elm1) > getHeight(elm2) - getWidth(elm1); //下端

    return nowSide;
}

//elm1がelm2からはみ出していたら、はみ出さないようにする
function restoreFromMoveOut(elm1, elm2) {
    const nowSide = whichSide(elm1, elm2);

    if (nowSide["left"]) setX(elm1, 0); //左端
    else if (nowSide["right"]) setX(elm1, getWidth(elm2) - ringSize); //右端
    else if (nowSide["top"]) setY(elm1, 0); //上端
    else if (nowSide["bottom"]) setY(elm1, getHeight(elm2) - ringSize); // 下端
}

//要素が重なっているか判定する関数
function judgeOverlap(elm1, elm2){
    const horizontal = (getX(elm1) < getX(elm2) + ringSize) && (getX(elm2) < getX(elm1) + ringSize);
    const vertical = (getY(elm1) < getY(elm2) + ringSize) && (getY(elm2) < getY(elm1) + ringSize);

    return horizontal && vertical;
}

//引数で指定された分だけ移動
function move(elm, x = 0, y = 0) {
    restoreFromMoveOut(elm, showElm);
    
    //他の要素と重ならないようにする
    for(let i=0; i<rings.length; i++){
        if(elm.getAttribute("id") == rings[i].getAttribute("id")) continue; //同じ要素参照していたらcontinue
        
        if(judgeOverlap(elm, rings[i])) { //他の要素と重なっているか
        //     if(x > 0){ //右方向に進もうとしてる時の移動量
        //         x = (getX(elm)+ringSize) - getX(rings[i]);
        //         // setX(elm, getX(rings[i]));
        //     }else{
        //         x = (getX(rings[i]) + ringSize) - (getX(elm));
        //         // setX(elm, getX(rings[i]) + ringSize);
        //     }
            
        //     if(y > 0){ //下方向に進もうとしてる時の移動量
        //         y = (getY(elm)+ringSize) - getY(rings[i]);
        //     //     setY(elm, getY(rings[i]));
        //     }else{
        //         y = (getY(rings[i]) + ringSize) - (getY(elm));
        //     //     setY(elm, getY(rings[i]) + ringSize);
        //     }

        //     console.log(elm.getAttribute("id"), x, y);
        //     // setX(elm, getX(elm) + x);
        //     // setY(elm, getY(elm) + y);
        //     // return;
        //     // break;
        //     return;
        // restoreFromMoveOut(elm, rings[i]);
        }
    }

    //移動
    setX(elm, getX(elm) + x);
    setY(elm, getY(elm) + y);

    
    
    restoreFromMoveOut(elm, showElm);
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
    const randomX = Math.random() * (getWidth(gameDisplay) - ringSize); //0～ (gameDIsplay - ringSize)の横幅の範囲でランダム
    const romdomY = Math.random() * (getHeight(gameDisplay) - ringSize); //0～　(gameDIsplay縦幅 - ringSize)の範囲でランダム
    rings.push(createRing(randomX, romdomY, color = "blue"));
}

for (let i = 0; i < 1; i++) {
    const randomX = Math.random() * (getWidth(gameDisplay) - ringSize); //0～ (gameDIsplay - ringSize)の横幅の範囲でランダム
    const romdomY = Math.random() * (getHeight(gameDisplay) - ringSize); //0～　(gameDIsplay縦幅 - ringSize)の範囲でランダム
    rings.push(createRing(randomX, romdomY, color = "red"));
}