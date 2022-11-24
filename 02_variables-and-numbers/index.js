// Задача 1
// Запишите в переменные x и y координаты двух произвольных точек: x1, y1 — первая точка; x2, y2 — вторая точка.
// Вычислите площадь прямоугольника, противоположные углы которого представлены указанными точками.
// Выведите результат с помощью console.log.

let x1 = -5;
let y1 = 8;

let x2 = 10;
let y2 = 5;

let cathetus1 = Math.abs(x1 - x2);
let cathetus2 = Math.abs(y1 - y2);

let square = cathetus1 * cathetus2;

console.log('Задача 1');
console.log('Площадь прямоугольника:', square);

// Задача 2
// Вычислите дробные части чисел a и b с точностью n.
// Выведите получившиеся числа с помощью console.log.
// Выведите результаты их сравнения (>, <, ≥, ≤, ===, ≠) с помощью console.log.

let a = 13.890123;
let b = 2.891564;
let n = 2;

let num1 = Math.floor(a % 1 * Math.pow(10, n));
let num2 = Math.floor(b % 1 * Math.pow(10, n));

console.log('Задача 2');
console.log('Дробные части чисел a и b с точностью n:', num1, num2);
console.log('Первое число больше:', num1 > num2);
console.log('Первое число меньше:', num1 < num2);
console.log('Первое число больше или равно:', num1 >= num2);
console.log('Первое число меньше или равно:', num1 <= num2);
console.log('Числа равны:', num1 === num2);
console.log('Числа не равны:', num1 !== num2);

// Задача 3
// Напишите генератор двух случайных чисел в диапазоне между n и m включительно. Учтите, что n и m могут быть отрицательными, а также может быть n > m или n < m.
// Выведите два произвольных числа в консоль с помощью console.log.
// Сравните два полученных числа. Выведите результаты их сравнения >, <, ≥, ≤, ===, ≠ с помощью console.log.

let q = 100;
let w = -5;
let range = Math.abs(Math.max(q, w) - (Math.min(q, w)));
let min = Math.min(q, w);

let randomNumber1 = (Math.round(Math.random() * (range))) + min;
let finalRandomResult1 = randomNumber1 + (randomNumber1 % 2);

let randomNumber2 = (Math.round(Math.random() * (range))) + min;
let finalRandomResult2 = randomNumber2 + (randomNumber2 % 2);

console.log('Задача 3');
console.log('Случайные числа', finalRandomResult1, finalRandomResult2);
console.log('Первое число больше:', finalRandomResult1 > finalRandomResult2);
console.log('Первое число меньше:', finalRandomResult1 < finalRandomResult2);
console.log('Первое число больше или равно:', finalRandomResult1 >= finalRandomResult2);
console.log('Первое число меньше или равно:', finalRandomResult1 <= finalRandomResult2);
console.log('Числа равны:', finalRandomResult1 === finalRandomResult2);
console.log('Числа не равны:', finalRandomResult1 !== finalRandomResult2);
