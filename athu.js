// athu.js

function signup(event) {
    event.preventDefault();
  
    const fullName = document.getElementById("signupFullName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
  
    if (!fullName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
  
    const newUser = { fullName, email, password };
  
    // Get existing users or create empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if user already exists
    const userExists = users.some(user => user.email === email);
  
    if (userExists) {
      alert("Email already exists. Please login or use another email.");
      return;
    }
  
    // Save new user
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  
    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
  }
  
  function login(event) {
    event.preventDefault();
  
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
  
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    const validUser = users.find(user => user.email === email && user.password === password);
  
    if (validUser) {
      alert("Login successful!");
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password.");
    }
  }
  
  // ---------- LOGIN FUNCTION ----------
  function login(e) {
    e.preventDefault();
  
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
  
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    const matchedUser = users.find(user => user.email === email && user.password === password);
  
    if (!matchedUser) {
      alert("Invalid email or password.");
      return;
    }
  
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    alert("Login successful!");
    window.location.href = "dash.html";
  }
  
  // ---------- LOGOUT FUNCTION ----------
  function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
    window.location.href = "index.html";
  }
  
  // ---------- PROTECT DASHBOARD ----------
  function protectDashboard() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please login first.");
      window.location.href = "index.html";
    } else {
      document.getElementById("userInfo").innerText = `Logged in as: ${user.name} (${user.email})`;
    }
  }
  