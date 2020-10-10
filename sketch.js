var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var survivalTime = 0;
var monkey, monkey_running;
var ground, ground_img;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score;

function preload() 
{
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() 
{
  monkey = createSprite(50, 250, 20, 20);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;
  ground = createSprite(150, 390, 780, 7);
  ground.shapeColor = "black";
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() 
{
  ground.velocityX = -6;
  background("#0AF7F1");
  if (gameState === PLAY) 
  {
    if (keyDown("space") && monkey.y > 300) 
    {
      monkey.velocityY = -12;
    }
    bananas();
    obstacles();
    survivalTime = 0;
    stroke("white");
    fill("black");
    textSize(20);
    text("score :" + score, 400, 50);
    stroke("black");
    fill("black");
    textSize(20);
    survivalTime = Math.round(frameCount / frameRate());
    text("survivalTime :" + survivalTime, 100, 50);
    if (ground.x < 0)
    {
      ground.x = ground.width / 2;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    if (monkey.isTouching(FoodGroup)) 
    {
      FoodGroup.destroyEach();
    }
    if (monkey.isTouching(obstacleGroup)) 
    {
      gameState = END;
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      monkey.visible = false;
      ground.visible = false;
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      ground.velocityX = 0;
    }
  }
  if (gameState === END) 
  {
    background("#FF9300");
    stroke("black");
    fill("black");
    textSize(20);
    text("survivalTime :", 30, 50);
    text(survivalTime, 155, 50);
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    fill("black");
    textSize(35);
    text("Oh!Game Over!😒😢", 50, 200);
  }
  drawSprites();
  monkey.collide(ground);
}

function bananas() 
{
  if (frameCount % 100 === 0) 
  {
    banana = createSprite(500, 250, 20, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -2;
    banana.scale = 0.1;
    banana.y = Math.round(random(120, 200));
    FoodGroup.add(banana);
  }
}
function obstacles() 
{
  if (frameCount % 300 === 0)
  {
    obstacle = createSprite(500, 360, 20, 20);
    obstacle.addImage("catcus", obstacleImage);
    obstacle.scale = 0.20;
    obstacle.velocityX = -4;
    obstacle.lifetime = 270;
    obstacleGroup.add(obstacle);
  }
}