// Listen for submit

document.querySelector("#loan-form").addEventListener("submit", function(e) {
  // Hide result
  document.querySelector("#results").style.display = "none";
    
  // Show loader
  document.querySelector("#loading").style.display = "block";
  e.preventDefault();

  setTimeout(calculateResults, 2000);
});

// Calculate result
function calculateResults() {
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest)/(x - 1);
  
  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    // Show results and hide spinner
    document.querySelector("#results").style.display = "block";
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please, check your numbers");
  }
}

function showError(error) {
  
  // Hide results and hide spinner
  document.querySelector("#results").style.display = "none";
  document.querySelector("#loading").style.display = "none";

  // Create error div
  const errorDiv = document.createElement("div");
  
  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
