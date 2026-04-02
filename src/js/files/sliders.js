import Swiper from 'swiper';
import {
	Navigation,
	EffectFade,
	Autoplay,
	Pagination
} from 'swiper/modules';
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

// Функция для инициализации слайдера с навигацией (для подготовительных слайдеров)
function initNavigationSlider(sliderClass, nextButtonClass) {
	if (document.querySelector(`.${sliderClass}`)) {
		new Swiper(`.${sliderClass}`, {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			loop: true,
			speed: 1200,
			lazy: true,
			navigation: {
				nextEl: `.${nextButtonClass}.swiper-button-next`,
			},
			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 20,
				},
				500: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1920: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			}
		});
	}
}

// Функция для инициализации слайдера с навигацией и пагинацией (рецепты)
function initRecipesSlider() {
	if (document.querySelector('.recipes-block__slider')) {
		new Swiper('.recipes-block__slider', {
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			centeredSlides: true,
			centeredSlidesBounds: true,
			loop: true,
			speed: 1200,
			lazy: true,
			navigation: {
				prevEl: '.recipes-block-btn.swiper-button-prev',
				nextEl: '.recipes-block-btn.swiper-button-next',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 20,
					centeredSlides: true,
					centeredSlidesBounds: true,
					speed: 700,
				},
				500: {
					slidesPerView: 2,
					spaceBetween: 20,
					centeredSlides: false,
					centeredSlidesBounds: false,
					speed: 700,
					loop: false
				},
				768: {
					centeredSlides: true,
					centeredSlidesBounds: true,
					slidesPerView: 3,
					speed: 700,
					spaceBetween: -35,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: -35,
				},
				1920: {
					slidesPerView: 3,
					spaceBetween: -35,
				},
			}
		});
	}
}

function initReviewsSlider() {
	if (document.querySelector('.reviews__slider')) {
		new Swiper('.reviews__slider', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			loop: true,
			speed: 1200,
			lazy: true,
			navigation: {
				prevEl: '.reviews__slider-btn.swiper-button-prev',
				nextEl: '.reviews__slider-btn.swiper-button-next',
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
				},
				500: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1920: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			}
		});
	}
}

// Функция для инициализации слайдера профиля
function initProfileSlider() {
	if (document.querySelector('.profile-header__slider')) {
		new Swiper('.profile-header__slider', {
			observer: true,
			observeParents: true,
			slidesPerView: 5,
			speed: 1200,
			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 20,
				},
				500: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				768: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1920: {
					slidesPerView: 5,
					spaceBetween: 30,
				},
			}
		});
	}
}

//Список слайдеров
function initSliders() {
	// Инициализация слайдера с рецептами
	initRecipesSlider();

	// Инициализация слайдера профиля
	initProfileSlider();

	// Инициализация слайдера отзывов
	initReviewsSlider();

	// Инициализация слайдеров с навигацией
	initNavigationSlider('landing-blog__slider--health', 'swiper-button-next--health');
	initNavigationSlider('landing-blog__slider--podcast', 'swiper-button-next--podcast');
	initNavigationSlider('landing-blog__slider--recipes', 'swiper-button-next--recipes');
	initNavigationSlider('landing-blog__slider--preparation-training', 'swiper-button-next--preparation-training');
	initNavigationSlider('landing-blog__slider--preparation-docs', 'swiper-button-next--preparation-docs');
	initNavigationSlider('landing-blog__slider--preparation-podcast', 'swiper-button-next--preparation-podcast');
	initNavigationSlider('landing-blog__slider--preparation-meditations', 'swiper-button-next--preparation-meditations');
	initNavigationSlider('landing-blog__slider--recovery-docs', 'swiper-button-next--recovery-docs');
	initNavigationSlider('landing-blog__slider--recovery-training', 'swiper-button-next--recovery-training');
	initNavigationSlider('landing-blog__slider--payments', 'swiper-button-next--payments');
	initNavigationSlider('landing-blog__slider--food-docs', 'swiper-button-next--food-docs');
	initNavigationSlider('landing-blog__slider--food-recipes', 'swiper-button-next--food-recipes');
	initNavigationSlider('landing-blog__slider--experts-docs', 'swiper-button-next--experts-docs');
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	//Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});