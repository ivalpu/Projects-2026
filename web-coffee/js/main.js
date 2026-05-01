/* === BLOG DATA === */
const blogPosts = [
	{
		id: 1,
		title: "10 Maneras de preparar el café perfecto",
		date: "12 de octubre, 2025",
		img: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=90",
		content: `<p>Preparar una taza de café perfecta es tanto un arte como una ciencia. No se trata solo de agua caliente y granos molidos; es una alquimia de variables que, cuando se equilibran correctamente, producen una bebida divina.</p><h3>1. La frescura es clave</h3><p>El café comienza a perder sabor momentos después de ser tostado. Intenta comprar café de tostadores locales y úsalo dentro del mes posterior a la fecha de tueste.</p><h3>2. El agua importa</h3><p>El café es 98% agua. Si el agua sabe mal, el café sabrá mal. Usa agua filtrada o embotellada para evitar sabores a cloro o minerales pesados.</p><h3>3. Muele justo antes de preparar</h3><p>Los compuestos aromáticos del café son volátiles. Moler los granos justo antes de la extracción asegura que todos esos sabores terminen en tu taza y no en el aire.</p><h3>4. La proporción áurea</h3><p>Una buena regla general es usar entre 15g y 18g de agua por cada gramo de café. Ajusta según tu gusto personal.</p>`
	},
	{
		id: 2,
		title: "Beneficios ocultos del café para tu salud",
		date: "8 de septiembre, 2025",
		img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=90",
		content: `<p>Más allá de ser el combustible que nos ayuda a despertar por las mañanas, el café posee una sorprendente cantidad de beneficios para la salud respaldados por la ciencia.</p><h3>Rico en antioxidantes</h3><p>Estudios muestran que para muchas personas en la dieta occidental, el café es la mayor fuente de antioxidantes, incluso superando a las frutas y verduras.</p><h3>Mejora la función cerebral</h3><p>La cafeína bloquea un neurotransmisor inhibitorio en el cerebro, lo que conduce a un efecto estimulante que mejora la energía, el estado de ánimo y varios aspectos de la función cerebral.</p><h3>Protección contra enfermedades</h3><p>El consumo regular se ha vinculado con un menor riesgo de enfermedades como el Parkinson, la diabetes tipo 2 y ciertas enfermedades hepáticas.</p>`
	},
	{
		id: 3,
		title: "Arábica vs Robusta: ¿Cuál es la diferencia?",
		date: "25 de noviembre, 2025",
		img: "https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=1200&q=90",
		content: `<p>Si alguna vez has leído una etiqueta de café, probablemente has visto "100% Arábica". Pero, ¿qué significa realmente y por qué importa?</p><h3>Arábica: La elección del gourmet</h3><p>Los granos de Arábica tienden a tener un sabor más suave y dulce, con notas de azúcar, frutas y bayas. Su acidez es más alta, lo que le da esa sensación vibrante al vino. Son más difíciles de cultivar, lo que explica su precio más elevado.</p><h3>Robusta: Fuerza y cuerpo</h3><p>La Robusta tiene un sabor más fuerte, áspero y amargo, con matices a grano o goma quemada. Sin embargo, tiene mucho más cuerpo y casi el doble de cafeína que el Arábica. Es común en las mezclas de espresso para generar una buena crema.</p><h3>Conclusión</h3><p>Si buscas matices y complejidad, ve por Arábica. Si necesitas un despertar inmediato y te gusta el café muy intenso, la Robusta podría ser para ti.</p>`
	}
];

/* === CART LOGIC === */
let cart = JSON.parse(localStorage.getItem('coffeeCart')) || [];

function saveCart() {
	localStorage.setItem('coffeeCart', JSON.stringify(cart));
	updateCartUI();
}

function updateCartUI() {
	const countBadge = document.getElementById('cart-count');
	if (countBadge) countBadge.textContent = cart.length;
	renderCartItems();
}

