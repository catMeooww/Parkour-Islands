class Templeground
{
  constructor(x, y) 
  {
    let options = {
     isStatic:true,
     restitution:0
    };
    
    this.body = Bodies.rectangle(x, y, 3000,200, options);
    World.add(world, this.body);
  }

  show() {
    let pos = this.body.position;
    push();
    imageMode(CENTER);
    rectMode(CENTER);
    noStroke();
    fill(148,127,146);
    image(templeisland,pos.x,pos.y-830, 3000, 2000);
    //rect(pos.x,pos.y+10,2000,200);
    pop();
  }
}
