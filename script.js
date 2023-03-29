const square = document.getElementById("square");
const again = document.getElementById("again");
let WAIT_ANIMATION = false;

const getArrayOfB = () => [...square?.getElementsByTagName("b")];

const beginNewGame = () => {
  const initial = [];
  const refactor = [];
  while (initial.length <= 15) { initial.push(initial.length); }
  while (initial.length > 0) {
    const element = initial.splice(~~(Math.random() * initial.length), 1).at(0);
    refactor.push(`<b data-brick-id=${refactor.length}>${element || ''}</b>`);
  }
  square.innerHTML = refactor.join('');
};

const checkWinner = () => {
  const mass = getArrayOfB();
  for (var i = mass.length-1; i > 0; i--) {
    if (i != mass[i-1].innerHTML) break;
    if (i == 1) alert("winner");
  };
};

const moveBrick = (from_id, to_id, direction) => {
  if (!direction) return;
  WAIT_ANIMATION = true;
  const mass = getArrayOfB();
  const delay = getComputedStyle(mass[from_id]).transitionDuration.replace(/[a-z]/,'') * 1000;
  mass[from_id].classList.add(`--${direction}`);
  setTimeout(() => {
    mass[to_id].innerHTML = mass[from_id].innerHTML;
    mass[from_id].classList.remove(`--${direction}`);
    mass[from_id].innerHTML = '';
    WAIT_ANIMATION = false;
    checkWinner();
  }, delay);
};

const clickHandler = ({ target: { dataset, tagName } } = e) => {
  if (WAIT_ANIMATION) return;
  if (tagName != 'B' && !dataset.hasOwnProperty('brickId')) return;
  const elem_id = +dataset.brickId;
  const null_id = +getArrayOfB().find(item => item.innerHTML === '').dataset.brickId;
  const moveDirection = (() => {
    if (elem_id % 4 == null_id % 4) { // in column
      if (elem_id - 4 == null_id) return "up";
      if (elem_id + 4 == null_id) return "down";
    };
    if (~~(elem_id / 4) == ~~(null_id / 4)) { // in row
      if ((elem_id % 4) - 1 == null_id % 4) return "left";
      if ((elem_id % 4) + 1 == null_id % 4) return "right";
    };
    return null;
  })();
  if (moveDirection) moveBrick(elem_id, null_id, moveDirection);
};

again.onclick = beginNewGame;
square.onclick = clickHandler;
beginNewGame();