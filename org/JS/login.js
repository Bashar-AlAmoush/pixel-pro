const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", (event) => {
  
  let message = [];

  event.preventDefault();
  const email = document.getElementById("email1").value.toLowerCase();
  const password = document.getElementById("password1").value;

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const storedData = users.find((user) => user.email.toLowerCase() === email);
  
  if (storedData && storedData.password === password) {
    // login successful
    const { username, position } = storedData;
    const userse = { username, password, position };
    console.log(username);
    sessionStorage.setItem("userse", JSON.stringify(userse));
    window.location.href = "index.html";
  } else {
    // login failed
    message += "<li>Invalid email or password</li>";
    const errorMessage = document.getElementById("error-message");
    errorMessage.classList.remove("d-none");
    const errors1 = document.getElementById("errors1");
    errors1.innerHTML = message;
  }
    
});
