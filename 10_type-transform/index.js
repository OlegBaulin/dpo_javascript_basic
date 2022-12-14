// массив студентов
const listData = [{
  name: 'Эдуард',
  surename: 'Александрович',
  lastname: 'Смирнов',
  dateBirth: new Date(1992, 11, 12),
  dateEducation: 2021,
  faculty: 'Экономический',
},
{
  name: 'Анна',
  surename: 'Валерьевна',
  lastname: 'Синицина',
  dateBirth: new Date(1993, 1, 17),
  dateEducation: 2020,
  faculty: 'Авиационный',
},
{
  name: 'Валерия',
  surename: 'Анатольевна',
  lastname: 'Артюхова',
  dateBirth: new Date(1994, 0, 23),
  dateEducation: 2019,
  faculty: 'Психологический',
},
{
  name: 'Олег',
  surename: 'Иванович',
  lastname: 'Антонов',
  dateBirth: new Date(1990, 10, 12),
  dateEducation: 2018,
  faculty: 'Биологический',
},
]


// получаем контейнер
const $app = document.getElementById('app');

// создание DOM элемента
function createDOMElement(tagName, classList = '') {
  const $newElement = document.createElement(tagName);
  if(classList) {
    $newElement.classList.add(...classList);
  }

  return $newElement;
}

// создаём и возвращаем форму добавления студентов
function createForm() {
  const $form = createDOMElement('form', ['mb-3']);
  $form.action = '#';
  $form.id = 'add-form';

  const $formTitle = createDOMElement('h2');
  $formTitle.textContent = 'Добавить пользователя';

  let $inputName = createDOMElement('input', ['form-control', 'mb-3']);
  $inputName.placeholder = 'Имя';

  let $inputSurname = createDOMElement('input', ['form-control', 'mb-3']);
  $inputSurname.placeholder = 'Отчество';

  let $inputLastname = createDOMElement('input', ['form-control', 'mb-3']);
  $inputLastname.placeholder = 'Фамилия';

  let $inputDateBirth = createDOMElement('input', ['form-control', 'mb-3']);
  $inputDateBirth.placeholder = 'Дата рождения';
  $inputDateBirth.type = 'date';

  let $inputDateEducation = createDOMElement('input', ['form-control', 'mb-3']);
  $inputDateEducation.placeholder = 'Год начала обучения';
  $inputDateEducation.type = 'number';

  let $inputFaculty = createDOMElement('input', ['form-control', 'mb-3']);
  $inputFaculty.placeholder = 'Факультет';

  let $btnForm = createDOMElement('button', ['btn', 'btn-primary']);
  $btnForm.textContent = 'Добавить студента';

  $form.append($formTitle);
  $form.append($inputName);
  $form.append($inputSurname);
  $form.append($inputLastname);
  $form.append($inputDateBirth);
  $form.append($inputDateEducation);
  $form.append($inputFaculty);
  $form.append($btnForm);

  return {
    $form,
    $inputName,
    $inputSurname,
    $inputLastname,
    $inputDateBirth,
    $inputDateEducation,
    $inputFaculty,
  }
}

// создаём и возвращаем форму фильтрации
function createFormFilter() {
  const $formFilter = createDOMElement('form', ['mb-3']);
  $formFilter.action = '#';
  $formFilter.id = 'filter-form';

  const $formFilterTitle = createDOMElement('h2');
  $formFilterTitle.textContent = 'Фильтрация';

  const $inputFilterFIO = createDOMElement('input', ['form-control', 'mb-3']);
  $inputFilterFIO.placeholder = 'ФИО';

  const $inputFilterFaculty = createDOMElement('input', ['form-control', 'mb-3']);
  $inputFilterFaculty.placeholder = 'Факультет';

  const $inputFilterDateEducationFirst = createDOMElement('input', ['form-control', 'mb-3']);
  $inputFilterDateEducationFirst.placeholder = 'Год начала обучения';
  $inputFilterDateEducationFirst.type = 'number';

  const $inputFilterDateEducationLast = createDOMElement('input', ['form-control', 'mb-3']);
  $inputFilterDateEducationLast.placeholder = 'Год окончания обучения';
  $inputFilterDateEducationLast.type = 'number';

  $formFilter.append($formFilterTitle);
  $formFilter.append($inputFilterFIO);
  $formFilter.append($inputFilterDateEducationFirst);
  $formFilter.append($inputFilterDateEducationLast);
  $formFilter.append($inputFilterFaculty);

  return {
    $formFilter,
    $inputFilterFIO,
    $inputFilterDateEducationFirst,
    $inputFilterDateEducationLast,
    $inputFilterFaculty,
  }
}

