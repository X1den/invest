# Вариант №5 - Алгебра

## Студент: Юминов Артём Сергеевич

## Группа: МиКН

---

# Алгебра  

---

# Матрицы

---

# Определение
Матрица - массивы элементов, представленные в виде прямоугольных таблиц, для которых определены правила математических действий.

---

# Определение
Квадратная матрица - это прямоугольная таблица элементов (чисел, функций), в которой число строк равно числу столбцов ($2 \times 2$, $3 \times 3$, $n \times m$).

Пример:
<div>
$$ A = \begin{pmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{pmatrix} $$
</div>


---

# Определение
Диагональная матрица - это квадратная матрица, у которой все элементы вне главной диагонали равны нулю.

Пример:
<div>
$$
D = \begin{pmatrix}
3 & 0 & 0 \\
0 & 5 & 0 \\
0 & 0 & 1
\end{pmatrix}
$$
</div>

---

# Сложение и умножение матриц

---

# Сложение матриц  

Алгоритм для матриц одинакового размера:

$$
C = A + B,\quad c_{ij} = a_{ij} + b_{ij}
$$

Сложение выполняется поэлементно.

---

# Сложение матриц  
Пример:

<div>
$$
\begin{pmatrix}1 & 3 & 5 \\ 2 & 4 & 6\end{pmatrix}
+
\begin{pmatrix}2 & 1 & 3 \\ 4 & 2 & 1\end{pmatrix}
=
\begin{pmatrix}3 & 4 & 8 \\ 6 & 6 & 7\end{pmatrix}
$$
</div>

---

# Умножение матриц  
Алгоритм, если число столбцов A равно числу строк B:

$$
c_{ij} = \sum_{k=1}^{n} a_{ik}\, b_{kj}
$$

Каждый элемент C — скалярное произведение строки A и столбца B.

---

# Умножение матриц  
Пример:

<div>
$$
\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
\times
\begin{pmatrix} 2 & 0 \\ 1 & 3 \end{pmatrix}
=
\begin{pmatrix} 4 & 6 \\ 10 & 12 \end{pmatrix}
$$
</div>

---

# Сложение матрицы
<div class="calculator">
  <div class="matrix-inputs">
    <div class="matrix-input">
      <h4>Матрица A:</h4>
      <textarea id="matrixA-add" placeholder="Введите матрицу построчно&#10;Например:&#10;1 2 3&#10;4 5 6">1 2
3 4</textarea>
    </div>
    <div class="matrix-input">
      <h4>Матрица B:</h4>
      <textarea id="matrixB-add" placeholder="Введите матрицу построчно&#10;Например:&#10;7 8 9&#10;10 11 12">5 6
7 8</textarea>
    </div>
  </div>
  <button class="calc-button" onclick="calculateSum()">Вычислить сумму</button>
  <h4>Результат:</h4>
  <div id="sum-result" class="result-output">Здесь появится результат сложения</div>
</div>

---

# Исходный код
<pre><code class="javascript">
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
</code></pre>

---

# Умножение матриц 

<div class="calculator">
  <div class="matrix-inputs">
    <div class="matrix-input">
      <h4>Матрица A:</h4>
      <textarea id="matrixA-mult" placeholder="Введите матрицу построчно&#10;Число столбцов A = числу строк B&#10;Например:&#10;1 2 3&#10;4 5 6">1 2
3 4</textarea>
    </div>
    <div class="matrix-input">
      <h4>Матрица B:</h4>
      <textarea id="matrixB-mult" placeholder="Введите матрицу построчно&#10;Например:&#10;7 8&#10;9 10&#10;11 12">2 0
1 3</textarea>
    </div>
  </div>
  <button class="calc-button" onclick="calculateMultiply()">Вычислить произведение</button>
  <h4>Результат:</h4>
  <div id="mult-result" class="result-output">Здесь появится результат умножения</div>
</div>

---

# Исходный код
<pre><code class="javascript">
function multiplyMatrices(matrixA, matrixB) {
    const rowsA = matrixA.length;
    const colsA = matrixA[0].length;
    const rowsB = matrixB.length;
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
</code></pre>

---

# Определитель

---

# Определение

Определитель (детерминант) — скалярная величина, вычисляемая по элементам квадратной матрицы. Он характеризует свойства матрицы, такие как обратимость (det ≠ 0) и объем параллелепипеда, определяемого векторами-строками (или столбцами).

---

# Определитель матрицы
Можно ввести матрицу размерности $2 \times 2$, $3 \times 3$, $4 \times 4$.
<div class="calculator">
  <div class="matrix-input-single">
    <div>
    </div>
    <h4>Матрица:</h4>
    <textarea id="matrix-det" placeholder="Введите квадратную матрицу построчно">1 2
3 4</textarea>
  </div>
  <button class="calc-button" onclick="calculateDeterminant()">Вычислить определитель</button>
  <h4>Результат:</h4>
  <div id="det-result" class="result-output">Здесь появится определитель</div>
</div>

---

# Исходный код определителя 2x2
<pre><code class="javascript">
function determinant2x2(matrix) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
}

---

# Исходный код определителя 3x3
<pre><code class="javascript">
function determinant3x3(matrix) {
    const a = matrix[0][0], b = matrix[0][1], c = matrix[0][2];
    const d = matrix[1][0], e = matrix[1][1], f = matrix[1][2];
    const g = matrix[2][0], h = matrix[2][1], i = matrix[2][2];
    
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}
</code></pre>

---

# Исходный код определителя 4x4
<pre><code class="javascript">
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
</code></pre>

---

# Некоторые виды матриц

---

# Виды матриц
Симметричная матрица - квадратная матрица, которая совпадает со своей транспонированной: 
$$
A = A^{T}, \quad a_{ij} = a_{ji}
$$


---

# Виды матриц
Треугольная матрица - матрица, у которой все элементы выше главной диагонали нулевые, или матрица, у которой все элементы ниже главной диагонали нулевые.
Пример:
<div>
$$
A = \begin{pmatrix} 1 & 2 & 3 \\ 0 & 4 & 5 \\ 0 & 0 & 6 \end{pmatrix},\;
B = \begin{pmatrix} 1 & 0 & 0 \\ 2 & 3 & 0 \\ 4 & 5 & 6 \end{pmatrix}
$$
</div>


---

# Виды матриц 
Трёхдиагональная матрица - матрица, у которой все ненулевые элементы располагаются на трёх диагоналях: главной, первой сверху и первой снизу.
Пример:
<div>
$$
C = \begin{pmatrix} a_1 & b_1 & 0 & 0 \\ c_1 & a_2 & b_2 & 0 \\ 0 & c_2 & a_3 & b_3 \\ 0 & 0 & c_3 & a_4 \end{pmatrix}
$$
</div>

---

# Спасибо за внимание!

---