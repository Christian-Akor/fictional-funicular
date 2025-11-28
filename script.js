// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Bubble Creation on Click
const heroSection = document.querySelector('.hero');
const bubblesContainer = document.getElementById('bubbles-container');

heroSection.addEventListener('click', (e) => {
    createBubble(e.clientX, e.clientY);
});

function createBubble(x, y) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    
    const size = Math.random() * 60 + 20;
    const colors = ['#6c5ce7', '#fd79a8', '#00cec9', '#ffeaa7', '#fab1a0', '#74b9ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    bubble.style.background = `radial-gradient(circle at 30% 30%, ${randomColor}, ${randomColor}88)`;
    
    bubblesContainer.appendChild(bubble);
    
    // Remove bubble after animation
    setTimeout(() => {
        bubble.remove();
    }, 3000);
}

// Scroll to Games Section
function scrollToGames() {
    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
}

// Game 1: Color Clicker
let colorClicks = 0;

function changeColor() {
    const colorBox = document.getElementById('color-box');
    const colors = ['#6c5ce7', '#fd79a8', '#00cec9', '#ffeaa7', '#fab1a0', '#74b9ff', '#a29bfe', '#55efc4', '#ff7675', '#fdcb6e'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    colorBox.style.background = randomColor;
    colorBox.style.transform = 'scale(1.1) rotate(5deg)';
    
    setTimeout(() => {
        colorBox.style.transform = 'scale(1) rotate(0deg)';
    }, 200);
    
    colorClicks++;
    document.getElementById('color-clicks').textContent = colorClicks;
}

// Game 2: Dice Roller
const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function rollDice() {
    const dice = document.getElementById('dice');
    const result = document.getElementById('dice-result');
    
    dice.classList.add('rolling');
    
    // Animate through random dice faces
    let rollCount = 0;
    const rollInterval = setInterval(() => {
        dice.textContent = diceEmojis[Math.floor(Math.random() * 6)];
        rollCount++;
        
        if (rollCount >= 10) {
            clearInterval(rollInterval);
            const finalRoll = Math.floor(Math.random() * 6);
            dice.textContent = diceEmojis[finalRoll];
            dice.classList.remove('rolling');
            result.textContent = `You rolled a ${finalRoll + 1}! ${finalRoll === 5 ? '🎉 Lucky!' : ''}`;
        }
    }, 100);
}

// Game 3: Number Guesser
let secretNumber = Math.floor(Math.random() * 10) + 1;

function guessNumber() {
    const input = document.getElementById('guess-input');
    const result = document.getElementById('guess-result');
    const guess = parseInt(input.value);
    
    if (isNaN(guess) || guess < 1 || guess > 10) {
        result.textContent = '❌ Enter a number between 1-10!';
        result.style.color = '#e74c3c';
        return;
    }
    
    if (guess === secretNumber) {
        result.textContent = '🎉 Correct! You win!';
        result.style.color = '#2ecc71';
        // Reset game
        secretNumber = Math.floor(Math.random() * 10) + 1;
    } else if (guess < secretNumber) {
        result.textContent = '📈 Too low! Try higher!';
        result.style.color = '#f39c12';
    } else {
        result.textContent = '📉 Too high! Try lower!';
        result.style.color = '#f39c12';
    }
    
    input.value = '';
}

// Allow Enter key for number guesser
document.getElementById('guess-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        guessNumber();
    }
});

// Game 4: Reaction Timer
let reactionTimeout;
let reactionStartTime;
let canClick = false;

function startReaction() {
    const box = document.getElementById('reaction-box');
    const result = document.getElementById('reaction-result');
    const btn = document.getElementById('reaction-btn');
    
    // Reset
    canClick = false;
    box.className = 'reaction-box waiting';
    box.textContent = 'Wait for green...';
    result.textContent = 'Wait...';
    btn.disabled = true;
    
    // Random delay between 2-5 seconds
    const delay = Math.random() * 3000 + 2000;
    
    reactionTimeout = setTimeout(() => {
        box.className = 'reaction-box ready';
        box.textContent = 'CLICK NOW!';
        reactionStartTime = Date.now();
        canClick = true;
    }, delay);
    
    box.onclick = handleReactionClick;
}

function handleReactionClick() {
    const box = document.getElementById('reaction-box');
    const result = document.getElementById('reaction-result');
    const btn = document.getElementById('reaction-btn');
    
    if (canClick) {
        const reactionTime = Date.now() - reactionStartTime;
        result.textContent = `⚡ ${reactionTime}ms! ${reactionTime < 300 ? '🔥 Super fast!' : reactionTime < 500 ? '👍 Nice!' : '😅 Keep practicing!'}`;
        result.style.color = reactionTime < 300 ? '#2ecc71' : reactionTime < 500 ? '#f39c12' : '#e74c3c';
        box.className = 'reaction-box';
        box.textContent = 'Click Start to play again';
        box.onclick = null;
        canClick = false;
        btn.disabled = false;
    } else if (box.classList.contains('waiting')) {
        clearTimeout(reactionTimeout);
        result.textContent = '❌ Too early! Try again!';
        result.style.color = '#e74c3c';
        box.className = 'reaction-box';
        box.textContent = 'Click Start to try again';
        box.onclick = null;
        btn.disabled = false;
    }
}

// Add some auto-bubbles for ambient effect
function createAutoBubble() {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.25;
    createBubble(x, y);
}

// Create ambient bubbles periodically
setInterval(createAutoBubble, 3000);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation for games
document.addEventListener('keydown', (e) => {
    // Press 'R' to roll dice
    if (e.key.toLowerCase() === 'r') {
        rollDice();
    }
    // Press 'C' to change color
    if (e.key.toLowerCase() === 'c') {
        changeColor();
    }
});
