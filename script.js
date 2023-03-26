const square = document.getElementById("square");
const again = document.getElementById("again");
const NUMBERS = 15;
let elId, nullId, el, mass;
let waitAnim = false;

const begin = () => {
  square.innerHTML = ""; //clear "frame"
   //fill fields - simple <b> tag
  for (let i = 0; i < NUMBERS + 1; i++) {square.innerHTML += "<b></b>";}
  mass = square.getElementsByTagName("b"); //mass of fields
  for (let i = 0; i < NUMBERS; i++) {
    mass[i].innerHTML = Math.floor(Math.random() * NUMBERS + 1); //fill in random num
    for (let j = 1; j <= i; j++) {
      if (mass[j - 1].innerHTML == mass[i].innerHTML) //checking of clones
      {
        mass[i].innerHTML = Math.floor(Math.random() * NUMBERS + 1);
        j = 0;
      } //fill in another num
    }
  }
  nullId = NUMBERS;
};

const move = (fromId, toId, dir) => { //move "brick" from-to, direction
  waitAnim = true;
  mass[fromId].classList.add("--"+dir);
  //get time for timeout from css
  const time = getComputedStyle(mass[fromId]).transitionDuration.replace(/[a-z]/,'') * 1000;
  setTimeout(function() {
    mass[fromId].classList.remove("--"+dir);
    mass[toId].innerHTML = mass[fromId].innerHTML;
    mass[fromId].innerHTML = "";
    nullId = fromId;
    waitAnim = false;
    checkWinner();
  }, time);
}

const checkWinner = () => { //checking the end of the game
  for (var i = NUMBERS; i > 0; i--) {
    if (i != mass[i-1].innerHTML) break;
    if (i == 1) {
      alert("winner");
      begin();
    }
  }
}

const clickHandler = (e) => { //move cheking
  const { target: el } = e;
  if (waitAnim && el.childElementCount) return;
  if (el.innerHTML) {
    for (let i = 0; i <= NUMBERS; i++) {
      if (mass[elId = i].innerHTML == el.innerHTML) break;
    }
    if (elId % 4 == nullId % 4) { //in column
      if (elId - 4 == nullId) return move(elId, nullId, "up");
      if (elId + 4 == nullId) return move(elId, nullId, "down");
    }
    if (Math.floor(elId / 4) == Math.floor(nullId / 4)) { // in row
      if ((elId % 4) - 1 == nullId % 4) return move(elId, nullId, "left");
      if ((elId % 4) + 1 == nullId % 4) return move(elId, nullId, "right");
    }
  }
}

again.onclick = begin;
square.onclick = clickHandler;

begin();