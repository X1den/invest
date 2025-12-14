/**
 * @param {string} text
 * @returns {Array}
 */
function parseMatrix(text) {
    let matrix = text.trim().split("\n");
    for (let i in matrix) {
        matrix[i] = matrix[i].split(" ").map(Number);
    }
    return matrix;
}

/**
 * @param {Array} matrixA
 * @param {Array} matrixB
 * @returns {Array}
 */
function addMatrices(matrixA, matrixB) {
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    
    const result = new Array(rows);
    for (let i = 0; i < rows; i++) {
        result[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            result[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }
    
    return result;
}

/**
 * @param {Array} matrixA
 * @param {Array} matrixB
 * @returns {Array}
 */
function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const colsB = matrixB[0].length;
    
    const result = new Array(rowsA);
    for (let i = 0; i < rowsA; i++) {
        result[i] = new Array(colsB);
        for (let j = 0; j < colsB; j++) {
            result[i][j] = 0;
            for (let k = 0; k < colsA; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
    
    return result;
}

/**
 * @param {Array} matrix
 * @returns {number}
 */
function determinant2x2(matrix) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

/**
 * @param {Array} matrix
 * @returns {number}
 */
function determinant3x3(matrix) {
    const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
    const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
    const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];
    
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

/**
 * @param {Array} matrix
 * @returns {number}
 */
function determinant4x4(matrix) {
    function getMinor(m, row, col) {
        const minor = [];
        for (let i = 0; i < 4; i++) {
            if (i === row) continue;
            const minorRow = [];
            for (let j = 0; j < 4; j++) {
                if (j === col) continue;
                minorRow.push(m[i][j]);
            }
            minor.push(minorRow);
        }
        return minor;
    }
    
    let det = 0;
    for (let j = 0; j < 4; j++) {
        const minor = getMinor(matrix, 0, j);
        const sign = (j % 2 === 0) ? 1 : -1;
        det += sign * matrix[0][j] * determinant3x3(minor);
    }
    
    return det;
}

/**
 * @param {Array} matrix
 * @returns {number}
 */
function determinant(matrix) {
    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return determinant2x2(matrix);
    if (n === 3) return determinant3x3(matrix);
    if (n === 4) return determinant4x4(matrix);
    
    let det = 0;
    for (let j = 0; j < n; j++) {
        const minor = [];
        for (let i = 1; i < n; i++) {
            const row = [];
            for (let k = 0; k < n; k++) {
                if (k !== j) {
                    row.push(matrix[i][k]);
                }
            }
            minor.push(row);
        }
        
        const sign = (j % 2 === 0) ? 1 : -1;
        det += sign * matrix[0][j] * determinant(minor);
    }
    
    return det;
}

window.MatrixOperations = {
    parseMatrix,
    addMatrices,
    multiplyMatrices,
    determinant2x2,
    determinant3x3,
    determinant4x4,
    determinant,
};