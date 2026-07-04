async function loadFeaturedRides() {
  const response = await fetch("/api/rides");

  const rides = await response.json();

  let html = "";

  rides.forEach((ride) => {
    html += `
        <div class="card">
            <img
            src="/images/${ride.image}"
            alt="${ride.ride_name}">
            <h3>
                ${ride.ride_name}
            </h3>
            <p>
                ${ride.description}
            </p>
        </div>
        `;
  });

  document.getElementById("featured-rides").innerHTML = html;
}

loadFeaturedRides();
