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

document.getElementById('payment-slider').addEventListener('input', function() {
    const index = this.value;
    document.getElementById('amount').innerText = `₹${donationAmounts[index]}`;
    document.getElementById('impactMessage').innerText = impactMessages[index];
});

function redirectToQR() {
    let selectedAmount = document.getElementById('amount').innerText.replace('₹', '');
    let customAmount = document.getElementById('custom-price').value;
    
    let amountToDonate = customAmount && !isNaN(customAmount) ? customAmount : selectedAmount;
    window.location.href = `qr_page.html?amount=${amountToDonate}`;
}
