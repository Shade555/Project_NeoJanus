const donationAmounts = [10, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
const impactMessages = [
    "Your ₹10 can provide clean drinking water for a family for a day.",
    "Your ₹50 can provide food for a family for 2 days.",
    "Your ₹100 can support medical supplies for a small community.",
    "Your ₹200 can help provide temporary shelter for a family in need.",
    "Your ₹500 can help distribute hygiene kits to families affected by disaster.",
    "Your ₹1000 can fund an entire community’s water purification system for a week.",
    "Your ₹2000 can contribute to the rebuilding of homes for displaced families.",
    "Your ₹5000 can sponsor a rescue operation for multiple families in distress.",
    "Your ₹10000 can provide complete disaster relief for a village in need."
];

const slider = document.getElementById('payment-slider');
const amountSpan = document.getElementById('amount');
const impactMessage = document.getElementById('impactMessage');
const customPriceInput = document.getElementById('custom-price');
const recurringCheckbox = document.getElementById('recurring-payment');

// Update displayed amount and message when slider moves
slider.addEventListener('input', function() {
    const index = this.value;
    amountSpan.innerText = `₹${donationAmounts[index]}`;
    impactMessage.innerText = impactMessages[index];
});

function redirectToQR() {
    let selectedAmount = amountSpan.innerText.replace('₹', '');
    let customAmount = customPriceInput.value.trim();
    
    let amountToDonate = (customAmount && !isNaN(customAmount)) ? parseFloat(customAmount) : parseFloat(selectedAmount);

    if (isNaN(amountToDonate) || amountToDonate <= 0) {
        alert("Please enter a valid donation amount.");
        return;
    }

    // Save donation details to Firestore
    db.collection("donations").add({
        amount: amountToDonate,
        recurring: recurringCheckbox.checked,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("Donation saved!");
        // Redirect to QR code page with donation amount
        window.location.href = `qr_page.html?amount=${amountToDonate}`;
    })
    .catch((error) => {
        console.error("Error saving donation: ", error);
        alert("Something went wrong. Please try again.");
    });
}
