document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Handle login logic here
    window.location.href = 'dashboard.html'; // Redirect to dashboard after login
  });
  