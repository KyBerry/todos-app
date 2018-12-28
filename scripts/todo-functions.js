'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
    const todoJSON = localStorage.getItem('todos');
    try {
        return todoJSON ? JSON.parse(todoJSON) : [];
    } catch(e) {
        return []
    }
}

// Save todos to localStorage
const saveTodos = (todos) => {
   localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove a todo based on uuid 
const removeTodo = function(id){
    const findTodo = todos.findIndex((todo) => todo.id === id);
    if(findTodo > -1){
        todos.splice(findTodo, 1);
    };
};

// Toggle the completed value for a given todo
const toggleTodo = function(id){
    const todo = todos.find((todo) => todo.id === id);
    if(todo){
        todo.completed = !todo.completed
    };
};

// Render application todos based on filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos');
    const filteredTodos = todos.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchTextMatch && hideCompletedMatch;
    })
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

    todoEl.innerHTML = '';
    todoEl.appendChild(generateSummaryDOM(incompleteTodos));

    // Add a p for each todo above (use text value
    if (filteredTodos.length){
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo));
        });        
    } else {
        const messageEl = document.createElement('p');
        messageEl.classList.add('empty-message');
        messageEl.textContent = 'NO TODOS TO SHOW';
        todoEl.appendChild(messageEl);
    };
};

// Get the DOM elements for an individual todo
const generateTodoDOM = (todo) => {
        const todoEl = document.createElement('label');
        const containerEl = document.createElement('div')
        const checkbox = document.createElement('input');
        const todoText = document.createElement('span');
        const button = document.createElement('button');


        // Setup todo checkbox
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = todo.completed;
        containerEl.appendChild(checkbox);
        checkbox.addEventListener('change', () => {
            toggleTodo(todo.id);
            saveTodos(todos);
            renderTodos(todos, filters);
        });

        // Setup todo checkbox
        todoText.textContent = todo.text;
        containerEl.appendChild(todoText);


        // Setup container
        todoEl.classList.add('list-item');
        containerEl.classList.add('list-item__container');
        todoEl.appendChild(containerEl);

        // Setup todo remove button
        button.textContent = 'REMOVE';
        button.classList.add('button', 'button--text');
        todoEl.appendChild(button);
        button.addEventListener('click', () => {
            removeTodo(todo.id);
            saveTodos(todos);
            renderTodos(todos, filters);
        });



        return todoEl;
};

// Get the DOM elements for an individual note
const generateSummaryDOM = (incompleteTodos) => {
    const todosLeft = document.createElement('h2');
    const plural = incompleteTodos.length === 1 ? '' : 'S';
    todosLeft.classList.add('list-title');
    todosLeft.textContent = `YOU HAVE ${incompleteTodos.length} TODO${plural} LEFT`
    return todosLeft;
};