//форматирование даты рождения
function formateDate(date) {
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  if(date.getMonth() >= today.getMonth() && date.getDate() >= today.getDate()) {
    age += 1;
  }
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateBirth = `${day > 10 ? day : '0' + day}.${month > 10 ? month : '0' + month}.${year} (${age}лет)`;
  return dateBirth;
}

// форматирование даты обучения
function formateDateEducation(year) {
  const currentDate = new Date();
  const firstYear = year;
  const lastYear  = year + 4;

  let currentCours = (currentDate.getFullYear() - firstYear + 1) + 'курс';

  if(new Date(lastYear, 8) < new Date()) {
    currentCours = 'закончен';
  }

  const dateEducation = `${firstYear}-${lastYear} (${currentCours})`;

  return dateEducation;
}

//создаём и возвращаем таблицу
function createTable() {
  const $table = createDOMElement('table',['table', 'table-dark', 'table-striped']);
  const $tableHead = createDOMElement('thead');
  const $tableBody = createDOMElement('tbody');
  const $tableHeadTr = createDOMElement('tr');
  const $tableHeadThFIO = createDOMElement('th');
  const $tableHeadThDateBirth = createDOMElement('th');
  const $tableHeadThDateEducation = createDOMElement('th');
  const $tableHeadThFaculty = createDOMElement('th');

  $tableHeadThFIO.textContent = 'ФИО';
  $tableHeadThDateBirth.textContent = 'Дата рождения';
  $tableHeadThDateEducation.textContent = 'Год начала обучения';
  $tableHeadThFaculty.textContent = 'Факультет';

  $tableHeadTr.append($tableHeadThFIO);
  $tableHeadTr.append($tableHeadThDateBirth);
  $tableHeadTr.append($tableHeadThDateEducation);
  $tableHeadTr.append($tableHeadThFaculty);
  $tableHead.append($tableHeadTr);

  $table.append($tableHead);
  $table.append($tableBody);

  return {
    $table,
    $tableBody,
    $tableHeadThFIO,
    $tableHeadThDateBirth,
    $tableHeadThDateEducation,
    $tableHeadThFaculty,
  }
}

// создаём и возвращаем элемент таблицы с новым студентом
function createUserTr(user) {
  const $userTr = createDOMElement('tr');
  const $userFIO = createDOMElement('th');
  const $userDateBirth = createDOMElement('th');
  const $userDateEducation = createDOMElement('th');
  const $userFaculty = createDOMElement('th');

  $userFIO.textContent = `${user.name} ${user.surename} ${user.lastname}`;
  $userDateBirth.textContent = formateDate(user.dateBirth);
  $userDateEducation.textContent = formateDateEducation(user.dateEducation);
  $userFaculty.textContent = user.faculty;

  $userTr.append($userFIO);
  $userTr.append($userDateBirth);
  $userTr.append($userDateEducation);
  $userTr.append($userFaculty);

  return $userTr;
}


// создаём форму добавления
const form = createForm();
const $form = form.$form;

// создаём форму
const formFilter = createFormFilter();
const $formFilter = formFilter.$formFilter;

// создаём таблицу
const table = createTable(listData);
const $table = table.$table;

// рендер
render(listData);

//добавляем элементы на страницу
$app.append($form);
$app.append($formFilter)
$app.append($table);

