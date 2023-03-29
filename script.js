const square = document.getElementById("square");
const again = document.getElementById("again");
let NULL_ID = 0;
let WAIT_ANIM = false;

const getArryaOfB = () => [...square?.getElementsByTagName("b")];

const beginNewGame = () => {
  const initial = [];
  while (initial.length <= 15) { initial.push(initial.length); }
  const refactor = [];
  while (initial.length > 0) {
    const element = initial.splice(~~(Math.random() * initial.length), 1)[0];
    if (element === 0) NULL_ID = refactor.length;
    refactor.push(`<b data-brick=${refactor.length}>${element || ''}</b>`);
  }
  square.innerHTML = refactor.join('');
};

const moveBrick = (from_id, to_id, direction) => {
  if (!direction) return;
  WAIT_ANIM = true;
  const mass = getArryaOfB();
  const delay = getComputedStyle(mass[from_id]).transitionDuration.replace(/[a-z]/,'') * 1000;
  mass[from_id].classList.add(`--${direction}`);
  setTimeout(() => {
    mass[to_id].innerHTML = mass[from_id].innerHTML;
    mass[from_id].classList.remove(`--${direction}`);
    mass[from_id].innerHTML = '';
    NULL_ID = from_id;
    WAIT_ANIM = false;
    checkWinner();
  }, delay);
};

const checkWinner = () => {
  const mass = getArryaOfB();
  for (var i = mass.length-1; i > 0; i--) {
    if (i != mass[i-1].innerHTML) break;
    if (i == 1) alert("winner");
  }
};

const clickHandler = ({ target, target: { dataset, tagName } } = e) => {
  if (WAIT_ANIM || tagName != 'B' && dataset.brick) return;
  const ELEM_ID = getArryaOfB().indexOf(target);
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
};

again.onclick = beginNewGame;
square.onclick = clickHandler;
beginNewGame();