"use strict";
// Jeremy Meyers, 10/23/2024

const para1 = document.getElementById("p1");
const myName = "Jeremy Meyers";
para1.textContent = myName;

const n1 = 30;
const n2 = 3;

const numberSum = n1 + n2;
document.getElementById("p2").textContent = numberSum;

const numberMult = n1 * n2;
document.getElementById("p3").textContent = numberMult;

const myNameAddNum = myName + n1;
document.getElementById("p4").textContent = myNameAddNum;

const myNameMultNum = myName * n2;
document.getElementById("p5").textContent = myNameMultNum;

const ageCompare = numberMult > 21;
document.getElementById("p6").textContent = ageCompare;