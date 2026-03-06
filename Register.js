// Wait until the HTML page has fully loaded before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Read the query parameters from the page URL
  const params = new URLSearchParams(window.location.search);

  // Extract the value of the "plan" parameter
  const plan = params.get("plan");

  // Store the selected membership plan in the hidden input field
  // This ensures the membership type is sent with the form data
  document.getElementById("membershipType").value = plan;

  // Add an event listener to detect when the form is submitted
  document
    .getElementById("memberForm")
    .addEventListener("submit", async function (e) {
      // Prevent the default form submission behaviour (page refresh)
      e.preventDefault();

      // Create a JavaScript object containing all form input values
      const member = {
        // Get values entered by the user in each input field
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        dateOfBirth: document.getElementById("dateOfBirth").value,
        address: document.getElementById("address").value,

        // Include the selected membership type
        membershipType: document.getElementById("membershipType").value,
      };

      // Send the form data to the backend server using the Fetch API
      const response = await fetch("http://localhost:3000/register", {
        // Specify that we are sending a POST request
        method: "POST",

        // Tell the server that the data format is JSON
        headers: {
          "Content-Type": "application/json",
        },

        // Convert the JavaScript object into JSON format
        body: JSON.stringify(member),
      });

      // Convert the server response from JSON format to a JavaScript object
      const data = await response.json();

      // Display a confirmation message returned from the server
      alert(data.message);
    });
});

