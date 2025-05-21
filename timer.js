// timer.js
function startTimer(button, durationMinutes) {
    const totalSeconds = durationMinutes * 60;
    let remaining = totalSeconds;

    const interval = setInterval(() => {
        remaining--;

        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        button.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Blinken in den letzten 30 Sekunden
        if (remaining <= 30 && remaining > 0) {
            button.classList.toggle('attention');
        }

        // Wenn Zeit abgelaufen
        if (remaining <= 0) {
            clearInterval(interval);
            playGong();
            button.textContent = 'Zeit abgelaufen!';
            button.disabled = true;
            button.classList.remove('attention');
        }
    }, 1000);
}

function setupTimerButtons() {
    document.querySelectorAll('[data-timer]').forEach(button => {
        button.addEventListener('click', () => {
            const duration = parseInt(button.dataset.timer, 10);
            button.disabled = true;
            startTimer(button, duration);
        });
    });
}

function playGong() {
    const audio = new Audio('gong.mp3'); // Lege eine gong.mp3 Datei im gleichen Ordner ab
    audio.play();
}

// Beim Laden starten
document.addEventListener('DOMContentLoaded', setupTimerButtons);
