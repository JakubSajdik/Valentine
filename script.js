// Get button elements
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

// Initialize No button position
function initializeNoButton() {
    const yesButtonRect = yesButton.getBoundingClientRect();
    const containerRect = yesButton.parentElement.getBoundingClientRect();
    
    // Position initially next to Yes button
    const initialX = yesButtonRect.right - containerRect.left + 30;
    const initialY = yesButtonRect.top - containerRect.top;
    
    noButton.style.left = initialX + 'px';
    noButton.style.top = initialY + 'px';
}

// No button movement logic
function moveNoButton() {
    const button = noButton;
    const buttonRect = button.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;
    const container = button.parentElement;
    const containerRect = container.getBoundingClientRect();
    
    // Get container dimensions for positioning
    const maxX = containerRect.width - buttonWidth - 20;
    const maxY = containerRect.height - buttonHeight - 20;
    
    // Calculate random position within container bounds
    const randomX = Math.random() * maxX + 10;
    const randomY = Math.random() * maxY + 10;
    
    // Move button to new position
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

// Initialize button position on load
window.addEventListener('load', initializeNoButton);
window.addEventListener('resize', initializeNoButton);

// Prevent clicking on No button
noButton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    moveNoButton();
    return false;
});

// Move No button on hover
noButton.addEventListener('mouseenter', function() {
    moveNoButton();
});

// Move No button when mouse gets close (mousemove for better detection)
let lastMoveTime = 0;
noButton.addEventListener('mousemove', function(e) {
    const now = Date.now();
    // Throttle movement to avoid too frequent updates
    if (now - lastMoveTime > 100) {
        lastMoveTime = now;
        moveNoButton();
    }
});

// Yes button functionality
yesButton.addEventListener('click', function() {
    // Trigger confetti animation
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
    
    // Additional confetti bursts
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
    }, 250);
    
    setTimeout(() => {
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });
    }, 400);
    
    // Navigate to success page after confetti
    setTimeout(() => {
        window.location.href = 'success.html';
    }, 1000);
});
