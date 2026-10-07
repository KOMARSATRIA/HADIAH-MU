// Variable Status & Data Janji
let isCandleBlown = false;
let typingExecuted = false;
let selectedGiftData = { name: '', icon: '' };
let promiseDetails = {};
let currentPlayingPage = 0;

// Nomor WhatsApp Tujuan
const targetWhatsAppNumber = '6285602959536'; 

// Teks Ucapan Selamat Ulang Tahun (Halaman 2)
const birthdayMessage = `Selamat ulang tahun ay🥳✨

Semoga di usiamu yang baru ini, kamu makin bahagia, selalu diberikan kesehatan, dan semua impian serta cita-citamu bisa tercapai satu per satu.

Terima kasih sudah selalu ada dan bawa keceriaan.  klo di bilangin jangan ngeyellll 
cantikkk terussss ayyy! 🥰💕`;

// --- FUNGSI MENGHENTIKAN SEMUA MUSIK ---
function stopAllMusic() {
    const musics = [
        document.getElementById('bgMusicPage1_part1'),
        document.getElementById('bgMusicPage1_part2'),
        document.getElementById('bgMusicPage2'),
        document.getElementById('bgMusicPage3')
    ];

    musics.forEach(music => {
        if (music) {
            music.pause();
            music.currentTime = 0;
        }
    });
}

// --- FUNGSI PUTAR MUSIK SESUAI HALAMAN ---
function playMusicForPage(pageNumber) {
    if (currentPlayingPage === pageNumber && pageNumber !== 1) return;

    stopAllMusic();
    currentPlayingPage = pageNumber;

    if (pageNumber === 1) {
        const music1 = document.getElementById('bgMusicPage1_part1');
        const music2 = document.getElementById('bgMusicPage1_part2');

        if (music1 && music2) {
            // Putar Musik 1
            music1.play().catch(err => console.log("Autoplay tercegah:", err));

            // Ketika Musik 1 Selesai -> Langsung Lanjut ke Musik 2 (No Loop)
            music1.onended = function() {
                music2.play().catch(err => console.log("Gagal putar musik 2:", err));
            };
        }
    } else {
        const targetMusic = document.getElementById(`bgMusicPage${pageNumber}`);
        if (targetMusic) {
            targetMusic.play().catch(err => console.log("Autoplay tercegah:", err));
        }
    }
}

// Interaksi pertama untuk memicu musik di Halaman 1
function startFirstInteraction() {
    playMusicForPage(1);
}

document.addEventListener('click', startFirstInteraction, { once: true });
document.addEventListener('touchstart', startFirstInteraction, { once: true });

// --- EFEK TULISAN JATUH (HAPPY BIRTHDAY TO YOU) ---
function createFallingText() {
    const container = document.getElementById('fallingContainer');
    const items = ['Happy Birthday to You 🎈', '🎉 HBD!', '💖', '🎂', 'Happy Birthday ✨', '🌸'];

    setInterval(() => {
        const item = document.createElement('div');
        item.classList.add('falling-item');
        
        item.innerText = items[Math.floor(Math.random() * items.length)];
        item.style.left = Math.random() * 95 + 'vw';
        item.style.fontSize = (Math.random() * 8 + 12) + 'px';
        
        const duration = Math.random() * 4 + 4;
        item.style.animationDuration = duration + 's';
        
        container.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, duration * 1000);
    }, 400);
}

// --- FUNGSI HITUNG MUNDUR TOMBOL NEXT ---
function startNextButtonTimer(buttonId, originalText, seconds) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    btn.disabled = true;
    let timeLeft = seconds;

    btn.innerText = `${originalText} (${timeLeft}s) ⏳`;

    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            btn.innerText = `${originalText} (${timeLeft}s) ⏳`;
        } else {
            clearInterval(timer);
            btn.disabled = false;
            btn.innerText = `${originalText} ➔`;
        }
    }, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    createFallingText();
    startNextButtonTimer('btnNext1', 'Lanjut 🎉', 10);
});

// --- NAVIGASI HALAMAN ---
function nextPage(pageNumber) {
    playMusicForPage(pageNumber);

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    if (pageNumber === 2) {
        startNextButtonTimer('btnNext2', 'Pilih Hadiah 🎁', 200);

        if (!typingExecuted) {
            typeWriterEffect(birthdayMessage, 'typingText', 35);
            typingExecuted = true;
        }
    }
}

