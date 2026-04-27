const ADMIN_API = "http://localhost:5000/api/admin";

const adminToken = localStorage.getItem("adminToken");

if (!adminToken) {
  alert("Please login as admin first");
  window.location.href = "admin-login.html";
}

async function loadAdminStats() {
  const res = await fetch(`${ADMIN_API}/stats`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const result = await res.json();

  if (result.success) {
    document.getElementById("totalUsers").innerText = result.stats.totalUsers;
    document.getElementById("totalBookings").innerText = result.stats.totalBookings;
    document.getElementById("pendingBookings").innerText = result.stats.pendingBookings;
    document.getElementById("deliveredBookings").innerText = result.stats.deliveredBookings;
  }
}

async function loadAllBookings() {
  const res = await fetch(`${ADMIN_API}/bookings`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  const result = await res.json();

  if (!result.success) return;

  const table = document.getElementById("adminBookingTable");
  table.innerHTML = "";

  result.bookings.forEach((booking) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${booking.userId?.fullName || "N/A"}</td>
      <td>${booking.userId?.phone || "N/A"}</td>
      <td>${booking.cylinderType}</td>
      <td>${booking.quantity}</td>
      <td>${booking.paymentMode}</td>
      <td>
        <select onchange="updateStatus('${booking._id}', this.value, '${booking.paymentStatus}')">
          <option value="Pending" ${booking.bookingStatus === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Confirmed" ${booking.bookingStatus === "Confirmed" ? "selected" : ""}>Confirmed</option>
          <option value="Out for Delivery" ${booking.bookingStatus === "Out for Delivery" ? "selected" : ""}>Out for Delivery</option>
          <option value="Delivered" ${booking.bookingStatus === "Delivered" ? "selected" : ""}>Delivered</option>
          <option value="Cancelled" ${booking.bookingStatus === "Cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
      </td>
      <td>
        <select onchange="updateStatus('${booking._id}', '${booking.bookingStatus}', this.value)">
          <option value="Pending" ${booking.paymentStatus === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Paid" ${booking.paymentStatus === "Paid" ? "selected" : ""}>Paid</option>
        </select>
      </td>
      <td>
        <button onclick="loadAllBookings()">Refresh</button>
      </td>
    `;

    table.appendChild(tr);
  });
}

async function updateStatus(id, bookingStatus, paymentStatus) {
  const res = await fetch(`${ADMIN_API}/bookings/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      bookingStatus,
      paymentStatus,
    }),
  });

  const result = await res.json();
  alert(result.message);

  loadAdminStats();
  loadAllBookings();
}

function adminLogout() {
  localStorage.removeItem("adminToken");
  window.location.href = "admin-login.html";
}

loadAdminStats();
loadAllBookings();