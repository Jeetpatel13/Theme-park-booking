async function loadBookings() {
  const response = await fetch("/api/bookings");
  const bookings = await response.json();
  let output = "";

  bookings.forEach((b) => {
    output += `

    <div class="booking-card">
        <h3> ${b.ride_name}</h3>
        <p>  Date: ${b.booking_date} </p>
        <p>  Time: ${b.booking_time} </p>
        <button onclick="cancelBooking(${b.id})"> Cancel Booking </button>
    </div>

`;
  });

  document.getElementById("bookings").innerHTML = output;
}

async function cancelBooking(id) {
  await fetch("/api/bookings/" + id, {
    method: "DELETE",
  });

  loadBookings();
}

loadBookings();
