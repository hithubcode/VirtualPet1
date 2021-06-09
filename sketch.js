//Create variables here
var dog, sadDog, happyDog;
var foodObj;
var foodS, foodStock;
var feed, addFood; 

function preload(){
	//load images here
  sadDog=loadImage("images/dog.png");
  happyDog=loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  foodObj = new Food();
  

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  dog=createSprite(300,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;


  feed= createButton("Feed the dog");
  feed.position(500,95)
  feed.mousePressed(feedDog);

  addFood= createButton("Add food");
  addFood.position(600,95)
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);
  foodObj.display();
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref("/").update({
  Food: foodObj.getFoodStock(),
  Feedtime: hour()
})
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}




