let currentIndex = 1; // Center card index
let cards = document.querySelectorAll(".card");

function updateCarousel() {
    let totalCards = cards.length;

    cards.forEach((card, index) => {
        let position = (index - currentIndex + totalCards) % totalCards;

        if (position === 0) {
            card.style.transform = "translateX(-280px) scale(0.8)";
            card.style.opacity = "0.5";
        } else if (position === 1) {
            card.style.transform = "translateX(0px) scale(1)";
            card.style.opacity = "1";
        } else if (position === 2) {
            card.style.transform = "translateX(280px) scale(0.8)";
            card.style.opacity = "0.5";
        } else {
            card.style.transform = "translateX(500px) scale(0.5)";
            card.style.opacity = "0";
        }
    });
}

function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
}

// Swipe functionality for mobile
let startX;
document.querySelector(".carousel-container").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector(".carousel-container").addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) nextCard();
    if (startX < endX - 50) prevCard();
});

updateCarousel(); // Initialize
