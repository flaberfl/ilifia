// Подключение функционала "Чертоги Фрилансера"
import {
  isMobile
} from "./functions.js";
// Подключение списка активных модулей
import {
  flsModules
} from "./modules.js";
window.addEventListener("load", function () {
  document.body.classList.remove("load");
});


// Проверяем наличие элемента .header

const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.classList.add('_fixed');
    } else {
      header.classList.remove('_fixed');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const audioPlayers = document.querySelectorAll('.audio-player');

  audioPlayers.forEach((player) => {
    const audioSrc = player.dataset.audioSrc;

    // Создаём аудио элемент без src
    const audio = new Audio();

    const playPauseBtn = player.querySelector('.play-pause-btn');
    const progressTrack = player.querySelector('.progress-track');
    const progressFill = player.querySelector('.progress-fill');
    const progressThumb = player.querySelector('.progress-thumb');
    const currentTimeEl = player.querySelector('.current-time');
    const totalTimeEl = player.querySelector('.total-time');

    // Флаг, чтобы знать, загружен ли уже файл
    let isLoaded = false;

    // Обновляем общее время при загрузке метаданных
    audio.addEventListener('loadedmetadata', () => {
      totalTimeEl.textContent = formatTime(audio.duration);
    });

    // Обновляем прогресс во время воспроизведения
    audio.addEventListener('timeupdate', () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      progressFill.style.width = `${percent}%`;
      progressThumb.style.left = `${percent}%`;
      currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    // Обработка клика по кнопке воспроизведения/паузы
    playPauseBtn.addEventListener('click', () => {
      if (audio.paused) {
        // Загружаем файл только при первом клике
        if (!isLoaded) {
          audio.src = audioSrc;
          audio.load();
          isLoaded = true;
        }
        audio.play();
        playPauseBtn.classList.add('is-playing');
      } else {
        audio.pause();
        playPauseBtn.classList.remove('is-playing');
      }
    });

    // Перемотка при клике по треку
    progressTrack.addEventListener('click', (e) => {
      if (!isLoaded) return; // Игнорировать, если аудио не загружено

      const trackWidth = progressTrack.clientWidth;
      const clickX = e.offsetX;
      const newTime = (clickX / trackWidth) * audio.duration;
      audio.currentTime = newTime;
    });

    // Сброс кнопки при окончании аудио
    audio.addEventListener('ended', () => {
      playPauseBtn.classList.remove('is-playing');
    });

    // Форматирование времени в MM:SS
    function formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
  });
});