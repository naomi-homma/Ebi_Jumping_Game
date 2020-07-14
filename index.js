import { Dino } from "./dino.js";
import { InputHandler } from "./input.js";
import { Bomb } from "./bomb.js";

function getRandomInt(min, max) {
  return Math.floor(min+Math.random()*(max-min+1));
}

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

let backImg = document.getElementById("img_back");
let gamestate = false;

let score = 0;

// ゲームループ関数の作成
// 情報をアップデートする関数・描画する関数
// Dinoというオブジェクト？インスタンス？を作り(引数)を渡す
let dino = new Dino(GAME_WIDTH, GAME_HEIGHT);
// InputHandlerを実行し、キーボード操作と画面を連動
new InputHandler(dino);
let bomb = [];

let lastTime = 0;
let counter = 0;
let interval = 0;

ctx.drawImage(backImg, 0, 0, GAME_WIDTH, GAME_HEIGHT)
dino.draw(ctx);

ctx.font = "30px sans-serif";
ctx.fillStyle = "white";
ctx.fillText("クリックしてスタート", 40, 40);
ctx.fillText("ジャンプして障害物を避けよう！", 40, 80);
ctx.fillText("ジャンプは↑上矢印キーだよ！", 40, 120);

function gameLoop(timestamp){

  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  // 背景画像描写
  ctx.drawImage(backImg, 0, 0, GAME_WIDTH, GAME_HEIGHT)

  // Dinoクラスのdrawメソッドを使いたい場合↓の記述
  dino.update(deltaTime);
  dino.draw(ctx);

  counter += deltaTime;
  if(counter > interval) {
    bomb.push(new Bomb(GAME_WIDTH, GAME_HEIGHT));
    counter = 0;
    // 1～2秒間隔
    interval = getRandomInt(1000, 1800);
  }

  // bomb配列に対して要素の追加削除を行う
  // 永遠に追加されるので、画面外に出たら配列より削除
  for(var i = bomb.length-1; i >= 0; i--) {
    console.log(i);
    bomb[i].update(deltaTime);
    bomb[i].draw(ctx);
    //接触判定
    if(bomb[i].checkHit(dino.position.x + dino.r, dino.position.y + dino.r, dino.r, bomb[i].position.x + bomb[i].r, bomb[i].position.y + bomb[i].r, bomb[i].r)){
      //接触したら効果音再生
      var playbomb = bomb[i].audio.play();
      if(playbomb !== undefined) {
        playbomb.then(_ => {
        })
        .catch(error => {
          console.log(error);
        });
      }
      gamestate = false;
    }
    ctx.font = "40px sans-serif";
    ctx.fillText("Score："+score, 40, 40);
    if(!gamestate){
      // falseのままだとclickできてしまう
      gamestate = true;
      ctx.font = "40px sans-serif";
      ctx.fillText("更新ボタンでもう一度チャレンジ♪", 40, 90);
      return;
      }
    }
    requestAnimationFrame(gameLoop);
  }

window.addEventListener('click', () => {
  if (gamestate === true) {
    return;
  }
  gamestate = true;
  requestAnimationFrame(gameLoop);
});



