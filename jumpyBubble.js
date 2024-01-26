class ABubble
{
  constructor(x, y, r) 
  {
    let options = {
     isStatic:true,
     restitution:0
    };
    
    this.body = Bodies.rectangle(x, y, r, r, options);
    this.r = r;
    World.add(world, this.body);
  }

  show(activated) {
    let pos = this.body.position;
    push();
    ellipseMode(CENTER);
    strokeWeight(3);
    stroke("cadetblue");
    fill("aquamarine");
    ellipse(pos.x,pos.y+10, this.r, this.r);
    fill("cadetblue")
    strokeWeight(1);
    if(!activated){
      text("UwU",pos.x+(this.r/2 - 43),pos.y+(this.r/2 - Math.random()-10));
    }else{
      text("0_0",pos.x+(this.r/2 - 40),pos.y+(this.r/2 - Math.random()-10));
    }
    pop();
  }
}
