module.exports = function solveSudoku(matrix) {
    let maskForCol = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let maskForRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let maskForBox = [
        [0, 0, 0, ],
        [0, 0, 0, ],
        [0, 0, 0, ]
    ];

    const bitpattern = (value) => {
        return 1 << (value - 1)
    };

    const IsMoveLegal = (row, col, value) => {

        let boxRowNumber = row / 3 ^ 0;
        let boxColNumber = col / 3 ^ 0;
        let combinedMask = maskForRow[row] | maskForCol[col] | maskForBox[boxRowNumber, boxColNumber];
        // matrix[row, col] == 0) && 
        return ((combinedMask & bitpattern(value)) == 0);

    }

    const insertValue = (row, col, value, matrix) => {
        if (IsMoveLegal(row, col, value)) {
            matrix[row][col] = value;
            updateMask(row, col, value)
        }
    };

    const updateMask = (row, col, value) => {
        let bitpatternValue = bitpattern(value);

        maskForRow[row] |= bitpatternValue;

        maskForCol[col] |= bitpatternValue;

        let boxRowNumber = row / 3 ^ 0;
        let boxColNumber = col / 3 ^ 0;

        maskForBox[boxRowNumber][boxColNumber] |= bitpatternValue;
    }

    const solve = (matrix) => {
        matrix.forEach((elem, row, array) => {
            return elem.forEach((elem, col) => {
                if (!elem || Array.isArray(elem)) {
                    let suggestArray = array[row][col] = [];
                    for (let i = 1; i <= 8; i++) {
                        if (IsMoveLegal(row, col, i)) {
                            suggestArray.push(i);
                        };
                    }
                }
            })
    
        });

        matrix.forEach((elem, row, array) => {
            return elem.forEach((elem, col) => {
                if (Array.isArray(elem)) {
                    if (elem.length === 1) {//single detected
                        insertValue(row, col, elem[0], array);
                        counter++;
                    }
                }
            })
        });

    }
    // create bitmasks
    matrix.forEach((elem, row, array) => {
        return elem.forEach((elem, col) => {
            if (elem) {
                updateMask(row, col, elem);
            }
        })
    });

    // after creating masks create start array of suggests for each 0 cell


    debugger;
    let counter;
    let cycleCounter = 0;
    do {
        cycleCounter++;
        counter = 0;
        solve(matrix);
    } while (counter);
    console.log(cycleCounter, matrix);
    return matrix;
}