// Function that runs when a user selects a membership plan
function selectPlan(planType) {
  // Get reference to result div
  const resultDiv = document.getElementById("result");

  // Check which plan was selected
  if (planType === "Monthly") {
    // Display monthly selection message
    resultDiv.innerHTML =
      "You have selected the Monthly Membership Plan (€40/month).";
  } else if (planType === "Annual") {
    // Display annual selection message
    resultDiv.innerHTML =
      "You have selected the Annual Membership Plan (€400/year).";
  }
}
