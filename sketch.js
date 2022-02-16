var bg,bgImg;
var boy,boyAnimation,invisGround;
var axeAnimation,axeGroup
var monster,monsterAnimation1,monsterAnimation2, monsterGroup,score = 0
var sound

function preload() {
bgImg = loadImage("assets/bg.jpg")
boyAnimation = loadAnimation("assets/m1.png","assets/m2.png","assets/m3.png","assets/m4.png","assets/m5.png","assets/m6.png")
axeAnimation = loadAnimation("axe/tile000.png","axe/tile001.png","axe/tile002.png","axe/tile003.png","axe/tile004.png","axe/tile005.png","axe/tile006.png","axe/tile007.png")

monsterAnimation1 = loadAnimation("assets/monsterimg/b1.png",'assets/monsterimg/b2.png',"assets/monsterimg/b3.png",'assets/monsterimg/b4.png')
monsterAnimation2 = loadAnimation("assets/monsterimg/r1.png",'assets/monsterimg/r2.png',"assets/monsterimg/r3.png",'assets/monsterimg/r4.png')

sound = loadSound("assets/die.mp3")

}


function setup() {

  canvas = createCanvas(1200, 600);
  bg=createSprite(600,300)
  bg.addImage(bgImg)
  bg.scale=1.5
  bg.velocityX=-5

  boy = createSprite(70,330)
  boy.addAnimation("running",boyAnimation)

  invisGround = createSprite(70,380,100,10)
  invisGround.visible= false



  axeGroup = new Group()

  monsterGroup = new Group()

}

function draw() {
  background(189);



  if(bg.x<0){

    bg.x= 600
  }
  
  boy.velocityY = boy.velocityY+ 0.5
  boy.collide(invisGround)
  console.log(boy.y)

   if (keyDown(UP_ARROW)&& boy.y >300){
     boy.velocityY = -10
          console.log("upArrow")
   }

   if (keyDown("space")){
     if(frameCount%100===0){
     var axe = createSprite(boy.x,boy.y,10,10)
     axe.scale=0.3
     axe.velocityX= 4
     axe.lifetime = width/4;
     axe.addAnimation("throw",axeAnimation)
     axeGroup.add(axe)
   } 
   }

  
if(axeGroup.isTouching(monsterGroup)){

  for(var i = 0; i< monsterGroup.length; i++){
    if(monsterGroup[i].isTouching(axeGroup)){
      monsterGroup[i].destroy()
      console.log("monster destroyed")
      score = score+1
      sound.play()
    }
  
}
}




//console.log(bg.x)
spawnMonsters();
drawSprites();

textSize(20)
fill("black")
text("Score:" + score,300,150)
}


function spawnMonsters(){

  if(frameCount%100===0){

     monster = createSprite(width,random(100,height-200))

     var randomNum = Math.round(random (1,2))

     if(randomNum === 1){

      monster.addAnimation("flying",monsterAnimation1)
     }

     if( randomNum === 2){

      monster.addAnimation("flying",monsterAnimation2)
     }
     monster.velocityX = -5
     monsterGroup.add(monster)
     monster.scale=1.5
     monster.lifetime = width/5
  }
}

