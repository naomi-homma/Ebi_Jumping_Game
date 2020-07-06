
export class Dino {
  constructor(gameWidth, gameHeight){
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.offset = 20;
    // 恐竜の大きさ
    // 半径rを60pxとする
    this.r = 60;
    this.width = this.r * 2;
    this.height = this.r * 2;
    this.image = document.getElementById('img_dino');
    // 恐竜の位置情報
    this.position = {
      x:60,
      y:this.gameHeight-this.offset-this.height
    }
    this.speed = 0;
    this.gravity = 0.5;
    this.lift = -12;
    this.jumpFlag = true;
    this.audio = new Audio("./jumping.mp3");
    
  }

  // ジャンプ操作(y座標をマイナスし上方向へ移動)
  up(){
    // ジャンプフラグがtrueならジャンプ(空中でのジャンプを禁止)
    if(this.jampFlag){
      this.speed = this.lift;
      this.jampFlag = false;
      this.audio.play();
    }
  }

  // ジャンプ後の挙動
  update(deltaTime){
    // 重力の記述(y座標をプラスし下方向へ移動)
    this.position.y += this.speed;
    this.speed += this.gravity;

    // y座標が初期位置より大きい時、y座標を初期位置に戻す
    if(this.position.y >= this.gameHeight-this.offset-this.height){
      this.position.y = this.gameHeight-this.offset-this.height;
      this.speed = 0;
      this.jampFlag = true;
    }

  }
  // 描写を実行する関数
  draw(ctx){
    // 画像、x座標、y座標、幅、高さ
    ctx.beginPath();
    ctx.arc(this.position.x+this.r,this.position.y+this.r,this.r,0,2*Math.PI);
    ctx.stroke();
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

  }
}