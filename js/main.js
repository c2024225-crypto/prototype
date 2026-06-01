// js/main.js
const words = ["maguro","ebi","salmon","tamago","ika","uni","toro","anago","hamachi","saba","hotate","katsuo"];
const sushiImages = ["images/sushineta.jpeg"];

let score = 0;
let time = 60;
let current = "";
let progress = 0;
let sushiX = -220;
const stageWidth = 900;

const wordEl = document.querySelector("#word .target");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const sushiWrapper = document.getElementById("sushi-wrapper");
const sushiImg = document.getElementById("sushi-img");

function pickWord() {
  current = words[Math.floor(Math.random() * words.length)];
  progress = 0;
  renderWord();
  sushiImg.src = sushiImages[Math.floor(Math.random() * sushiImages.length)];
  sushiX = -220;
  sushiWrapper.style.transition = "none";
  sushiWrapper.style.transform = `translateX(${sushiX}px)`;
}

function renderWord() {
  const matched = current.slice(0, progress);
  const remaining = current.slice(progress);
  wordEl.innerHTML = `<span class="matched">${escapeHtml(matched)}</span><span class="remaining">${escapeHtml(remaining)}</span>`;
}

function escapeHtml(s) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

inputEl.addEventListener("input", () => {
  const val = inputEl.value;
  let newProgress = 0;
  for (let i = 0; i < Math.min(val.length, current.length); i++) {
    if (val[i] === current[i]) newProgress++;
    else break;
  }
  progress = newProgress;
  renderWord();

  if (val === current) {
    score++;
    scoreEl.textContent = "スコア: " + score;
    inputEl.value = "";
    sushiX = stageWidth + 100;
    sushiWrapper.style.transition = "transform 0.6s ease-out";
    sushiWrapper.style.transform = `translateX(${sushiX}px)`;
    setTimeout(() => {
      sushiWrapper.style.transition = "none";
      pickWord();
    }, 650);
  }
});

const timerId = setInterval(() => {
  time--;
  timerEl.textContent = "残り時間: " + time;
  sushiX += 2;
  sushiWrapper.style.transform = `translateX(${sushiX}px)`;
  if (sushiX > stageWidth - 100) {
    pickWord();
  }
  if (time <= 0) {
    clearInterval(timerId);
    inputEl.disabled = true;
    alert("ゲーム終了！ スコア: " + score);
  }
}, 1000);

pickWord();
inputEl.focus();
