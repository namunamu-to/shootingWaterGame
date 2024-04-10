let createdNum = 0;
const ringImgPaths = { "red": "./img/redRing.png", "blue": "./img/blueRing.png" }


class Ring {
    constructor(showToElmId, x = 0, y = 0, width = 40, height = 40, color = "red") {
        this.id = ++createdNum;
        this.x = x;
        this.y = y;

        //サークル画像の要素作り、引数で指定された要素に追加
        let ringHtml = `<img id="${this.getId()}" class="ring" style="position: absolute;" src="${ringImgPaths[color]}">`;
        this.showElm = document.getElementById(showToElmId); //表示先の要素
        this.showElm.innerHTML += ringHtml;
        this.elm = document.getElementById(this.getId());

        //描画サイズを引数で指定されたサイズに変更
        this.setSize(width, height);

        //引数で指定された座標に描画
        this.moveTo(x, y);

        //ボールを落下させ続ける

        setInterval(() => {
            ring.move(0, 2);
        }, 8);
    }

    setColor(color) {
        elm.src = ringImgPaths[color];
    }

    getId() {
        return `ring${this.id}`;
    }

    setSize(width = parseInt(this.elm.style.width), height = parseInt(this.elm.style.height)) {
        this.elm.style.width = width + "px";
        this.elm.style.height = height + "px";
    }

    //どこの側面にいるか
    whichSide() {
        const leftInt = parseInt(this.elm.style.left)
        const showElmWidth = parseInt(this.showElm.clientWidth)
        const topInt = parseInt(this.elm.style.top)
        const showElmHeight = parseInt(this.showElm.clientHeight)

        let nowSide = { "top": false, "bottom": false, "right": false, "left": false };
        nowSide["left"] = leftInt < 0; //左端
        nowSide["right"] = leftInt > showElmWidth; //右端
        nowSide["top"] = topInt < 0; //上端
        nowSide["bottom"] = topInt > showElmHeight; //下端

        return nowSide;
    }

    //ゲーム画面からはみ出していたら、はみ出さないようにする
    restoreFromMoveOut() {
        const nowSide = this.whichSide();
        const showElmWidth = parseInt(this.showElm.clientWidth)
        const showElmHeight = parseInt(this.showElm.clientHeight)

        if (nowSide["left"]) this.elm.style.left = "0px"; //左端
        else if (nowSide["right"]) this.elm.style.left = showElmWidth + "px"; //右端
        else if (nowSide["top"]) this.elm.style.top = "0px"; //上端
        else if (nowSide["bottom"]) this.elm.style.top = showElmHeight + "px"; // 下端
    }

    move(x = 0, y = 0) {
        this.elm.style.position = "relative";
        this.elm.style.left = parseInt(this.elm.style.left) + x + "px";
        this.elm.style.top = parseInt(this.elm.style.top) + y + "px";
        this.elm.style.position = "absolute";


        this.restoreFromMoveOut();
    }

    moveTo(x = parseInt(this.elm.style.left), y = parseInt(this.elm.style.top)) {
        this.x = x;
        this.elm.style.left = x + "px";

        this.y = y;
        this.elm.style.top = y + "px";
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