class Ring {
    static ringImgPaths = { "red": "./img/redRing.png", "blue": "./img/blueRing.png" }
    static createdNum = 0;
    constructor(showToElmId, x = 0, y = 0, color = "red") {
        const id = ++Ring.createdNum;

        //サークル画像の要素作り、引数で指定された要素に追加
        this.showElm = document.getElementById(showToElmId); //表示先の要素
        this.elm = document.createElement("img");
        this.elm.setAttribute("class", "ring");
        this.elm.setAttribute("id", id);
        this.elm.setAttribute("src", Ring.ringImgPaths[color]);
        this.showElm.appendChild(this.elm);

        //引数で指定された座標に描画
        this.elm.style.left = x + "px";
        this.elm.style.top = y + "px";

        //ボールを落下させ続ける
        setInterval(() => {
            this.move(0, 2);
        }, 8 + this.id);

        // //傾きに応じてx座標をずらす
        setInterval(() => {
            this.move(parseInt(currentRotation / 10), 0);
        }, 20);
    }

    setSize(width = parseInt(this.elm.style.width), height = parseInt(this.elm.style.height)) {

    }

    //どこの側面にいるか
    whichSide() {
        const leftInt = parseInt(this.elm.style.left)
        const showElmWidth = parseInt(this.showElm.clientWidth)
        const topInt = parseInt(this.elm.style.top)
        const showElmHeight = parseInt(this.showElm.clientHeight)

        let nowSide = { "top": false, "bottom": false, "right": false, "left": false };
        nowSide["left"] = leftInt < 0; //左端
        nowSide["right"] = leftInt > showElmWidth - parseInt(this.elm.clientWidth); //右端
        nowSide["top"] = topInt < 0; //上端
        nowSide["bottom"] = topInt > showElmHeight - parseInt(this.elm.clientHeight); //下端

        return nowSide;
    }

    //ゲーム画面からはみ出していたら、はみ出さないようにする
    restoreFromMoveOut() {
        const nowSide = this.whichSide();
        const showElmWidth = parseInt(this.showElm.clientWidth)
        const showElmHeight = parseInt(this.showElm.clientHeight)

        if (nowSide["left"]) this.elm.style.left = "0px"; //左端
        else if (nowSide["right"]) this.elm.style.left = (showElmWidth - parseInt(this.elm.clientWidth)) + "px"; //右端
        else if (nowSide["top"]) this.elm.style.top = "0px"; //上端
        else if (nowSide["bottom"]) this.elm.style.top = (showElmHeight - parseInt(this.elm.clientHeight)) + "px"; // 下端
    }

    //引数で指定された分だけ移動
    move(x = 0, y = 0) {
        this.elm.style.position = "relative";
        this.elm.style.left = parseInt(this.elm.style.left) + x + "px";
        this.elm.style.top = parseInt(this.elm.style.top) + y + "px";
        this.elm.style.position = "absolute";

        this.restoreFromMoveOut();
    }

    //指定された時間をかけて指定された移動量を移動する
    repeatMove(oneMoveAmmountX, oneMoveAmmountY, interval, numberOfMove) { //intervalはmsで指定
        let count = 0;
        const xIntervalId = setInterval(() => {
            this.move(oneMoveAmmountX, oneMoveAmmountY);
            count++;
            if (count == numberOfMove) clearInterval(xIntervalId);
        }, interval);
    }
}