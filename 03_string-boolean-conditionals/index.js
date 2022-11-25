// Задача 1
// В переменную password запишите строку с любым произвольным паролем.
// Проверьте надёжность пароля с помощью условного оператора if.
// Пароль является надёжным, когда в нём есть хотя бы четыре символа, один из которых — это дефис или нижнее подчёркивание.
// Выведите в консоль сообщения «Пароль надёжный» или «Пароль недостаточно надёжный».

console.log('Задача 1');

let password = '_zxd';

if (password.length >= 4 && (password.includes('_') || password.includes('-'))) {
console.log('Пароль надёжный');
} else {
  console.log('Пароль недостаточно надёжный');
}

// Задача 2
// В переменных userName, userSurname даны имя и фамилия пользователя.
// При этом в строках беспорядок с большими и маленькими буквами, и нужно оформить строки единообразно.
// Для этого первые буквы имени и фамилии приведите к верхнему регистру (большие буквы), а оставшиеся — к нижнему (маленькие буквы).
// Запишите результат в новые переменные и выведите их значения с помощью console.log.
// С помощью тернарных операторов и console.log выведите сообщение «Имя было преобразовано» или
// «Имя осталось без изменений» для имени и фамилии в зависимости от того, были ли исходные строки равны преобразованным.

console.log('Задача 2');

let userName = 'иВаН';
let userSurname = 'иВаНоВ';

let formattedUsersName = `${userName.substring(0, 1).toLocaleUpperCase()}` + `${userName.substring(1).toLocaleLowerCase()}`;
let formattedUsersSurname = `${userSurname.substring(0, 1).toLocaleUpperCase()}` + `${userSurname.substring(1).toLocaleLowerCase()}`;

console.log(formattedUsersName, formattedUsersSurname);

userName === formattedUsersName ? console.log('Имя осталось без изменений') : console.log('Имя было преобразовано');

// Задача 3
// В переменной number записано число.
// Необходимо с помощью console.log вывести сообщение, указывающее на чётность или нечётность числа.

console.log('Задача 3');

let num = 7;

if (num % 2) {
  console.log('Число нечётное');
} else {
  console.log('Число чётное');
}
