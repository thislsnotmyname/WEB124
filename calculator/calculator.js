"use strict";
// Jeremy Meyers, 11/29/2024

function addition(input) {
    let markup = "";
    for (let i = 1; i <= 10; i++) {
        markup += `${i} + ${input} = ${i + input}<br>`;
    }
    document.querySelector('#add').innerHTML = markup;
}

function subtraction(input) {
    let markup = "";
    let i = 1;
    while (i <= 10) {
        markup += `${i} - ${input} = ${i - input}<br>`;
        i++;
    }
    document.querySelector('#sub').innerHTML = markup;
}

function multiplication(input) {
    let markup = "";
    let i = 1;
    do {
        markup += `${i} * ${input} = ${i * input}<br>`;
        i++;
    } while (i <= 10)
    document.querySelector('#mult').innerHTML = markup;
}

function division(input) {
    let markup = "";
    for (let i = 1; i <= 10; i++) {
        markup += `${i} / ${input} = ${(i / input).toFixed(2)}<br>`;
    }
    document.querySelector('#divi').innerHTML = markup;
}

function calculate() {
    const input = Number(document.querySelector('#num').value);
    addition(input);
    subtraction(input);
    multiplication(input);
    division(input);
}

document.querySelector('#calculate').addEventListener('click', calculate);