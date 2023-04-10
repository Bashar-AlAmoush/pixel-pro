const userInfo = JSON.parse(sessionStorage.getItem("userse"));

function renderLoginAndSignUp() {
  const ul = document.getElementById("ul");

  const listItem1 = document.createElement("li");
  const link1 = document.createElement("a");
  link1.href = "log-in.html";
  link1.textContent = "Log in";
  listItem1.appendChild(link1);

  link1.style.textDecoration = "none";

  const listItem2 = document.createElement("li");
  const link2 = document.createElement("a");
  link2.href = "registration.html";
  link2.textContent = "Sign up";
  listItem2.appendChild(link2);
  link2.style.textDecoration = "none";

  ul.appendChild(listItem1);
  ul.appendChild(listItem2);
}
const imagePo = document.getElementById("imageP");
let srcc = "";
function renderUserNameAndLogOut() {
  const userName = userInfo.username;
  const ul = document.getElementById("ul");
  const well = document.getElementById("wel");

  imagePo.textContent;
  well.textContent = `WELCOME   ${userName.toUpperCase()} !`;
  well.style.textAlign = "center";
  const listItem1 = document.createElement("li");
  const link1 = document.createElement("a");
  link1.textContent = userName;
  listItem1.appendChild(link1);
  ul.appendChild(listItem1);

  const listItem2 = document.createElement("li");
  const link2 = document.createElement("a");
  link2.textContent = "Log Out";
  link2.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "index.html";
  });
  listItem2.appendChild(link2);
  ul.appendChild(listItem2);
}

if (userInfo) {
  renderUserNameAndLogOut();
} else {
  renderLoginAndSignUp();
}
// console.log(userInfo.username);

const button = document.getElementById("submit");
button.addEventListener("click", function () {
  if (userInfo) {
    window.location.href = "ExamWelcomepage.html";
  } else {
    window.location.href = "registration.html";
  }
});
let aboutposition = " ";
let description = "";

function getExamTypeFromLocalStorage() {
  const user = JSON.parse(sessionStorage.getItem("userse"));
  const positionn = user.position;
  console.log(positionn);

  let examType;
  switch (positionn) {
    case "2":
      examType = "HTML";
      aboutposition = " HTML Developer";
      description =
        " An HTML developer is a professional web designer who uses HTML to create website layouts based on templates and wireframes. ";
      srcc = "Images/HTML.png";

      break;
    case "3":
      examType = "CSS";
      aboutposition = " Front-End Developer";
      description =
        " Develop complex interactive front-end systems for high-traffic fintech websites";
      srcc = "Images/CSS.png";

      break;
    case "4":
      examType = "JS";
      aboutposition = "JavaScript Developer ";
      description = "Work with fellow front and back end developers.";
      srcc = "Images/JS.png";

      break;
    default:
      console.log("Invalid position value.");
  }

  return examType;
}
const positionnn = getExamTypeFromLocalStorage();
console.log(positionnn);
console.log(aboutposition);
console.log(description);
imagePo.src = srcc;
imagePo.style.width = "400px";
imagePo.style.height = "500px";
imagePo.style.marginLeft = "200px";
function setdata() {
  const positionn = document.getElementById("aboutp");
  const des = document.getElementById("description");
  const examm = document.getElementById("exam");
  positionn.textContent = aboutposition;
  des.textContent = description;
  examm.textContent = positionnn + " " + "exam";
}
setdata();
