document.addEventListener("DOMContentLoaded", function () {
    const catchyLine = document.getElementById("catchy-line");
    const taskManager = document.getElementById("task-manager");
    const showTaskManagerButton = document.getElementById("show-task-manager");
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from local storage
    function loadTasksFromLocalStorage() {
        const taskData = JSON.parse(localStorage.getItem('tasks'));

        if (taskData) {
            taskData.forEach((taskText) => {
                // Create a new task item for each stored task
                const taskItem = document.createElement('li');
                taskItem.classList.add('task-item');

                // Create a task text element
                const taskTextElement = document.createElement('span');
                taskTextElement.classList.add('task-text');
                taskTextElement.textContent = taskText;

                // Create a "Done" button
                const removeButton = document.createElement('button');
                removeButton.classList.add('gg-check-r');

                // Add a click event to remove the task
                removeButton.addEventListener('click', function () {
                    taskItem.remove();
                    saveTasksToLocalStorage(); // Update local storage after removing a task
                });

                // Append elements to the task item
                taskItem.appendChild(taskTextElement);
                taskItem.appendChild(removeButton);

                // Append the task item to the task list
                taskList.appendChild(taskItem);
            });
        }
    }

    // Call the function to load tasks from local storage when the page loads
    loadTasksFromLocalStorage();

    showTaskManagerButton.addEventListener("click", function () {
        // Hide the catchy line
        catchyLine.style.display = "none";

        // Show the task manager
        taskManager.style.display = "block";
    });

    addButton.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            // Create a new task item
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            // Create a task text element
            const taskTextElement = document.createElement('span');
            taskTextElement.classList.add('task-text');
            taskTextElement.textContent = taskText;

            // Create a "Done" button
            const removeButton = document.createElement('button');
            removeButton.classList.add('gg-check-r');

            // Add a click event to remove the task
            removeButton.addEventListener('click', function () {
                taskItem.remove();
                saveTasksToLocalStorage(); // Update local storage after removing a task
            });

            // Append elements to the task item
            taskItem.appendChild(taskTextElement);
            taskItem.appendChild(removeButton);

            // Append the task item to the task list
            taskList.appendChild(taskItem);

            // Clear the input field
            taskInput.value = '';

            // Save the updated tasks to local storage
            saveTasksToLocalStorage();
        }
    });
});

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const taskItems = document.querySelectorAll('.task-text');
    const taskData = Array.from(taskItems).map(item => item.textContent);
    localStorage.setItem('tasks', JSON.stringify(taskData));
}