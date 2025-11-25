// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
window.addEventListener("load", function () {
  document.body.classList.remove("load");
});


// Проверяем наличие элемента .header


// Код в выбором скорости
// document.addEventListener('DOMContentLoaded', () => {
//   const video = document.getElementById('video');
//   const playPauseBtn = document.getElementById('play-pause-btn');
//   const progressBar = document.getElementById('progress-bar');
//   const currentTimeEl = document.getElementById('current-time');
//   const totalTimeEl = document.getElementById('total-time');
//   const playbackRateSelect = document.getElementById('playback-rate'); // <-- добавляем

//   // Устанавливаем preload и загружаем метаданные
//   video.preload = 'metadata';
//   video.load();

//   // Обновляем общее время при загрузке метаданных
//   video.addEventListener('loadedmetadata', () => {
//     console.log('Duration:', video.duration);
//     if (!isNaN(video.duration) && video.duration > 0) {
//       totalTimeEl.textContent = formatTime(video.duration);
//       progressBar.value = 0; // <-- обнуляем ползунок
//       currentTimeEl.textContent = formatTime(video.currentTime); // <-- обнуляем текущее время
//     }
//   });

//   // Обновляем прогресс и время во время воспроизведения
//   video.addEventListener('timeupdate', () => {
//     const percent = (video.currentTime / video.duration) * 100;
//     progressBar.value = percent;
//     currentTimeEl.textContent = formatTime(video.currentTime);
//   });

//   // Перемотка при клике на ползунок
//   progressBar.addEventListener('input', () => {
//     const time = (progressBar.value / 100) * video.duration;
//     video.currentTime = time;
//   });

//   // Переключение Play/Pause
//   playPauseBtn.addEventListener('click', () => {
//     if (video.paused) {
//       video.play();
//       playPauseBtn.textContent = '⏸';
//     } else {
//       video.pause();
//       playPauseBtn.textContent = '▶';
//     }
//   });

//   // Обновляем кнопку при окончании воспроизведения
//   video.addEventListener('ended', () => {
//     playPauseBtn.textContent = '▶';
//     progressBar.value = 0; // <-- сбрасываем ползунок в конец
//     currentTimeEl.textContent = formatTime(0);
//   });

//   // ✅ Обработчик выбора скорости
//   playbackRateSelect.addEventListener('change', () => {
//     video.playbackRate = parseFloat(playbackRateSelect.value);
//   });

//   // Формат времени (секунды -> MM:SS)
//   function formatTime(seconds) {
//     if (isNaN(seconds)) return '0:00';
//     const min = Math.floor(seconds / 60);
//     const sec = Math.floor(seconds % 60);
//     return `${min}:${sec < 10 ? '0' : ''}${sec}`;
//   }
// });


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




// document.addEventListener('DOMContentLoaded', () => {
//   const video = document.getElementById('video');
//   const playPauseBtn = document.getElementById('play-pause-btn');
//   const currentTimeEl = document.getElementById('current-time');
//   const totalTimeEl = document.getElementById('total-time');
//   const playbackRateSelect = document.getElementById('playback-rate');

//   const progressTrack = document.getElementById('progress-track');
//   const progressFill = document.getElementById('progress-fill');
//   const progressThumb = document.getElementById('progress-thumb');

//   // SVG-иконки
//   const iconPlay = playPauseBtn.querySelector('.icon-play');
//   const iconPause = playPauseBtn.querySelector('.icon-pause');

//   // Устанавливаем preload и загружаем метаданные
//   video.preload = 'metadata';
//   video.load();

//   // Обновляем общее время при загрузке метаданных
//   video.addEventListener('loadedmetadata', () => {
//     if (!isNaN(video.duration) && video.duration > 0) {
//       totalTimeEl.textContent = formatTime(video.duration);
//       updateProgress(0);
//       currentTimeEl.textContent = formatTime(video.currentTime);
//     }
//   });

//   // Обновляем прогресс и время во время воспроизведения
//   video.addEventListener('timeupdate', () => {
//     if (!isDragging) { // ✅ Не обновляем, если шарик перетаскивается
//       const percent = (video.currentTime / video.duration) * 100;
//       updateProgress(percent);
//       currentTimeEl.textContent = formatTime(video.currentTime);
//     }
//   });

//   // Обработчик клика по прогресс-бару для перемотки
//   progressTrack.addEventListener('click', (e) => {
//     if (isDragging) return; // ✅ Не перематываем, если перетаскиваем

//     const rect = progressTrack.getBoundingClientRect();
//     const pos = (e.clientX - rect.left) / rect.width;
//     const time = pos * video.duration;
//     video.currentTime = time;
//   });

//   // ✅ Переменные для перетаскивания
//   let isDragging = false;

//   // Начало перетаскивания
//   progressThumb.addEventListener('mousedown', (e) => {
//     isDragging = true;
//     e.preventDefault();
//   });

//   // Движение мыши
//   document.addEventListener('mousemove', (e) => {
//     if (!isDragging) return;

//     const rect = progressTrack.getBoundingClientRect();
//     let pos = (e.clientX - rect.left) / rect.width;
//     pos = Math.min(Math.max(pos, 0), 1); // Ограничиваем от 0 до 1

//     const percent = pos * 100;
//     updateProgress(percent);

//     // Обновляем время видео
//     const time = pos * video.duration;
//     video.currentTime = time;
//   });

//   // Отпускание кнопки мыши
//   document.addEventListener('mouseup', () => {
//     if (isDragging) {
//       isDragging = false;
//     }
//   });

