
var monkey , monkey_running,stop;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,ground;
var score,survivaltime=0;
var gameState=1,play=1,end=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  stop.loadImage = loadImage("sprite_0.png");
}



function setup() {
  createCanvas(500,500);
  monkey = createSprite(80,440,20,20);
  monkey.addAnimation("run",monkey_running);
  monkey.scale=0.1;
  ground = createSprite(250,476,500,10);
  ground.velocityX=-6;
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("1");
drawSprites();
  if (ground.x<245){
    ground.x = ground.width/2;
  }
 
  monkey.velocityY=monkey.velocityY + 0.8;
monkey.collide(ground);
  
 
  if (gameState===play){
     if (keyDown("space")&&monkey.y>400){
    monkey.velocityY=-17;
  }
     stroke("white")
  textSize(20)
  fill("white")
  text("score"+score,500,50);
  
   stroke("black")
  textSize(20)
  fill("black")
  survivaltime=Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME ="+survivaltime,100,50);
  food();
  spawnobstacles()
   if (obstacleGroup.isTouching(monkey)) {
     gameState=end;
   }
  }
 else if (gameState===end){
   ground.velocityX=0;
   FoodGroup.destroyEach();
   obstacle.velocityX=0;
   monkey.velocityY=0;
   monkey.changeImage(stop);
   obstacleGroup.visible=true;
   survivaltime.visible=true;
   survivaltime=0;
   text("PRESS R TO PLAY AGAIN",250,250);
 } 
  if (keyDown("r")){
    reset();
  }
}
 
function food(){
  if (frameCount%80===0){
    banana = createSprite(500,120,10,10);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,200));
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=100;
    FoodGroup.add(banana);
  }
  }

function spawnobstacles(){
  if (frameCount%300==0){
  obstacle = createSprite(450,440,10,10)
  obstacle.addImage(obstaceImage);
  obstacle.scale=0.2;
  obstacle.velocityX=-6;
  obstacle.lifetime=150;
  obstacle.depth=ground.depth
  obstacle.depth=obstacle.depth+1
  monkey.depth=monkey.depth+2;
  obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState=play;
  obstacleGroup.destroyEach();
  
  monkey.changeAnimation("running", monkey_running);
  score=0;
  survivaltime=0;
}





