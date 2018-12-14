let todos = [];

// 1. Setup a div contain for todos
// 2. Setup filters (searchText) and wire up a new filter input to change it
// 3. Create a renderTodos function to render and rerender the lates filtered data

const filters = {
    searchText: '',
    hideCompleted: false
}

const todoJSON = localStorage.getItem('todos');

// Checking for existing data 
if(todoJSON !== null){
    todos = JSON.parse(todoJSON)
}


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

        const todosLeft = document.createElement('h2');
        todosLeft.textContent = `You have ${incompleteTodos.length} todos left`
        document.querySelector('#todos').appendChild(todosLeft);
     

     // Add a p for each todo above (use text value
     
     filteredTodos.forEach(function(val){
            const todosList = document.createElement('p');
            todosList.textContent = val.text;
            document.querySelector('#todos').appendChild(todosList);

     });

}

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = e.target.value;
    renderTodos(todos,filters);
})

document.querySelector('#add-new-todos').addEventListener('submit', function(e){
    e.preventDefault();
    todos.push({
        text: e.target.elements.newTodo.value,
        completed: false
    })

    localStorage.setItem('todos', JSON.stringify(todos))

    renderTodos(todos,filters);
    e.target.elements.newTodo.value = '';  
})

document.querySelector('#hide-complete').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
})