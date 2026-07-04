async function loadDashboard() {
  const response = await fetch("/session-status");

  const session = await response.json();

  if (!session.loggedIn) {
    window.location = "/login.html";
    return;
  }

  document.getElementById("welcome").innerHTML = `Welcome ${session.userName}`;
}

loadDashboard();
