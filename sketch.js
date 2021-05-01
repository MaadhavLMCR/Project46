var safe, safeImg, player, playerImg, enemyImg;
var count=0;
var enemyGrp;
var enemy;
var flag=1;
var life=3;
var safex,safey;
var lifeA,lifeB,lifeC;

function preload(){
  safeImg = loadImage("Images/Safe.png");
  playerImg = loadImage("Images/playerstanding.png");
  enemyImg = loadImage("Images/enemy1.png");
  playerRight = loadAnimation("Images/player1.png","Images/player2.png",
  "Images/player3.png","Images/player4.png","Images/player5.png",
  "Images/player6.png","Images/player7.png","Images/player8.png");
  playerLeft = loadAnimation("Images/player1_1.png","Images/player2_1.png",
  "Images/player3_1.png","Images/player4_1.png","Images/player5_1.png",
  "Images/player6_1.png","Images/player7_1.png","Images/player8_1.png");
  playerAttack = loadAnimation("Images/playerattack2.png");
  
}

function setup() {
  createCanvas(displayWidth-200,displayHeight-200);
  safe = createSprite(displayWidth/2-120, displayHeight/2-100, 30, 60);
  safe.addImage("safe", safeImg);
  //safe.debug=true;
  safe.scale = 0.1;
  player = createSprite(displayWidth/3,displayHeight/4,50,50);
  //player.addImage("player", playerImg);
  player.addAnimation("playerRight", playerRight);
  player.addAnimation("playerLeft", playerLeft);
  player.addAnimation("playerAttack", playerAttack);
  enemyGrp = new Group();
  bulletGrp = new Group();
  safe.setCollider("rectangle",0,0,700,800);
  safex=safe.x;
  safey=safe.y;
  lifeA = createSprite(455,30,20,20);
  lifeB = createSprite(515,30,20,20);
  lifeC = createSprite(575,30,20,20);
}

function draw() {
  background("red");
  console.log(player.x);
 getmouse=mouseX;
  if(getmouse>350){
    //right
    player.addAnimation("playerRight", playerRight);
  }
  else{
    //left
    player.addAnimation("playerLeft", playerLeft);
  }

  player.x = mouseX;
  player.y = mouseY;
  // if(keyDown("UP_ARROW")){
  //   player.y = player.y-4;
  // }
  // if(keyDown("DOWN_ARROW")){
  //   player.y = player.y+4;
  // }
  // if(keyDown("LEFT_ARROW")){
  //   player.x = player.x-4;
  // }
  // if(keyDown("RIGHT_ARROW")){
  //   player.x = player.x+4;
  // }
  //text(mouseX+ " "+mouseY,mouseX,mouseY);
 /*fill("lightblue");
 
  rect(350,75,360,350);*/
  enemyA();
  for(var i=0;i<enemyGrp.length;i++)
  {
  // if (mousePressedOver(enemyGrp))
  // {

  //    console.log("Length is " +enemyGrp.length);
  //    console.log("index is "+i);
      if(mousePressedOver(enemyGrp[i]))
      {
        player.changeAnimation("playerAttack", playerAttack);
        enemyGrp[i].destroy();
      }
      else
      {
        player.changeAnimation("playerRight", playerRight);
        
      }
    }
    
  drawSprites();
   textSize(20)
   fill("black"); 
    text("Safe HP: ",300,35);
   //text(mouseX+","+mouseY,mouseX,mouseY);

}
function enemyA(){
  
  if (frameCount%120===0 ){
     enemy = createSprite(displayWidth/4,displayHeight/4, 50, 50);
    enemy.setCollider("rectangle",0,0,200,200);
    //enemy.debug = true;
    enemy.addImage("enemy", enemyImg);
    count++;
    var rand=Math.round(random(1,2));
  
    enemy.y=Math.round(random(100,425));
    if(enemy.y>safey)
    {
      flagy=1;
    } 
    else if(enemy.y<safey)
    {
      flagy=2;
    }
    else
    {
      flagy=3;
    }

      //enemy.x = Math.round(random(150,330));
      // var bullet=createSprite(enemy.x,enemy.y,10,10);
      // bullet.velocityX=2;
     
      //flag=1;
      
      //bulletA();
    //}
  
    
    if(rand===1)
    {
      enemy.x = Math.round(random(150,330));
      // var bullet=createSprite(enemy.x,enemy.y,10,10);
      // bullet.velocityX=2;
     
      flag=1;
      
      bulletA();
    }
    else
    {
      enemy.x = Math.round(random(720,900));
 //     var bullet=createSprite(enemy.x,enemy.y,10,10);
 //     bullet.velocityX=-2;
     
      flag=2;
      bulletA();
    }
    enemy.scale = 0.3;
    enemyGrp.add(enemy);
  }
}
function bulletA()
{
    var bullet=createSprite(enemy.x,enemy.y,10,10);
    bullet.shapeColor="black";
    bulletGrp.add(bullet);
    if(flag===1)
    {
      bullet.velocityX=5;
      
    }
    else
    {
      bullet.velocityX=-5;
    }
    if(flagy===1)
    {
      bullet.velocityY=-2;
      
    }
    else  if(flagy===2)
    {
      bullet.velocityY=2;
    }
    else
    {
      bullet.velocityY=0;
    }

    //console.log(bulletGrp.length);
    if(bulletGrp.isTouching(safe))
    {
       for(var i=0;i<bulletGrp.length;i++)
      {
          if(bulletGrp[i].isTouching(safe))
          {

          // if(flag===1)
          // {
          //  if() 
          // }
     //     console.log("in destroy");
          bulletGrp[i].destroy();
          life--;
        }
      }
    }
    safe.depth=bullet.depth+1;
    }