let ridesData = [];

async function loadRides() {
  const response = await fetch("/api/rides/details");
  ridesData = await response.json();
  const rideSelect = document.getElementById("ride");
  let rides = {};

  ridesData.forEach((row) => {
    rides[row.id] = row.ride_name;
  });
  for (let id in rides) {
    rideSelect.innerHTML += `<option value="${id}">
            ${rides[id]}
        </option>`;
  }
  loadTimes();
}

function loadTimes() {
  const rideId = document.getElementById("ride").value;
  const timeSelect = document.getElementById("bookingTime");
  timeSelect.innerHTML = "";
  ridesData
    .filter((row) => row.id == rideId)
    .forEach((row) => {
      timeSelect.innerHTML += `<option>
            ${row.ride_time}
        </option>`;
    });
}
document.getElementById("ride").addEventListener("change", loadTimes);
document.getElementById("bookingForm").addEventListener("submit",
    async function (e) {
      e.preventDefault();
      const response = await fetch(
        "/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rideId: document.getElementById("ride").value,
            bookingDate: document.getElementById("bookingDate").value,
            bookingTime: document.getElementById("bookingTime").value,
          }),
        },
      );

      const data = await response.json();
      document.getElementById("message").innerHTML = data.message;
    },
  );

loadRides();
