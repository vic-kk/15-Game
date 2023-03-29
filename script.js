const square = document.getElementById("square");
const newGame = document.getElementById("newGame");
let WAIT_ANIMATION = false;

const getBricksArray = () => [...square?.childNodes];

const beginNewGame = () => {
  const initial = [];
  const refactor = [];
  while (initial.length <= 15) { initial.push(initial.length); }
  while (initial.length > 0) {
    const brick = initial.splice(~~(Math.random() * initial.length), 1).at(0);
    refactor.push(`<b data-brick-id=${refactor.length}>${brick || ''}</b>`);
  }
  square.innerHTML = refactor.join('');
};

const checkWinner = () => {
  const bricks = getBricksArray();
  for (var i = bricks.length-1; i > 0; i--) {
    if (i != bricks[i-1].innerHTML) break;
    if (i == 1) alert("winner");
  };
};

const moveBrick = (from_id, to_id, direction) => {
  if (!direction) return;
  WAIT_ANIMATION = true;
  const bricks = getBricksArray();
  const delay = getComputedStyle(bricks[from_id]).transitionDuration.replace(/[a-z]/,'') * 1000;
  bricks[from_id].classList.add(`--${direction}`);
  setTimeout(() => {
    bricks[to_id].innerHTML = bricks[from_id].innerHTML;
    bricks[from_id].classList.remove(`--${direction}`);
    bricks[from_id].innerHTML = '';
    WAIT_ANIMATION = false;
    checkWinner();
  }, delay);
};

const fieldClickHandler = ({ target: { dataset: clicked_brick } } = e) => {
  if (WAIT_ANIMATION) return;
  if (!clicked_brick.hasOwnProperty('brickId')) return;
  const clicked_id = Number(clicked_brick.brickId);
  const null_id = Number(getBricksArray().find(brick => brick.innerHTML === '').dataset.brickId);
  const moveDirection = (() => {
    if (clicked_id % 4 == null_id % 4) { // in column
      if (clicked_id - 4 == null_id) return "up";
      if (clicked_id + 4 == null_id) return "down";
    };
    if (~~(clicked_id / 4) == ~~(null_id / 4)) { // in row
      if ((clicked_id % 4) - 1 == null_id % 4) return "left";
      if ((clicked_id % 4) + 1 == null_id % 4) return "right";
    };
    return null;
  })();
  if (moveDirection) moveBrick(clicked_id, null_id, moveDirection);
};

newGame.onclick = beginNewGame;
square.onclick = fieldClickHandler;
beginNewGame();