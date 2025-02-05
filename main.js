//랜덤번호 지정
//유저가 번호 입력. 그리고 go 버튼 입력
//유저가 랜덤번호를 맞추면, 맞췄습니다.
//랜덤번호가 < 유저번호 Down!!
//랜덤번호가 > 유저번호 Up !!
//Rest버튼을 누르면 게임 리셋
//5번의 기회를 다쓰면 게임 끝(더이상 추측 불가, 버튼 disable)
//유저가 1~100 범위 밖의 숫자를 입력하면 기회를 깍지않고 알려준다.
//유저가 이미 입력한 숫자를 또 입력하면 알려주고, 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("play-Button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-Area");
let resetButton = document.getElementById("reset-button");
let chanceArea = document.getElementById("chance-Area");
let chances = 5;
let gameOver = false;
let history=[];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function(){userInput.value=""})

function PickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1;
  console.log("정답", computerNum);
}

function play() {
  let userValue = userInput.value;

  if (userValue<1 || userValue>100){
    resultArea.textContent = "1과100사이 숫자를 입력해 주세요"
    return;
  }

  if (history.includes(userValue)){
    resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요!"
    return;
  }

  chances--; //기회 차감
  chanceArea.textContent=`남은기회: ${chances}번`; //동적인 값일을 넣을때 `(backtik)

  if (userValue < computerNum) {
    resultArea.textContent = "Up!!!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!!";
  } else {
    resultArea.textContent = "맞추셨습니다.!!!";
    gameOver=true
  }

  history.push(userValue);
  console.log(history)

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver == true){
    playButton.disabled=true;
  }

}

function reset() {
  // user input 창 깨끗히
  // 새로은 번호 생성
  userInput.value = "";
  resultArea.textContent = "결과 값이 여기 나옵니다";
  chanceArea.textContent = "남은기회:5번";
  playButton.disabled=false;
  PickRandomNum();
}
PickRandomNum();
