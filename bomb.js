export class Bomb {
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.position = {
      x: this.gameWidth,
      y: this.gameHeight - 140
    };
    this.r = 60;
    this.width = this.r * 2;
    this.height = this.r * 2;
    this.image = document.getElementById("img_bomb");
    this.speed = 8;
    this.audio = new Audio("./punch.mp3");

  }
  // 画面外の障害物をはいてるから削除するためのメソッド
  // booleanで返す
  offScreen(){
    if(this.position.x <= -this.width){
      return true;
    } else {
      return false;
    }
  }
  // 接触判定メソッド⇒四隅判定へ変更
  checkHit(x1, y1, r1, x2, y2, r2) {
    var a = x2 - x1;
    var b = y2 - y1;
    var r = r1 + r2;
    return r*r >= a*a + b*b;
  }
  // 右から左への移動
  update(deltaTime) {
    this.position.x -= this.speed;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x+this.r,this.position.y+this.r,this.r,0,2*Math.PI);
    // ctx.stroke();
    ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
  }
}