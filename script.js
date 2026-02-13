/* ========================================
   My Sport Session — Landing Page Scripts (Updated)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Header scroll effect ---
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // --- Mobile menu toggle ---
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileNav = document.getElementById('mobileNav');

    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            burgerBtn.classList.toggle('active');
        });

        // Close mobile nav on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                burgerBtn.classList.remove('active');
            });
        });
    }

    // --- Animated counter ---
    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function formatNumber(num) {
            if (num >= 1000) {
                return num.toLocaleString('fr-FR');
            }
            return num.toString();
        }

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            element.textContent = formatNumber(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = formatNumber(target);
            }
        }

        requestAnimationFrame(update);
    }

    // --- Intersection Observer for animations ---
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    // Animate stats counters
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-target]');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    animateCounter(counter, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Animate sections on scroll
    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    // Add animation classes to sections
    const sections = document.querySelectorAll(
        '.step, .activity-card, .benefit, .testimonial'
    );
    sections.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index % 4 * 0.1}s`;
        animateObserver.observe(el);
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Search bar interaction ---
    const searchBtn = document.querySelector('.search-bar__btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const inputs = document.querySelectorAll('.search-bar__input');
            const activity = inputs[0]?.value.trim();
            const location = inputs[1]?.value.trim();

            if (activity || location) {
                // Redirect to search results (placeholder URL)
                const params = new URLSearchParams();
                if (activity) params.set('q', activity);
                if (location) params.set('loc', location);
                window.location.href = `https://www.mysportsession.com/recherche?${params.toString()}`;
            } else {
                inputs[0]?.focus();
            }
        });
    }

    // --- Tags click ---
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const searchInput = document.getElementById('searchActivity');
            if (searchInput) {
                searchInput.value = tag.textContent;
                searchInput.focus();
            }
        });
    });

    // --- Animated notification list (MagicUI-style) ---
    const notifList = document.getElementById('notifList');
    if (notifList) {
        const notifications = [
            {
                type: 'reservation',
                icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="14" height="12" rx="2"/><path d="M3 9h14"/><path d="M7 3v4M13 3v4" stroke-linecap="round"/></svg>',
                title: 'Nouvelle réservation',
                desc: 'Yoga - Mardi 14h30',
                time: "À l'instant"
            },
            {
                type: 'payment',
                icon: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 8h16" stroke-linecap="round"/><path d="M6 12h3" stroke-linecap="round"/><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg>',
                title: 'Nouveau paiement',
                desc: 'Séance Yoga - 15,00 €',
                time: 'Il y a 2 min'
            },
            {
                type: 'whatsapp',
                icon: '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1.5A8.5 8.5 0 001.5 10c0 1.5.39 2.91 1.07 4.13L1.5 18.5l4.47-1.03A8.47 8.47 0 0010 18.5 8.5 8.5 0 0010 1.5zm0 15.5a7 7 0 01-3.58-.98l-.26-.15-2.65.61.63-2.56-.17-.27A6.97 6.97 0 013 10a7 7 0 1114 0 7 7 0 01-7 7zm3.85-5.24c-.21-.11-1.25-.62-1.44-.69-.19-.07-.33-.1-.47.11-.14.21-.54.69-.67.83-.12.14-.25.16-.46.05a5.77 5.77 0 01-1.7-1.05 6.4 6.4 0 01-1.18-1.47c-.12-.21 0-.33.1-.43.1-.1.21-.25.32-.38.11-.13.14-.21.21-.36.07-.14.04-.27-.02-.38-.06-.1-.47-1.13-.64-1.55-.17-.41-.34-.35-.47-.36h-.4a.77.77 0 00-.56.26 2.35 2.35 0 00-.73 1.75c0 1.03.75 2.03.86 2.17.1.14 1.48 2.26 3.59 3.17.5.22.9.35 1.2.44.51.16.97.14 1.33.08.41-.06 1.25-.51 1.43-1 .18-.5.18-.93.13-1.02-.06-.09-.2-.14-.41-.25z"/></svg>',
                title: 'Nouveau message WhatsApp',
                desc: '"Bonjour, je souhaite réserver..."',
                time: 'Il y a 5 min'
            }
        ];

        let notifIndex = 0;

        function createNotif(data) {
            const el = document.createElement('div');
            el.className = 'notif-item';
            el.innerHTML = `
                <div class="notif-item__icon notif-item__icon--${data.type}">${data.icon}</div>
                <div class="notif-item__text">
                    <div class="notif-item__title">${data.title}</div>
                    <div class="notif-item__desc">${data.desc}</div>
                </div>
                <span class="notif-item__time">${data.time}</span>
            `;
            return el;
        }

        function addNotification() {
            const data = notifications[notifIndex % notifications.length];
            const notif = createNotif(data);

            // Insert at top, push others down
            notifList.prepend(notif);

            // Remove old notifications (keep max 3 visible)
            const items = notifList.querySelectorAll('.notif-item');
            if (items.length > 3) {
                items[items.length - 1].remove();
            }

            notifIndex++;
            setTimeout(addNotification, 2500);
        }

        // Start after a short delay
        setTimeout(addNotification, 1500);
    }

    // --- Animated typing placeholder (Superprof-style) ---
    const searchInput = document.getElementById('searchActivity');
    const animatedPh = document.getElementById('animatedPlaceholder');

    if (searchInput && animatedPh) {
        const sports = [
            'Yoga',
            'Fitness',
            'Pilates',
            'Tennis',
            'Boxe',
            'Padel',
            'Natation',
            'Danse',
            'CrossFit',
            'Golf',
            'Escalade',
            'Musculation',
            'Arts martiaux',
            'Surf',
            'Running'
        ];

        let sportIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        let animationActive = true;
        const prefix = 'Rechercher : ';

        function typeStep() {
            if (!animationActive) return;

            const currentSport = sports[sportIndex];
            const fullText = prefix + currentSport;

            if (!isDeleting) {
                // Typing
                charIndex++;
                animatedPh.textContent = fullText.slice(0, charIndex);

                if (charIndex === fullText.length) {
                    // Pause before deleting
                    isPaused = true;
                    setTimeout(() => {
                        isPaused = false;
                        isDeleting = true;
                        typeStep();
                    }, 1800);
                    return;
                }
                setTimeout(typeStep, 60 + Math.random() * 40);
            } else {
                // Deleting (only the sport name, keep prefix)
                charIndex--;
                animatedPh.textContent = fullText.slice(0, charIndex);

                if (charIndex === prefix.length) {
                    isDeleting = false;
                    sportIndex = (sportIndex + 1) % sports.length;
                    setTimeout(typeStep, 400);
                    return;
                }
                setTimeout(typeStep, 30 + Math.random() * 20);
            }
        }

        // Start animation
        typeStep();

        // Stop animation on focus, resume on blur if empty
        searchInput.addEventListener('focus', () => {
            animationActive = false;
            animatedPh.classList.add('hidden');
        });

        searchInput.addEventListener('blur', () => {
            if (searchInput.value.trim() === '') {
                animationActive = true;
                animatedPh.classList.remove('hidden');
                charIndex = 0;
                isDeleting = false;
                typeStep();
            }
        });

        // Hide placeholder when user types
        searchInput.addEventListener('input', () => {
            if (searchInput.value.trim() !== '') {
                animatedPh.classList.add('hidden');
            }
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Close all exclusively
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('open');
                    const otherAnswer = otherItem.querySelector('.faq__answer');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                });

                // Toggle current if it wasn't open
                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            });
        }
    });

    // --- Tags Carousel Navigation ---
    const tagsContainer = document.querySelector('.hero__tags');
    const prevBtn = document.querySelector('.tags-nav--prev');
    const nextBtn = document.querySelector('.tags-nav--next');

    if (tagsContainer && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            tagsContainer.scrollBy({ left: -200, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            tagsContainer.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }
});
