export class InputHandler {
  // dinoを引数として渡し、操作可能にする
  constructor(dino) {
    document.addEventListener("keydown",event => {
      switch(event.keyCode){
        case 38:
          dino.up();
          // console.log("up");
          break;
      }
    });
  }
}