
const box = document.querySelector(".start-pane");
const btnStart = document.querySelector(".buttonStart");
const btnStop = document.querySelector(".buttonStop");
const btnReset = document.querySelector(".buttonReset");
const backdrop = document.querySelector(".container");
const startPaneImg = document.querySelector(".start_pane_img");

btnStart.addEventListener("click", () => {
  box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  box.style.transform = "translateY(-110%)";
  box.style.opacity = "0.9";
  backdrop.classList.add("transparent");
  document.querySelector("body").style.backgroundImage = "url('plansza_bez_dziur.png')";

  setTimeout(() => {generateHoles();}, 1500);
  randomSwistakGenerator();
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
  }
 

 
 

});

btnReset.addEventListener("click", () => {
  randomSwistakGenerator();
});

const hole = document.createElement("img");
hole.src = "dziura.png";
hole.classList.add("hole");

const container = document.querySelector(".container");

const swistak = document.createElement("img");
swistak.src = "zwierzak.png";
swistak.classList.add("swistak");

const positions = [];

function generateHoles(){


  const minY = (window.innerHeight - 200) / 2;
  const maxY = (window.innerHeight - 200);
  hole.style.position = "absolute";
  hole.style.width = "200px";
  hole.style.height = "200px";

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
  swistak.style.position = "absolute";
  randomPosition = Math.floor(Math.random() * (positions.length ));
  swistak.style.left = positions[randomPosition].x - 12 + "px" ;
  swistak.style.top = positions[randomPosition].y - 60 + "px";
  swistak.style.width = "200px";
  swistak.style.height = "200px";
  container.appendChild(swistak);
}