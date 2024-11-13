"use strict";
// Jeremy Meyers, 11/13/2024

// Wes Bos's tutorial variables
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.tasks');
const items = JSON.parse(localStorage.getItem('items')) || [];

// My variables
const prioritySelect = document.querySelector('#priority');
const priorityCircle = document.querySelector('.priority-level');
const clearAll = document.querySelector('#clear');
const filterSelect = document.querySelector('#filter');

// WB's tutorial functions
function addItem(e) {
    e.preventDefault();
    const text = e.currentTarget.querySelector('[name=item]').value;
    const item = {
        text,
        done: false,
        // My addition for priorities of tasks
        priority: prioritySelect.value,
    }
    items.push(item);
    populateList(itemsList, items);
    localStorage.setItem('items', JSON.stringify(items));
    e.currentTarget.reset();
}

function populateList(itemsList, items = []) {
    const markup = items.map((item, i) => {
        return `<li class="task ${item.priority}">
            <input type="checkbox" data-index="${i}" id="item${i}" ${item.done ? "checked" : ""}>
            <label for="item${i}">${item.text}</label>
        </li>`;
    }).join('');

    itemsList.innerHTML = markup;
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(itemsList, items);
}

// My functions for clearing tasks, filtering tasks, a style function for the priority circle
function changePriorityCircle() {
    const newSelection = prioritySelect.value;
    priorityCircle.className = 'priority-level';
    priorityCircle.classList.add(newSelection);
}

function clearAllTasks() {
    if (confirm("Are you sure you want to clear all tasks?")) {
        items.length = 0;
        localStorage.setItem('items', JSON.stringify(items));
        populateList(itemsList, items);
    }
}

function filterTasks() {
    const priorities = {low: 0, med: 1, high: 2};
    switch (this.value) {
        case 'desc':
            const descending = items.toSorted((a, b) => b.text.localeCompare(a.text));
            populateList(itemsList, descending);
        break;
        case 'lth':
            const lowToHigh = items.toSorted((a, b) => priorities[a.priority] - priorities[b.priority]);
            populateList(itemsList, lowToHigh);
        break;
        case 'htl':
            const highToLow = items.toSorted((a, b) => priorities[b.priority] - priorities[a.priority]);
            populateList(itemsList, highToLow);
        break;
        case 'uncomp':
            const uncompleted = items.filter((item) => !item.done);
            populateList(itemsList, uncompleted);
        break;
        case 'comp':
            const completed = items.filter((item) => item.done);
            populateList(itemsList, completed);
        break;
        // Sort by task name ascending if selected or by default
        case 'asc':
        default:
            const ascending = items.toSorted((a, b) => a.text.localeCompare(b.text));
            populateList(itemsList, ascending);
    }
}

// WB's event listener
itemsList.addEventListener('click', toggleDone);
addItems.addEventListener('submit', function (e) {
    addItem(e);
    // My priority circle function
    changePriorityCircle();
});

// My event listeners
filterSelect.addEventListener('change', filterTasks);
prioritySelect.addEventListener('change', changePriorityCircle);
clearAll.addEventListener('click', clearAllTasks);

// WB's initialization of the list
populateList(itemsList, items);