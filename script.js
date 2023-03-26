const square = document.getElementById("square");
const again = document.getElementById("again");
const n = 15;
let elId, nullId, el, mass;
let wait = false;

const begin = () => {
  square.innerHTML = ""; //clear "frame"
   //fill fields - simple <b> tag
  for (let i = 0; i < n + 1; i++) {square.innerHTML += "<b></b>";}
  mass = square.getElementsByTagName("b"); //mass of fields
  for (let i = 0; i < n; i++) {
    mass[i].innerHTML = Math.floor(Math.random() * n + 1); //fill in random num
    for (let j = 1; j <= i; j++) {
      if (mass[j - 1].innerHTML == mass[i].innerHTML) //checking of clones
      {
        mass[i].innerHTML = Math.floor(Math.random() * n + 1);
        j = 0;
      } //fill in another num
    }
  }
  nullId = n;
};

const move = (a, b, dir) => { //move "brick" from-to, direction
  wait = true;
  mass[a].classList.add("--"+dir);
  //get time for timeout from css
  time = getComputedStyle(mass[a]).transitionDuration.replace(/[a-z]/,'') * 1000;
  setTimeout(function() {
    mass[a].classList.remove("--"+dir);
    mass[b].innerHTML = mass[a].innerHTML;
    mass[a].innerHTML = "";
    nullId = a;
    wait = !wait;
    check();
  }, time);
}

const check = () => { //checking the end of the game
  for (var i = n; i > 0; i--) {
    if (i != mass[i-1].innerHTML) break;
    else if (i == 1) {
      alert("winner");
      begin();
    }
  }
}

begin();
again.onclick = begin;
square.onclick = e => { //move cheking
  const el = e.target;
  if (!wait && !el.childElementCount && el.innerHTML) {
    for (let i = 0; i <= n; i++) {
      if (mass[elId = i].innerHTML == el.innerHTML) break;
    }
    if (elId % 4 == nullId % 4) { //in col
      if (elId - 4 == nullId) move(elId, nullId, "up")
      else if (elId + 4 == nullId) move(elId, nullId, "down");
    } else if (Math.floor(elId / 4) == Math.floor(nullId / 4)) { // in row
      if ((elId % 4) - 1 == nullId % 4) move(elId, nullId, "left")
      else if ((elId % 4) + 1 == nullId % 4) move(elId, nullId, "right");
    }
  }
}