module.exports = function solveSudoku(matrix) {
    let maskForCol = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let maskForRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let maskForBox = [
        [0, 0, 0, ],
        [0, 0, 0, ],
        [0, 0, 0, ]
    ];

    // create bitmasks

    const bitpattern = (value) => {
        return 1 << (value - 1)
    };

    const IsMoveLegal = (row, col, value) => {
        let combinedMask = maskForNumbersSetInRow[row] | maskForNumbersSetInCol[col] | maskForNumbersSetInBox[boxRowNumber, boxColNumber];

        return (matrix[row, col] == 0) && ((combinedMask & bitpattern(value)) == 0);

    }

    const insertValue = () => {
        if (IsMoveLegal(row, col, value)) {
            matrix[row, col] = value;
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

    matrix.forEach((elem, row) => {
        return elem.forEach((elem, col) => {
            if (elem) {
                updateMask(row, col, elem);
            }
        })

    });
    debugger;
}