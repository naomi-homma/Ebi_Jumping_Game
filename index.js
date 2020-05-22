import { Dino } from "./dino.js";
import { InputHandler } from "./input.js";
import { Bomb } from "./bomb.js";

function getRandomInt(min, max) {
  return Math.floor(min+Math.random()*(max-min+1));
}

let gamestate = true;
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
let backImg = document.getElementById("img_back");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 500;

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

  for(var i = bomb.length-1; i >= 0; i--) {
    bomb[i].update(deltaTime);
    bomb[i].draw(ctx);
    if(bomb[i].checkHit(dino.position.x + dino.r, dino.position.y + dino.r, dino.r, bomb[i].position.x + bomb[i].r, bomb[i].position.y + bomb[i].r, bomb[i].r)){
      var playbomb = bomb[i].audio.play();
      if(playbomb !== undefined) {
        playbomb.then(_ => {

        })
        .catch(error => {
          console.log(error);
        });
      }
      console.log("HIT");
      gamestate = false;
    }
    if(bomb[i].offScreen()){
      bomb.splice(i, 1);
    }

    if(!gamestate){
      return;
    }
  }
  

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

