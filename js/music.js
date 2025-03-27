const tracks = [
    'music/Legendary.mp3',
    'music/Ruthlessness.mp3',
    'music/TheChallenge.mp3'
];

const audio = new Audio();
let currentTrack = 0;

const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const songInfo = document.querySelector('.song-info');

function getTrackName(filePath) {
    const fileName = filePath.split('/').pop(); // Get the filename with extension
    return fileName.replace('.mp3', ''); // Remove .mp3 extension
}

function loadTrack(index) {
    audio.src = tracks[index];
    audio.load();
    songInfo.textContent = getTrackName(tracks[index]); // Display track name
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    playPauseBtn.textContent = '⏸️';
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    audio.play();
    playPauseBtn.textContent = '⏸️';
}

playPauseBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
});

// Auto play next track when current track ends
audio.addEventListener('ended', nextTrack);

// Initial track load
loadTrack(currentTrack);