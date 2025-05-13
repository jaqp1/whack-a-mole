
const box = document.querySelector(".start-pane");
const btnStart = document.querySelector(".buttonStart");
const btnStop = document.querySelector(".buttonStop");
const btnReset = document.querySelector(".buttonReset");
const backdrop = document.querySelector(".container");
const startPaneImg = document.querySelector(".start_pane_img");

let intervalId = null;
let randomHolesTimeout = null;
let swistakGeneratorTimeout = null;
let stop = true;
let counterInterval = null;

btnStart.addEventListener("click", () => {
  clearInterval(intervalId);
  clearTimeout(randomHolesTimeout);
  clearTimeout(swistakGeneratorTimeout);

  let counter = 5;
  let h1 = document.createElement("h1");

  if(stop){
    counterInterval = setInterval(() => {
      h1.textContent = counter;
      h1.style.position = "absolute";
      h1.style.left = "50%";
      h1.style.top = "60%";
      h1.style.transform = "translate(-50%, -50%)";
      h1.style.fontSize = "200px";
      h1.style.color = "#e5bd68";
      h1.style.zIndex = "1000";
      h1.style.transition = "opacity 0.5s ease";
      h1.style.opacity = "1";
      backdrop.appendChild(h1);
      counter--;
      if(counter < 0){
        clearInterval(counterInterval);
        h1.style.opacity = "0";
        setTimeout(() => {
          h1.remove();
        }, 500);
      }
    }, 1000);



    box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    box.style.transform = "translateY(-110%)";
    box.style.opacity = "0.9";
    backdrop.classList.add("transparent");
    document.querySelector("body").style.backgroundImage = "url('plansza_bez_dziur.png')";

    randomHolesTimeout =  setTimeout(() => {generateHoles();}, 1500);
  
    swistakGeneratorTimeout = setTimeout(() => {
      document.querySelectorAll(".swistak").forEach(swistak => {
      swistak.remove();
    });intervalId = setInterval(() => {
      randomSwistakGenerator();
    },1000);
    },6000 );

    stop = false;
  }
  

  

});

btnStop.addEventListener("click", () => {
  if(document.querySelectorAll(".hole").length > 0){
    box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    box.style.transform = "translateY(0%)";
    box.style.opacity = "1";
    backdrop.classList.remove("transparent");
    document.querySelector("body").style.backgroundImage = "url('plansza.png')";

    document.querySelectorAll(".hole").forEach(hole => {
      hole.remove();
    });
    document.querySelectorAll(".swistak").forEach(swistak => {
      swistak.remove();
    });

    clearInterval(intervalId);
    clearTimeout(randomHolesTimeout);
    clearTimeout(swistakGeneratorTimeout);
    stop = true;
}});

btnReset.addEventListener("click", () => {
  randomSwistakGenerator();
});

const hole = document.createElement("img");
hole.src = "dziura.png";
hole.classList.add("hole");
hole.style.position = "absolute";
hole.style.width = "200px";
hole.style.height = "200px";


const container = document.querySelector(".container");

const swistak = document.createElement("img");
swistak.src = "zwierzak.png";
swistak.classList.add("swistak");

let positions = [];

function generateHoles(){
  positions = [];

  let minY = (window.innerHeight - 200) / 2;
  let maxY = (window.innerHeight - 200);
  
  let randomX, randomY;

  function isOverlapping(x,y){
    return positions.some(pos => {
      return (
        Math.abs(pos.x - x) < 200  && Math.abs(pos.y - y) < 200 
      )
    })
  }

  for(let i = 0; i < 10; i++){

    const holeClone = hole.cloneNode(true);

    do{
      randomX = Math.floor(Math.random() * (container.clientWidth - 200));
      randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    }while(isOverlapping(randomX, randomY))

    positions.push({x: randomX, y: randomY});

    holeClone.style.left = randomX + "px";
    holeClone.style.top = randomY + "px";
    container.appendChild(holeClone);
  }
  
}

function randomSwistakGenerator(){
  document.querySelectorAll(".swistak").forEach(swistak => {
    swistak.remove();
  });
  swistak.style.position = "absolute";
  randomPosition = Math.floor(Math.random() * (positions.length ));
  swistak.style.left = positions[randomPosition].x - 12 + "px" ;
  swistak.style.top = positions[randomPosition].y - 60 + "px";
  swistak.style.width = "200px";
  swistak.style.height = "200px";
  container.appendChild(swistak);
}