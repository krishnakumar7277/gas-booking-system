const BOOKING_API = "https://gas-booking-system-od25.onrender.com/api/bookings";

const token = localStorage.getItem("token");

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

async function createBooking() {
  const data = {
    cylinderType: document.getElementById("cylinderType").value,
    quantity: document.getElementById("quantity").value,
    deliveryAddress: document.getElementById("deliveryAddress").value,
    paymentMode: document.getElementById("paymentMode").value,
  };

  const res = await fetch(`${BOOKING_API}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  alert(result.message);

  if (result.success) {
    document.getElementById("cylinderType").value = "";
    document.getElementById("quantity").value = "1";
    document.getElementById("deliveryAddress").value = "";
    document.getElementById("paymentMode").value = "COD";
    loadBookings();
  }
}

async function loadBookings() {
  const res = await fetch(`${BOOKING_API}/my-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (!result.success) return;

  const bookings = result.bookings;

  document.getElementById("totalBookings").innerText = bookings.length;

  document.getElementById("pendingBookings").innerText = bookings.filter(
    (b) => b.bookingStatus === "Pending"
  ).length;

  document.getElementById("deliveredBookings").innerText = bookings.filter(
    (b) => b.bookingStatus === "Delivered"
  ).length;

  const table = document.getElementById("bookingTable");
  table.innerHTML = "";

  bookings.forEach((booking) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${booking.cylinderType}</td>
      <td>${booking.quantity}</td>
      <td>${booking.paymentMode}</td>
      <td><span class="status">${booking.bookingStatus}</span></td>
      <td>${new Date(booking.createdAt).toLocaleDateString()}</td>
      <td>
        <button onclick='downloadInvoice(${JSON.stringify(booking)})'>Invoice</button>
      </td>
    `;

    table.appendChild(tr);
  });
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

loadBookings();
function downloadInvoice(booking) {
  const price = booking.cylinderType.includes("19 KG") ? 1800 :
                booking.cylinderType.includes("5 KG") ? 500 : 950;

  const total = price * booking.quantity;

  const invoiceWindow = window.open("", "_blank");

  invoiceWindow.document.write(`
    <html>
    <head>
      <title>Gas Booking Invoice</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f4f7fb;
          padding: 30px;
        }
        .invoice {
          max-width: 700px;
          margin: auto;
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        h1 {
          color: #082f5f;
          text-align: center;
        }
        .top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 25px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background: #eef4ff;
          color: #082f5f;
        }
        .total {
          text-align: right;
          font-size: 20px;
          font-weight: bold;
          margin-top: 20px;
          color: #0d6efd;
        }
        .print-btn {
          margin-top: 25px;
          background: #0d6efd;
          color: white;
          border: none;
          padding: 10px 18px;
          border-radius: 8px;
          cursor: pointer;
        }
        @media print {
          .print-btn {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="invoice">
        <h1>GasBook Invoice</h1>

        <div class="top">
          <div>
            <strong>Invoice ID:</strong> ${booking._id}<br>
            <strong>Date:</strong> ${new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Status:</strong> ${booking.bookingStatus}<br>
            <strong>Payment:</strong> ${booking.paymentStatus}
          </div>
        </div>

        <p><strong>Delivery Address:</strong> ${booking.deliveryAddress}</p>

        <table>
          <tr>
            <th>Cylinder Type</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
          <tr>
            <td>${booking.cylinderType}</td>
            <td>${booking.quantity}</td>
            <td>₹${price}</td>
            <td>₹${total}</td>
          </tr>
        </table>

        <div class="total">Grand Total: ₹${total}</div>

        <button class="print-btn" onclick="window.print()">Download / Print Invoice</button>
      </div>
    </body>
    </html>
  `);

  invoiceWindow.document.close();
}
function showSection(section) {
  document.getElementById("dashboardSection").style.display = "none";
  document.getElementById("bookSection").style.display = "none";
  document.getElementById("myBookingsSection").style.display = "none";

  if (section === "dashboard") {
    document.getElementById("dashboardSection").style.display = "block";
  }

  if (section === "book") {
    document.getElementById("bookSection").style.display = "block";
  }

  if (section === "myBookings") {
    document.getElementById("myBookingsSection").style.display = "block";
  }
}

// Default load
showSection("dashboard");
function setActive(element) {
  const links = document.querySelectorAll(".sidebar a");
  links.forEach(link => link.classList.remove("active"));
  element.classList.add("active");
}