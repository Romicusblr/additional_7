module.exports = function solveSudoku(matrix) {
    let maskForCol = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let maskForRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let maskForBox = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    let unSolvedArray = [] // elem = {col, row}

    const bitpattern = (value) => {
        return 1 << (value - 1)
    };

    const IsMoveLegal = (row, col, value) => {

        let boxRowNumber = row / 3 ^ 0;
        let boxColNumber = col / 3 ^ 0;
        let combinedMask = maskForRow[row] | maskForCol[col] | maskForBox[boxRowNumber][boxColNumber];
        return ((combinedMask & bitpattern(value)) == 0);

    }

    const insertValue = (row, col, value) => {
            matrix[row][col] = value;
            updateMask(row, col, value);
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
        unSolvedArray.push({
            col: col,
            row: row
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

    
    const goBack = (cell, i) => {
        matrix[cell.row][cell.col] = 0;
        undoMask(cell.row, cell.col, i);
    }

    const solveSudoku = (cell) => {
        //if we got end of unSolvedArray - sudoku is solved
        if (start === length) {
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
        return false;//trigger for backtracking
    }

    // start to solve sudoku
    let length = unSolvedArray.length;
    let start = 0;
    let cell = unSolvedArray[start];
    return solveSudoku(cell);

}