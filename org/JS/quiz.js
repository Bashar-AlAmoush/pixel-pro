import { JS } from "./questions.js";
import { HTML } from "./questions.js";
import { CSS } from "./questions.js";

console.log(JS);
console.log(HTML);
console.log(CSS);


function getExamTypeFromLocalStorage() {
  const user = JSON.parse(sessionStorage.getItem("userse"));
  const positionn = user.position;

  let examType;
  switch (positionn) {
    case "2":
      examType = HTML;
      break;
    case "3":
      examType = CSS;
      break;
    case "4":
      examType = JS;
      break;
    default:
      console.log("Invalid position value.");
  }

  return examType;
}

function shuffleQuestions(array) {
  const shuffledArray = [];
  while (shuffledArray.length < array.length) {
    const randomQuestion = array[Math.floor(Math.random() * array.length)];
    if (!shuffledArray.includes(randomQuestion)) {
      shuffledArray.push(randomQuestion);
    }
  }
  return shuffledArray;
}

let answers = [];

const quiz = getExamTypeFromLocalStorage();
let Shuffle = shuffleQuestions(quiz);
const exam = Shuffle;
let currentQuestion = 0;


function displayQuestion() {
  let question = exam[currentQuestion];
  document.getElementById("question-text").innerHTML = question.question;
  document.getElementById("option1").nextSibling.textContent = question.optionA;
  document.getElementById("option2").nextSibling.textContent = question.optionB;
  document.getElementById("option3").nextSibling.textContent = question.optionC;
  document.getElementById("option4").nextSibling.textContent = question.optionD;

  document.getElementById("next-button").disabled = true;

  document.getElementsByName("radio").forEach((option) => {
    option.checked = false;

    option.addEventListener("change", function () {
      document.getElementById("next-button").disabled = false;

      let Answer = {
        question: question.question,
        userAnswer: option.nextSibling.textContent,
        correctAnswer: question[question.correctOption],
      };

      let isRepeated = answers.some((a) => a.question  === Answer.question);
      if (!isRepeated) {
        answers.push(Answer);
      }
    });
  });

  document.getElementById("question-count").textContent = `Question ${currentQuestion + 1} of ${exam.length}`;
}

const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", function () {
  if (currentQuestion < exam.length - 1) {
    currentQuestion++;
    displayQuestion();
  } else {
    endQuiz();
  }
});

// Timer
let quizTime = 10 * 60; // 8 minutes in seconds
let intervalId = null;

function startQuiz() {
  quizTime = localStorage.getItem("quizTime") || quizTime;

  displayQuestion();
  intervalId = setInterval(decrementTime, 1000);
}

function decrementTime() {
  quizTime--;
  updateTimer();

  if (quizTime <= 0) {
    clearInterval(intervalId);
    endQuiz();
  }

  localStorage.setItem("quizTime", quizTime);

}

function updateTimer() {
  const timerElement = document.getElementById("timer");
  const minutes = Math.floor(quizTime / 60);
  const seconds = quizTime % 60;
  timerElement.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function endQuiz() {
  clearInterval(intervalId);
  
  console.log(answers);
  sessionStorage.setItem("storedAnswers", JSON.stringify(answers));
  window.location.href = "result.html";
}

window.onload = function () {
  startQuiz();
};

function displayName(){
  const userInfo = JSON.parse(sessionStorage.getItem("userse"));
  let div = document.getElementById("display-name");
  let username = document.createElement("h3");
  const userName = userInfo.username;
  
  div.appendChild(username); 
  username.textContent = ` Name: ${userName}`;
  let exam = document.createElement("h4");
  const Exam = getExamType();
  exam.textContent=`Exam: ${Exam}  `;
  div.appendChild(exam);

}
displayName();

function getExamType() {
  const userData = JSON.parse(sessionStorage.getItem("userse"));
  const positionn = userData.position;

  let examType;
  switch (positionn) {
    case "2":
      examType = "HTML";
      break;
    case "3":
      examType = "CSS";
      break;
    case "4":
      examType = "JavaScript";
      break;
    default:
      console.log("Invalid position value.");
  }

  return examType;
}
 