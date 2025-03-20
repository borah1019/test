// 1. 실시간 시계

const time = document.querySelector('#time');

function clock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  function convertNum(num) {
    return num < 10 ? '0' + num : num;
  }

  time.innerText = `${convertNum(hours)}:${convertNum(minutes)}:${convertNum(seconds)}`;
}

setInterval(clock, 1000);

// 2. 로컬 스토리지를 사용한 로그인

const greeting = document.querySelector('#greeting');
const logInForm = document.querySelector('#log_in_form');
const toDoListForm = document.querySelector('#to_do_list_form');
const toDoInput = document.querySelector('#to_do_list_form input');
const toDoList = document.querySelector('#to_do_list');

const NAME_KEY = 'name';
const HIDDEN_CLASSNAME = 'hidden';

function handleLogInSubmit(e) {
  e.preventDefault();
  
  const name = logInForm.querySelector('input').value;
  localStorage.setItem('name', name);
  paintGreetings(name);
}

function paintGreetings(name) {
  logInForm.classList.add(HIDDEN_CLASSNAME);
  greeting.classList.remove(HIDDEN_CLASSNAME);
  toDoListForm.classList.remove(HIDDEN_CLASSNAME);
  toDoList.classList.remove(HIDDEN_CLASSNAME);
  greeting.innerText = `${name}, 할 수 있어!`;
}

const savedName = localStorage.getItem(NAME_KEY);

if (savedName === null) {
  logInForm.addEventListener('submit', handleLogInSubmit);
} else {
  paintGreetings(savedName);
}

// 3. 로컬 스토리지를 사용한 투두리스트

let toDos = [];
const TODOS_KEY = "toDos"

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  parsedToDos.forEach(paintToDo);
  toDos = parsedToDos;
}

function saveToDo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(e) {
  const li = e.target.parentElement;
  const liText = e.target.previousElementSibling.innerText;
  const liIndex = toDos.indexOf(liText)
  li.remove();
  toDos.splice(liIndex, 1);
  saveToDo();
}

function paintToDo(newToDo) {
  const li = document.createElement('li');
  const span = document.createElement('div');
  span.innerText = newToDo;
  const button = document.createElement('button');
  button.innerText = 'x';
  button.addEventListener('click', deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(e) {
  e.preventDefault();

  const newToDo = toDoInput.value;
  toDoInput.value = "";
  toDos.push(newToDo);
  paintToDo(newToDo);
  saveToDo();
}

toDoListForm.addEventListener('submit', handleToDoSubmit);


// 4. 랜덤 배경 이미지
// 4-1. 이미지
const backgroundImage = document.querySelector('#random_background');
const randomNum = Math.ceil(Math.random() * 10);

backgroundImage.setAttribute('src', `./img/background${randomNum}.jpg`);

function imageResize() {
  if (window.innerWidth / window.innerHeight < 1.78) {
    backgroundImage.style.width = "auto";
    backgroundImage.style.height = "100vh";
  } else {
    backgroundImage.style.height = "auto";
    backgroundImage.style.width = "100vw";
  }
};

imageResize();
window.addEventListener('resize', imageResize);

// 4-2. 명언
const quote = document.querySelector('#quote b');
const movie = document.querySelector('#quote span');

const quotes = [
  {
    quote: "네가 최고라는 걸 보여줘",
    movie: "몬스터 주식회사"
  },
  {
    quote: "가장 행복한 것들을 생각해 봐",
    movie: "피터팬"
  },
  {
    quote: "그냥 놔버려",
    movie: "겨울왕국"
  },
  {
    quote: "너는 나의 새로운 꿈이야",
    movie: "라푼젤"
  },
  {
    quote: "누구든 무엇이든 될 수 있어",
    movie: "주토피아"
  },
  {
    quote: "나는 내가 만드는 거야",
    movie: "위시"
  },
  {
    quote: "모든 감정들이 필요해",
    movie: "인사이드 아웃"
  },
  {
    quote: "내가 그랬지? 넌 특별하다니까!",
    movie: "엘리멘탈"
  },
  {
    quote: "조금 부족하긴 하지만 여전히 좋아요",
    movie: "릴로와 스티치"
  },
  {
    quote: "남들이 어떻게 생각하는지는 중요하지 않아",
    movie: "인어공주"
  }
]

quote.innerText = `"${quotes[randomNum - 1].quote}"`;
movie.innerText = quotes[randomNum - 1].movie;

// 5. 날씨와 위치 (geolocation)

const API_KEY = '73df547d0c35bc1da5ebe582be1a5e53';
function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
  fetch(url).then(response => response.json()).then(data => {
    const name = data.name;
    const weather = data.weather[0].main;
    document.querySelector('#weather span:first-child').innerText = name;
    document.querySelector('#weather span:nth-child(2)').innerText = weather;
  });
}
function onGeoError() {
  alert('날씨를 알고 싶다면, 위치 권한을 허락해주세요!');
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

