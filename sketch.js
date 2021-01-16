//Create variables here
var dog, happyDog, database, foodS, foodStock; 
var feed, addFood, feedDog, addFoods;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  Dog = loadImage("../images/doglmg.png");
  Dog1 = loadImage("../images/doglm1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = addImage(Dog);
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);

  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(Dog1);
  }*/

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });

  drawSprites();
  //add styles here
}

fill(225,225,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed:" + lastFed%12 + " PM", 350,30);
}
else if(lastFed==0){
  text("Last Feed: 12 AM", 350,30);
}
else{
  text("Last Feed:", +lastFed+ " AM", 350,30)
}

display();{
  var x=80,y=100;
  imageMode(CENTER);
  image(this.image,720,220,70,70);

  if(this.foodStock!=0){
    for(var i=0;i<this.foodStock;i++){
      if(i%10==0){
        x=80;
        y=y+50;
      }
      image(this.image,x,y,50,50);
      x=x+30;
    }
  }
}

Text("foodStock:", 200, 200);

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if (x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock()
      FeedTime:hour()
    })
}