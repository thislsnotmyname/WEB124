"use strict";
// Jeremy Meyers, 11/11/2024

// TC
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.tasks');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();
    const text = this.querySelector('[name=item]').value;
    const item = {
        text,
        done: false,
    }
    items.push(item);
    populateList(itemsList, items);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(itemsList, items = []) {
    const markup = items.map((item, i) => {
        return `<li class="task">
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

prioritySelect.addEventListener('change', (e) => {
    const priorityLevels = {'low': 'green', 'med': 'yellow', 'high': 'red'};
    console.log(e);
    const newSelection = e.target.value;
    priorityCircle.className = 'priority-level';
    priorityCircle.classList.add(priorityLevels[newSelection]);
})

// TC
itemsList.addEventListener('click', toggleDone);
addItems.addEventListener('submit', addItem);

populateList(itemsList, items);