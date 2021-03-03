const form = document.querySelector('#form');
const output = document.querySelector('#output');

let todoId = 10;
let todos = []

// fetching 10 todos from the API
fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then((response) => response.json())
    .then((data) => listTodos(data))
// ------------------------------------------------------------------------

// listing the todos in the DOM
const listTodos = (data) => {

  todos = data;
  let todoIndex = 0;

  output.innerHTML = ''

  todos.forEach(todo => {
    output.innerHTML += `
    <div id='${todo.id}'class="card p-3 my-3">
        <p>${todo.title}</p>
      <div class="d-flex justify-content-between">
        <button id="doneTodo" class="btn btn-success">Done</button>
        <button id="removeTodo" class="btn btn-danger d-none">X</button>
      </div>
    </div>
    `
    if(todo.completed){

      output.children[todoIndex].classList.add('done-todo-card')
      output.children[todoIndex].classList.add('done-todo')

      output.children[todoIndex].childNodes[3].childNodes[1].innerHTML = 'Undo'
      output.children[todoIndex].childNodes[3].childNodes[1].classList.remove('btn-success')
      output.children[todoIndex].childNodes[3].childNodes[1].classList.add('btn-warning')
      output.children[todoIndex].childNodes[3].childNodes[3].classList.remove('d-none')
    }
    todoIndex += 1;
  });
}
// -------------------------------------------------------------------------

// remove button
  output.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-danger')) {
      let id = e.target.parentNode.parentNode.id;
      let newTodos = todos.filter((todo) => {return todo.id != id})
      listTodos(newTodos);
    }
  })
//---------------------------------------------------------------------------

// done button and undo button
  output.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-success')){
      let id = e.target.parentNode.parentNode.id;
      let todoIndex = todos.findIndex(todo => todo.id == id)
      todos[todoIndex].completed = true;
      listTodos(todos);
    }
    else if(e.target.classList.contains('btn-warning')){
      let id = e.target.parentNode.parentNode.id;
      let todoIndex = todos.findIndex(todo => todo.id == id)
      todos[todoIndex].completed = false;
      listTodos(todos);
    }
  })
// -----------------------------------------------------------------------------------

//  add new todo
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(validateTodo(form.newTodo.value) && validateTodoUniqe(form.newTodo.value)) {
      form.newTodo.classList.remove('is-invalid')
      todoId += 1;
      fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        userId: 1,
        id: 201,
        title: form.newTodo.value,
        completed: false
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      })
      .then((response) => response.json())
      .then((data) => (todos.splice(0, 0, changeId(data))))
      .then((data) => (data.id = todoId))
      .then(() => listTodos(todos))
    } 
    else if (validateTodo(form.newTodo.value)) {
      form.newTodo.classList.add('is-invalid');
      form.newTodo.nextSibling.nextSibling.innerHTML = 'You have already added this todo.';
    }
    else {
      form.newTodo.classList.add('is-invalid')
      form.newTodo.nextSibling.nextSibling.innerHTML = 'Your todo needs to be atleast 3 characters long.';
    }
  })
  // ---------------------------------------------------------------------------------------------------------

  //  functions
  const changeId = (value) => {
    value.id = todoId
    return value
  }

  const validateTodo = (value) => {
    if(value.length >= 3) {
      return true;
    }
    else {
      return false;
    }
  }
  
  const validateTodoUniqe = (value) => {
    let todoUniqe = true;
    todos.forEach(todo => {
      if(todo.title === value) {
        todoUniqe = false;
      }
    })
    return todoUniqe;
  }
// ---------------------------------------------------------------------------------------------------------------