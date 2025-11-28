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

  // Храним активные аудио и их плееры
  const activeAudios = new Set();
  const audioToPlayerMap = new Map();

  audioPlayers.forEach((player) => {
    const audioSrc = player.dataset.audioSrc;

    // Создаём аудио элемент без src
    const audio = new Audio();

    // Сохраняем связь аудио -> плеер
    audioToPlayerMap.set(audio, player);

    const playPauseBtn = player.querySelector('.play-pause-btn');
    const iconPlay = player.querySelector('.icon-play');
    const iconPause = player.querySelector('.icon-pause');
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
        // Останавливаем все другие аудио
        audioToPlayerMap.forEach((playerRef, otherAudio) => {
          if (otherAudio !== audio && !otherAudio.paused) {
            otherAudio.pause();

            // Находим соответствующий плеер и обновляем иконки
            const btn = playerRef.querySelector('.play-pause-btn');
            const ip = playerRef.querySelector('.icon-play');
            const ipa = playerRef.querySelector('.icon-pause');
            btn.classList.remove('is-playing');
            ip.style.display = 'block';
            ipa.style.display = 'none';
          }
        });

        // Загружаем файл только при первом клике
        if (!isLoaded) {
          audio.src = audioSrc;
          audio.load();
          isLoaded = true;
        }
        audio.play();
        playPauseBtn.classList.add('is-playing');
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';

        // Добавляем в список активных
        activeAudios.add(audio);
      } else {
        audio.pause();
        playPauseBtn.classList.remove('is-playing');
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        // Удаляем из активных
        activeAudios.delete(audio);
      }
    });

    // Перемотка при клике по треку
    progressTrack.addEventListener('click', (e) => {
      if (!isLoaded) return;

      const trackWidth = progressTrack.clientWidth;
      const clickX = e.offsetX;
      const newTime = (clickX / trackWidth) * audio.duration;
      audio.currentTime = newTime;
    });

    // Сброс кнопки при окончании аудио
    audio.addEventListener('ended', () => {
      playPauseBtn.classList.remove('is-playing');
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
      // Удаляем из списка активных
      activeAudios.delete(audio);
    });

    // Форматирование времени в MM:SS
    function formatTime(seconds) {
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
  });
});


// const totalSlides = document.querySelectorAll('.swiper-slide').length;
// const slidesPerView = 3;
// const totalBullets = Math.ceil(totalSlides / slidesPerView);

// // Генерация пагинации вручную
// let paginationHTML = '';
// for (let i = 0; i < totalBullets; i++) {
//   paginationHTML += `<span class="swiper-pagination-bullet" data-index="${i}"></span>`;
// }
// document.querySelector('.swiper-pagination').innerHTML = paginationHTML;


// document.addEventListener('DOMContentLoaded', () => {
//   const audioPlayers = document.querySelectorAll('.audio-player');

//   audioPlayers.forEach((player) => {
//     const audioSrc = player.dataset.audioSrc;

//     // Создаём аудио элемент без src
//     const audio = new Audio();

//     const playPauseBtn = player.querySelector('.play-pause-btn');
//     const iconPlay = player.querySelector('.icon-play');
//     const iconPause = player.querySelector('.icon-pause');
//     const progressTrack = player.querySelector('.progress-track');
//     const progressFill = player.querySelector('.progress-fill');
//     const progressThumb = player.querySelector('.progress-thumb');
//     const currentTimeEl = player.querySelector('.current-time');
//     const totalTimeEl = player.querySelector('.total-time');

//     // Флаг, чтобы знать, загружен ли уже файл
//     let isLoaded = false;

//     // Обновляем общее время при загрузке метаданных
//     audio.addEventListener('loadedmetadata', () => {
//       totalTimeEl.textContent = formatTime(audio.duration);
//     });

//     // Обновляем прогресс во время воспроизведения
//     audio.addEventListener('timeupdate', () => {
//       const percent = (audio.currentTime / audio.duration) * 100;
//       progressFill.style.width = `${percent}%`;
//       progressThumb.style.left = `${percent}%`;
//       currentTimeEl.textContent = formatTime(audio.currentTime);
//     });

//     // Обработка клика по кнопке воспроизведения/паузы
//     playPauseBtn.addEventListener('click', () => {
//       if (audio.paused) {
//         // Загружаем файл только при первом клике
//         if (!isLoaded) {
//           audio.src = audioSrc;
//           audio.load();
//           isLoaded = true;
//         }
//         audio.play();
//         playPauseBtn.classList.add('is-playing');
//         iconPlay.style.display = 'none';
//         iconPause.style.display = 'block';
//       } else {
//         audio.pause();
//         playPauseBtn.classList.remove('is-playing');
//         iconPlay.style.display = 'block';
//         iconPause.style.display = 'none';
//       }
//     });

//     // Перемотка при клике по треку
//     progressTrack.addEventListener('click', (e) => {
//       if (!isLoaded) return; // Игнорировать, если аудио не загружено

//       const trackWidth = progressTrack.clientWidth;
//       const clickX = e.offsetX;
//       const newTime = (clickX / trackWidth) * audio.duration;
//       audio.currentTime = newTime;
//     });

//     // Сброс кнопки при окончании аудио
//     audio.addEventListener('ended', () => {
//       playPauseBtn.classList.remove('is-playing');
//       iconPlay.style.display = 'block';
//       iconPause.style.display = 'none';
//     });

//     // Форматирование времени в MM:SS
//     function formatTime(seconds) {
//       const min = Math.floor(seconds / 60);
//       const sec = Math.floor(seconds % 60);
//       return `${min}:${sec < 10 ? '0' : ''}${sec}`;
//     }
//   });
// });