const ring = new Ring("gameDisplay", "100", "100");
// ring.moveToGround();
ring.move(100, 300);

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
    ring.repeatMove(10, -10, 1, 25);
});

//作成中
//右クリックで右半分の画面側から水流出す
document.addEventListener("contextmenu", () => {
    ring.repeatMove(-10, -10, 1, 25);
});

document.addEventListener("keydown", (e) => {
    if (e.code === "ShiftLeft") { //左シフト
        ring.repeatMove(10, -10, 1, 25);
    }
    
    if (e.location == 0) { //右シフト
        ring.repeatMove(-10, -10, 10, 25);
    }
});



