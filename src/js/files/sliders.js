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

			// slidesPerView: 1, // Показываем 3 слайда
			// slidesPerGroup: 1,

			// spaceBetween: 10,
			loop: true,
			// loopAdditionalSlides: 3,
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
				clickable: true,
			},

			// Брейкпоинты
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
					loop: 'false'
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

				// init: function () {
				// 	updatePaginationVisibility.call(this);
				// },
				// slideChange: function () {
				// 	updatePaginationVisibility.call(this);
				// }

			}
		});
	}

	if (document.querySelector('.profile-header__slider')) { //Указываем класс нужного слайдера
		//Создаем слайдер
		new Swiper('.profile-header__slider', { //Указываем класс нужного слайдера
			//Подключаем модули слайдера
			//для конкретного случая
			observer: true,
			observeParents: true,
			slidesPerView: 5,


			// slidesPerView: 1, // Показываем 3 слайда
			// slidesPerGroup: 1,

			// loopAdditionalSlides: 3,
			// autoHeight: true,
			speed: 1200,

			// // Брейкпоинты
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

				// 1245: {
				// 	slidesPerView: 3,
				// 	spaceBetween: 10,
				// },

				1920: {
					slidesPerView: 5,
					spaceBetween: 30,
				},
			},

			// События
			on: {

				// init: function () {
				// 	updatePaginationVisibility.call(this);
				// },
				// slideChange: function () {
				// 	updatePaginationVisibility.call(this);
				// }

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



// function updatePaginationVisibility() {
// 	const slidesPerView = 3;
// 	const totalSlides = this.slides.length;
// 	const groupsCount = Math.ceil(totalSlides / slidesPerView);

// 	const bullets = this.pagination.bullets;

// 	// Скрываем/показываем точки
// 	bullets.forEach((bullet, index) => {
// 		if (index % slidesPerView === 0 && index < groupsCount * slidesPerView) {
// 			bullet.style.display = 'inline-block';
// 			bullet.classList.add('visible-bullet');
// 		} else {
// 			bullet.style.display = 'none';
// 			bullet.classList.remove('visible-bullet');
// 		}

// 		// Убираем активный класс у всех
// 		bullet.classList.remove('swiper-pagination-bullet-active');
// 	});

// 	// Находим индекс активной "группы" по текущему слайду
// 	const currentIndex = this.activeIndex;
// 	const currentGroupIndex = Math.floor(currentIndex / slidesPerView);

// 	// Находим все **видимые** точки
// 	const visibleBullets = Array.from(bullets).filter(bullet => bullet.classList.contains('visible-bullet'));

// 	// Находим нужную **видимую** точку по индексу группы
// 	const activeVisibleBullet = visibleBullets[currentGroupIndex];

// 	if (activeVisibleBullet) {
// 		activeVisibleBullet.classList.add('swiper-pagination-bullet-active');
// 	}
// }