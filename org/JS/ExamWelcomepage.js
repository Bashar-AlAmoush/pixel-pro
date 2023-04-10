const userInfo = JSON.parse(sessionStorage.getItem("userse"));
function NameAndExam() {
  const userName = userInfo.username;
  const h1 = document.getElementById("name");
  h1.textContent = userName;
  const submit = document.getElementById("submit");
  submit.addEventListener("click", () => {
    window.location.href = "quiz.html";
  });
}
NameAndExam();
