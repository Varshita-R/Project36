var dog,sadDog,happyDog;
var feed,addFood;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

var database

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  foodObj = new Food();
  foodStock = database.ref("foodStock");
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("feed the dog");
  feed.position(700,100);
  feed.mousePressed(feedDog);

  addFood = createButton("add more food");
  addFood.position(800,100);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodStock = data.val();
  foodObj.updateFoodStock(foodStock);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock() <= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
 database.ref("/").update({
   foodStock: foodObj.getFoodStock()
 })
}

//function to add food in stock
function addFoods(){
  foodStock++;
  database.ref("/").update({
    foodStock: foodStock
  })
}