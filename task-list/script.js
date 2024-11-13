"use strict";
// Jeremy Meyers, 11/13/2024

// TC
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.tasks');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = e.currentTarget.querySelector('[name=item]').value;
    const item = {
        text,
        done: false,
        // Mine
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

// Mine
const prioritySelect = document.querySelector('#priority');
const priorityCircle = document.querySelector('.priority-level');
const clearAll = document.querySelector('#clear');

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

prioritySelect.addEventListener('change', changePriorityCircle);
clearAll.addEventListener('click', clearAllTasks);

// TC
itemsList.addEventListener('click', toggleDone);

// Modified by me
addItems.addEventListener('submit', function (e) {
    addItem(e);
    changePriorityCircle();
});

// TC
populateList(itemsList, items);