(function () {
  let listArr = [];
  let userName = 'list';

  // создаём и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.textContent = title;
    return appTitle;
  }

  // создаём и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    // добавляем атрибут кнопке
    button.disabled = true;

    // добавляем обрабтчкик на поле для вввода
    input.addEventListener('input', function() {
      if(input.value) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    })

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    }
  }

  // создаём и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  // создаём и возвращаем элемент списка
  function createTodoItem(obj) {
    let item = document.createElement('li');
    // кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // устанавливаем стили для элемента списка, а также для размещения кнопок
    // в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = obj.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    if (obj.done) {
      item.classList.add('list-group-item-success');
    }

    // добавляем обработчики на кнопки
    doneButton.addEventListener('click', function() {
      obj.done = !obj.done;
      saveList(listArr, userName);
      item.classList.toggle('list-group-item-success');
    });

    deleteButton.addEventListener('click', function() {
      if (confirm('Вы уверены?')) {
        for(let i = 0; i < listArr.length; i++) {
          if(listArr[i].id === obj.id) {
            listArr.splice(i, 1);
            break;
          }
        }

        saveList(listArr, userName);

        item.remove();
      }
    });
    
    // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // приложению нужен доступ к самому элемету и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function getNewId(arr) {
    let max = 0;
    for(let i = 0; i < arr.length; i++) {
      if(arr[i].id > max) {
        max = arr[i].id;
      }
    }

    return ++max;
  }

  function createTodoApp(container, title = 'Список дел', user, defList) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    userName = user;

    let localData = localStorage.getItem(userName);

    if(localData !== '' && localData !== null) {
      listArr = JSON.parse(localData);
    }

    for (const objItem of listArr) {
      let todoItem = createTodoItem(objItem);
      todoList.append(todoItem.item);
    }

    // браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function(e) {
      // эта строчка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случае мы не хотим, чтобы страница перезагружалась после отправки формы
      e.preventDefault();

      // игнорируем создание элемента, если пользователь ничего не ввёл в поле ввода
      if (!todoItemForm.input.value) {
        return;
      }

      // создаём новый объект элемента списка дел
      let newItem = {
        id: getNewId(listArr),
        name: todoItemForm.input.value,
        done: false,
      };

      listArr.push(newItem);

      let todoItem = createTodoItem(newItem);

      // добавляем в список новое дело с названием из поля для вввода
      todoList.append(todoItem.item);

      saveList(listArr, userName);

      // обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = '';

      // добавляем атрибут кнопке
      todoItemForm.button.disabled = true;
    })
  }

  // сохраняем массив дел в localStorage
  function saveList(arr, listName) {
    localStorage.setItem(listName, JSON.stringify(arr));
  }

  window.createTodoApp = createTodoApp;
})();