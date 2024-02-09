const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var inGround = true;
var jumpDelay = 1300;
var ended = false;
var checkpoint;
var time = 0;
var respawndelay = 0;

var control = {
    left: 'LEFT_ARROW',
    right: 'RIGHT_ARROW',
    up: 'UP_ARROW'
}

var background, grassImg, playerImg;
var width, height;
var plat1, plat2, plat3, plat4, plat5, activator1, checkpoint1;
var player;

var AABubble1 = false;
var AABubble2 = false;
var AABubble3 = false;
var AABubble4 = false;
var AABubble5 = false;
var AABubble6 = false;

function preload() {
    background = loadImage("background.png");
    grassImg = loadImage("island.png");
    playerImg = loadImage("player.png");
    waterBottom = loadImage("water1.png");
    stonebricks = loadImage("brickground.jpg");
    templeisland = loadImage("floattemple.png");
    splash = loadSound("watersplash.mp3");
    jumpsound = loadSound("jumping.mp3");
    magmaburn = loadSound("burn.mp3");
}

function setup() {
    width = windowWidth - 20;
    height = windowHeight - 20;
    console.log(windowWidth + " | " + windowHeight);
    canvas = createCanvas(width, height);
    engine = Engine.create();
    world = engine.world;

    //things
    slime = new Player(playerImg, 300, 400, 30, 30);
    plat1 = new Ground(250, 480, 600, 100);
    plat2 = new Ground(780, 340, 300, 60);
    plat3 = new Ground(450, 200, 250, 60);
    plat4 = new Ground(230, 60, 250, 60);
    plat5 = new Ground(670, -150, 250, 60);
    activator1 = new Activator(230, 25);
    checkpoint1 = new Activator(660, -180);
    plat6 = new Ground(930, -430, 250, 60);
    stair1 = new Stair(790, -350, 8);
    plat7 = new Ground(600, -700, 250, 60);
    stair2 = new Stair(730, -620, 8);
    plat8 = new Ground(300, -840, 250, 60);
    plat9 = new Ground(700, -960, 250, 60);
    checkpoint2 = new Activator(690, -990);
    floattemple = new Templeground(2500,-900);
    magma = new Magma(2550,-995,2000,10);
    plat10 = new Ground(1650, -1100, 60, 60);
    plat11 = new Ground(1850, -1200, 60, 60);
    plat12 = new ABubble(1990, -1200, 60);
    plat13 = new ABubble(2300, -1300, 60);
    plat14 = new ABubble(2600, -1420, 60);
    plat15 = new KBubble(2770, -1550, 60);
    plat16 = new ABubble(2500, -1700, 60);
    plat17 = new Ground(2300, -1750, 60, 60);
    plat18 = new Ground(2000, -1800, 60, 60);
    plat19 = new Ground(1700, -1900, 60, 60);
    plat20 = new Ground(2800, -1800, 60, 60);
    plat21 = new Ground(3000, -1900, 60, 60);
    plat22 = new ABubble(3200, -2000, 60);
    plat23 = new Ground(3500, -2100, 60, 60);
    stair3 = new Stair(3550, -2200, 10);
    plat24 = new Ground(3700, -2300, 300, 60);
    checkpoint3 = new Activator(3710, -2330);

    //last save
    checkpointing();
}

function checkpointing() {
    checkpoint = localStorage.getItem("checkpoint");
    if (checkpoint) {
        if (checkpoint == 1) {
            Matter.Body.setPosition(slime.body, { x: 660, y: -200 });
        }else if(checkpoint == 2){
            Matter.Body.setPosition(slime.body, { x: 690, y: -1100 });
        }else if(checkpoint == 3){
            Matter.Body.setPosition(slime.body, { x: 3710, y: -2430 });
        }
    } else {
        Matter.Body.setPosition(slime.body, { x: 300, y: 400 });
    }
}

function checkpointActive(n){
    localStorage.setItem("checkpoint", n);
    document.getElementById("PlayTime").style.color = "greenyellow";
    setTimeout(() =>{
        document.getElementById("PlayTime").style.color = "white";
    },1000);
}

