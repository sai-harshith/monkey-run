var backImage,backgr;
var player, player_running;
var ground,ground_img;
var FoodGroup, obstacleGroup
var score
var survivalTime
var gameOverImg
var banana,bananaImg,obstacle,obstacleImg 

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  FoodGroup = new Group();
  obstacleGroup = new Group();

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");

  gameOverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200);
  gameOver.addImage(gameOverImg);

  score = 0
  survivalTime = 0
  gameOver.scale = 0.5;
  
}

function draw() { 
  background(0);

  

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  gameOver.visible = false

  if(keyDown("space")){
    player.velocityY=-10
  }


    player.velocityY = player.velocityY + 0.8;
    player.collide(ground);

    if(World.frameCount%200===0){
      fruits()
   }

   if(World.frameCount%300===0){
    stones()
 }

 if(obstacleGroup.isTouching(player)) {
  gameState = END

}

 if(FoodGroup.isTouching(player)) {
  FoodGroup.destroyEach();
  score = score + 2;
  player.scale += + 0.05
  
  
  
}

 
  
  } else if(gameState === END) {

 backgr.velocityX = 0
 player.visible = false


 FoodGroup.destroyEach();
 obstacleGroup.destroyEach();

 gameOver.visible = true
 
  }

  
  drawSprites();
  fill("white") 
  text("Score: "+ score, 700,50);
 
 

  
}



  
function fruits(){
  banana=createSprite(650,Math.round(random(170,100)),10,10)
  banana.addImage(bananaImage)
  banana.scale=0.05
  banana.velocityX=-3
  FoodGroup.add(banana)
}


function stones(){
  obstacle=createSprite(670,350,10,10)
  obstacle.addImage(obstacleImage)
  obstacle.velocityX=-4
  obstacle.scale=0.2
  obstacleGroup.add(obstacle);
}
