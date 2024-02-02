class KBubble
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
    stroke("maroon");
    fill("red");
    ellipse(pos.x,pos.y+10, this.r, this.r);
    fill("maroon")
    strokeWeight(1);
    textSize(20);
    if(!activated){
      text(" - _ -",pos.x+(this.r/2 - 53),pos.y+(this.r/2 - Math.random()-10));
    }else{
      text("0 ^ 0",pos.x+(this.r/2 - 50),pos.y+(this.r/2 - Math.random()-10));
    }
    pop();
  }
}
