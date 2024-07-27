// Select DOM elements
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold):not(.blank)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const selectedSeatsNumbers = document.getElementById("selected-seats-numbers");
const paymentLink = document.getElementById("payment-link");

// Initialize ticket price
let ticketPrice = +movieSelect.value || 0; // Ensure ticketPrice defaults to 0 if not set

// Save selected movie index and price in localStorage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update the number of selected seats and total price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  // Store selected seats in localStorage
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  // Calculate total price based on seat classes
  let totalPrice = 0;
  selectedSeats.forEach(seat => {
    let seatPrice = ticketPrice;
    if (seat.classList.contains('special')) {
      seatPrice += 100;
    }
    if (seat.classList.contains('premium')) {
      seatPrice += 200;
    }
    totalPrice += seatPrice;
  });

  // Update seat count and total price
  count.innerText = selectedSeats.length;
  total.innerText = totalPrice;

  // Update the selected seat numbers
  const seatNumbers = [...selectedSeats].map(seat => seat.id).join(", ");
  selectedSeatsNumbers.innerText = seatNumbers;

  // Save current movie data
  setMovieData(movieSelect.selectedIndex, movieSelect.value);

  // Update the payment link
  updatePaymentLink();
}

// Populate UI with data from localStorage
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];

  // Mark seats as selected
  seats.forEach((seat, index) => {
    if (selectedSeats.includes(index)) {
      seat.classList.add("selected");
    }
  });

  // Set the selected movie
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    ticketPrice = +movieSelect.value || 0; // Ensure ticketPrice is set correctly
  }

  // Update the selected seat count and total price on page load
  updateSelectedCount();
}

// Event listener for movie selection
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Event listener for seat selection
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold") && !e.target.classList.contains("blank")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// Function to update the payment link with seat count and total price
// function updatePaymentLink() {
//   if (paymentLink) {
//     const selectedSeatsCount = count.innerText;
//     const totalPrice = total.innerText;

//     const queryParams = new URLSearchParams({
//       count: selectedSeatsCount,
//       total: totalPrice
//     }).toString();

//     paymentLink.href = `payment.html?${queryParams}`;
//   }
// }
function ShowPayment(){
let payment=document.querySelector('.pay');
payment.style.display='block';
}
// Initialize UI
populateUI();
