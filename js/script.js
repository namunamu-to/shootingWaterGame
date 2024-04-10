const ring = new Ring("gameDisplay", "100", "100");
// ring.moveToGround();
ring.move(100, 100);

//右クリック時にコンテキストメニューを表示させないようにする
gameDisplay.addEventListener("contextmenu", () => { return false });

//作成中
//水流出すハンドラ
function pushOutWaterFlow(distance = 100, weight = "50") {
    // const lineLength = 
}

//作成中
//左クリックで左半分のリングを右上方向に吹き飛ばす
function blowRing() {
    ring.moveTo(5, 5);
}
document.addEventListener("click", (e) => {
    ring.repeatMove(40, -40, 1, 10);
});

//作成中
//右クリックで右半分の画面側から水流出す
document.addEventListener("contextmenu", () => {
    ring.repeatMove(-40, -40, 1, 10);
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ShiftLeft") { //左シフト
        ring.repeatMove(40, -40, 1, 10);
    }
    if (e.location == 0) { //右シフト
        ring.repeatMove(-40, -40, 1, 10);
    }
});


//ボールを落下させ続ける
function fallRing() {
    ring.move(0, 5);
}
setInterval(fallRing, 16);



