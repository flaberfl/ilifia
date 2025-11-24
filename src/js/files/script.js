// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
window.addEventListener("load", function () {
  document.body.classList.remove("load");
});



// let position = 0;
// const sliderContent = document.querySelector('.main-screen__items');
// const slideWidth = document.querySelector('.main-screen__item').offsetWidth + 10; // + отступ
// console.log(sliderContent);

// function slideNext() {
//   position -= slideWidth;
//   sliderContent.style.transform = `translateX(${position}px)`;

// }

// function slidePrev() {
//   position += slideWidth;
//   sliderContent.style.transform = `translateX(${position}px)`;
// }



// $(function () {
//   let header = $('.header');
//   $(window).scroll(function () {
//     if ($(this).scrollTop() > 40) {
//       header.addClass('_fixed');
//     } else {
//       header.removeClass('_fixed');
//     }
//   });

//   $('.filter-open').click(function () {
//     $('.catalog__filter-row').fadeIn();
//     $('html').addClass('lock ')
//   })

//   $('.close-filter').click(function () {
//     $('.catalog__filter-row').fadeOut();
//     $('html').removeClass('lock')
//   })


//   $('.filter-reset').on('click', function () {
//     // Сброс полей формы
//     $('#catalog-form')[0].reset();

//     // Снимаем все чекбоксы вручную
//     $('input[type="checkbox"]').prop('checked', false);

//     // Очищаем URL от всех параметров
//     // window.location.href = window.location.pathname;
//   });





//   var map;
//   ymaps.ready(function () {
//     var map = new ymaps.Map('map', {
//       center: [55.751574, 37.573856],
//       zoom: 10,
//     });


//     const openMapButton = document.querySelector('.open-map');

//     // Добавляем обработчик клика на кнопку
//     openMapButton.addEventListener('click', function () {
//       // Вызываем метод fitToViewport для обновления карты

//       setTimeout(function () {
//         map.container.fitToViewport(); // Перестроить карту под новый размер
//       }, 300);
//     });

//     var myPlacemark = new ymaps.Placemark([55.751574, 37.573856], {
//       hintContent: 'Москва',
//       balloonContent: 'Столица России',
//       controls: [],
//     });

//     map.geoObjects.add(myPlacemark);
//   });

//   function bigMap() {
//     $('.catalog__row').toggleClass('big-map');
//     $('.catalog__map').toggleClass('big-map');
//     $('.catalog__list').toggleClass('big-map');
//     $('.catalog__item').toggleClass('big-map');
//     $('.open-map span').toggle();
//     $('.open-map svg').toggle()
//   }

//   $('.open-map').click(function () {
//     bigMap()
//   });

// });


// Рабочий

// $(function () {
//   // Проверяем наличие элемента .header
//   let header = $('.header');
//   if (header.length > 0) {
//     $(window).scroll(function () {
//       if ($(this).scrollTop() > 40) {
//         header.addClass('_fixed');
//       } else {
//         header.removeClass('_fixed');
//       }
//     });
//   }


//   // Проверяем наличие кнопки .filter-open
//   let filterOpenButton = $('.filter-open');
//   if (filterOpenButton.length > 0) {
//     filterOpenButton.click(function () {
//       $('.catalog__filter-row').fadeIn();
//       $('html').addClass('lock');
//     });
//   }

//   // Проверяем наличие кнопки .close-filter
//   let closeFilterButton = $('.close-filter');
//   if (closeFilterButton.length > 0) {
//     closeFilterButton.click(function () {
//       $('.catalog__filter-row').fadeOut();
//       $('html').removeClass('lock');
//     });
//   }

//   // Проверяем наличие кнопки .filter-reset
//   let filterResetButton = $('.filter-reset');
//   if (filterResetButton.length > 0) {
//     filterResetButton.on('click', function () {
//       // Сброс полей формы
//       let catalogForm = $('#catalog-form');
//       if (catalogForm.length > 0) {
//         catalogForm[0].reset();
//       }

//       // Снимаем все чекбоксы вручную
//       $('input[type="checkbox"]').prop('checked', false);

//       // Очищаем URL от всех параметров
//       // window.location.href = window.location.pathname;
//     });
//   }

//   // Проверяем наличие элемента #map для инициализации карты
//   let mapElement = document.getElementById('map');
//   if (mapElement) {
//     ymaps.ready(function () {
//       var map = new ymaps.Map('map', {
//         center: [55.751574, 37.573856],
//         zoom: 10,
//       });

//       // Проверяем наличие кнопки .open-map
//       const openMapButton = document.querySelector('.open-map');
//       if (openMapButton) {
//         openMapButton.addEventListener('click', function () {
//           setTimeout(function () {
//             map.container.fitToViewport(); // Перестроить карту под новый размер
//           }, 300);
//         });
//       }

//       var myPlacemark = new ymaps.Placemark([55.751574, 37.573856], {
//         hintContent: 'Москва',
//         balloonContent: 'Столица России',
//         controls: [],
//       });

//       map.geoObjects.add(myPlacemark);
//     });
//   }

//   // Функция для изменения размера карты
//   function bigMap() {
//     $('.catalog__row').toggleClass('big-map');
//     $('.catalog__map').toggleClass('big-map');
//     $('.catalog__list').toggleClass('big-map');
//     $('.catalog__item').toggleClass('big-map');
//     $('.open-map span').toggle();
//     $('.open-map svg').toggle();
//   }

//   // Проверяем наличие кнопки .open-map
//   let openMapButton = $('.open-map');
//   if (openMapButton.length > 0) {
//     openMapButton.click(function () {
//       bigMap();
//     });
//   }
// });




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









