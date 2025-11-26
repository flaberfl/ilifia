import Swiper from 'swiper';
import { Navigation, EffectFade, Autoplay, Pagination } from 'swiper/modules';
/*
Основные модули слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
*/

//Стили Swiper
//Базовые стили
import "../../scss/base/swiper.scss";
//Полный набор стилей с scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
//Полный набор стилей с node_modules
// import 'swiper/css';

//Инициализация слайдеров
function initSliders() {
	//Список слайдеров
	//Проверяем, есть ли слайдер на странице
	if (document.querySelector('.recipes-block__slider')) { //Указываем класс нужного слайдера
		//Создаем слайдер
		new Swiper('.recipes-block__slider', { //Указываем класс нужного слайдера
			//Подключаем модули слайдера
			//для конкретного случая
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			centeredSlides: true,
			centeredSlidesBounds: true,

			// spaceBetween: 10,
			// loop: true,
			// autoHeight: true,
			speed: 1200,

			lazy: true,


			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.recipes-block-btn.swiper-button-prev',
				nextEl: '.recipes-block-btn.swiper-button-next',
			},

			pagination: {
				el: '.swiper-pagination',
				clickable: true, // Позволяет кликать по точкам пагинации
			},

			// Брейкпоинты
			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 20,
					centeredSlides: true,
					centeredSlidesBounds: true,
				},
				500: {
					slidesPerView: 2,
					spaceBetween: 20,
					centeredSlides: false,
					centeredSlidesBounds: false,
				},

				768: {
					centeredSlides: true,
					centeredSlidesBounds: true,
					slidesPerView: 3,
					spaceBetween: -35,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: -35,
				},

				// 1245: {
				// 	slidesPerView: 3,
				// 	spaceBetween: 10,
				// },

				1920: {
					slidesPerView: 3,
					spaceBetween: -35,
				},
			},

			// События
			on: {

			}
		});
	}

}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	//Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});