// --- EFEK TIUP LILIN (HALAMAN 1) ---
const cakeContainer = document.getElementById('cakeContainer');
const flame = document.getElementById('flame');
const smoke = document.getElementById('smoke');
const cakeStatus = document.getElementById('cakeStatus');

cakeContainer.addEventListener('click', function() {
    playMusicForPage(1);

    if (!isCandleBlown) {
        flame.classList.add('off');
        smoke.classList.add('active');
        
        cakeStatus.innerText = "Yay! Lilinnya sudah berhasil ditiup! 🥳✨";
        cakeStatus.style.background = "#d4edda";
        cakeStatus.style.color = "#155724";

        isCandleBlown = true;
    }
});

// --- EFEK MENGETIK OTOMATIS (HALAMAN 2) ---
function typeWriterEffect(text, elementId, speed) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = "";

    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// --- EFEK TOMBOL CLOSE MENGHINDAR (PRANK) ---
function applyPrankButton(buttonId) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    const moveButton = () => {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 150;
        btn.style.transform = `translate(${x}px, ${y}px)`;
    };

    btn.addEventListener('mouseover', moveButton);
    btn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveButton();
    });
}

applyPrankButton('btnClosePage1');
applyPrankButton('btnClosePage2');
applyPrankButton('btnClosePage3');

// --- PILIHAN HADIAH & FORMULIR (HALAMAN 3) ---
function selectGift(giftName, icon) {
    playMusicForPage(3);
    selectedGiftData = { name: giftName, icon: icon };

    document.getElementById('giftsGrid').style.display = 'none';
    document.getElementById('scheduleFormCard').style.display = 'block';

    document.getElementById('selectedGiftIcon').innerText = icon;
    document.getElementById('selectedGiftName').innerText = giftName;
}

function resetGiftSelection() {
    document.getElementById('giftsGrid').style.display = 'flex';
    document.getElementById('scheduleFormCard').style.display = 'none';
}

function submitGiftDetail(event) {
    event.preventDefault();

    const name = document.getElementById('userName').value;
    const day = document.getElementById('eventDay').value;
    const dateNum = document.getElementById('eventDateNum').value;
    const month = document.getElementById('eventMonth').value;
    const notes = document.getElementById('userNotes').value || '-';

    promiseDetails = {
        name: name,
        gift: selectedGiftData.name,
        day: day,
        date: `${dateNum} ${month}`,
        notes: notes
    };

    const modal = document.getElementById('giftModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalMessage = document.getElementById('modalMessage');

    modalIcon.innerText = selectedGiftData.icon;
    modalMessage.innerHTML = `
        <strong>Identitas:</strong> ${name}<br>
        <strong>Kado Terpilih:</strong> ${selectedGiftData.name}<br>
        <strong>Jadwal:</strong> ${day}, ${dateNum} ${month}<br>
        <strong>Catatan:</strong> ${notes}<br><br>
        <em>Klik tombol di bawah untuk mengirim konfirmasi ke WhatsApp yaa! ✨🥰</em>
    `;

    modal.style.display = "flex";
}

// --- FUNGSI KIRIM KE WHATSAPP ---
function sendToWhatsApp(phoneNumber) {
    const num = phoneNumber || targetWhatsAppNumber;

    const message = `Halo Ay! Saya sudah memilih hadiah ulang tahun nih 🥳✨\n\n` +
                    `👤 *Nama:* ${promiseDetails.name}\n` +
                    `🎁 *Hadiah Terpilih:* ${promiseDetails.gift}\n` +
                    `📅 *Hari & Tanggal:* ${promiseDetails.day}, ${promiseDetails.date}\n` +
                    `📝 *Catatan:* ${promiseDetails.notes}\n\n` +
                    `Jangan lupa janjinya yaa! 🥰💕`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://api.whatsapp.com/send?phone=${num}&text=${encodedMessage}`;

    window.open(waUrl, '_blank');
    closeModal();
}

function closeModal() {
    document.getElementById('giftModal').style.display = "none";
}