// отриcовка элементов таблицы
function render(arrData) {
  table.$tableBody.innerHTML = '';

  let copyArrData = [...arrData];

  // сортировка
  // обработчики событий таблицы
  table.$tableHeadThFIO.addEventListener('click', () => {

    copyArrData = copyArrData.sort((a, b) => {
      if(`${a.name} ${a.surename} ${a.lastname}` < `${b.name} ${b.surename} ${b.lastname}`) return -1;
    })

    render(copyArrData);
  })

  table.$tableHeadThDateBirth.addEventListener('click', () => {
    copyArrData = copyArrData.sort((a, b) => {
      if(a.dateBirth > b.dateBirth) return -1;
    })

    render(copyArrData);
  })

  table.$tableHeadThDateEducation.addEventListener('click', () => {
    copyArrData = copyArrData.sort((a, b) => {
      if(a.dateEducation < b.dateEducation) return -1;
    })

    render(copyArrData);
  })

  table.$tableHeadThFaculty.addEventListener('click', () => {
    copyArrData = copyArrData.sort((a, b) => {
      if(a.faculty < b.faculty) return -1;
    })

    render(copyArrData);
  })

  // фильтрация
  if(formFilter.$inputFilterFIO.value.trim() !== '') {
    copyArrData = copyArrData.filter((user) => {
      const FIO = `${user.name} ${user.surename} ${user.lastname}`
      if(FIO.includes(formFilter.$inputFilterFIO.value.trim())) return true;
    })
  }

  if(formFilter.$inputFilterDateEducationFirst.value !== '') {
    copyArrData = copyArrData.filter((user) => {
      if(user.dateEducation == formFilter.$inputFilterDateEducationFirst.value) return true;
    })
  }

  if(formFilter.$inputFilterDateEducationLast.value !== '') {
    copyArrData = copyArrData.filter((user) => {
      if(user.dateEducation == formFilter.$inputFilterDateEducationLast.value - 4) return true;
    })
  }

  if(formFilter.$inputFilterFaculty.value.trim() !== '') {
    copyArrData = copyArrData.filter((user) => {
      if(user.faculty.includes(formFilter.$inputFilterFaculty.value.trim())) return true;
    })
  }

  // отрисовка
  for (const user of copyArrData) {
    const $userTr = createUserTr(user);

    table.$tableBody.append($userTr);
  }

}

// добавление студента
$form.addEventListener('submit', e => {
  e.preventDefault();

  if(form.$inputName.value.trim() == '') {
    console.log(form.$inputDateBirth.valueAsDate);
    console.log(new Date());
    alert('Имя не введено');
    return;
  }

  if(form.$inputSurname.value.trim() == '') {
    alert('Отчество не введено');
    return;
  }

  if(form.$inputLastname.value.trim() == '') {
    alert('Фамилия не введена');
    return;
  }

  if(!form.$inputDateBirth.value) {
    alert('Дата рождения не введена');
    return;
  }

  if(form.$inputDateBirth.valueAsDate > new Date() || form.$inputDateBirth.valueAsDate < new Date(1900, 0, 1)) {
    alert('Введите корректную дату рождения');
    return;
  }

  if(!form.$inputDateEducation.value) {
    alert('Год начала обучения не введён');
    return;
  }

  if(form.$inputDateEducation.value < 2000 || form.$inputDateEducation.value > new Date().getFullYear()) {
    alert('Год начала обучения должен находиться в диапозоне от 2000 до текущего года');
    return;
  }

  if(form.$inputFaculty.value.trim() == '') {
    alert('Факультет не введён');
    return;
  }

  listData.push({
    name: form.$inputName.value.trim(),
    surename: form.$inputSurname.value.trim(),
    lastname: form.$inputLastname.value.trim(),
    dateBirth: new Date(form.$inputDateBirth.valueAsDate),
    dateEducation: parseInt(form.$inputDateEducation.value),
    faculty: form.$inputFaculty.value,
  })

  $form.reset();

  render(listData);

})

// Фильтр
$formFilter.addEventListener('submit', (e) => {
  e.preventDefault();
})

formFilter.$inputFilterFIO.addEventListener('input', () => {
  render(listData);
})

formFilter.$inputFilterDateEducationFirst.addEventListener('input', () => {
  render(listData);
})

formFilter.$inputFilterDateEducationLast.addEventListener('input', () => {
  render(listData);
})

formFilter.$inputFilterFaculty.addEventListener('input', () => {
  render(listData);
})
