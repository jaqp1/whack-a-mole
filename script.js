
const box = document.querySelector(".start-pane");
const btnStart = document.querySelector(".buttonStart");
const btnStop = document.querySelector(".buttonStop");
const btnLevel = document.querySelector(".buttonLevel");
const backdrop = document.querySelector(".container");
const startPaneImg = document.querySelector(".start_pane_img");
let intervalId = null;
let randomHolesTimeout = null;
let swistakGeneratorTimeout = null;
let stop = true;
let counterInterval = null;

btnStart.addEventListener("click", () => {
  //btnStop.disabled = true;
  //btnStart.disabled = true;
  
  score = 0;
  fotoCounter = 5;
  //stop = false;
  clearInterval(intervalId);
  clearTimeout(randomHolesTimeout);
  clearTimeout(swistakGeneratorTimeout);
  clearTimeout(gameOver);

  // let stopFreeze = setTimeout(() => {
  //   btnStop.disabled = false;;
  // },5000);
  //  clearTimeout(stopFreeze);

  let counter = 5;
  let h1 = document.createElement("h1");

  if(stop){
    counterInterval = setInterval(() => {
      h1.textContent = counter;
      h1.style.position = "absolute";
      h1.style.left = "50%";
      h1.style.top = "50%";
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


    if (window.innerWidth <= 1100 && window.innerWidth > 600) {
      box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      box.style.transform = "translateY(-160%) translateX(40%)";
      box.style.opacity = "0.9";
      backdrop.classList.add("transparent");
      document.querySelector("body").style.backgroundImage = "url('plansza_bez_dziur.png')";
    }else if(window.innerWidth <= 600){
      box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      box.style.transform = "translateY(-500%)";
      box.style.opacity = "0.9";
      backdrop.classList.add("transparent");
      let btnStopNew = document.createElement("button");
      btnStopNew.classList.add("buttonStop");
      btnStopNew.textContent = "Stop";
      btnStopNew.style.position = "absolute";
      btnStopNew.style.left = "50%"; 
      btnStopNew.style.top = "50%"; 
      btnStopNew.style.width = "200px";
      btnStopNew.style.height = "200px";
      btnStopNew.style.transform = "translate(-50%, -50%)";
      btnStopNew.style.fontSize = "50px";
      btnStopNew.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      document.querySelector("body").style.backgroundImage = "url('plansza_bez_dziur_smartphone.png')";
    }else{
      box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      box.style.transform = "translateY(-100%)";
      box.style.opacity = "0.9";
      backdrop.classList.add("transparent");
      document.querySelector("body").style.backgroundImage = "url('plansza_bez_dziur.png')";
    }

    let level = btnLevel.textContent === "Easy" ? 1000 : btnLevel.textContent === "Medium" ? 700 : btnLevel.textContent === "Level" ? 1000 : 500;

    

    randomHolesTimeout =  setTimeout(() => {generateHoles();}, 1500);
  
    swistakGeneratorTimeout = setTimeout(() => {
      document.querySelectorAll(".swistak").forEach(swistak => {
      swistak.remove();
    });intervalId = setInterval(() => {
      randomSwistakGenerator();
    },level);
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

    score = 0;
    scoreString = "Score: "+ score;
    document.querySelector(".score").textContent = scoreString;

    document.querySelectorAll(".life_points_img").forEach(life => {
      life.src = "zwierzak.png";
    });
  }
  fotoCounter = 5
});

let count = 0;
const colors = ['#006400', '#00008B', '#8B0000'];
const levels = ['Easy', 'Medium', 'Hard'];
btnLevel.addEventListener("click", () => {
 count++;
      
      const index = (count - 1) % colors.length;
      btnLevel.style.backgroundColor = colors[index];
      btnLevel.textContent = levels[index];
      
  
});

const hole = document.createElement("img");
hole.src = "dziura.png";
hole.classList.add("hole");
hole.style.position = "absolute";
hole.style.width = window.innerWidth <= 600 ? "80px" : "200px";
hole.style.height = window.innerWidth <= 600 ? "80px" : "200px";


const container = document.querySelector(".container");

const swistak = document.createElement("img");
swistak.src = "zwierzak.png";
swistak.classList.add("swistak");

let positions = [];

function generateHoles() {
  document.querySelectorAll(".hole").forEach(h => h.remove());
  positions = [];

  const holeSize = window.innerWidth <= 600 ? 80 : 200;



  let minY = (window.innerHeight - holeSize + 80) / 2;
  let maxY = (window.innerHeight - holeSize);

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  const minDistance = window.innerWidth <= 600 ? 100 : 200;

  const maxHoles = window.innerWidth <= 600 ? 5 : 10;

  const maxTriesPerHole = 200;

  for (let i = 0; i < maxHoles; i++) {
    const holeClone = hole.cloneNode(true);

    let placed = false;
    let tries = 0;

    while (!placed && tries < maxTriesPerHole) {
      tries++;

      let randomX = Math.floor(Math.random() * (container.clientWidth - holeSize));
      let randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

      const isOverlapping = positions.some(pos => {
        return (
          Math.abs(pos.x - randomX) < minDistance &&
          Math.abs(pos.y - randomY) < minDistance
        );
      });

      if (!isOverlapping) {
        positions.push({ x: randomX, y: randomY });
        holeClone.style.left = `${randomX}px`;
        holeClone.style.top = `${randomY}px`;
        container.appendChild(holeClone);
        placed = true;
      }
    }

  }
}

 

function randomSwistakGenerator(){
  document.querySelectorAll(".swistak").forEach(swistak => {
    swistak.remove();
    document.querySelector(`.life_points_img${fotoCounter}`).src = "zwierzak_down.png";
      fotoCounter--;
  });
  swistak.style.position = "absolute";

  const shiftX = window.innerWidth <= 600 ? 3 : 12;
  const shiftY = window.innerWidth <= 600 ? 25 : 60;
  randomPosition = Math.floor(Math.random() * (positions.length ));
  swistak.style.left = positions[randomPosition].x - shiftX + "px" ;
  swistak.style.top = positions[randomPosition].y - shiftY + "px";
  swistak.style.width = window.innerWidth <= 600 ? "80px":"200px";
  swistak.style.height = window.innerWidth <= 600 ? "80px" : "200px";

  stopGamePane();
  container.appendChild(swistak);
}
  

let score = 0;
let scoreString = "Score: "+ score;
let fotoCounter = 5;
let gameOver;
let topScore = 0;
document.querySelector(".container").addEventListener("click", (event) => {
  if(event.target.classList.contains("swistak")){
      clicked = true;
      score++;
      if(score >= 5){
        youWon();
      }
      let scoreString = "Score: "+ score;
      document.querySelector(".score").textContent = scoreString;
      document.querySelectorAll(".swistak").forEach(swistak => {
      swistak.remove();
    });
    } else if (event.target.classList.contains("buttons")) {
      return;
    }else if (!stop){
      document.querySelector(`.life_points_img${fotoCounter}`).src = "zwierzak_down.png";
      fotoCounter--;
    }

    if(score > topScore){
      localStorage.setItem("topScore", score);
      topScore = localStorage.getItem("topScore");
      let topScoreString = "Top Score: "+ topScore;
      document.querySelector(".top_score").textContent = topScoreString;
    }
  stopGamePane();
  }
);

function stopGamePane(){
  if(fotoCounter < 1){
    btnStop.disabled = true;
    clearInterval(intervalId);
    clearTimeout(randomHolesTimeout);
    clearTimeout(swistakGeneratorTimeout);
        let h1 = document.createElement("h1");
        h1.textContent = "Game Over";
        h1.style.position = "absolute";
        h1.style.left = "50%";
        h1.style.top = "60%";
        h1.style.transform = "translate(-50%, -50%)";
        h1.style.color = "#e5bd68";
        h1.style.zIndex = "1000";
        h1.style.transition = "opacity 0.5s ease";
        h1.style.opacity = "1";
        backdrop.appendChild(h1);

    gameOver = setTimeout(() => {
      h1.style.opacity = "0";
      h1.remove();

      if(window.innerWidth <= 600){
        box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        box.style.transform = "translateY(0%)";
        box.style.opacity = "1";
        backdrop.classList.remove("transparent");
        document.querySelector("body").style.backgroundImage = "url('plansza_startowa_smartphone.png')";
      }else{
        box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        box.style.transform = "translateY(0%)";
        box.style.opacity = "1";
        backdrop.classList.remove("transparent");
        document.querySelector("body").style.backgroundImage = "url('plansza.png')";
      }

      document.querySelectorAll(".hole").forEach(hole => {
      hole.remove();
    });
    document.querySelectorAll(".swistak").forEach(swistak => {
      swistak.remove();
    });
    document.querySelectorAll(".life_points_img").forEach(life => {
      life.src = "zwierzak.png";
    });
    score = 0;
    scoreString = "Score: "+ score;
    document.querySelector(".score").textContent = scoreString;
    btnStart.disabled = false;
    btnStop.disabled = false;
    stop = true;
  }, 5000);
  }
}

function youWon(){
    btnStop.disabled = true;
    clearInterval(intervalId);
    clearTimeout(randomHolesTimeout);
    clearTimeout(swistakGeneratorTimeout);
        let h1 = document.createElement("h1");
        h1.textContent = "Game Over\n You won!";
        h1.style.position = "absolute";
        h1.style.left = "50%";
        h1.style.top = "60%";
        h1.style.transform = "translate(-50%, -50%)";
        h1.style.color = "#e5bd68";
        h1.style.zIndex = "1000";
        h1.style.transition = "opacity 0.5s ease";
        h1.style.opacity = "1";
        h1.style.textAlign = "center";
        backdrop.appendChild(h1);

    gameOver = setTimeout(() => {
      h1.style.opacity = "0";
      h1.remove();
      
    if(window.innerWidth <= 600){
      box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      box.style.transform = "translateY(0%)";
      box.style.opacity = "1";
      backdrop.classList.remove("transparent");
      document.querySelector("body").style.backgroundImage = "url('plansza_startowa_smartphone.png')";
    }else{
      box.style.transition = "transform 0.5s ease, opacity 0.5s ease";
      box.style.transform = "translateY(0%)";
      box.style.opacity = "1";
      backdrop.classList.remove("transparent");
      document.querySelector("body").style.backgroundImage = "url('plansza.png')";
    }
      
      document.querySelectorAll(".hole").forEach(hole => {
      hole.remove();
      });
      document.querySelectorAll(".swistak").forEach(swistak => {
        swistak.remove();
      });
      document.querySelectorAll(".life_points_img").forEach(life => {
        life.src = "zwierzak.png";
      });
      score = 0;
      scoreString = "Score: "+ score;
      document.querySelector(".score").textContent = scoreString;
      btnStart.disabled = false;
      btnStop.disabled = false;
      stop = true;
      //console.log("Gra zakończona – stop =", stop);
  }, 5000);
  
  //clearTimeout(gameOver);
}
