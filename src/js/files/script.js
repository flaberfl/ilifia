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
    const progressFill2 = player.querySelector('.progress-fill');
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
      progressFill2.style.width = `${percent}%`;
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

const favoriteBtns = document.querySelectorAll('.favorite-btn');

favoriteBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    this.classList.toggle('enable');
  });
});


document.addEventListener('DOMContentLoaded', function () {
  const categoryItems = document.querySelectorAll('.filter-category[data-category]');
  const articles = document.querySelectorAll('.training-articles__item');

  // Функция для отображения статей по активным категориям
  function showArticlesByActiveCategories() {
    // Получаем список активных категорий
    const activeCategories = Array.from(categoryItems)
      .filter(item => item.classList.contains('active'))
      .map(item => item.getAttribute('data-category'));

    // Если активных категорий нет — показываем все
    if (activeCategories.length === 0) {
      articles.forEach(article => {
        article.classList.add('visible');
      });
    } else {
      // Иначе — показываем только те, которые подходят под хотя бы одну активную категорию
      articles.forEach(article => {
        const articleCategory = article.getAttribute('data-category');
        if (activeCategories.includes(articleCategory)) {
          article.classList.add('visible');
        } else {
          article.classList.remove('visible');
        }
      });
    }
  }

  // Обработчик клика по категории
  categoryItems.forEach(item => {
    const link = item.querySelector('a');
    const removeBtn = item.querySelector('.remove-btn');
    const category = item.getAttribute('data-category');

    link.addEventListener('click', function (e) {
      e.preventDefault(); // <--- Добавлено

      // Переключаем активный класс у текущей категории
      item.classList.toggle('active');

      // Пересчитываем, какие статьи показывать
      showArticlesByActiveCategories();
    });

    // Обработчик клика по крестику
    removeBtn.addEventListener('click', function (e) {
      e.preventDefault(); // <--- Добавлено

      // Убираем активный класс у текущей категории
      item.classList.remove('active');

      // Пересчитываем, какие статьи показывать
      showArticlesByActiveCategories();
    });
  });

  // По умолчанию показываем все статьи
  showArticlesByActiveCategories();
});



