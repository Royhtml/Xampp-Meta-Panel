const launchDate = new Date();
launchDate.setMonth(launchDate.getMonth() + 3);

function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate.getTime() - now;

    if (distance < 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);
const form = document.getElementById('subscribeForm');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toast-msg');

function showToast(message, isError = false) {
    toastMsg.innerText = message;
    if (isError) {
        toast.querySelector('i').className = 'fas fa-exclamation-circle mr-2 text-red-400';
    } else {
        toast.querySelector('i').className = 'fas fa-check-circle mr-2 text-green-400';
    }
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;

    if (email) {
        console.log(`Email submitted: ${email}`);
        showToast(`You're on the list! We'll notify ${email}`);
        document.getElementById('emailInput').value = '';
    } else {
        showToast('Please enter a valid email.', true);
    }
});