const API = "http://localhost:5000/api/auth";

// SEND OTP
async function sendOtp() {
  const email = document.getElementById("email").value;

  const res = await fetch(`${API}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  const result = await res.json();
  alert(result.message);
}

// RESET PASSWORD
async function resetPassword() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;
  const newPassword = document.getElementById("newPassword").value;

  const res = await fetch(`${API}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, otp, newPassword })
  });

  const result = await res.json();
  alert(result.message);

  if (result.success) {
    window.location.href = "login.html";
  }
}