function renderCartItems() {
	const container = document.getElementById('cart-items-container');
	const footer = document.getElementById('cart-footer');
	const totalEl = document.getElementById('cart-total');

	if (!container) return;

	if (cart.length === 0) {
		container.innerHTML = `
            <div class="cart__empty">
                <i class='bx bx-shopping-bag'></i>
                <p>Tu carrito está vacío</p>
            </div>`;
		footer.style.display = 'none';
		return;
	}

	footer.style.display = 'block';
	let total = 0;
	container.innerHTML = cart.map((item, index) => {
		total += item.price;
		return `
            <div class="cart__item">
                <img src="${item.img}" alt="${item.name}" class="cart__img">
                <div class="cart__details">
                    <h3>${item.name}</h3>
                    <span class="cart__price">€${item.price.toFixed(2)}</span>
                </div>
                <i class='bx bx-trash cart__remove' onclick="window.removeFromCart(${index})"></i>
            </div>`;
	}).join('');

	totalEl.textContent = total.toFixed(2);
}

/* === GLOBAL FUNCTIONS === */
window.addToCart = function (productName, price, imgUrl) {
	cart.push({ name: productName, price: price, img: imgUrl });
	saveCart();

	const toast = document.getElementById('toast');
	const toastMsg = document.getElementById('toast-message');
	if (toast && toastMsg) {
		toastMsg.textContent = `${productName} añadido al carrito`;
		toast.classList.add('show-toast');
		setTimeout(() => { toast.classList.remove('show-toast'); }, 3000);
	}
};

window.removeFromCart = function (index) {
	cart.splice(index, 1);
	saveCart();
};

window.toggleCart = function (show) {
	const mainContent = document.getElementById('main-content');
	const cartView = document.getElementById('cart-view');
	const blogView = document.getElementById('blog-view');
	const header = document.getElementById('header');

	// If closing cart, verify we are not in blog view before showing main content
	if (!show) {
		cartView.classList.remove('active');
		if (!blogView.classList.contains('active')) {
			mainContent.style.display = 'block';
			header.classList.remove('header-alt');
			window.dispatchEvent(new Event('scroll')); // Trigger scroll handler to fix header style
		}
		return;
	}

	// Opening cart
	if (blogView.classList.contains('active')) {
		blogView.classList.remove('active');
	}

	mainContent.style.display = 'none';
	cartView.classList.add('active');
	header.classList.add('header-alt');
	window.scrollTo(0, 0);
};

/* === BLOG VIEW FUNCTIONS === */
window.openBlog = function (id) {
	const post = blogPosts.find(p => p.id === id);
	if (!post) return;

	const mainContent = document.getElementById('main-content');
	const blogView = document.getElementById('blog-view');
	const injector = document.getElementById('blog-content-injector');
	const header = document.getElementById('header');

	injector.innerHTML = `
        <img src="${post.img}" alt="${post.title}" class="blog-view__img">
        <span class="blog-view__meta">${post.date}</span>
        <h2 class="blog-view__title">${post.title}</h2>
        <div class="blog-view__content">${post.content}</div>
    `;

	mainContent.style.display = 'none';
	blogView.classList.add('active');
	header.classList.add('header-alt');
	window.scrollTo(0, 0);
};

window.closeBlog = function () {
	const mainContent = document.getElementById('main-content');
	const blogView = document.getElementById('blog-view');
	const header = document.getElementById('header');

	blogView.classList.remove('active');
	mainContent.style.display = 'block';
	header.classList.remove('header-alt');
	window.dispatchEvent(new Event('scroll'));

	// Robust navigation back to blog section
	// setTimeout ensures the DOM (display:block) is fully repainted before scrolling
	setTimeout(() => {
		const blogSection = document.getElementById('blog');
		if (blogSection) {
			blogSection.scrollIntoView({ behavior: 'smooth' });
			// Optionally update hash without jumping if desired, though scrollIntoView is safer for offset
			// window.history.replaceState(null, null, '#blog'); 
		}
	}, 50);
};

window.openModal = function (modalId) {
	const modal = document.getElementById(modalId);
	if (modal) modal.classList.add('active-modal');
};

window.closeModal = function () {
	const modals = document.querySelectorAll('.modal');
	modals.forEach(modal => modal.classList.remove('active-modal'));
};

/* === LIGHTBOX FUNCTIONS === */
window.openLightbox = function (card) {
	const lightbox = document.getElementById('lightbox');
	const lightboxImg = document.getElementById('lightbox-img');
	const img = card.querySelector('img');

	const src = img.getAttribute('data-full') || img.src;
	lightboxImg.src = src;
	lightbox.classList.add('active');
};

window.closeLightbox = function () {
	const lightbox = document.getElementById('lightbox');
	lightbox.classList.remove('active');
};

