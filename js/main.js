const blue = '#1a73e8';
const blueBg = 'rgba(26, 115, 232, 0.2)';
const red = '#ea4335';
const redBg = 'rgba(234, 67, 53, 0.2)';
const yellow = '#fbbc04';
const yellowBg = 'rgba(251, 188, 4, 0.2)';
const green = '#34a853';
const greenBg = 'rgba(52, 168, 83, 0.2)';
const gray = '#9aa0a6';
const grayBg = 'rgba(154, 160, 166, 0.2)';
const gridColor = '#f1f3f4';
const fontColor = '#3c4043';

Chart.defaults.font.family = 'Roboto, sans-serif';
Chart.defaults.color = fontColor;

document.addEventListener('DOMContentLoaded', function () {
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: ['Startup Speed', 'Efisiensi RAM', 'Laravel Support', 'Mobile Testing', 'Bot AI / Node.js', 'Konfigurasi Mudah'],
            datasets: [
                {
                    label: 'XAMPP Standar',
                    data: [6, 6, 3, 2, 3, 4],
                    borderColor: gray,
                    backgroundColor: grayBg,
                    borderWidth: 2,
                    pointRadius: 3,
                },
                {
                    label: 'Awan Server V5',
                    data: [5, 4, 8, 10, 9, 6],
                    borderColor: yellow,
                    backgroundColor: yellowBg,
                    borderWidth: 2,
                    pointRadius: 3,
                },
                {
                    label: 'Laragon',
                    data: [10, 10, 10, 5, 5, 8],
                    borderColor: green,
                    backgroundColor: greenBg,
                    borderWidth: 2,
                    pointRadius: 3,
                },
                {
                    label: 'XAMPP + Meta Panel',
                    data: [9, 9, 9, 10, 10, 10],
                    borderColor: blue,
                    backgroundColor: blueBg,
                    borderWidth: 3,
                    pointRadius: 4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: gridColor },
                    grid: { color: gridColor },
                    pointLabels: { color: fontColor, font: { size: 11, weight: '500' } },
                    ticks: { display: false, min: 0, max: 10, stepSize: 2 }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: fontColor, font: { size: 12 }, padding: 16, usePointStyle: true }
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#202124',
                    bodyColor: '#3c4043',
                    borderColor: '#dadce0',
                    borderWidth: 1,
                    padding: 12,
                    boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)'
                }
            }
        }
    });
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Waktu Startup (detik)', 'Waktu Setup Bot (menit)', 'Waktu Debug DB (menit)', 'Kemudahan Akses (skor 10)', 'Kecepatan Iterasi (skor 10)'],
            datasets: [
                {
                    label: 'XAMPP Standar',
                    data: [15, 25, 18, 4, 5],
                    backgroundColor: gray,
                    borderRadius: 4,
                },
                {
                    label: 'Laragon',
                    data: [5, 12, 10, 7, 7],
                    backgroundColor: green,
                    borderRadius: 4,
                },
                {
                    label: 'Awan Server V5',
                    data: [20, 8, 7, 8, 8],
                    backgroundColor: yellow,
                    borderRadius: 4,
                },
                {
                    label: 'XAMPP + Meta Panel',
                    data: [8, 5, 6, 10, 10],
                    backgroundColor: blue,
                    borderRadius: 4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: fontColor, font: { size: 11 } }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: { color: fontColor },
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: fontColor, font: { size: 12 }, padding: 16, usePointStyle: true }
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#202124',
                    bodyColor: '#3c4043',
                    borderColor: '#dadce0',
                    borderWidth: 1,
                    padding: 12,
                }
            }
        }
    });
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Setup Awal', 'Koneksi DB', 'Deploy Bot', 'Debug Error', 'Iterasi Fitur', 'Testing Mobile', 'Monitoring', 'Maintenance'],
            datasets: [
                {
                    label: 'Metode Manual (CMD + XAMPP)',
                    data: [8, 7, 6, 5, 4, 3, 4, 5],
                    borderColor: gray,
                    backgroundColor: grayBg,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                },
                {
                    label: 'XAMPP + Meta Panel',
                    data: [9, 9, 8, 8, 9, 9, 8, 9],
                    borderColor: blue,
                    backgroundColor: blueBg,
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: fontColor, font: { size: 11 } }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: { color: fontColor },
                    min: 0,
                    max: 10,
                    title: { display: true, text: 'Skor Kemudahan (0-10)', color: fontColor, font: { size: 12 } }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: fontColor, font: { size: 12 }, padding: 16, usePointStyle: true }
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#202124',
                    bodyColor: '#3c4043',
                    borderColor: '#dadce0',
                    borderWidth: 1,
                    padding: 12,
                }
            }
        }
    });
    const taskCtx = document.getElementById('taskBarChart').getContext('2d');
    new Chart(taskCtx, {
        type: 'bar',
        data: {
            labels: ['Setup WA Bot', 'Koneksi Database', 'Deploy ke Server', 'Debug Error', 'Tambah Fitur AI', 'Testing LAN/HP'],
            datasets: [
                {
                    label: 'Metode Manual (menit)',
                    data: [45, 20, 35, 30, 50, 25],
                    backgroundColor: red,
                    borderRadius: 4,
                },
                {
                    label: 'XAMPP + Meta Panel (menit)',
                    data: [10, 7, 15, 10, 18, 5],
                    backgroundColor: blue,
                    borderRadius: 4,
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: fontColor },
                    title: { display: true, text: 'Waktu (menit)', color: fontColor, font: { size: 12 } },
                    beginAtZero: true
                },
                y: {
                    grid: { display: false },
                    ticks: { color: fontColor, font: { size: 11 } }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: fontColor, font: { size: 12 }, padding: 16, usePointStyle: true }
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#202124',
                    bodyColor: '#3c4043',
                    borderColor: '#dadce0',
                    borderWidth: 1,
                    padding: 12,
                }
            }
        }
    });
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Coding & Development', 'Terminal/Bot Runtime', 'Database Management', 'Config & Debugging', 'Mobile Testing'],
            datasets: [{
                data: [35, 25, 18, 12, 10],
                backgroundColor: [blue, green, yellow, red, '#a142f4'],
                borderWidth: 0,
                hoverOffset: 4,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: fontColor, font: { size: 12 }, padding: 16, usePointStyle: true }
                },
                tooltip: {
                    backgroundColor: '#ffffff',
                    titleColor: '#202124',
                    bodyColor: '#3c4043',
                    borderColor: '#dadce0',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            return ' ' + context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
});

function copyCode(btn) {
    const codeBlock = btn.parentElement;
    let textToCopy = '';

    for (const node of codeBlock.childNodes) {
        if (node.nodeName !== 'BUTTON') {
            textToCopy += node.textContent;
        }
    }

    navigator.clipboard.writeText(textToCopy.trim()).then(function () {
        showToast('Kode berhasil disalin!');
        btn.innerHTML = 'Tersalin';
        setTimeout(function () { btn.innerHTML = 'Salin'; }, 2000);
    });
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2500);
}

window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const sections = document.querySelectorAll('.doc-section');
const sidebarLinks = document.querySelectorAll('#sidebar-nav .sidebar-link');

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            sidebarLinks.forEach(function (link) {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
});

sections.forEach(function (section) {
    observer.observe(section);
});