function draw() {
    image(background, camera.x - width / 2, camera.y - height / 2, width, height);
    image(waterBottom, camera.x - width / 2, 520, width, 250);
    frameRate(80);
    Engine.update(engine);

    //show things
    floattemple.show();
    slime.show();
    textSize(50);
    fill("green");
    text("Parkour Islands", 100, 350);
    textSize(12);
    fill("orange");
    text("You are lost in the middle of the sea, but you found some strange floating islands", 60, 370);
    text("Now you have to get in the top of the island complex to return to your village by a 'wind path'", 35, 380);
    plat1.show(grassImg);
    plat2.show(grassImg);
    plat3.show(grassImg);
    plat4.show(grassImg);
    fill("white");
    text("Double Jump", 210, 20);
    activator1.show("lightgray");
    plat5.show(grassImg);
    text("Checkpoint", 645, -185);
    checkpoint1.show("lime");
    plat6.show(grassImg);
    stair1.show();
    plat7.show(grassImg);
    stair2.show();
    plat8.show(grassImg);
    plat9.show(grassImg);
    text("Checkpoint", 675, -995);
    checkpoint2.show("lime");
    magma.show();
    plat10.show(stonebricks);
    plat11.show(stonebricks);
    plat12.show(AABubble1);
    plat13.show(AABubble2);
    plat14.show(AABubble3);
    plat15.show(AABubble4);
    plat16.show(AABubble5);
    plat17.show(stonebricks);
    plat18.show(stonebricks);
    plat19.show(stonebricks);
    plat20.show(stonebricks);
    plat21.show(stonebricks);
    plat22.show(AABubble6);
    plat23.show(stonebricks);
    stair3.show();
    plat24.show(stonebricks);
    text("Checkpoint", 3700, -2350);
    checkpoint3.show("lime");

    //camera
    camera.x = slime.body.position.x;
    camera.y = slime.body.position.y;

    //controls
    if (keyDown(control.right)) {
        Matter.Body.translate(slime.body, { x: 5, y: 0 });
    }
    if (keyDown(control.left)) {
        Matter.Body.translate(slime.body, { x: -5, y: 0 });
    }
    if (keyDown(control.up)) {
        jumping();
    }

    //die
    if (slime.body.position.y > 520) {
        die("water");
    }

    if (respawndelay > 0) {
        respawndelay = respawndelay - 1;
        diecolor = color(0,0,0);
        diecolor.setAlpha(respawndelay * 3);
        fill(diecolor);
        rect(camera.x - width / 2, camera.y - height / 2, width, height);
    }

    //collisions
    var doubleJump = Matter.SAT.collides(
        slime.body,
        activator1.body
    );
    if (doubleJump.collided) {
        jumpDelay = 600;
        setTimeout(() => {
            jumpDelay = 1300;
        }, 1600);
    }

    var savepoint1 = Matter.SAT.collides(
        slime.body,
        checkpoint1.body
    );
    if (savepoint1.collided) {
        checkpointActive(1);
    }
    var savepoint2 = Matter.SAT.collides(
        slime.body,
        checkpoint2.body
    );
    if (savepoint2.collided) {
        checkpointActive(2);
    }
    var savepoint3 = Matter.SAT.collides(
        slime.body,
        checkpoint3.body
    );
    if (savepoint3.collided) {
        checkpointActive(3);
    }

    var climbstair1 = Matter.SAT.collides(
        slime.body,
        stair1.body
    );
    var climbstair2 = Matter.SAT.collides(
        slime.body,
        stair2.body
    );
    var climbstair3 = Matter.SAT.collides(
        slime.body,
        stair3.body
    );
    if (climbstair1.collided || climbstair2.collided || climbstair3.collided) {
        Matter.Body.setVelocity(slime.body, { x: 0, y: -1 });
    }

    var burned = Matter.SAT.collides(
        slime.body,
        magma.body
    );
    if (burned.collided) {
        die("magma");
    }

    var touchbubble1 = Matter.SAT.collides(
        slime.body,
        plat12.body
    );
    if (touchbubble1.collided) {
        AABubble1 = true;
        Matter.Body.setVelocity(slime.body, { x: 0, y: -15 });
    }
    var touchbubble2 = Matter.SAT.collides(
        slime.body,
        plat13.body
    );
    if (touchbubble2.collided) {
        AABubble2 = true;
        Matter.Body.setVelocity(slime.body, { x: 0, y: -15 });
    }
    var touchbubble3 = Matter.SAT.collides(
        slime.body,
        plat14.body
    );
    if (touchbubble3.collided) {
        AABubble3 = true;
        Matter.Body.setVelocity(slime.body, { x: 0, y: -15 });
    }
    var touchbubble4 = Matter.SAT.collides(
        slime.body,
        plat15.body
    );
    if (touchbubble4.collided) {
        AABubble4 = true;
        setTimeout(()=>{
            die("magma");
        },300)
    }
    var touchbubble5 = Matter.SAT.collides(
        slime.body,
        plat16.body
    );
    if (touchbubble5.collided) {
        AABubble5 = true;
        Matter.Body.setVelocity(slime.body, { x: 0, y: -15 });
    }
    var touchbubble6 = Matter.SAT.collides(
        slime.body,
        plat22.body
    );
    if (touchbubble6.collided) {
        AABubble6 = true;
        Matter.Body.setVelocity(slime.body, { x: 0, y: -15 });
    }
    //counting 
    document.getElementById("PlayTime").innerHTML = "Checkpoint: "+ localStorage.getItem("checkpoint") + "<br>Time Played: " + count();
}
function jumping() {
    console.log("jump")
    if (inGround) {
        inGround = false;
        Matter.Body.setVelocity(slime.body, { x: 0, y: -10 });
        jumpsound.play();
        setTimeout(() => {
            inGround = true;
        }, jumpDelay)
    }
}

function die(type) {
    checkpointing();
    if (type == "water") {
        splash.play();
        console.log("Died by Water");
    } else if(type == "magma"){
        magmaburn.play();
        console.log("Died by Magma");
    }
    respawndelay = 100;

    //reseting things
    AABubble1 = false;
    AABubble2 = false;
    AABubble3 = false;
    AABubble4 = false;
    AABubble5 = false;
    AABubble6 = false;
}

function restart() {
    localStorage.removeItem("checkpoint");
    location.reload();
}

function count() {
    time = time + 1;
    seconds = time / 100;
    return (seconds);
}