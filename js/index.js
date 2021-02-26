const form = document.querySelector('#form');
const output = document.querySelector('#output');

// fetching the todos from the API
fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then((response) => response.json())
    .then((data) => listTodos(data))
// ------------------------------------------------------------------------

let todos = []

// listing the todos on in the DOM
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
        <button id="removeTodo" class="btn btn-danger">X</button>
      </div>
    </div>
    `
    if(todo.completed){

      output.children[todoIndex].classList.add('done-todo-card')
      output.children[todoIndex].classList.add('done-todo')

      output.children[todoIndex].childNodes[3].childNodes[1].innerHTML = 'Undo'
      output.children[todoIndex].childNodes[3].childNodes[1].classList.remove('btn-success')
      output.children[todoIndex].childNodes[3].childNodes[1].classList.add('btn-warning')
    }
    todoIndex += 1;
  });
  console.log(todos);
}
// -------------------------------------------------------------------------

  // remove button
  output.addEventListener('click', (e) => {

    if (e.target.classList.contains('btn-danger')) {
      let id = e.target.parentNode.parentNode.id;
      console.log(id);

      let newTodos = todos.filter((todo) => {return todo.id != id})
      
      console.log(todos[id]);

      listTodos(newTodos);
    }

  })

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


