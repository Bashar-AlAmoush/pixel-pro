let questions = JSON.parse(sessionStorage.getItem("storedAnswers"));
const userInfo = JSON.parse(sessionStorage.getItem("userse"));

function renderUserNameAndLogOut() {
  const userName = userInfo.username;
  const ul = document.getElementById("ul");

  const listItem2 = document.createElement("li");
  const link2 = document.createElement("a");
  link2.textContent = "Log Out";
  link2.addEventListener("click", () => {
    window.location.href = "index.html";
    sessionStorage.clear();
  });
  listItem2.appendChild(link2);
  ul.appendChild(listItem2);
}
if (userInfo) {
  renderUserNameAndLogOut();
}
// use this to render the name and the postion of the user

function getExamTypeFromLocalStorage() {
  const userData = JSON.parse(sessionStorage.getItem("userse"));
  const position = userData.position;

  let examType;
  switch (position) {
    case "2":
      examType = "HTML";
      break;
    case "3":
      examType = "CSS";
      break;
    case "4":
      examType = "JS";
      break;
    default:
      console.log("Invalid position value.");
  }

  return examType;
}
const examType = getExamTypeFromLocalStorage();
function result() {
  const userName = userInfo.username;

  let quizInfo = document.getElementById("quizInfo");
  let username = document.createElement("h1");
  let Result = document.createElement("h2");
  let examtype = document.createElement("h2");
  let Score = document.createElement("h2");
  let yo1 = document.createElement("img");
  // let passOrfail = document.createElement("h2");
  let asdf = document.getElementById("asd");
  quizInfo.appendChild(username);
  username.textContent = ` ${userName} `;
  quizInfo.appendChild(examtype);
  examtype.textContent = ` ${examType} `;
  asdf.style.backgroundImage =
    correctAnswers >= 5
      ? `linear-gradient(green, white)`
      : `linear-gradient(red, rgb(216, 87, 87))`;
  quizInfo.appendChild(Result);
  Result.textContent = `Result`;
  quizInfo.appendChild(Score);
  Result.textContent = `Score : ${correctAnswers}/10`;
  quizInfo.appendChild(yo1);
  yo1.src = correctAnswers >= 5 ? `Images/yes.png` : `Images/no.png`;
  yo1.style.width = "200px";
  yo1.style.height = "200px";
  // quizInfo.appendChild(passOrfail);
  // passOrfail.textContent = correctAnswers >= 5 ? `Pass` : `Fail`;
  // passOrfail.style.backgroundColor = correctAnswers >= 5 ? `green` : `red`;
  // passOrfail.style.padding = `8px 10px 8px 10px`;
  // passOrfail.style.borderRadius = `5px`;
  quizInfo.style.color = "white";
  // quizInfo.style.margin = "7rem auto 0px";
  quizInfo.style.padding = "3rem";
  quizInfo.style.borderRadius = "10px";
  quizInfo.style.border = "solid 3px white";
  quizInfo.style.width = "33rem";
  quizInfo.style.backgroundColor = `white`;
  quizInfo.style.color = "black";
  quizInfo.style.textAlign = "center";
}
window.addEventListener("load", result);

function renderAnswers() {
  let table = document.getElementById("resulttable");
  table.style = "display: none";

  // Loop through each item in the array
  for (let i = 0; i < questions.length; i++) {
    let item = questions[i];

    // Create a new row for each item
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    table.appendChild(tr);
    tr.appendChild(td1);
    td1.textContent = `${i + 1}`;
    tr.appendChild(td2);
    td2.textContent = `${item.question}`;
    tr.appendChild(td3);
    td3.textContent = `${item.userAnswer}`;

    tr.appendChild(td4);
    td4.textContent = `${item.correctAnswer}`;
    tr.style.backgroundColor = `white`;
    table.style.margin = "6rem";
    table.style.marginLeft = "16rem";
    td3.style.color = item.userAnswer === item.correctAnswer ? "green" : "	red"; // Highlight the user's answer in green if it's correct, and red if it's incorrect
    table.style.color = "black";
  }
}
renderAnswers();

let button = document.getElementById("submit");
let toggle = false;

function handleButtonClick(event) {
  event.preventDefault();
  let table1 = document.getElementById("resulttable");

  toggle = !toggle;
  if (toggle) {
    table1.style.display = "block";
    button.textContent = `Hide Answers`;
  } else {
    table1.style.display = "none";
    button.textContent = `Show Answers`;
  }
}

button.addEventListener("click", handleButtonClick);

let correctAnswers = 0;
let incorrectAnswers = 0;

questions.forEach((arr) => {
  if (arr.userAnswer === arr.correctAnswer) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
});

console.log(`Correct answers: ${correctAnswers}`);
console.log(`Incorrect answers: ${incorrectAnswers}`);