document.addEventListener('DOMContentLoaded', function () {

  // const container = document.querySelector('#points-container');
  // const progressBar = document.querySelector('.progress-bar');
  // const hoverText = document.querySelector('#hover-text');
  // const periodText = document.querySelector('#period-text');
  // const priceDiv = document.querySelector('#price');

  // const pointsCount = 21;
  // const labels = [];
  // const texts = [];
  // const prices = [];

  // // Фиксированные цены
  // const fixedPrices = [
  //   1990, 1890, 1790, 1690, 1590, 1490, 1390, 1290, 1190, // 1-9 мес
  //   1140, 1090, 1040, 990, 940, 890, 840, 790, 740, 690, 640, 590 // 10-21 без подписей
  // ];

  // // Фиксированные тексты
  // const fixedTexts = [
  //   "Облегчим симптомы токсикоза",
  //   "Поможем подобрать блюда будущей маме",
  //   "Рассказываем про изменения в организме",
  //   "Поможем сохранить активность и радость от движения",
  //   "Научим слушать свое телое",
  //   "Научим дышать правильно",
  //   "Готовим тело к мягким родам",
  //   "Уменьшаем отеки и судороги в ногах",
  //   "Переводим тревогу в спокойствие",
  //   "Начинаем восстановление после родов бережно",
  //   "Восстанавливаем мышцы тазового дна",
  //   "Расслабляем мышцы спины после дня с ребенком",
  //   "Помогаем снова почувствовать мышцы",
  //   "Укрепляем любовь к себе",
  //   "Возвращаем себе сексуальнность",
  //   "Помогаем вернуть силы после бессонных ночей",
  //   "Возвращаем ощущение комфорта и лёгкости",
  //   "Стабилизируем эмоциональное состояние",
  //   "Восстанавливаем силы медитациями",
  //   "Выпрямляем осанку без боли",
  //   "Полностью восстанавливаем организм"
  // ];



  // const priceButton = document.getElementById('popup__footer-button');

  // // Функция, которая включает/отключает кнопку
  // function toggleButtonState() {
  //   // Получаем текст из #price
  //   const priceText = document.getElementById('price').textContent.trim();
  //   // Преобразуем в число (если пусто, то 0)
  //   const totalPrice = parseInt(priceText) || 0;

  //   if (totalPrice === 0) {
  //     priceButton.setAttribute('disabled', 'disabled');
  //   } else {
  //     priceButton.removeAttribute('disabled');
  //   }
  // }

  // // Вызываем при инициализации, чтобы установить начальное состояние
  // toggleButtonState();


  // // Проверки
  // if (fixedPrices.length !== pointsCount || fixedTexts.length !== pointsCount) {
  //   console.error("Количество цен или текстов не совпадает с количеством точек!");
  //   return;
  // }

  // for (let i = 0; i < pointsCount; i++) {
  //   if (i < 9) {
  //     labels.push(`${i + 1} мес`); // только до 9 мес
  //   } else if (i === 9) {
  //     labels.push("послеродовое восстановление"); // для 10-й точки
  //   } else {
  //     labels.push(""); // пустая подпись для остальных
  //   }

  //   texts.push(fixedTexts[i]);
  //   prices.push(fixedPrices[i]);
  // }

  // // Устанавливаем точки
  // for (let i = 0; i < pointsCount; i++) {
  //   const point = document.createElement('div');
  //   point.className = 'point';
  //   point.dataset.index = i;
  //   point.dataset.price = prices[i];

  //   // Расположение точки
  //   const pos = (i / (pointsCount - 1)) * 100;
  //   point.style.left = `${pos}%`;

  //   // Создаем label ТОЛЬКО если у точки есть подпись И индекс != 9
  //   if (labels[i] && i !== 9) {
  //     const label = document.createElement('div');
  //     label.className = `point-label ${i % 2 === 0 ? 'bottom-label' : 'top-label'}`;
  //     label.textContent = labels[i];
  //     label.style.left = `${pos}%`;
  //     label.style[(i % 2 === 0 ? 'bottom' : 'top')] = '25px';

  //     container.appendChild(label);
  //   }

  //   container.appendChild(point);

  //   // Hover
  //   point.addEventListener('mouseenter', function (e) {
  //     const idx = parseInt(this.dataset.index);
  //     hoverText.textContent = texts[idx];
  //     const rect = this.getBoundingClientRect();
  //     const containerRect = container.getBoundingClientRect();
  //     hoverText.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
  //     hoverText.style.opacity = 1;
  //   });

  //   point.addEventListener('mouseleave', function (e) {
  //     hoverText.style.opacity = 0;
  //   });

  //   // Click
  //   point.addEventListener('click', function (e) {
  //     const idx = parseInt(this.dataset.index);
  //     selectRange(idx);
  //   });
  // }

  // let selectedStart = null;
  // let selectedEnd = null;

  // function selectRange(clickedIndex) {
  //   if (selectedStart === null && selectedEnd === null) {
  //     // Ничего не выбрано -> выбрать первую
  //     selectedStart = clickedIndex;
  //     selectedEnd = clickedIndex;
  //   } else if (selectedStart !== null && selectedEnd !== null) {
  //     if (selectedStart === selectedEnd) {
  //       // Выбрана одна точка
  //       if (selectedStart === clickedIndex) {
  //         // Кликнули на неё же -> сброс
  //         selectedStart = null;
  //         selectedEnd = null;
  //       } else {
  //         // Кликнули на другую -> сделать диапазон
  //         selectedEnd = clickedIndex;
  //         if (selectedStart > selectedEnd) {
  //           [selectedStart, selectedEnd] = [selectedEnd, selectedStart];
  //         }
  //       }
  //     } else {
  //       // Диапазон выбран
  //       if (clickedIndex === selectedStart) {
  //         // Кликнули на start -> остаётся только end
  //         selectedStart = selectedEnd;
  //       } else if (clickedIndex === selectedEnd) {
  //         // Кликнули на end -> остаётся только start
  //         selectedEnd = selectedStart;
  //       } else {
  //         // Кликнули на другую -> сбросить всё и выбрать новую
  //         selectedStart = clickedIndex;
  //         selectedEnd = clickedIndex;
  //       }
  //     }
  //   }

  //   updatePoints();
  //   updatePriceDisplay();
  //   updatePeriodText();
  // }

  // function updatePoints() {
  //   document.querySelectorAll('.point').forEach((p, idx) => {
  //     p.classList.remove('active');
  //     if (selectedStart !== null && selectedEnd !== null) {
  //       if (idx >= selectedStart && idx <= selectedEnd) {
  //         p.classList.add('active');
  //       }
  //     }
  //   });
  // }

  // function updatePriceDisplay() {
  //   if (selectedStart === null || selectedEnd === null) {
  //     // Если точки не выбраны или это одна точка — можно оставить 0 или очистить
  //     document.getElementById('price').textContent = '0'; // или '' если хочешь пусто
  //     toggleButtonState();
  //     return;
  //   }

  //   let total = 0;
  //   for (let i = selectedStart; i <= selectedEnd; i++) {
  //     total += prices[i];
  //   }

  //   // Выводим только сумму
  //   document.getElementById('price').textContent = total;
  //   toggleButtonState();
  // }

  // function updatePeriodText() {
  //   if (selectedStart !== null && selectedEnd !== null && selectedStart !== selectedEnd) {
  //     // Если начало диапазона — от 1 до 9, а конец — 10 или дальше
  //     if (selectedStart < 9 && selectedEnd >= 9) {
  //       // Выводим "с ? мес до послеродового восстановления"
  //       const startLabel = labels[selectedStart] || `точка ${selectedStart + 1}`;
  //       periodText.textContent = `с ${startLabel} до послеродового восстановления`;
  //     }
  //     // Если диапазон от 1 до 9 (обе точки до 9)
  //     else if (selectedStart < 9 && selectedEnd < 9) {
  //       // Выводим обычный формат
  //       const startLabel = labels[selectedStart] || `точка ${selectedStart + 1}`;
  //       const endLabel = labels[selectedEnd] || `точка ${selectedEnd + 1}`;
  //       periodText.textContent = `с ${startLabel} по ${endLabel}`;
  //     }
  //     // Если обе точки после 9
  //     else {
  //       // Выводим "послеродовое восстановление"
  //       periodText.textContent = 'послеродовое восстановление';
  //     }

  //     // Позиционируем плашку посередине между start и end
  //     const midIndex = Math.floor((selectedStart + selectedEnd) / 2);
  //     const pos = (midIndex / (pointsCount - 1)) * 100;
  //     periodText.style.left = `${pos}%`;
  //     periodText.classList.add('visible');
  //   } else {
  //     periodText.classList.remove('visible');
  //   }
  // }



  // // Элементы для мобильной версии
  // const mobileControls = document.getElementById('mobile-controls');
  // const monthSelect = document.getElementById('month-select');
  // const monthCountInput = document.getElementById('month-count');
  // const decreaseBtn = document.getElementById('decrease-btn');
  // const increaseBtn = document.getElementById('increase-btn');
  // const priceSpan = document.getElementById('price');

  // // Заполняем select динамически (опционально)
  // for (let i = 0; i < pointsCount; i++) {
  //   const option = document.createElement('option');
  //   const label = labels[i] || `точка ${i + 1}`;
  //   option.value = i;
  //   option.textContent = label;
  //   monthSelect.appendChild(option);
  // }

  // // Обработчики для кнопок счётчика
  // decreaseBtn.addEventListener('click', () => {
  //   let value = parseInt(monthCountInput.value);
  //   if (value > 1) {
  //     monthCountInput.value = value - 1;
  //     updateMobilePrice(); // Обновляем цену
  //   }
  // });

  // increaseBtn.addEventListener('click', () => {
  //   let value = parseInt(monthCountInput.value);
  //   if (value < 21) {
  //     monthCountInput.value = value + 1;
  //     updateMobilePrice(); // Обновляем цену
  //   }
  // });


  // document.addEventListener('selectCallback', function (e) {
  //   // Проверяем, что событие пришло от нужного select
  //   if (e.detail.select.id === 'month-select') {
  //     updateMobilePrice();
  //   }
  // });


  // // Функция пересчёта суммы
  // function updateMobilePrice() {
  //   const startIndex = parseInt(monthSelect.value);
  //   const count = parseInt(monthCountInput.value);
  //   const endIndex = startIndex + count - 1;

  //   if (endIndex >= pointsCount) {
  //     // Не выходим за границы
  //     return;
  //   }

  //   let total = 0;
  //   for (let i = startIndex; i <= endIndex; i++) {
  //     total += prices[i];
  //   }

  //   priceSpan.textContent = total;
  //   toggleButtonState();
  // }

  // // Изначально вызываем, чтобы установить сумму
  // updateMobilePrice();


  const container = document.querySelector('#points-container');
  const progressBar = document.querySelector('.progress-bar');
  const hoverText = document.querySelector('#hover-text');
  const periodText = document.querySelector('#period-text');
  const priceDiv = document.querySelector('#price');

  const pointsCount = 21;
  const labels = [];
  const texts = [];
  const prices = [];

  // Фиксированные тексты
  const fixedTexts = [
    "Облегчим симптомы токсикоза",
    "Поможем подобрать блюда будущей маме",
    "Рассказываем про изменения в организме",
    "Поможем сохранить активность и радость от движения",
    "Научим слушать свое телое",
    "Научим дышать правильно",
    "Готовим тело к мягким родам",
    "Уменьшаем отеки и судороги в ногах",
    "Переводим тревогу в спокойствие",
    "Начинаем восстановление после родов бережно",
    "Восстанавливаем мышцы тазового дна",
    "Расслабляем мышцы спины после дня с ребенком",
    "Помогаем снова почувствовать мышцы",
    "Укрепляем любовь к себе",
    "Возвращаем себе сексуальнность",
    "Помогаем вернуть силы после бессонных ночей",
    "Возвращаем ощущение комфорта и лёгкости",
    "Стабилизируем эмоциональное состояние",
    "Восстанавливаем силы медитациями",
    "Выпрямляем осанку без боли",
    "Полностью восстанавливаем организм"
  ];

  const priceButton = document.getElementById('popup__footer-button');

  function toggleButtonState() {
    const priceText = document.getElementById('price').textContent.trim();
    const totalPrice = parseInt(priceText) || 0;

    if (totalPrice === 0) {
      priceButton.setAttribute('disabled', 'disabled');
    } else {
      priceButton.removeAttribute('disabled');
    }
  }

  toggleButtonState();

  // Генерация подписей и текстов
  for (let i = 0; i < pointsCount; i++) {
    if (i < 9) {
      labels.push(`${i + 1} мес`);
    } else if (i === 9) {
      labels.push("послеродовое восстановление");
    } else {
      labels.push("");
    }

    texts.push(fixedTexts[i]);
    prices.push(0);
  }

  // Функция расчёта цены в диапазоне (от 1-го до N-го месяца)
  function calculatePriceInRange(start, end) {
    const count = end - start + 1;
    let total = 0;
    for (let i = 0; i < count; i++) {
      if (i < 9) {
        total += Math.max(0, 1990 - i * 100);
      } else {
        total += Math.max(0, 1290 - (i - 9) * 50);
      }
    }
    return total;
  }

  // Устанавливаем точки
  for (let i = 0; i < pointsCount; i++) {
    const point = document.createElement('div');
    point.className = 'point';
    point.dataset.index = i;

    const pos = (i / (pointsCount - 1)) * 100;
    point.style.left = `${pos}%`;

    if (labels[i] && i !== 9) {
      const label = document.createElement('div');
      label.className = `point-label ${i % 2 === 0 ? 'bottom-label' : 'top-label'}`;
      label.textContent = labels[i];
      label.style.left = `${pos}%`;
      label.style[(i % 2 === 0 ? 'bottom' : 'top')] = '25px';
      container.appendChild(label);
    }

    container.appendChild(point);

    point.addEventListener('mouseenter', function (e) {
      const idx = parseInt(this.dataset.index);
      hoverText.textContent = texts[idx];
      const rect = this.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      hoverText.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
      hoverText.style.opacity = 1;
    });

    point.addEventListener('mouseleave', function (e) {
      hoverText.style.opacity = 0;
    });

    point.addEventListener('click', function (e) {
      const idx = parseInt(this.dataset.index);
      selectRange(idx);
    });
  }

  let selectedStart = null;
  let selectedEnd = null;

  function selectRange(clickedIndex) {
    if (selectedStart === null && selectedEnd === null) {
      // Ничего не выбрано -> выбрать первую
      selectedStart = clickedIndex;
      selectedEnd = clickedIndex;
    } else if (selectedStart !== null && selectedEnd !== null) {
      if (selectedStart === selectedEnd) {
        // Выбрана одна точка
        if (selectedStart === clickedIndex) {
          // Кликнули на неё же -> сброс
          selectedStart = null;
          selectedEnd = null;
        } else {
          // Кликнули на другую -> сделать диапазон
          selectedEnd = clickedIndex;
          if (selectedStart > selectedEnd) {
            [selectedStart, selectedEnd] = [selectedEnd, selectedStart];
          }
        }
      } else {
        // Диапазон выбран
        if (clickedIndex === selectedStart) {
          // Кликнули на start -> остаётся только end
          selectedStart = selectedEnd;
        } else if (clickedIndex === selectedEnd) {
          // Кликнули на end -> остаётся только start
          selectedEnd = selectedStart;
        } else {
          // Кликнули на другую -> сбросить всё и выбрать новую
          selectedStart = clickedIndex;
          selectedEnd = clickedIndex;
        }
      }
    }

    updatePoints();
    updatePriceDisplay();
    updatePeriodText();
  }

  function updatePoints() {
    document.querySelectorAll('.point').forEach((p, idx) => {
      p.classList.remove('active');
      if (selectedStart !== null && selectedEnd !== null) {
        if (idx >= selectedStart && idx <= selectedEnd) {
          p.classList.add('active');
        }
      }
    });
  }

  function updatePriceDisplay() {
    if (selectedStart === null || selectedEnd === null) {
      document.getElementById('price').textContent = '0';
      toggleButtonState();
      return;
    }

    const total = calculatePriceInRange(selectedStart, selectedEnd);
    document.getElementById('price').textContent = total;
    toggleButtonState();
  }

  function updatePeriodText() {
    if (selectedStart !== null && selectedEnd !== null && selectedStart !== selectedEnd) {
      if (selectedStart < 9 && selectedEnd >= 9) {
        const startLabel = labels[selectedStart] || `точка ${selectedStart + 1}`;
        periodText.textContent = `с ${startLabel} до послеродового восстановления`;
      } else if (selectedStart < 9 && selectedEnd < 9) {
        const startLabel = labels[selectedStart] || `точка ${selectedStart + 1}`;
        const endLabel = labels[selectedEnd] || `точка ${selectedEnd + 1}`;
        periodText.textContent = `с ${startLabel} по ${endLabel}`;
      } else {
        periodText.textContent = 'послеродовое восстановление';
      }

      const midIndex = Math.floor((selectedStart + selectedEnd) / 2);
      const pos = (midIndex / (pointsCount - 1)) * 100;
      periodText.style.left = `${pos}%`;
      periodText.classList.add('visible');
    } else {
      periodText.classList.remove('visible');
    }
  }

  // --- МОБИЛЬНАЯ ЧАСТЬ ---

  const mobileControls = document.getElementById('mobile-controls');
  const monthSelect = document.getElementById('month-select');
  const monthCountInput = document.getElementById('month-count');
  const decreaseBtn = document.getElementById('decrease-btn');
  const increaseBtn = document.getElementById('increase-btn');
  const priceSpan = document.getElementById('price');

  for (let i = 0; i < pointsCount; i++) {
    const option = document.createElement('option');
    const label = labels[i] || `точка ${i + 1}`;
    option.value = i;
    option.textContent = label;
    monthSelect.appendChild(option);
  }

  decreaseBtn.addEventListener('click', () => {
    let value = parseInt(monthCountInput.value);
    if (value > 1) {
      monthCountInput.value = value - 1;
      updateMobilePrice();
    }
  });

  increaseBtn.addEventListener('click', () => {
    let value = parseInt(monthCountInput.value);
    if (value < pointsCount) {
      monthCountInput.value = value + 1;
      updateMobilePrice();
    }
  });

  function updateMobilePrice() {
    const count = parseInt(monthCountInput.value);

    if (count <= 0 || count > pointsCount) {
      priceSpan.textContent = '0';
      toggleButtonState();
      return;
    }

    let total = 0;
    for (let i = 0; i < count; i++) {
      if (i < 9) {
        total += Math.max(0, 1990 - i * 100);
      } else {
        total += Math.max(0, 1290 - (i - 9) * 50);
      }
    }

    priceSpan.textContent = total;
    toggleButtonState();
  }

  // Изначально вызываем, чтобы установить сумму
  updateMobilePrice();

  // Обработчик изменения месяца
  monthSelect.addEventListener('change', function () {
    const idx = parseInt(this.value);

    // Снимаем выделение со всех точек
    document.querySelectorAll('.point').forEach(p => p.classList.remove('active'));
    // Выделяем точку, соответствующую значению select
    const targetPoint = document.querySelector(`.point[data-index="${idx}"]`);
    if (targetPoint) {
      targetPoint.classList.add('active');
    }

    // Считаем цену от 0 до idx (включительно), т.е. (idx + 1) месяцев
    const count = idx + 1;
    let total = 0;
    for (let i = 0; i < count; i++) {
      if (i < 9) {
        total += Math.max(0, 1990 - i * 100);
      } else {
        total += Math.max(0, 1290 - (i - 9) * 50);
      }
    }

    document.getElementById('price').textContent = total;
    toggleButtonState();
  });

  // --- ОСТАЛЬНЫЙ КОД (формы и т.д.) ---
  // ...


  // ВЫДЕЛЕНИЕ БАНКОВСКИХ ЛОГОТИПОВ

  // Находим все элементы с классом pay-popup__banks-item
  const bankItems = document.querySelectorAll('.pay-popup__banks-item');

  bankItems.forEach(item => {
    item.addEventListener('click', function () {
      // Проверяем, есть ли у текущего элемента класс active
      const isActive = this.classList.contains('active');

      // Убираем класс active у всех элементов
      bankItems.forEach(el => el.classList.remove('active'));

      // Если элемент не был активен, добавляем ему класс active
      if (!isActive) {
        this.classList.add('active');
      }
      // Если был активен — мы просто убрали у всех, включая его, класс, и ничего не добавляем
    });
  });

  // ОБРАБОТКА ФОРМЫ РЕГИСТРАЦИИ

  const form = document.querySelector('.sign-up-popup__form');
  const telInput = form.querySelector('input[name="tel"]');
  const codeInput = form.querySelector('input[name="code"]'); // Новое поле
  const consentCheckbox = form.querySelector('input[name="form\\[\\]"]');
  const button = form.querySelector('button[type="submit"]');
  const initialButtonText = button.textContent.trim();

  let stageOneComplete = false; // Флаг для отслеживания завершения первого этапа

  /**
   * Функция обновления состояния кнопки
   */
  function updateButtonState() {
    const isTelValid = validatePhone(telInput.value);
    const isConsentChecked = consentCheckbox.checked;

    if (isTelValid) {
      button.textContent = 'Регистрация';
    } else {
      // Если телефон недействителен, всегда показываем "Получить код" и отключаем
      button.textContent = initialButtonText;
      button.disabled = true;
      return;
    }

    // Если первый этап ещё не пройден
    if (!stageOneComplete) {
      // Активна только при согласии
      if (isConsentChecked) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    } else {
      // Если первый этап пройден, проверяем также и код
      const isCodeEntered = codeInput.value.trim().length > 0; // Предположим, что код может быть любым, просто введённым
      if (isConsentChecked && isCodeEntered) {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    }
  }

  /**
   * Функция валидации номера телефона (минимум 7 цифр)
   * @param {string} phone
   * @returns {boolean}
   */
  function validatePhone(phone) {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 7;
  }

  // Слушатель для клика по кнопке
  button.addEventListener('click', function (e) {
    // Проверяем, активна ли кнопка и мы на первом этапе
    if (!this.disabled && !stageOneComplete) {
      e.preventDefault(); // Предотвращаем отправку формы (если action не пустой)

      // Показываем поле ввода кода
      codeInput.style.display = 'block';

      // Меняем текст кнопки на "Регистрация" (уже должен быть, но на всякий случай)
      this.textContent = 'Регистрация';

      // Переходим ко второму этапу
      stageOneComplete = true;

      // Обновляем состояние кнопки, т.к. теперь участвует новое поле
      updateButtonState();
    }
    // Если кнопка активна и stageOneComplete=true, то можно позволить форме отправиться
    // или обработать отправку как обычно (но вы сказали, что это пока не нужно)
  });

  // Слушатель для поля телефона
  telInput.addEventListener('input', updateButtonState);

  // Слушатель для чекбокса
  consentCheckbox.addEventListener('change', updateButtonState);

  // Слушатель для нового поля кода
  codeInput.addEventListener('input', updateButtonState); // При каждом вводе проверяем

  // Инициализация состояния при загрузке
  updateButtonState();


  // ВТОРАЯ ФОРМА АВТОРИЗАЦИИ

  // --- Вторая форма (внутри #sign-in-popup) ---
  const form2 = document.querySelector('#sign-in-popup .sign-up-popup__form.forn');

  if (form2) {
    const nameInput = form2.querySelector('input[name="name"]');
    const loginInput = form2.querySelector('input[name="login"]');
    const passwInput = form2.querySelector('input[name="passw"]');
    const consentCheckbox2 = form2.querySelector('input[name="form\\[\\]"]');
    const button2 = form2.querySelector('button[type="submit"]');

    // Проверяем, что все элементы найдены
    if (nameInput && loginInput && passwInput && consentCheckbox2 && button2) {
      function updateButtonState2() {
        const isNameFilled = nameInput.value.trim() !== '';
        const isLoginFilled = loginInput.value.trim() !== '';
        const isPasswFilled = passwInput.value.trim() !== '';
        const isConsentChecked = consentCheckbox2.checked;

        if (isNameFilled && isLoginFilled && isPasswFilled && isConsentChecked) {
          button2.removeAttribute('disabled');
        } else {
          button2.setAttribute('disabled', '');
        }
      }

      // Добавляем слушатели событий
      nameInput.addEventListener('input', updateButtonState2);
      loginInput.addEventListener('input', updateButtonState2);
      passwInput.addEventListener('input', updateButtonState2);
      consentCheckbox2.addEventListener('change', updateButtonState2);

      // Инициализируем состояние кнопки при загрузке
      updateButtonState2();
    } else {
      console.warn("Не все элементы формы найдены внутри #sign-in-popup");
    }
  } else {
    console.warn("Форма входа не найдена внутри #sign-in-popup");
  }


});