//   // Переключение Play/Pause (с SVG)
//   playPauseBtn.addEventListener('click', () => {
//     if (video.paused) {
//       video.play();
//       iconPlay.style.display = 'none';
//       iconPause.style.display = 'block';
//     } else {
//       video.pause();
//       iconPlay.style.display = 'block';
//       iconPause.style.display = 'none';
//     }
//   });

//   // Обновляем кнопку при окончании воспроизведения
//   video.addEventListener('ended', () => {
//     iconPlay.style.display = 'block';
//     iconPause.style.display = 'none';
//     updateProgress(0);
//     currentTimeEl.textContent = formatTime(0);
//   });

//   // Изменение скорости воспроизведения
//   playbackRateSelect.addEventListener('change', () => {
//     video.playbackRate = parseFloat(playbackRateSelect.value);
//   });

//   // ✅ Функция обновления прогресса
//   function updateProgress(percent) {
//     progressFill.style.width = `${percent}%`;
//     progressThumb.style.left = `${percent}%`;
//   }

//   // Формат времени (секунды -> MM:SS)
//   function formatTime(seconds) {
//     if (isNaN(seconds)) return '0:00';
//     const min = Math.floor(seconds / 60);
//     const sec = Math.floor(seconds % 60);
//     return `${min}:${sec < 10 ? '0' : ''}${sec}`;
//   }
// });



document.addEventListener('DOMContentLoaded', () => {
  const players = document.querySelectorAll('.video-player');

  players.forEach((player) => {
    initPlayer(player);
  });

  // ✅ Функция для остановки всех плееров
  function pauseAllPlayers(exceptPlayer = null) {
    players.forEach(player => {
      if (player === exceptPlayer) return;

      const videoElement = player.querySelector('.video-element');
      const iconPlay = player.querySelector('.icon-play');
      const iconPause = player.querySelector('.icon-pause');

      if (!videoElement.paused) {
        videoElement.pause();

        if (iconPlay && iconPause) {
          iconPlay.style.display = 'block';
          iconPause.style.display = 'none';
        }
      }
    });
  }

  function initPlayer(player) {
    const videoElement = player.querySelector('.video-element');
    const playPauseBtn = player.querySelector('.play-pause-btn');
    const playbackRateSelect = player.querySelector('.playback-rate');
    const progressTrack = player.querySelector('.progress-track');
    const progressFill = player.querySelector('.progress-fill');
    const progressThumb = player.querySelector('.progress-thumb');
    const currentTimeEl = player.querySelector('.current-time');
    const totalTimeEl = player.querySelector('.total-time');
    const iconPlay = playPauseBtn.querySelector('.icon-play');
    const iconPause = playPauseBtn.querySelector('.icon-pause');

    const videoSrc = player.dataset.videoSrc;
    const poster = player.dataset.poster;

    // ✅ Устанавливаем постер сразу через атрибут
    videoElement.poster = poster;

    let isDragging = false;
    let isLoaded = false;

    // ✅ Функция загрузки видео при первом клике на play
    function loadVideo() {
      if (isLoaded) return;

      videoElement.src = videoSrc;
      videoElement.preload = 'metadata';
      videoElement.poster = poster;
      videoElement.load();
      isLoaded = true;
    }

    // Обработчик кнопки Play
    playPauseBtn.addEventListener('click', () => {
      if (!isLoaded) {
        loadVideo();
      }

      if (videoElement.paused) {
        // ✅ Останавливаем все остальные плееры
        pauseAllPlayers(player);

        videoElement.play();
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
      } else {
        videoElement.pause();
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
      }
    });

    // Обновляем общее время при загрузке метаданных
    videoElement.addEventListener('loadedmetadata', () => {
      totalTimeEl.textContent = formatTime(videoElement.duration);
      progressFill.style.width = '0%';
      progressThumb.style.left = '0%';
      currentTimeEl.textContent = formatTime(0);
    });

    // Обновляем прогресс и время во время воспроизведения
    videoElement.addEventListener('timeupdate', () => {
      if (isDragging || !isLoaded) return;

      const percent = (videoElement.currentTime / videoElement.duration) * 100;
      progressFill.style.width = `${percent}%`;
      progressThumb.style.left = `${percent}%`;
      currentTimeEl.textContent = formatTime(videoElement.currentTime);
    });

    // Клик по прогресс-бару
    progressTrack.addEventListener('click', (e) => {
      if (!isLoaded || isDragging) return;

      const rect = progressTrack.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const time = pos * videoElement.duration;
      videoElement.currentTime = time;
    });

    // Перетаскивание
    progressThumb.addEventListener('mousedown', (e) => {
      if (!isLoaded) return;
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging || !isLoaded) return;

      const rect = progressTrack.getBoundingClientRect();
      let pos = (e.clientX - rect.left) / rect.width;
      pos = Math.min(Math.max(pos, 0), 1);

      const percent = pos * 100;
      progressFill.style.width = `${percent}%`;
      progressThumb.style.left = `${percent}%`;

      const time = pos * videoElement.duration;
      videoElement.currentTime = time;
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Обновляем кнопку при окончании воспроизведения
    videoElement.addEventListener('ended', () => {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
      progressFill.style.width = '0%';
      progressThumb.style.left = '0%';
      currentTimeEl.textContent = formatTime(0);
    });

    // Изменение скорости
    playbackRateSelect.addEventListener('change', () => {
      if (isLoaded) {
        videoElement.playbackRate = parseFloat(playbackRateSelect.value);
      }
    });

    // Формат времени
    function formatTime(seconds) {
      if (isNaN(seconds)) return '0:00';
      const min = Math.floor(seconds / 60);
      const sec = Math.floor(seconds % 60);
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
  }
});
