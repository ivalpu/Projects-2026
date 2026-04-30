document.addEventListener('DOMContentLoaded', () => {

	let navbar = document.querySelector('.header .navbar');
	let menuBtn = document.querySelector('#menu-btn');
	let contactInfo = document.querySelector('.contact-info');
	let infoBtn = document.querySelector('#info-btn');
	let closeContactInfo = document.querySelector('#close-contact-info');

	// Toggle Mobile Menu
	if (menuBtn) {
		menuBtn.onclick = () => {
			navbar.classList.toggle('active');
			// Close other elements
			// contactInfo.classList.remove('active'); 
		};
	}

	// Active Menu Highlighting
	const currentPath = window.location.pathname.split('/').pop() || 'index.html';
	document.querySelectorAll('.header .navbar a').forEach(link => {
		const linkPath = link.getAttribute('href').split('/').pop();
		if (linkPath === currentPath) {
			link.classList.add('active');
		} else {
			link.classList.remove('active');
		}
	});

	// Toggle Contact Info
	if (infoBtn) {
		infoBtn.onclick = () => {
			contactInfo.classList.add('active');
			navbar.classList.remove('active');
		}
	}

	if (closeContactInfo) {
		closeContactInfo.onclick = () => {
			contactInfo.classList.remove('active');
		}
	}

	// Window Scroll Events
	window.onscroll = () => {
		navbar.classList.remove('active');
		contactInfo.classList.remove('active');
	}

	// Swiper Home Slider
	var homeSwiper = new Swiper(".home-slider", {
		loop: true,
		grabCursor: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
	});

	// Swiper Reviews Slider
	var reviewsSwiper = new Swiper(".reviews-slider", {
		loop: true,
		grabCursor: true,
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			991: {
				slidesPerView: 3,
			},
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});

	// Lightbox for Projects
	// Images are currently handled via CSS hover effects for simplicity and performance.

	// Fade Up Animation (IntersectionObserver)
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Add fade-up class to sections/boxes
	document.querySelectorAll('.box, .heading, .content, .image, .page-header h1, .page-header p, .video, .contact form, .contact .map').forEach(el => {
		el.classList.add('fade-up');
		observer.observe(el);
	});

	// Scroll to Top Button
	const scrollTopBtn = document.querySelector('.scroll-top');

	if (scrollTopBtn) {
		// Show/hide button on scroll
		window.addEventListener('scroll', () => {
			if (window.scrollY > 300) {
				scrollTopBtn.classList.add('active');
			} else {
				scrollTopBtn.classList.remove('active');
			}
		});

		// Scroll to top on click
		scrollTopBtn.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
	}

	// Disable Empty Links
	document.addEventListener('click', (e) => {
		const link = e.target.closest('a');
		if (link) {
			const href = link.getAttribute('href');
			if (href === '#' || href === '/' || href === '' || href === 'javascript:void(0)') {
				e.preventDefault();
			}
		}
	});

	// Animation logic initialized
});
