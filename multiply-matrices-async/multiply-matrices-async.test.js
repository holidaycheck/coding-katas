const appendToArray = (arr, el) => [...arr, el];

const makeBigMatrix = (n, m, value = 1) => new Array(n).fill(1).map(x => new Array(m).fill(value));

// Business Logic for Matrix Goodness

// for the sake of getting the col easier as a row
const transpose = (m) => {
    const takeColumn = (arr, colIndex) => arr.map(row => row[colIndex]);
    return m[0].reduce((acc, _, colIndex) => 
        appendToArray(acc, takeColumn(m, colIndex)), []);
}


const calculateCell = (row, col) => {
    return row.reduce((result, value1, index) =>
        result + value1*col[index]
        , 0);
}

const calculateCellAsync = (row, col) =>
    // simulate late response from calculating service
    new Promise((res) => setTimeout(res, 1, calculateCell(row, col)));

const multiply = (m1, m2) => {
    const m2T = transpose(m2);

    
    return Promise.all(
        m1.map(m1row =>
            Promise.all(m2T.map(m2col => calculateCellAsync(m1row, m2col))))
    );
}

describe('The Matrix Multiplication Module', function() {
    
    // Couldn't find an appropriate jest replacement for this, but we'll see the result in ms anyway in the test results
    //this.slow(1);

    it('transpose nxn matrix', function() {
        const m1 = [
            [1,2,3],
            [4,5,6]
        ];
        const expected = [
            [1,4],
            [2,5],
            [3,6]
        ];

        const actual = transpose(m1);
        expect(actual).toEqual(expected);
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
            .then(resultMatrix => expect(resultMatrix).toEqual(expected));
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
            .then(resultMatrix => expect(resultMatrix).toEqual(expected));
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
            .then(resultMatrix => expect(resultMatrix).toEqual(expected));
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
            .then(resultMatrix => expect(resultMatrix).toEqual(expected));
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
            .then(resultMatrix => expect(resultMatrix).toEqual(expected));
    });

});