/* === DOM EVENTS === */
document.addEventListener('DOMContentLoaded', () => {
	// Init Cart Status
	updateCartUI();

	// Modal & Lightbox Close Events (Outside click)
	const modals = document.querySelectorAll('.modal');
	const lightbox = document.getElementById('lightbox');

	modals.forEach(modal => {
		modal.addEventListener('click', (e) => {
			if (e.target === modal) window.closeModal();
		});
	});

	if (lightbox) {
		lightbox.addEventListener('click', (e) => {
			if (e.target === lightbox) window.closeLightbox();
		});
	}

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			window.closeModal();
			window.closeLightbox();
		}
	});

	/* === MENU HANDLING === */
	const navMenu = document.getElementById('nav-menu'),
		navToggle = document.getElementById('nav-toggle'),
		navClose = document.getElementById('nav-close'),
		navLinks = document.querySelectorAll('.nav__link');

	// Show menu
	if (navToggle) {
		navToggle.addEventListener('click', () => {
			navMenu.classList.add('show-menu');
		});
	}

	// Hide menu (Close button)
	if (navClose) {
		navClose.addEventListener('click', () => {
			navMenu.classList.remove('show-menu');
		});
	}

	// Handle Nav Links (Close Menu + Close Cart/Blog overlays)
	navLinks.forEach(n => {
		n.addEventListener('click', () => {
			// 1. Close mobile menu
			navMenu.classList.remove('show-menu');

			// 2. Ensure we are not in Cart or Blog views (reset to Home view)
			const mainContent = document.getElementById('main-content');
			// If overlays are active, forcing them closed might be needed if user clicks a nav link 
			// while inside a "page" view.
			// Ideally nav is separate, but let's be robust:
			const cartView = document.getElementById('cart-view');
			const blogView = document.getElementById('blog-view');

			if (cartView.classList.contains('active') || blogView.classList.contains('active')) {
				cartView.classList.remove('active');
				blogView.classList.remove('active');
				mainContent.style.display = 'block';
				document.getElementById('header').classList.remove('header-alt');
				// The browser will handle the hash scroll automatically
				setTimeout(() => window.dispatchEvent(new Event('scroll')), 50);
			}
		});
	});

	/* === SCROLL EFFECTS & ACTIVE LINK === */
	const header = document.getElementById('header');
	const scrollUp = document.getElementById('scroll-up');
	const sections = document.querySelectorAll('section[id]');

	function scrollHandler() {
		const scrollY = window.scrollY;

		// Header Background
		if (scrollY >= 50) header.classList.add('scroll-header');
		else header.classList.remove('scroll-header');

		// Scroll Up Button
		if (scrollY >= 350) scrollUp.classList.add('show-scroll');
		else scrollUp.classList.remove('show-scroll');

		/* === ACTIVE LINK SCROLL SPY === */
		// We only spy if main content is visible
		if (document.getElementById('main-content').style.display === 'none') return;

		// Offset matches CSS scroll-padding-top (around 5.5rem = 88px)
		// We use a slightly larger offset for "activation" (e.g. 100 or 90)
		// so the link activates just as the section enters the "safe zone"
		const sectionOffset = 90;

		sections.forEach(current => {
			const sectionHeight = current.offsetHeight;
			const sectionTop = current.offsetTop - sectionOffset;
			const sectionId = current.getAttribute('id');
			const navItem = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

			if (navItem) {
				if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
					navItem.classList.add('active-link');
				} else {
					navItem.classList.remove('active-link');
				}
			}
		});
	}

	window.addEventListener('scroll', scrollHandler);

	/* === PRODUCT FILTERS === */
	const filterBtns = document.querySelectorAll('.product-filter-btn');
	const productCards = document.querySelectorAll('.product__card');

	filterBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			// Active class
			filterBtns.forEach(b => b.classList.remove('active-product'));
			btn.classList.add('active-product');

			// Filter logic
			const filterValue = btn.getAttribute('data-filter');
			productCards.forEach(card => {
				if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
					card.classList.remove('hidden');
					// Fade in animation
					card.style.opacity = '0';
					setTimeout(() => { card.style.opacity = '1'; }, 50);
				} else {
					card.classList.add('hidden');
				}
			});
		});
	});

	/* === REVEAL ANIMATION === */
	const revealObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
				revealObserver.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px"
	});

	document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
