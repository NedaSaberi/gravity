let can = document.querySelector("canvas");
can.width = window.innerWidth;
can.height = window.innerHeight;
let c = can.getContext("2d");

class Ball{
    constructor(){
        this.r =  randomFromInterval(10, 30);
        this.x =  randomFromInterval(this.r, window.innerWidth - this.r);
        this.y =  randomFromInterval(this.r, window.innerHeight - this.r);
        this.color = getRandomColor();
        this.vx =  randomFromInterval(-2, 2);
        this.vy=  randomFromInterval(-2, 2);
        this.gravity= 1;
        this.friction = 0.8;
    }
    draw(){
        c.beginPath();
        if (this.vx == 0) {
          this.vx = randomFromInterval(1, 5);
        }
        if (this.vy == 0) {
          this.vy = randomFromInterval(1, 5);
        }
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
    }
    
    update(){
        if (this.y + this.vy + this.r >= window.innerHeight) {
          this.vy = -this.vy * this.friction;
          this.vx = -this.vx * this.friction;
        }else{
            this.vy += this.gravity;
        }
        if(this.x - this.r <= 0 || this.x + this.r >= window.innerWidth){
            this.vx = -this.vx * this.friction;
        }
        this.y += this.vy;
        this.x += this.vx;
        this.draw();

    }
}

let balls= [];
for(let i=0; i< 70; i++){
    balls.push(new Ball())
}
function animate(){
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    balls.forEach(ball => {
        ball.update()
    });
    requestAnimationFrame(animate);
}

animate()


function randomFromInterval(min, max){
    return Math.floor(Math.random()* (max- min +1) + min);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
