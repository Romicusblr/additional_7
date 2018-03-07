module.exports = function solveSudoku(matrix) {
    let maskForCol = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let maskForRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let maskForBox = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    let unSolvedArray = [] // elem = {col, row, suggestArray}

    const bitpattern = (value) => {
        return 1 << (value - 1)
    };

    const getValue = (bitmask) => { //get value from bitmask with only one 0 and return false if 0 is not alone
        for (let i = 1; i <= 9; i++) {
            let res = bitmask & bitpattern(i);
            if (res === 0) {
                return i;
            }
        }
        return false;
    }

    const IsMoveLegal = (row, col, value) => {

        let boxRowNumber = row / 3 ^ 0;
        let boxColNumber = col / 3 ^ 0;
        let combinedMask = maskForRow[row] | maskForCol[col] | maskForBox[boxRowNumber][boxColNumber];
        return ((combinedMask & bitpattern(value)) == 0);

    }

    const insertValue = (row, col, value) => {
        if (IsMoveLegal(row, col, value)) {
            matrix[row][col] = value;
            updateMask(row, col, value);
            return true;
        } else {
            return false;
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

    const undoMask = (row, col, value) => {
        let bitpatternValue = bitpattern(value);

        maskForRow[row] ^= bitpatternValue;

        maskForCol[col] ^= bitpatternValue;

        let boxRowNumber = row / 3 ^ 0;
        let boxColNumber = col / 3 ^ 0;

        maskForBox[boxRowNumber][boxColNumber] ^= bitpatternValue;
    }

    const createUnSolvedArray = (col, row) => {
        let suggestArray = [];
        for (let i = 1; i <= 9; i++) {
            if (IsMoveLegal(row, col, i)) {
                suggestArray.push(i);
            };
        };
        unSolvedArray.push({
            col: col,
            row: row,
            suggestArray: suggestArray
        })
    }
    // create bitmasks
    matrix.forEach((elem, row, array) => {
        return elem.forEach((elem, col) => {
            if (elem) {
                updateMask(row, col, elem);
            }
        })
    });

    //createUnsolvedArray
    matrix.forEach((elem, row, array) => {
        return elem.forEach((elem, col) => {
            if (!elem) {
                createUnSolvedArray(col, row);
            }
        })
    });



    const solveSingle = (elem) => {
        if (elem.suggestArray.length === 1) { //single detected
            insertValue(elem.row, elem.col, elem.suggestArray[0]);
            return true; // mark if solved succesfully
        }
    }


    const returnAnswer = () => {
        console.log(matrix, unSolvedArray)
        return matrix;
    }

    // let prompt = 0;
    let bool;
    do {
        bool = false;
        unSolvedArray.forEach((elem, index, array) => {
            if (solveSingle(elem)) {
                array[index] = null;
                bool = true;
            };
        });
        //delete solved elements from array
        let unsolvedArray2 = unSolvedArray.filter((elem) => {
            return elem;
        });
        unSolvedArray = unsolvedArray2;
        // prompt++;
        if (!unSolvedArray.length) return returnAnswer();
    } while (bool);
    // return returnAnswer();


    const goBack = (cell, i) => {
        matrix[cell.row][cell.col] = 0;
        undoMask(cell.row, cell.col, i);
    }

    const solveSudoku = (cell) => {
        if (start === length) {
            debugger;
            console.log(matrix);
            return matrix;
        };
        // get first legal number and make copy of mask and recursion
        for (let i = 1; i <= 9; i++) {
            if (IsMoveLegal(cell.row, cell.col, i)) {
                insertValue(cell.row, cell.col, i)
                if (solveSudoku(unSolvedArray[++start])) {
                    return matrix;
                } else {
                    goBack(unSolvedArray[--start], i);
                }
            };

        };
        return false;
    }


    let length = unSolvedArray.length;
    let start = 0;
    let cell = unSolvedArray[start];
    return solveSudoku(cell);




    // const solve = (matrix) => {
    //     matrix.forEach((elem, row, array) => {
    //         return elem.forEach((elem, col) => {
    //             if (!elem || Array.isArray(elem)) {
    //                 let suggestArray = array[row][col] = [];
    //                 for (let i = 1; i <= 8; i++) {
    //                     if (IsMoveLegal(row, col, i)) {
    //                         suggestArray.push(i);
    //                     };
    //                 }
    //             }
    //         })

    //     });
    // }



    // after creating masks create start array of suggests for each 0 cell

    console.log(matrix);
    // let counter;
    // let cycleCounter = 0;
    // do {
    //     cycleCounter++;
    //     counter = 0;
    //     solve(matrix);
    // } while (counter);
    // console.log(cycleCounter, matrix);
    // return matrix;
}