let createdNum = 0;
const ringImgPaths = {"red" : "./img/redRing.png", "blue" : "./img/blueRing.png"} 


class Ring{
    constructor(showToElmId, x=0, y=0, width=40, height=40, color="red"){
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
    }

    setColor(color) {
        elm.src = ringImgPaths[color];
    }

    getId(){
        return `ring${this.id}`;
    }
    
    setSize(width=parseInt(this.elm.style.width), height=parseInt(this.elm.style.height)){
        this.elm.style.width = width + "px";
        this.elm.style.height = height + "px";
    }

    moveToGround(){
        this.setY(this.showElm.clientHeight - this.elm.clientHeight);
    }

    move(x=0, y=0){
        this.elm.style.position = "relative";
        this.elm.style.left = parseInt(this.elm.style.left) + x + "px"; 
        this.elm.style.top = parseInt(this.elm.style.top) +  y + "px";
        this.elm.style.position = "absolute";

        const leftInt = parseInt(this.elm.style.left)
        const showElmWidth = parseInt(this.showElm.clientWidth)
        const topInt = parseInt(this.elm.style.top)
        const showElmHeight = parseInt(this.showElm.clientHeight)

        //ゲーム画面からはみ出していたら、はみ出さないようにする
        if(leftInt < 0) this.elm.style.left = "0px"; //左端
        else if(leftInt > showElmWidth) this.elm.style.left = showElmWidth + "px"; //右端
        else if(topInt < 0) this.elm.style.top = "0px"; //上端
        else if(topInt > showElmHeight) this.elm.style.top = showElmHeight + "px"; // 下端

    }

    moveTo(x=parseInt(this.elm.style.left), y=parseInt(this.elm.style.top)){
        this.x = x;
        this.elm.style.left = x + "px";

        this.y = y;
        this.elm.style.top = y + "px";
    }

    moveToTakeTime(toX, toY, takeTime){ //takeTimeはmsで指定
        //実装中
    }
}