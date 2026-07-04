async function loadNavigation() {
  const response = await fetch("/session-status");

  const session = await response.json();

  let html = "";

  if (session.loggedIn) {
    html = `

<span style="
        color:white;
        font-weight:bold;
        margin-right:20px;
">

Welcome ${session.userName}

</span>

<a href="/">Home</a>
<a href="/about.html">About</a>
<a href="/contact.html">Contact</a>
<a href="/rides.html">Rides</a>
<a href="/booking.html">Book Ride</a>
<a href="/mybookings.html">My Bookings</a>
<a href="/logout">Logout</a>
`;
  } else {
    html = `

        <a href="/">Home</a>
        <a href="/about.html">About</a>
        <a href="/contact.html">Contact</a>
        <a href="/rides.html">Rides</a>
        <a href="/register.html">Register</a>
        <a href="/login.html">Login</a>
        `;
  }

  document.getElementById("navbar").innerHTML = html;
}

loadNavigation();
