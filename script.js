const square = document.getElementById("square");
const again = document.getElementById("again");
let NULL_ID = 0;
let WAIT_ANIM = false;

const getCollectionOfB = () => [...square.getElementsByTagName("b")];

const beginNewGame = () => {
  const initial = [];
  while (initial.length <= 15) { initial.push(initial.length); }
  const refactor = [];
  while (initial.length > 0) {
    const element = initial.splice(~~(Math.random() * initial.length), 1)[0];
    if (element === 0) NULL_ID = refactor.length;
    refactor.push(`<b data-id=${refactor.length}>${element || ''}</b>`);
  }
  square.innerHTML = refactor.join('');
};

const moveBrick = (from_Id, to_Id, direction) => {
  if (!direction) return;
  WAIT_ANIM = true;
  const mass = getCollectionOfB(); //mass of fields
  mass[from_Id].classList.add(`--${direction}`);
  const delay = getComputedStyle(mass[from_Id]).transitionDuration.replace(/[a-z]/,'') * 1000;
  setTimeout(() => {
    mass[from_Id].classList.remove(`--${direction}`);
    mass[to_Id].innerHTML = mass[from_Id].innerHTML;
    mass[from_Id].innerHTML = '';
    NULL_ID = from_Id;
    WAIT_ANIM = false;
    checkWinner();
  }, delay);
};

const checkWinner = () => {
  const mass = getCollectionOfB();
  for (var i = mass.length-1; i > 0; i--) {
    if (i != mass[i-1].innerHTML) break;
    if (i == 1) alert("winner");
  }
};

const clickHandler = (e) => { //move cheking
  const { target: el } = e;
  if (WAIT_ANIM || el.tagName!='B') return;
  if (el.dataset.id) {
    const ELEM_ID = getCollectionOfB().indexOf(el);
    const moveDirection = (() => {
      if (ELEM_ID % 4 == NULL_ID % 4) { // in column
        if (ELEM_ID - 4 == NULL_ID) return "up";
        if (ELEM_ID + 4 == NULL_ID) return "down";
      }
      if (~~(ELEM_ID / 4) == ~~(NULL_ID / 4)) { // in row
        if ((ELEM_ID % 4) - 1 == NULL_ID % 4) return "left";
        if ((ELEM_ID % 4) + 1 == NULL_ID % 4) return "right";
      }
      return null;
    })();
    if (moveDirection) moveBrick(ELEM_ID, NULL_ID, moveDirection);
  }
};

again.onclick = beginNewGame;
square.onclick = clickHandler;
beginNewGame();