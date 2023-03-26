const square = document.getElementById("square");
const again = document.getElementById("again");
let NULL_ID = null;
let WAIT_ANIM = false;

const getTags = () => square.getElementsByTagName("b");

const beginGame = () => {
  const initial = [];
  const refactor = [];
  while (initial.length <= 15) { initial.push(initial.length) };
  while (initial.length > 0) {
    const element = initial.splice(~~(Math.random() * initial.length), 1)[0];
    if (element === 0) NULL_ID = refactor.length;
    refactor.push(`<b>${element || ''}</b>`);
  }
  square.innerHTML = refactor.join('');
};

const move = (fromId, toId, dir) => { //move "brick" from-to, direction
  if (!dir) return;
  WAIT_ANIM = true;
  const mass = getTags(); //mass of fields
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
  const mass = getTags(); //mass of fields
  for (var i = mass.length-1; i > 0; i--) {
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
    let ELEM_ID = null;
    const mass = getTags(); //mass of fields
    for (let i = 0; i < mass.length; i++) {
      if (mass[ELEM_ID = i].innerHTML == el.innerHTML) break;
    }
    const direction = () => {
      if (ELEM_ID % 4 == NULL_ID % 4) { //in column
        if (ELEM_ID - 4 == NULL_ID) return "up";
        if (ELEM_ID + 4 == NULL_ID) return "down";
      }
      if (~~(ELEM_ID / 4) == ~~(NULL_ID / 4)) { // in row
        if ((ELEM_ID % 4) - 1 == NULL_ID % 4) return "left";
        if ((ELEM_ID % 4) + 1 == NULL_ID % 4) return "right";
      }
    }
    move(ELEM_ID, NULL_ID, direction())
  }
}

again.onclick = beginGame;
square.onclick = clickHandler;
beginGame();