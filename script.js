const square = document.getElementById("square");
const again = document.getElementById("again");
const NUMBERS = 15;
let ELEM_ID, NULL_ID;
let WAIT_ANIM = false;

const getArray = () => square.getElementsByTagName("b");

const beginGame = () => {
  square.innerHTML = ""; //clear "frame"
   //fill fields - simple <b> tag
  for (let i = 0; i < NUMBERS + 1; i++) {square.innerHTML += "<b></b>";}
  const mass = getArray(); //mass of fields
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
  NULL_ID = NUMBERS;
};

const move = (fromId, toId, dir) => { //move "brick" from-to, direction
  WAIT_ANIM = true;
  const mass = getArray(); //mass of fields
  mass[fromId].classList.add("--"+dir);
  //get time for timeout from css
  const time = getComputedStyle(mass[fromId]).transitionDuration.replace(/[a-z]/,'') * 1000;
  setTimeout(function() {
    mass[fromId].classList.remove("--"+dir);
    mass[toId].innerHTML = mass[fromId].innerHTML;
    mass[fromId].innerHTML = "";
    NULL_ID = fromId;
    WAIT_ANIM = false;
    checkWinner();
  }, time);
}

const checkWinner = () => { //checking the end of the game
  const mass = getArray(); //mass of fields
  for (var i = NUMBERS; i > 0; i--) {
    if (i != mass[i-1].innerHTML) break;
    if (i == 1) {
      alert("winner");
      beginGame();
    }
  }
}

const clickHandler = (e) => { //move cheking
  const { target: el } = e;
  if (WAIT_ANIM || el.childElementCount) return;
  if (el.innerHTML) {
    const mass = getArray(); //mass of fields
    for (let i = 0; i <= NUMBERS; i++) {
      if (mass[ELEM_ID = i].innerHTML == el.innerHTML) break;
    }
    if (ELEM_ID % 4 == NULL_ID % 4) { //in column
      if (ELEM_ID - 4 == NULL_ID) return move(ELEM_ID, NULL_ID, "up");
      if (ELEM_ID + 4 == NULL_ID) return move(ELEM_ID, NULL_ID, "down");
    }
    if (Math.floor(ELEM_ID / 4) == Math.floor(NULL_ID / 4)) { // in row
      if ((ELEM_ID % 4) - 1 == NULL_ID % 4) return move(ELEM_ID, NULL_ID, "left");
      if ((ELEM_ID % 4) + 1 == NULL_ID % 4) return move(ELEM_ID, NULL_ID, "right");
    }
  }
}

again.onclick = beginGame;
square.onclick = clickHandler;

beginGame();