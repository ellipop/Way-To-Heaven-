var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

var Bg,bgImg;

var BGMusic, jumpSound;

var playerImgR, playerImgL, playerstap, Player;

var platform, platformGroup;

var plat2, plat2Group;

var gameOver, restart, gameOverImg, restartImg;

var cloudImg, cloud, cloudGroup;


function preload(){
  playerImgR = loadImage("PlayerR.png");
  playerImgL = loadImage("PlayerL.png");
  playerstap = loadImage("playerStop.png");

  bgImg = loadImage("BG.png");

  gameOverImg = loadImage("GameOver.png");
  restartImg = loadImage("RestartImage.png");

  platformImg = loadImage("platform.png")

  cloudImg = loadImage("Cloud2.png");

  jumpSound = loadSound("jumpSound.mp3");
  BGMusic = loadSound("Music.mp3");
}



function setup(){
  createCanvas(600, 600);
  

  Player = createSprite(300,300, 50,50);
  Player.addImage(playerImgR);
  Player.scale = 0.5;
  
  Restart = createSprite(300,170, 100,100);
  Restart.addImage(restartImg);
  Restart.visible = false;
  gameOver = createSprite(300,300, 100,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  platformGroup = new Group();
  cloudGroup = new Group();

  plat2Group = new Group();
  //Player.debug = true;
  
  Player.setCollider("rectangle", 0,0,250,100);
  

}



function draw(){
  background("PaleTurquoise");
  
  text("Height: "+ score, 395,20);
  

  if (gameState===PLAY){
    if (frameCount > 0 && frameCount > 10){
      score = score +1;
    }
  

    if (keyDown("space")){
      Player.velocityY = -3;
    }
    if (keyDown("a")){
      Player.x = Player.x -3;
      Player.addImage(playerImgR);
    }
    if (keyDown("d")){
      Player.x = Player.x +3;
      Player.addImage(playerImgL);
    }
    
    
    Player.velocityY = Player.velocityY + 0.4;
    
    
    if (Player.isTouching(platformGroup)){
      Player.collide(platformGroup);
      Player.addImage(playerstap);
    }
 
    
  spawnPlatform();  
}

if (Player.isTouching(plat2Group)){
  gameState = END;
  gameEnd();
}
if (mousePressedOver(Restart)){
  gameState = PLAY;
  score = 0;
  spawnPlatform();
  gamePlay();
}



drawSprites();
//BGMusic.play();

//console.log(frameCount);
}





function spawnPlatform(){
if (frameCount % 60 === 0){
  platform = createSprite(200,10,350,60);
  platform.setCollider("rectangle", -10,-50,280,60);
  platform.debug = false;
  platform.scale = 0.50;
  platform.addImage(platformImg);
  platform.x = Math.round(random(0,550));
  platform.velocityY = 3;

  plat2 = createSprite(220,10,355,70);
  plat2.addImage(cloudImg);
  plat2.setCollider("rectangle", 0, 20,240,60);
  plat2.debug = false;
  plat2.scale = 0.40;
  plat2.x = platform.x -5;
  plat2.y = platform.y +10;
  plat2.velocityY = platform.velocityY;

    
  platform.depth = Player.depth +1;

  platform.lifetime = 220;
  platformGroup.add(platform);


  plat2.lifetime = 220;
  plat2Group.add(plat2);
}
}



function gameEnd(){
  gameOver.visible = true;
  Restart.visible = true;

  plat2.velocityY = 0;
  plat2.velocityX = 0;
  platform.velocityY = 0;
  platform.velocityX = 0;
  plat2Group.velocityY = 0;
  plat2Group.velocityX = 0;
  platformGroup.velocityY = 0;
  platformGroup.velocityX = 0;
  Player.velocityY = 0;
  Player.velocityX = 0;

  platform.lifetime = -1;
  plat2.lifetime = -1;
  platformGroup.lifetime = -1;
  plat2Group.lifetime = -1;

  
  plat2.visible = false;
  platform.visible = false;

  plat2Group.visible = false;
  platformGroup.visible = false;

  Player.visible = false;
}



function gamePlay(){
  gameOver.visible = false;
  Restart.visible = false;
  
  Player.visible = true;
  Player.x = 300;
  Player.y = 300;


}

