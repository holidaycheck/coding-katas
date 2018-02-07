function linesCreateATriangle(line1, line2, line3){
  const int12 = line1.intersects(line2);
  const int23 = line2.intersects(line3);
  const int31 = line3.intersects(line1);
  
  return int12 && int23 && int31;
}

class Line{
  constructor(p1, p2){ this.p1 = p1; this.p2= p2; } 
  intersects(line){
    return this.p1.intersects( line.p1 ) ||
           this.p1.intersects( line.p2 ) ||
           this.p2.intersects( line.p1 ) ||
           this.p2.intersects( line.p2 );
  }
}

class Point{
  constructor(x,y){ this.x = x; this.y = y; }
  intersects(p){ 
    return p.x === this.x && p.y === this.y;
  }
}

describe('triangle counting problem', () => {
  const A = new Point(0, 0);
  const B = new Point(100, 0);
  const C = new Point(100, 100);
  const D = new Point(0, 100);
  
  /*
  D ___ C
  |     |
  |     |
  A---- B
  */
  
  it('3 lines create a triangle ⊿', ()=> {
    const line1 = new Line(A, B);
    const line2 = new Line(B, C);
    const line3 = new Line(C, A);
  
    assert.equal( linesCreateATriangle(line1, line2, line3), true )
  });

  it('3 lines dont create a triangle ⊏', ()=> { 
    const line1 = new Line(C, D);
    const line2 = new Line(D, A);
    const line3 = new Line(A, B);
    
    assert.equal( linesCreateATriangle(line1, line2, line3), false )
  });
  
  it('3 lines dont create a triangle N', ()=> { 
    const line1 = new Line(A, D);
    const line2 = new Line(D, B);
    const line3 = new Line(B, C);
    
    assert.equal( linesCreateATriangle(line1, line2, line3), false )
  });
});
