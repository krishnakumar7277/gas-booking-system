const API = "http://localhost:5000/api/auth";

// REGISTER
async function register() {
  const data = {
    fullName: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    password: document.getElementById("password").value
  };

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message);
}

// LOGIN
async function login() {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (result.success) {
    alert("Login Success");
    localStorage.setItem("token", result.token);
    window.location.href = "user-dashboard.html";
  } else {
    alert(result.message);
  }
}
// ADMIN LOGIN
async function adminLogin() {
  const data = {
    email: document.getElementById("adminEmail").value,
    password: document.getElementById("adminPassword").value,
  };

  const res = await fetch(`${API}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.success) {
    alert("Admin Login Success");
    localStorage.setItem("adminToken", result.token);
    window.location.href = "admin-dashboard.html";
  } else {
    alert(result.message);
  }
}