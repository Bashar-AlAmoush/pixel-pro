// JS sign up

// Get form elements
const form = document.getElementById("form1");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const genderInputs = document.getElementsByName("inlineRadioOptions");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phoneNumber");
const positionInput = document.querySelector(".select");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmpass");

// Validate username without spaces
function validateUsername(username) {
  return !/\s/.test(username);
}

// Validate password more than 8 characters, with at least 1 number, uppercase, and special characters
function validatePassword(password) {
  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  return password.length >= 8 && hasNumber && hasUpperCase && hasSpecial;
}

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isEmailTaken(email) {
  // Replace with your own code to search for email in database or storage
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.some((user) => user.email === email);
}

// Validate phone number 10 digits starts with 07
function validatePhone(phone) {
  const phoneRegex = /^07\d{8}$/;
  return phoneRegex.test(phone);
}

// Check if username exists in local storage
function isUsernameTaken(username) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  return users.some((user) => user.username === username);
}

// Save user data to local storage
function saveUserData(username, password, email, phone, position) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push({ username, password, email, phone, position });
  const userse={ username,password,position,email};
  localStorage.setItem("users", JSON.stringify(users));
  sessionStorage.setItem("userse", JSON.stringify(userse));
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const gender = Array.from(genderInputs).find((input) => input.checked).value;
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const position = positionInput.value;
  const password = passwordInput.value.trim();
  const confirmPassword = confirmPasswordInput.value.trim();
  const username = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;

  let isValid = true;
  if (!validateUsername(username)) {
    alert("Username must not contain spaces");
    isValid = false;
  } else if (isUsernameTaken(username)) {
    alert("Username already exists");
    isValid = false;
  }
  if (!validatePassword(password)) {
    alert(
      "Password must be at least 8 characters long and contain at least 1 number, 1 uppercase letter, and 1 special character"
    );
    isValid = false;
  }
  if (!validateEmail(email)) {
    alert("Email must be a valid email address");
    isValid = false;
  } else if (isEmailTaken(email)) {
    alert("The E-mail already exists");
    isValid = false;
  }
  if (!validatePhone(phone)) {
    alert("Phone number must be 10 digits long and start with 07");
    isValid = false;
  }
  if (position === "1") {
    alert("Please select a position");
    isValid = false;
  }
  if (password !== confirmPassword) {
    alert("Passwords don't match");
    isValid = false;
  }

  // Save data if valid
  if (isValid) {
    saveUserData(username, password, email, phone, position);
    window.location.href = "index.html";
  }
});

// End Js for sign up page

