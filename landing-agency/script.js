// Minimal JavaScript for interactions

document.addEventListener('DOMContentLoaded', () => {
	// Initialize Lenis for Smooth Inertial Scrolling
	const lenis = new Lenis({
		autoRaf: true, // Automatically handle requestAnimationFrame
	});

	// Smooth scrolling for navigation links using Lenis
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			if (targetId === '#') return;

			// Use Lenis to scroll with offset
			lenis.scrollTo(targetId, {
				offset: -100 // Match CSS scroll-padding
			});
		});
	});

	// Add scroll effect to header
	const header = document.querySelector('.header');
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			header.style.backgroundColor = 'rgba(7, 0, 20, 0.95)';
			header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
		} else {
			header.style.backgroundColor = 'rgba(7, 0, 20, 0.9)';
			header.style.boxShadow = 'none';
		}
	});
	// Scroll Spy for Active Navigation
	const sections = document.querySelectorAll('section');
	const navLinks = document.querySelectorAll('.nav-link');

	const observerOptions = {
		threshold: 0.3, // Trigger when 30% of the section is visible
		rootMargin: "-10% 0px -10% 0px"
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// Remove active class from all links
				navLinks.forEach(link => link.classList.remove('active'));

				// Add active class to corresponding link
				const id = entry.target.getAttribute('id');
				if (id) {
					const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
					if (activeLink) {
						activeLink.classList.add('active');
					}
				}
			}
		});
	}, observerOptions);

	sections.forEach(section => {
		observer.observe(section);
	});
	// Scroll to Top Button Logic
	const scrollTopBtn = document.querySelector('.scroll-top-btn');

	if (scrollTopBtn) {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 300) {
				scrollTopBtn.classList.add('show');
			} else {
				scrollTopBtn.classList.remove('show');
			}
		});

		scrollTopBtn.addEventListener('click', (e) => {
			e.preventDefault();
			lenis.scrollTo(0); // Use Lenis for top scroll
		});
	}

	// Mobile Menu Logic
	const mobileBtn = document.querySelector('.mobile-menu-btn');
	const nav = document.querySelector('.nav');

	if (mobileBtn && nav) {
		mobileBtn.addEventListener('click', () => {
			nav.classList.toggle('active');
			const icon = mobileBtn.querySelector('svg');
			if (nav.classList.contains('active')) {
				icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
			} else {
				icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
			}
		});

		// Close menu when clicking a link
		nav.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				nav.classList.remove('active');
				const icon = mobileBtn.querySelector('svg');
				if (icon) {
					icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
				}
			});
		});
	}
});
