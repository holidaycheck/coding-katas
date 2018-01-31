// for the sake of getting the col easier as a row
const transpose = (m) => {
  return m[0].reduce((acc, _, colIndex) => 
    [...acc, m.map(row => row[colIndex])],
  []);
}

const calculateCell = (row1, row2) => {
  return row1.reduce((result, value1, index) =>
    result + value1*row2[index]
  , 0);
}

const multiply = (m1, m2) => {
  const m2T = transpose(m2);
  
  return Promise.all(
      m1.map(row1 => m2T.map(row2 => calculateCell(row1, row2)))
  );
}

it('transpose nxn matrix', function() {
    const m1 = [
      [1,2,3],
      [4,5,6]
    ];
    const transposedM1 = [
      [1,4],
      [2,5],
      [3,6]
   ];
  
  assert.deepEqual(transpose(m1), transposedM1);

});

it('multiply 1x2 matrix with 2x2', ()=> {
  const m1 = [
    [1, 2]
  ];
  
  const m2 = [
    [3, 4],
    [5, 6]
  ];
  
  const expected = [
    [13, 16]
  ]
  
  return multiply(m1, m2)
    .then(resultMatrix => assert.deepEqual(resultMatrix, expected));
});

it('multiply 3x2 matrix with 2x2', ()=> {
  const m1 = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
  
  const m2 = [
    [7, 8],
    [9, 10]
  ];
  
  const expected = [
    [25, 28],
    [57, 64],
    [89, 100]
  ]
  
  return multiply(m1, m2)
    .then(resultMatrix => assert.deepEqual(resultMatrix, expected));
});

it('multiply 2x3 matrix with 3x2', ()=> {
  const m1 = [
    [1, 2, 3],
    [4, 5, 6]
  ];
  
  const m2 = [
    [7, 8],
    [9, 10],
    [11, 12]
  ];
  
  const expected = [
    [58, 64],
    [139, 154]
  ];
  
  return multiply(m1, m2)
    .then(resultMatrix => assert.deepEqual(resultMatrix, expected));
});

it('multiply 3x4 matrix with 4x2', ()=> {
  const m1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]  
  ];
  
  const m2 = [
    [13, 14],
    [15, 16],
    [17, 18],
    [19, 20]
  ];
  
  const expected = [
    [170, 180],
    [426, 452],
    [682, 724]
  ];
  
  return multiply(m1, m2)
    .then(resultMatrix => assert.deepEqual(resultMatrix, expected));
});

it('multiply 3x4 matrix with 4x3', ()=> {
  const m1 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]  
  ];
  
  const m2 = [
    [13, 14, 15],
    [16, 17, 18],
    [19, 20, 21],
    [22, 23, 24]
  ];
  
  const expected = [
    [190, 200, 210],
    [470, 496, 522],
    [750, 792, 834]
  ];
  
  return multiply(m1, m2)
    .then(resultMatrix => assert.deepEqual(resultMatrix, expected));
});
