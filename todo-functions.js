// Fetch existing todos from localStorage
const getSavedTodos = function(){
    const todoJSON = localStorage.getItem('todos');
    if(todoJSON !== null){
        return JSON.parse(todoJSON);
    } else {
        return [];
    }
}

// Save todos to localStorage
const saveTodos = function(todos){
   localStorage.setItem('todos', JSON.stringify(todos))
}

// Render application todos based on filters
const renderTodos = function(todos, filters){
    const filteredTodos = todos.filter(function(todo){
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchTextMatch && hideCompletedMatch;
    })
    const incompleteTodos = filteredTodos.filter(function(todo){
        return !todo.completed
      });

    document.querySelector('#todos').innerHTML = '';
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos));

    // Add a p for each todo above (use text value
    filteredTodos.forEach(function(todo){
        document.querySelector('#todos').appendChild(generateTodoDOM(todo));
    })
}



// 1. Setup a root div
// 2. Setup and append a checkbox (set type attribute)
// someNode.setAttribute('type', 'checkbox')
// 3. Setup and append a span (set text)
// 4. Setup and append a button (set text)


// Get the DOM elements for an individual todo
const generateTodoDOM = function(todo){
        const todoEl = document.createElement('div');
        const button = document.createElement('button');
        const todoText = document.createElement('span');
        const checkbox = document.createElement('input');
        
        // Setup todo checkbox
        checkbox.setAttribute('type', 'checkbox');
        todoEl.appendChild(checkbox)

        // Setup todo checkbox
        button.textContent = 'X';
        todoText.textContent = todo.text;
        todoEl.appendChild(todoText);
        todoEl.appendChild(button);
        return todoEl;
}

// Get the DOM elements for an individual note
const generateSummaryDOM = function(incompleteTodos){
    const todosLeft = document.createElement('h2');
    todosLeft.textContent = `You have ${incompleteTodos.length} todos left`
    return todosLeft;
}