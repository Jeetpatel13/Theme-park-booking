async function loadRides() {
  const response = await fetch("/api/rides/details");
  const data = await response.json();
  let grouped = {};

  data.forEach((row) => {
    if (!grouped[row.id]) {
      grouped[row.id] = {
        name: row.ride_name,
        description: row.description,
        duration: row.duration,
        minHeight: row.min_height,
        image: row.image,
        times: [],
      };
    }

    if (row.ride_time) {
      grouped[row.id].times.push(row.ride_time);
    }
  });

  let output = "";

  for (let id in grouped) {
    const ride = grouped[id];

    output += `

        <div class="card">

            <img
                src="/images/${ride.image}"
                alt="${ride.name}"
                style="
                    width:100%;
                    height:250px;
                    object-fit:cover;
                    border-radius:10px;
                    margin-bottom:15px;
                "
            >

            <h2>${ride.name}</h2>
            <p>
                ${ride.description}
            </p>
            <p>
                <strong>Duration:</strong>
                ${ride.duration}
            </p>
            <p>
                <strong>Min Height:</strong>
                ${ride.minHeight}
            </p>
            <p>
                <strong>Available Times:</strong>
                ${ride.times.join(", ")}
            </p>
        </div>

        `;
  }

  document.getElementById("rides").innerHTML = output;
}

loadRides();
