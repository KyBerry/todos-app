const todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
};

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', function(e){
    filters.searchText = e.target.value;
    renderTodos(todos,filters);
});

document.querySelector('#add-new-todos').addEventListener('submit', function(e){
    const text = e.target.elements.newTodo.value.trim();
    debugger;
    e.preventDefault();
    if (text.length > 0){
        todos.push({
            id: uuidv4(),
            text: text,
            completed: false
        });
        saveTodos(todos);
        renderTodos(todos,filters);
        e.target.elements.newTodo.value = '';  
    };
});

document.querySelector('#hide-complete').addEventListener('change', function(e){
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
});